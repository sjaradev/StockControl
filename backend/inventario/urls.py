"""Rutas que conectan las direcciones web con las vistas del inventario."""

from django.urls import path
from . import views

# Espacio de nombres usado para referenciar rutas como "inventario:lista".
app_name = "inventario"

urlpatterns = [
    # Autenticación.
    path("", views.login_view, name="login"),
    path("salir/", views.logout_view, name="logout"),
    # Operaciones CRUD de artículos.
    path("articulos/", views.articulo_lista, name="lista"),
    path("articulos/nuevo/", views.articulo_crear, name="crear"),
    path("articulos/<int:pk>/", views.articulo_detalle, name="detalle"),
    path("articulos/<int:pk>/editar/", views.articulo_editar, name="editar"),
    path("articulos/<int:pk>/eliminar/", views.articulo_eliminar, name="eliminar"),
    # Consulta y creación de categorías.
    path("categorias/", views.categoria_lista, name="categorias"),
    path("categorias/nueva/", views.categoria_crear, name="categoria_crear"),
]
