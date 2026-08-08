# Serializers for API v1 endpoints
from rest_framework import serializers
from core.models import Collection, Fetcher, FetcherSeedlist, FetcherRun


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = [
            "id",
            "name",
            "description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class FetcherSerializer(serializers.ModelSerializer):
    collection_name = serializers.CharField(source="collection.name", read_only=True)

    class Meta:
        model = Fetcher
        fields = [
            "id",
            "collection",
            "collection_name",
            "name",
            "fetcher_type",
            "status",
            "description",
            "use_headless",
            "use_rotating_proxy",
            "schedule",
            "cron_schedule_config",
            "depth",
            "inclusion_domains",
            "exclusion_domains",
            "output_format",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class FetcherSeedlistSerializer(serializers.ModelSerializer):
    fetcher_name = serializers.CharField(source="fetcher.name", read_only=True)

    class Meta:
        model = FetcherSeedlist
        fields = [
            "id",
            "fetcher",
            "fetcher_name",
            "url",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class FetcherRunSerializer(serializers.ModelSerializer):
    fetcher_name = serializers.CharField(source="fetcher.name", read_only=True)
    fetcher_status = serializers.CharField(source="fetcher.status", read_only=True)

    class Meta:
        model = FetcherRun
        fields = [
            "id",
            "fetcher",
            "fetcher_name",
            "fetcher_status",
            "pages_crawled",
            "bytes_downloaded",
            "total_requests",
            "total_errors",
            "total_timeouts",
            "total_redirects",
            "total_failures",
            "total_successes",
            "start_time",
            "end_time",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
