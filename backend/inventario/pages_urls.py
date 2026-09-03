from django_distill import distill_path

from . import pages_views

app_name = "inventario"

urlpatterns = [
    distill_path(
        "",
        pages_views.login_page,
        name="login",
        distill_file="index.html",
    ),
    distill_path(
        "articulos/",
        pages_views.articulo_lista,
        name="articulo_lista",
    ),
    distill_path(
        "articulos/<int:pk>/",
        pages_views.articulo_detalle,
        name="articulo_detalle",
        distill_func=pages_views.articulo_ids,
    ),
    distill_path(
        "categorias/",
        pages_views.categoria_lista,
        name="categoria_lista",
    ),
    distill_path(
        "categorias/<int:pk>/",
        pages_views.categoria_detalle,
        name="categoria_detalle",
        distill_func=pages_views.categoria_ids,
    ),
    distill_path(
        "ubicaciones/",
        pages_views.ubicacion_lista,
        name="ubicacion_lista",
    ),
    distill_path(
        "ubicaciones/<int:pk>/",
        pages_views.ubicacion_detalle,
        name="ubicacion_detalle",
        distill_func=pages_views.ubicacion_ids,
    ),
]