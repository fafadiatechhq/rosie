from __future__ import annotations

from django.db import models
from django.utils.text import slugify
from accounts.models import Tenant


class Collection(models.Model):
    account = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class FetcherType(models.TextChoices):
    SEEDLIST = "seedlist"
    MONITOR = "monitor"
    FULL_SITE = "full_site"
    DISCOVERY = "discovery"
    RSS = "rss"
    SITEMAP = "sitemap"


class FetcherStatus(models.TextChoices):
    PENDING = "pending"
    PAUSED = "paused"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class FetcherSchedule(models.TextChoices):
    ONCE = "once"
    INTERVAL = "interval"
    CRON = "cron"


class FetcherOutputFormat(models.TextChoices):
    WARC = "warc"
    GZIP = "gzip"


class Fetcher(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    fetcher_type = models.CharField(max_length=255, choices=FetcherType.choices)
    status = models.CharField(max_length=255, choices=FetcherStatus.choices)
    description = models.TextField(blank=True, null=True)
    use_headless = models.BooleanField(default=False)
    use_rotating_proxy = models.BooleanField(default=False)
    schedule = models.CharField(max_length=255, choices=FetcherSchedule.choices)
    cron_schedule_config = models.CharField(max_length=255, blank=True, null=True)
    depth = models.IntegerField(default=3)
    inclusion_domains = models.JSONField(default=list)
    exclusion_domains = models.JSONField(default=list)
    output_format = models.CharField(
        max_length=255, choices=FetcherOutputFormat.choices
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class FetcherSeedlist(models.Model):
    fetcher = models.ForeignKey(Fetcher, on_delete=models.CASCADE)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.url


class FetcherRun(models.Model):
    fetcher = models.ForeignKey(Fetcher, on_delete=models.CASCADE)
    pages_crawled = models.IntegerField(default=0)
    bytes_downloaded = models.IntegerField(default=0)
    total_requests = models.IntegerField(default=0)
    total_errors = models.IntegerField(default=0)
    total_timeouts = models.IntegerField(default=0)
    total_redirects = models.IntegerField(default=0)
    total_failures = models.IntegerField(default=0)
    total_successes = models.IntegerField(default=0)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.fetcher.name
