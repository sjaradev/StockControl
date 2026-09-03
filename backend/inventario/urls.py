from django.urls import path
from . import views

app_name = "inventario"

urlpatterns = [
    path("", views.login_view, name="login"),
    path("salir/", views.logout_view, name="logout"),
    path("articulos/", views.articulo_lista, name="articulo_lista"),
    path("articulos/nuevo/", views.articulo_crear, name="articulo_crear"),
    path("articulos/<int:pk>/", views.articulo_detalle, name="articulo_detalle"),
    path("articulos/<int:pk>/editar/", views.articulo_editar, name="articulo_editar"),
    path("articulos/<int:pk>/eliminar/", views.articulo_eliminar, name="articulo_eliminar"),
    path("categorias/", views.categoria_lista, name="categoria_lista"),
    path("categorias/nueva/", views.categoria_crear, name="categoria_crear"),
    path("categorias/<int:pk>/", views.categoria_detalle, name="categoria_detalle"),
    path("categorias/<int:pk>/editar/", views.categoria_editar, name="categoria_editar"),
    path("categorias/<int:pk>/eliminar/", views.categoria_eliminar, name="categoria_eliminar"),
    path("ubicaciones/", views.ubicacion_lista, name="ubicacion_lista"),
    path("ubicaciones/nueva/", views.ubicacion_crear, name="ubicacion_crear"),
    path("ubicaciones/<int:pk>/", views.ubicacion_detalle, name="ubicacion_detalle"),
    path("ubicaciones/<int:pk>/editar/", views.ubicacion_editar, name="ubicacion_editar"),
    path("ubicaciones/<int:pk>/eliminar/", views.ubicacion_eliminar, name="ubicacion_eliminar"),
]
