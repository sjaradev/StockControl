"""Registro de los modelos disponibles en el panel administrativo de Django."""

from django.contrib import admin
from .models import Categoria, Articulo

# Permite administrar categorías y artículos desde la ruta /admin/.
admin.site.register(Categoria)
admin.site.register(Articulo)
