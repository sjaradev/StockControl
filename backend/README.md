# StockControl - CRUD web (APTC106 - Sumativa 2)

Aplicacion web CRUD para el control de inventario, adaptada del ejemplo de
clases. Permite iniciar sesion y administrar articulos, categorias y ubicaciones
(Crear, Leer, Actualizar y Eliminar).

## Requisitos
- Python 3.10 o superior
- pip

## Como ejecutarlo (paso a paso)

1. Entrar a la carpeta del proyecto (donde esta manage.py).

2. Crear un entorno virtual:
   python -m venv env

3. Activarlo:
   - Windows:  env\Scripts\activate
   - Mac/Linux: source env/bin/activate

4. Instalar Django:
   pip install -r requirements.txt

5. Crear la base de datos:
   python manage.py migrate

6. Crear un usuario para entrar:
   python manage.py createsuperuser

7. Levantar el servidor:
   python manage.py runserver

8. Abrir en el navegador: http://127.0.0.1:8000/

## Importante
Antes de crear un artículo debes crear al menos una CATEGORIA
(menu "Categorías" -> "Nueva categoria") y una UBICACION
(menu "Ubicación" -> "Nueva ubicación"), porque cada artículo
pertenece a una categoría y tiene una ubicación.

## Estructura
- inventario/models.py    -> modelos Categoria, Ubicacion y Articulo
- inventario/views.py     -> vistas CRUD (basadas en funciones)
- inventario/urls.py      -> rutas de la aplicación
- inventario/templates/   -> plantillas HTML
- config/settings.py      -> configuración del proyecto
