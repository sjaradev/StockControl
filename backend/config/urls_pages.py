from django.urls import include, path

urlpatterns = [
    path("", include("inventario.pages_urls")),
]