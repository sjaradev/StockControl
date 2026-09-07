"""Configuracion de la aplicacion inventario dentro del proyecto Django."""

from django.apps import AppConfig


class InventarioConfig(AppConfig):
    """Define el nombre interno y el tipo de clave primaria de la aplicacion."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "inventario"
