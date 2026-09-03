from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.utils.http import url_has_allowed_host_and_scheme
from .models import Articulo, Categoria, Ubicacion
from .forms import ArticuloForm, CategoriaForm, UbicacionForm


# ---------- Autenticacion ----------
def login_view(request):
    error = None
    next_url = request.POST.get("next") or request.GET.get("next")

    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            if next_url and url_has_allowed_host_and_scheme(
                next_url,
                allowed_hosts={request.get_host()},
                require_https=request.is_secure(),
            ):
                return redirect(next_url)

            return redirect("inventario:articulo_lista")
        error = "Usuario o contraseña incorrecta"
    else:
        form = AuthenticationForm()
    return render(request, "inventario/login.html", {"form": form, "error": error, "next": next_url})


@login_required
@require_POST
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
        return redirect("inventario:articulo_lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Nuevo articulo", "cancelar_url": "inventario:articulo_lista",})


@login_required
def articulo_editar(request, pk):
    articulo = get_object_or_404(Articulo, pk=pk)
    form = ArticuloForm(request.POST or None, instance=articulo)
    if form.is_valid():
        form.save()
        return redirect("inventario:articulo_lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Editar articulo", "cancelar_url": "inventario:articulo_lista",})


@login_required
def articulo_eliminar(request, pk):
    articulo = get_object_or_404(Articulo, pk=pk)
    if request.method == "POST":
        articulo.delete()
        return redirect("inventario:articulo_lista")
    return render(request, "inventario/eliminar.html", {"articulo": articulo})


# ---------- Categorias ----------
@login_required
def categoria_lista(request):
    categorias = Categoria.objects.all()
    return render(request, "inventario/categorias.html", {"categorias": categorias})

@login_required
def categoria_detalle(request, pk):
    categoria = get_object_or_404(Categoria, pk=pk)
    return render(request, "inventario/categoria_detalle.html", {"categoria": categoria})

@login_required
def categoria_crear(request):
    form = CategoriaForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("inventario:categoria_lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Nueva categoría", "cancelar_url": "inventario:categoria_lista",})

@login_required
def categoria_editar(request, pk):
    categoria = get_object_or_404(Categoria, pk=pk)
    form = CategoriaForm(request.POST or None, instance=categoria)
    if form.is_valid():
        form.save()
        return redirect("inventario:categoria_lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Editar categoría", "cancelar_url": "inventario:categoria_lista",})


@login_required
def categoria_eliminar(request, pk):
    categoria = get_object_or_404(Categoria, pk=pk)
    error = None
    if request.method == "POST":
        if categoria.articulos.exists():
            error = ("No se puede eliminar esta categoría porque tiene artículos asociados.")
        else:
            categoria.delete()
            return redirect("inventario:categoria_lista")
    return render(request, "inventario/categoria_eliminar.html", {"categoria": categoria, "error": error,})

# ---------- Ubicaciones ----------
@login_required
def ubicacion_lista(request):
    ubicaciones = Ubicacion.objects.all()
    return render(request, "inventario/ubicaciones.html", {"ubicaciones": ubicaciones})


@login_required
def ubicacion_detalle(request, pk):
    ubicacion = get_object_or_404(Ubicacion, pk=pk)
    return render(request, "inventario/ubicacion_detalle.html", {"ubicacion": ubicacion})


@login_required
def ubicacion_crear(request):
    form = UbicacionForm(request.POST or None)
    if form.is_valid():
        form.save()
        return redirect("inventario:ubicacion_lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Nueva ubicación", "cancelar_url": "inventario:ubicacion_lista",})


@login_required
def ubicacion_editar(request, pk):
    ubicacion = get_object_or_404(Ubicacion, pk=pk)
    form = UbicacionForm(request.POST or None, instance=ubicacion)
    if form.is_valid():
        form.save()
        return redirect("inventario:ubicacion_lista")
    return render(request, "inventario/form.html", {"form": form, "titulo": "Editar ubicación", "cancelar_url": "inventario:ubicacion_lista",})


@login_required
def ubicacion_eliminar(request, pk):
    ubicacion = get_object_or_404(Ubicacion, pk=pk)
    error = None
    if request.method == "POST":
        if ubicacion.articulos.exists():
            error = ("No se puede eliminar esta ubicación porque tiene artículos asociados.")
        else:
            ubicacion.delete()
            return redirect("inventario:ubicacion_lista")
    return render(request, "inventario/ubicacion_eliminar.html", {"ubicacion": ubicacion, "error": error,})
