"""Rutas de autenticacion y administracion del inventario."""

from django.urls import path
from . import views

# Permite referenciar rutas con nombres como "inventario:lista".
app_name = "inventario"

urlpatterns = [
    # Autenticacion.
    path("", views.login_view, name="login"),
    path("salir/", views.logout_view, name="logout"),
    # CRUD de articulos.
    path("articulos/", views.articulo_lista, name="lista"),
    path("articulos/nuevo/", views.articulo_crear, name="crear"),
    path("articulos/<int:pk>/", views.articulo_detalle, name="detalle"),
    path("articulos/<int:pk>/editar/", views.articulo_editar, name="editar"),
    path("articulos/<int:pk>/eliminar/", views.articulo_eliminar, name="eliminar"),
    # Consulta y creacion de categorias.
    path("categorias/", views.categoria_lista, name="categorias"),
    path("categorias/nueva/", views.categoria_crear, name="categoria_crear"),
]
