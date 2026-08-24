from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import Articulo, Categoria
from .forms import ArticuloForm, CategoriaForm


# ---------- Autenticacion ----------
def login_view(request):
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
    logout(request)
    return redirect("inventario:login")


# ---------- CRUD de Articulos ----------
@login_required
def articulo_lista(request):
    articulos = Articulo.objects.all()
    return render(request, "inventario/lista.html", {"articulos": articulos})


@login_required
def articulo_detalle(request, pk):
    articulo = get_object_or_404(Articulo, pk=pk)
    return render(request, "inventario/detalle.html", {"articulo": articulo})


@login_required
def articulo_crear(request):
    form = ArticuloForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("inventario:lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Nuevo articulo"})


@login_required
def articulo_editar(request, pk):
    articulo = get_object_or_404(Articulo, pk=pk)
    form = ArticuloForm(request.POST or None, instance=articulo)
    if form.is_valid():
        form.save()
        return redirect("inventario:lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Editar articulo"})


@login_required
def articulo_eliminar(request, pk):
    articulo = get_object_or_404(Articulo, pk=pk)
    if request.method == "POST":
        articulo.delete()
        return redirect("inventario:lista")
    return render(request, "inventario/eliminar.html", {"articulo": articulo})


# ---------- Categorias ----------
@login_required
def categoria_lista(request):
    categorias = Categoria.objects.all()
    return render(request, "inventario/categorias.html", {"categorias": categorias})


@login_required
def categoria_crear(request):
    form = CategoriaForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("inventario:categorias")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Nueva categoria"})
