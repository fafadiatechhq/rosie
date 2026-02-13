from django.contrib import admin
from core.models import Collection, Fetcher, FetcherSeedlist, FetcherRun

admin.site.register(Collection)
admin.site.register(Fetcher)
admin.site.register(FetcherSeedlist)
admin.site.register(FetcherRun)
