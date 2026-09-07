"""Rutas principales que conectan el proyecto con sus aplicaciones."""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # Panel administrativo proporcionado por Django.
    path("admin/", admin.site.urls),
    # La aplicacion inventario administra todas las rutas desde la raiz.
    path("", include("inventario.urls")),
]
