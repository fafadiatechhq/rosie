from __future__ import annotations

from django.db import models
from django.utils.text import slugify


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Source(TimeStampedModel):
    SOURCE_TYPE_RSS = "rss"
    SOURCE_TYPE_API = "api"
    SOURCE_TYPE_SCRAPE = "scrape"

    SOURCE_TYPE_CHOICES = [
        (SOURCE_TYPE_RSS, "RSS"),
        (SOURCE_TYPE_API, "API"),
        (SOURCE_TYPE_SCRAPE, "Scrape"),
    ]

    name = models.CharField(max_length=200, unique=True)
    source_type = models.CharField(max_length=20, choices=SOURCE_TYPE_CHOICES)
    url = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name


class Category(TimeStampedModel):
    """
    Two-level taxonomy:
      - parent=None => Level 1 category
      - parent!=None => Level 2 category
    """

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField(blank=True)
    parent = models.ForeignKey(
        "self",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="children",
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["parent", "name"], name="uniq_category_parent_name")
        ]
        indexes = [
            models.Index(fields=["parent", "name"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name)[:200] or "category"
            slug = base
            i = 2
            while Category.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{i}"
                i += 1
            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def is_parent(self) -> bool:
        return self.parent_id is None

    def __str__(self) -> str:
        return self.name


class Tag(TimeStampedModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name)[:100] or "tag"
            slug = base
            i = 2
            while Tag.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{i}"
                i += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name


class Article(TimeStampedModel):
    source = models.ForeignKey(Source, on_delete=models.PROTECT, related_name="articles")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="articles")
    title = models.CharField(max_length=500)
    content = models.TextField(blank=True)
    author = models.CharField(max_length=200, blank=True)
    publish_date = models.DateTimeField(db_index=True)
    url = models.URLField(unique=True)
    image_url = models.URLField(blank=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name="articles")

    class Meta:
        indexes = [
            models.Index(fields=["publish_date"]),
            models.Index(fields=["source", "publish_date"]),
            models.Index(fields=["category", "publish_date"]),
        ]

    def __str__(self) -> str:
        return self.title


class ArticleCluster(TimeStampedModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField(blank=True)
    trending = models.BooleanField(default=False, db_index=True)
    articles = models.ManyToManyField(Article, related_name="clusters", blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["trending", "updated_at"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name)[:200] or "cluster"
            slug = base
            i = 2
            while ArticleCluster.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{i}"
                i += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name
