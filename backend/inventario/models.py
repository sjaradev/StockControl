from django.db import models
from django.core.validators import MinValueValidator

class Categoria(models.Model):
    """Categoría para agrupar artículos (Herramientas, Insumos, Repuestos, etc.)."""
    nombre = models.CharField(max_length=150, unique=True,)
    descripcion = models.CharField(max_length=256, blank=True,)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre

class Ubicacion(models.Model):
    """Ubicación física donde se almacenan los artículos."""
    nombre = models.CharField(max_length=100, unique=True,)
    descripcion = models.CharField(max_length=256, blank=True,)
    creado = models.DateTimeField(auto_now_add=True,)
    actualizado = models.DateTimeField(auto_now=True,)

    class Meta:
        verbose_name = "Ubicación"
        verbose_name_plural = "Ubicaciones"
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Articulo(models.Model):
    """Artículo del inventario de StockControl."""
    nombre = models.CharField(max_length=150)
    codigo = models.CharField("Código de barra",max_length=50,unique=True,)
    descripcion = models.CharField(max_length=256,blank=True,)
    stock = models.IntegerField(default=0,validators=[MinValueValidator(0)],)
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.PROTECT, related_name="articulos",)
    categoria = models.ForeignKey(Categoria, on_delete=models.PROTECT, related_name="articulos",)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Artículo"
        verbose_name_plural = "Artículos"
        ordering = ["nombre"]
        constraints = [models.CheckConstraint(condition=models.Q(stock__gte=0),name="stock_no_negativo",),]

    def __str__(self):
        return self.nombre
