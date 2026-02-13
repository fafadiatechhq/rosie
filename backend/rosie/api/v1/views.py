from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.models import Tenant
from billing.models import Plan, Subscription
from core.models import Collection, Fetcher, FetcherSeedlist, FetcherRun
from .serializers import (
    TenantSerializer,
    PlanSerializer,
    SubscriptionSerializer,
    CollectionSerializer,
    FetcherSerializer,
    FetcherSeedlistSerializer,
    FetcherRunSerializer,
)


class TenantAPI(viewsets.ModelViewSet):
    """
    ViewSet for managing Tenant instances.

    Provides CRUD operations:
    - list: GET /api/v1/tenants/
    - create: POST /api/v1/tenants/
    - retrieve: GET /api/v1/tenants/{id}/
    - update: PUT /api/v1/tenants/{id}/
    - partial_update: PATCH /api/v1/tenants/{id}/
    - destroy: DELETE /api/v1/tenants/{id}/
    """

    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned tenants to those owned by the current user.
        """
        queryset = Tenant.objects.all()
        # Filter by owner if requested
        owner_id = self.request.query_params.get("owner", None)
        if owner_id is not None:
            queryset = queryset.filter(owner_id=owner_id)
        return queryset

    def perform_create(self, serializer):
        """
        Set the owner to the current user if not provided.
        """
        if "owner" not in serializer.validated_data:
            serializer.save(owner=self.request.user)
        else:
            serializer.save()


class PlanAPI(viewsets.ModelViewSet):
    """
    ViewSet for managing Plan instances.

    Provides CRUD operations:
    - list: GET /api/v1/plans/
    - create: POST /api/v1/plans/
    - retrieve: GET /api/v1/plans/{id}/
    - update: PUT /api/v1/plans/{id}/
    - partial_update: PATCH /api/v1/plans/{id}/
    - destroy: DELETE /api/v1/plans/{id}/
    """

    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [IsAuthenticated]


class SubscriptionAPI(viewsets.ModelViewSet):
    """
    ViewSet for managing Subscription instances.

    Provides CRUD operations:
    - list: GET /api/v1/subscriptions/
    - create: POST /api/v1/subscriptions/
    - retrieve: GET /api/v1/subscriptions/{id}/
    - update: PUT /api/v1/subscriptions/{id}/
    - partial_update: PATCH /api/v1/subscriptions/{id}/
    - destroy: DELETE /api/v1/subscriptions/{id}/
    """

    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned subscriptions by tenant.
        """
        queryset = Subscription.objects.all()
        tenant_id = self.request.query_params.get("tenant", None)
        if tenant_id is not None:
            queryset = queryset.filter(tenant_id=tenant_id)
        plan_id = self.request.query_params.get("plan", None)
        if plan_id is not None:
            queryset = queryset.filter(plan_id=plan_id)
        status = self.request.query_params.get("status", None)
        if status is not None:
            queryset = queryset.filter(status=status)
        return queryset


class CollectionAPI(viewsets.ModelViewSet):
    """
    ViewSet for managing Collection instances.

    Provides CRUD operations:
    - list: GET /api/v1/collections/
    - create: POST /api/v1/collections/
    - retrieve: GET /api/v1/collections/{id}/
    - update: PUT /api/v1/collections/{id}/
    - partial_update: PATCH /api/v1/collections/{id}/
    - destroy: DELETE /api/v1/collections/{id}/
    """

    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned collections by account (tenant).
        """
        queryset = Collection.objects.all()
        account_id = self.request.query_params.get("account", None)
        if account_id is not None:
            queryset = queryset.filter(account_id=account_id)
        return queryset


class FetcherAPI(viewsets.ModelViewSet):
    """
    ViewSet for managing Fetcher instances.

    Provides CRUD operations:
    - list: GET /api/v1/fetchers/
    - create: POST /api/v1/fetchers/
    - retrieve: GET /api/v1/fetchers/{id}/
    - update: PUT /api/v1/fetchers/{id}/
    - partial_update: PATCH /api/v1/fetchers/{id}/
    - destroy: DELETE /api/v1/fetchers/{id}/
    """

    queryset = Fetcher.objects.all()
    serializer_class = FetcherSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned fetchers by collection, status, or fetcher_type.
        """
        queryset = Fetcher.objects.all()
        collection_id = self.request.query_params.get("collection", None)
        if collection_id is not None:
            queryset = queryset.filter(collection_id=collection_id)
        status = self.request.query_params.get("status", None)
        if status is not None:
            queryset = queryset.filter(status=status)
        fetcher_type = self.request.query_params.get("fetcher_type", None)
        if fetcher_type is not None:
            queryset = queryset.filter(fetcher_type=fetcher_type)
        return queryset


class FetcherSeedlistAPI(viewsets.ModelViewSet):
    """
    ViewSet for managing FetcherSeedlist instances.

    Provides CRUD operations:
    - list: GET /api/v1/fetcher-seedlists/
    - create: POST /api/v1/fetcher-seedlists/
    - retrieve: GET /api/v1/fetcher-seedlists/{id}/
    - update: PUT /api/v1/fetcher-seedlists/{id}/
    - partial_update: PATCH /api/v1/fetcher-seedlists/{id}/
    - destroy: DELETE /api/v1/fetcher-seedlists/{id}/
    """

    queryset = FetcherSeedlist.objects.all()
    serializer_class = FetcherSeedlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned seedlists by fetcher.
        """
        queryset = FetcherSeedlist.objects.all()
        fetcher_id = self.request.query_params.get("fetcher", None)
        if fetcher_id is not None:
            queryset = queryset.filter(fetcher_id=fetcher_id)
        return queryset


class FetcherRunAPI(viewsets.ModelViewSet):
    """
    ViewSet for managing FetcherRun instances.

    Provides CRUD operations:
    - list: GET /api/v1/fetcher-runs/
    - create: POST /api/v1/fetcher-runs/
    - retrieve: GET /api/v1/fetcher-runs/{id}/
    - update: PUT /api/v1/fetcher-runs/{id}/
    - partial_update: PATCH /api/v1/fetcher-runs/{id}/
    - destroy: DELETE /api/v1/fetcher-runs/{id}/
    """

    queryset = FetcherRun.objects.all()
    serializer_class = FetcherRunSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned runs by fetcher.
        """
        queryset = FetcherRun.objects.all()
        fetcher_id = self.request.query_params.get("fetcher", None)
        if fetcher_id is not None:
            queryset = queryset.filter(fetcher_id=fetcher_id)
        return queryset
