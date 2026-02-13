# Serializers for API v1 endpoints
from rest_framework import serializers
from accounts.models import Tenant
from billing.models import Plan, Subscription
from core.models import Collection, Fetcher, FetcherSeedlist, FetcherRun


class TenantSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source="owner.username", read_only=True)
    owner_email = serializers.CharField(source="owner.email", read_only=True)

    class Meta:
        model = Tenant
        fields = [
            "id",
            "name",
            "owner",
            "owner_username",
            "owner_email",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ["id", "name", "description", "price", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]


class SubscriptionSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source="tenant.name", read_only=True)
    plan_name = serializers.CharField(source="plan.name", read_only=True)
    plan_price = serializers.DecimalField(
        source="plan.price", max_digits=10, decimal_places=2, read_only=True
    )

    class Meta:
        model = Subscription
        fields = [
            "id",
            "tenant",
            "tenant_name",
            "plan",
            "plan_name",
            "plan_price",
            "status",
            "start_date",
            "end_date",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class CollectionSerializer(serializers.ModelSerializer):
    account_name = serializers.CharField(source="account.name", read_only=True)

    class Meta:
        model = Collection
        fields = [
            "id",
            "account",
            "account_name",
            "name",
            "description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class FetcherSerializer(serializers.ModelSerializer):
    collection_name = serializers.CharField(source="collection.name", read_only=True)
    collection_account_name = serializers.CharField(
        source="collection.account.name", read_only=True
    )

    class Meta:
        model = Fetcher
        fields = [
            "id",
            "collection",
            "collection_name",
            "collection_account_name",
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
