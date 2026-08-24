# StockControl

Sistema de control de inventario para pequenas y medianas empresas.
Proyecto de la asignatura **APTC106 - Taller de Desarrollo Web y Movil**,
Universidad Andres Bello.

**Mockup de la aplicacion movil:** https://USUARIO.github.io/stockcontrol/

> Reemplaza `USUARIO` por tu nombre de usuario de GitHub una vez publicado el sitio.

---

## Que es StockControl

Muchas empresas todavia controlan su bodega con planillas o anotaciones en papel.
Eso provoca diferencias de stock, compras duplicadas y poca claridad sobre donde
esta cada articulo. StockControl propone una solucion con dos canales conectados a
una misma base de datos:

- **Plataforma web:** administracion de articulos, categorias, usuarios e indicadores.
- **Aplicacion movil:** registro de movimientos en la bodega mediante escaneo de
  codigos de barra o QR.

## Contenido del repositorio

| Carpeta | Descripcion |
|---|---|
| `index.html` | Mockup navegable de la aplicacion movil (se publica en GitHub Pages). |
| `assets/css/` | Hoja de estilos del prototipo. |
| `assets/js/` | Navegacion entre pantallas del prototipo. |
| `backend/` | Aplicacion web CRUD desarrollada con Django (Sumativa 2). |
| `docs/` | Documentacion e imagenes del proyecto. |

---

## Mockup movil (prototipo navegable)

El prototipo simula la aplicacion movil y permite recorrer todas las pantallas y su
navegacion. Todavia **no tiene logica de negocio ni conexion a la base de datos**:
su proposito es validar los flujos y el diseno antes de programar la app real.

Pantallas incluidas:

1. **Inicio de sesion** - acceso del personal de bodega.
2. **Inicio** - indicadores del dia y accesos rapidos.
3. **Articulos** - listado con buscador y filtros por categoria.
4. **Detalle del articulo** - stock, ubicacion e historial.
5. **Escaner** - lectura simulada de codigo de barra o QR.
6. **Registrar movimiento** - entrada, salida o traslado.
7. **Confirmacion** - comprobante del movimiento registrado.
8. **Movimientos** - historial con filtros.
9. **Alertas** - articulos bajo el minimo o sin stock.
10. **Perfil** - datos del usuario y cierre de sesion.

### Verlo en tu computador

Como es un sitio estatico, basta con abrir `index.html` en el navegador.
Tambien puedes levantar un servidor local:

```bash
python -m http.server 8000
```

Luego entra a http://localhost:8000

---

## Backend web (Django)

La carpeta `backend/` contiene la aplicacion web con el CRUD de articulos y
categorias, desarrollada en la entrega anterior.

```bash
cd backend
python -m venv env
env\Scripts\activate        # en Windows
source env/bin/activate     # en Mac o Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Luego entra a http://127.0.0.1:8000

> **Importante:** antes de crear un articulo debes crear al menos una categoria,
> porque cada articulo pertenece a una categoria.

> GitHub Pages solo publica sitios estaticos, por lo que el backend Django no se
> ejecuta ahi. En Pages se publica el mockup movil; el backend se ejecuta de forma
> local o en un servicio que soporte Python.

---

## Integracion movil / web

Ambos canales se comunican con una API REST sobre HTTPS conectada a una base de
datos comun:

```
App movil  ──┐
             ├── API REST ── Base de datos ── Plataforma web
Plataforma  ─┘
```

Cuando un operario registra un movimiento desde el telefono, la API valida el
usuario, sus permisos y el stock disponible antes de guardar. Una vez confirmado,
el dato queda inmediatamente disponible para los supervisores en la plataforma web.

---

## Tecnologias

- HTML5, CSS3 y JavaScript (sin librerias externas) para el mockup movil.
- Python y Django para la plataforma web.
- SQLite como base de datos de desarrollo.
- Git y GitHub para el control de versiones y la publicacion.

## Equipo

- Fernando Flores Tobar
- Sergio Jara Astete
- Rodrigo Rivas Riffo

## Licencia

Proyecto academico desarrollado con fines educativos para la asignatura APTC106.
