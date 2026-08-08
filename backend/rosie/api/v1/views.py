from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models import Collection, Fetcher, FetcherSeedlist, FetcherRun
from .serializers import (
    CollectionSerializer,
    FetcherSerializer,
    FetcherSeedlistSerializer,
    FetcherRunSerializer,
)


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
