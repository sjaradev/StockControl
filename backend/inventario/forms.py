"""Formularios vinculados a los modelos de artículos y categorías."""

from django import forms
from .models import Articulo, Categoria


class ArticuloForm(forms.ModelForm):
    """Formulario para crear o modificar un artículo."""

    class Meta:
        """Indica el modelo y los campos editables desde el formulario."""

        model = Articulo
        fields = ["nombre", "codigo", "descripcion", "stock", "ubicacion", "categoria"]


class CategoriaForm(forms.ModelForm):
    """Formulario para crear o modificar una categoría."""

    class Meta:
        """Indica el modelo y los campos editables desde el formulario."""

        model = Categoria
        fields = ["nombre", "descripcion"]
