from django import forms
from .models import Articulo, Categoria


class ArticuloForm(forms.ModelForm):
    class Meta:
        model = Articulo
        fields = ["nombre", "codigo", "descripcion", "stock", "ubicacion", "categoria"]


class CategoriaForm(forms.ModelForm):
    class Meta:
        model = Categoria
        fields = ["nombre", "descripcion"]
