from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.v1 import views

app_name = "api_v1"

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r"tenants", views.TenantAPI, basename="tenant")
router.register(r"plans", views.PlanAPI, basename="plan")
router.register(r"subscriptions", views.SubscriptionAPI, basename="subscription")
router.register(r"collections", views.CollectionAPI, basename="collection")
router.register(r"fetchers", views.FetcherAPI, basename="fetcher")
router.register(
    r"fetcher-seedlists", views.FetcherSeedlistAPI, basename="fetcher-seedlist"
)
router.register(r"fetcher-runs", views.FetcherRunAPI, basename="fetcher-run")

urlpatterns = [
    path("", include(router.urls)),
]
