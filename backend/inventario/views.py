"""Vistas para la autenticación y el CRUD de artículos y categorías."""

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import Articulo, Categoria
from .forms import ArticuloForm, CategoriaForm


# ---------- Autenticacion ----------
def login_view(request):
    """Muestra el formulario de acceso y autentica las credenciales recibidas."""
    error = None
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect("inventario:lista")
        error = "Usuario o contrasena incorrecta"
    else:
        form = AuthenticationForm()
    return render(request, "inventario/login.html", {"form": form, "error": error})


@login_required
def logout_view(request):
    """Cierra la sesión actual y regresa a la pantalla de acceso."""
    logout(request)
    return redirect("inventario:login")


# ---------- CRUD de Articulos ----------
@login_required
def articulo_lista(request):
    """Obtiene y muestra todos los artículos registrados."""
    articulos = Articulo.objects.all()
    return render(request, "inventario/lista.html", {"articulos": articulos})


@login_required
def articulo_detalle(request, pk):
    """Muestra un artículo identificado por su clave primaria."""
    articulo = get_object_or_404(Articulo, pk=pk)
    return render(request, "inventario/detalle.html", {"articulo": articulo})


@login_required
def articulo_crear(request):
    """Crea un artículo a partir de los datos enviados por el formulario."""
    # Sin datos POST, Django construye un formulario vacío para mostrarlo.
    form = ArticuloForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("inventario:lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Nuevo articulo"})


@login_required
def articulo_editar(request, pk):
    """Actualiza el artículo indicado utilizando el formulario existente."""
    articulo = get_object_or_404(Articulo, pk=pk)
    form = ArticuloForm(request.POST or None, instance=articulo)
    if form.is_valid():
        form.save()
        return redirect("inventario:lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Editar articulo"})


@login_required
def articulo_eliminar(request, pk):
    """Solicita confirmación y elimina el artículo mediante una petición POST."""
    articulo = get_object_or_404(Articulo, pk=pk)
    if request.method == "POST":
        articulo.delete()
        return redirect("inventario:lista")
    return render(request, "inventario/eliminar.html", {"articulo": articulo})


# ---------- Categorias ----------
@login_required
def categoria_lista(request):
    """Obtiene y muestra todas las categorías registradas."""
    categorias = Categoria.objects.all()
    return render(request, "inventario/categorias.html", {"categorias": categorias})


@login_required
def categoria_crear(request):
    """Crea una categoría a partir de los datos recibidos."""
    form = CategoriaForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("inventario:categorias")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Nueva categoria"})
