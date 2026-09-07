"""Formularios utilizados para crear y modificar datos del inventario."""

from django import forms
from .models import Articulo, Categoria


class ArticuloForm(forms.ModelForm):
    """Formulario generado a partir del modelo Articulo."""

    class Meta:
        """Selecciona el modelo y los campos editables del formulario."""

        model = Articulo
        fields = ["nombre", "codigo", "descripcion", "stock", "ubicacion", "categoria"]


class CategoriaForm(forms.ModelForm):
    """Formulario generado a partir del modelo Categoria."""

    class Meta:
        """Selecciona el modelo y los campos editables del formulario."""

        model = Categoria
        fields = ["nombre", "descripcion"]
