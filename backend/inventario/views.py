"""Vistas de autenticacion y operaciones CRUD de articulos y categorias."""

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import Articulo, Categoria
from .forms import ArticuloForm, CategoriaForm


# ---------- Autenticacion ----------
def login_view(request):
    """Muestra el formulario de acceso y autentica los datos enviados."""

    error = None
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            # Django guarda al usuario autenticado dentro de la sesion actual.
            login(request, form.get_user())
            return redirect("inventario:lista")
        error = "Usuario o contrasena incorrecta"
    else:
        form = AuthenticationForm()
    return render(request, "inventario/login.html", {"form": form, "error": error})


@login_required
def logout_view(request):
    """Cierra la sesion actual y vuelve a la pantalla de acceso."""

    logout(request)
    return redirect("inventario:login")


# ---------- CRUD de Articulos ----------
@login_required
def articulo_lista(request):
    """Obtiene y muestra todos los articulos registrados."""

    articulos = Articulo.objects.all()
    return render(request, "inventario/lista.html", {"articulos": articulos})


@login_required
def articulo_detalle(request, pk):
    """Muestra el articulo indicado o responde con error 404 si no existe."""

    articulo = get_object_or_404(Articulo, pk=pk)
    return render(request, "inventario/detalle.html", {"articulo": articulo})


@login_required
def articulo_crear(request):
    """Muestra el formulario y guarda un articulo cuando sus datos son validos."""

    # En una peticion GET, request.POST esta vacio y se muestra un formulario nuevo.
    form = ArticuloForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("inventario:lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Nuevo articulo"})


@login_required
def articulo_editar(request, pk):
    """Carga un articulo existente y guarda los cambios del formulario."""

    articulo = get_object_or_404(Articulo, pk=pk)
    # instance indica que se debe actualizar el registro en lugar de crear otro.
    form = ArticuloForm(request.POST or None, instance=articulo)
    if form.is_valid():
        form.save()
        return redirect("inventario:lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Editar articulo"})


@login_required
def articulo_eliminar(request, pk):
    """Muestra la confirmacion y elimina el articulo mediante una peticion POST."""

    articulo = get_object_or_404(Articulo, pk=pk)
    # La eliminacion no se ejecuta con GET para evitar borrados accidentales.
    if request.method == "POST":
        articulo.delete()
        return redirect("inventario:lista")
    return render(request, "inventario/eliminar.html", {"articulo": articulo})


# ---------- Categorias ----------
@login_required
def categoria_lista(request):
    """Obtiene y muestra todas las categorias registradas."""

    categorias = Categoria.objects.all()
    return render(request, "inventario/categorias.html", {"categorias": categorias})


@login_required
def categoria_crear(request):
    """Muestra el formulario y guarda una categoria cuando sus datos son validos."""

    form = CategoriaForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("inventario:categorias")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Nueva categoria"})
