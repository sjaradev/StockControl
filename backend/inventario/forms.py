from django import forms
from .models import Articulo, Categoria, Ubicacion


class ArticuloForm(forms.ModelForm):
    class Meta:
        model = Articulo
        fields = ["nombre", "codigo", "descripcion", "stock", "ubicacion", "categoria",]


class CategoriaForm(forms.ModelForm):
    class Meta:
        model = Categoria
        fields = ["nombre", "descripcion",]


class UbicacionForm(forms.ModelForm):
    class Meta:
        model = Ubicacion
        fields = ["nombre", "descripcion",]