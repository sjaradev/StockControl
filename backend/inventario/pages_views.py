from django.shortcuts import get_object_or_404, render
from django.contrib.auth.forms import AuthenticationForm
from .models import Articulo, Categoria, Ubicacion

def login_page(request):
    return render(
        request,
        "inventario/login.html",
        {
            "form": AuthenticationForm(),
            "static_export": True,
            "pages_prefix": "/StockControl",
            "hide_nav": True,
        },
    )
    
def articulo_lista(request):
    return render(
        request,
        "inventario/lista.html",
        {
            "articulos": Articulo.objects.all(),
            "static_export": True,
            "pages_prefix": "/StockControl",
        },
    )


def articulo_detalle(request, pk):
    return render(
        request,
        "inventario/detalle.html",
        {
            "articulo": get_object_or_404(Articulo, pk=pk),
            "static_export": True,
            "pages_prefix": "/StockControl",
        },
    )


def categoria_lista(request):
    return render(
        request,
        "inventario/categorias.html",
        {
            "categorias": Categoria.objects.all(),
            "static_export": True,
            "pages_prefix": "/StockControl",
        },
    )


def categoria_detalle(request, pk):
    return render(
        request,
        "inventario/categoria_detalle.html",
        {
            "categoria": get_object_or_404(Categoria, pk=pk),
            "static_export": True,
            "pages_prefix": "/StockControl",
        },
    )


def ubicacion_lista(request):
    return render(
        request,
        "inventario/ubicaciones.html",
        {
            "ubicaciones": Ubicacion.objects.all(),
            "static_export": True,
            "pages_prefix": "/StockControl",
        },
    )


def ubicacion_detalle(request, pk):
    return render(
        request,
        "inventario/ubicacion_detalle.html",
        {
            "ubicacion": get_object_or_404(Ubicacion, pk=pk),
            "static_export": True,
            "pages_prefix": "/StockControl",
        },
    )


def articulo_ids():
    for pk in Articulo.objects.values_list("pk", flat=True):
        yield {"pk": pk}


def categoria_ids():
    for pk in Categoria.objects.values_list("pk", flat=True):
        yield {"pk": pk}


def ubicacion_ids():
    for pk in Ubicacion.objects.values_list("pk", flat=True):
        yield {"pk": pk}