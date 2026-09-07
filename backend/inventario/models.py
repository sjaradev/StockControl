"""Modelos que representan las categorias y los articulos del inventario."""

from django.db import models


class Categoria(models.Model):
    """Categoria para agrupar articulos (Herramientas, Insumos, Repuestos, etc.)."""

    # Las fechas se completan automaticamente al crear o modificar el registro.
    nombre = models.CharField(max_length=150)
    descripcion = models.CharField(max_length=256, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        """Nombres legibles que Django muestra para este modelo."""

        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        """Representa la categoria mediante su nombre."""
        return self.nombre


class Articulo(models.Model):
    """Articulo del inventario de StockControl."""

    nombre = models.CharField(max_length=150)
    codigo = models.CharField("Codigo de barra / QR", max_length=50)
    descripcion = models.CharField(max_length=256, blank=True)
    stock = models.IntegerField(default=0)
    ubicacion = models.CharField("Ubicacion / Bodega", max_length=100)
    # Si se elimina una categoria, CASCADE elimina tambien sus articulos asociados.
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        """Nombres legibles que Django muestra para este modelo."""

        verbose_name = "Articulo"
        verbose_name_plural = "Articulos"

    def __str__(self):
        """Representa el articulo mediante su nombre."""
        return self.nombre
