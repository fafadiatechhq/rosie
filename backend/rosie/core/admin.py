from django.contrib import admin

from .models import Article, ArticleCluster, Category, Source, Tag


@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    list_display = ("name", "source_type", "is_active", "created_at", "updated_at")
    list_filter = ("source_type", "is_active")
    search_fields = ("name", "url")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "parent", "slug", "created_at", "updated_at")
    list_filter = ("parent",)
    search_fields = ("name", "slug")


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created_at", "updated_at")
    search_fields = ("name", "slug")


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "source", "category", "publish_date", "created_at")
    list_filter = ("source", "category")
    search_fields = ("title", "content", "url")
    date_hierarchy = "publish_date"


@admin.register(ArticleCluster)
class ArticleClusterAdmin(admin.ModelAdmin):
    list_display = ("name", "trending", "created_at", "updated_at")
    list_filter = ("trending",)
    search_fields = ("name", "slug")
    filter_horizontal = ("articles",)
