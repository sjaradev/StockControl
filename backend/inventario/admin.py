"""Registro de modelos disponibles en el panel administrativo de Django."""

from django.contrib import admin
from .models import Categoria, Articulo

# Habilita la gestion de ambos modelos desde la ruta /admin/.
admin.site.register(Categoria)
admin.site.register(Articulo)
