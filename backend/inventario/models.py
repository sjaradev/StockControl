"""Modelos que representan las categorías y los artículos del inventario."""

from django.db import models


class Categoria(models.Model):
    """Categoria para agrupar articulos (Herramientas, Insumos, Repuestos, etc.)."""

    # Información principal y fechas de auditoría de la categoría.
    nombre = models.CharField(max_length=150)
    descripcion = models.CharField(max_length=256, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        """Define los nombres que Django muestra para este modelo."""

        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        """Devuelve el nombre usado para representar la categoría."""
        return self.nombre


class Articulo(models.Model):
    """Articulo del inventario de StockControl."""

    # Datos descriptivos y cantidad disponible del artículo.
    nombre = models.CharField(max_length=150)
    codigo = models.CharField("Codigo de barra / QR", max_length=50)
    descripcion = models.CharField(max_length=256, blank=True)
    stock = models.IntegerField(default=0)
    ubicacion = models.CharField("Ubicacion / Bodega", max_length=100)
    # Cada artículo pertenece a una categoría; al borrarla se borran sus artículos.
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        """Define los nombres que Django muestra para este modelo."""

        verbose_name = "Articulo"
        verbose_name_plural = "Articulos"

    def __str__(self):
        """Devuelve el nombre usado para representar el artículo."""
        return self.nombre
