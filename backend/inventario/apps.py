"""Configuración de la aplicación de inventario dentro del proyecto Django."""

from django.apps import AppConfig


class InventarioConfig(AppConfig):
    """Define el tipo de clave primaria y el nombre interno de la aplicación."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "inventario"
