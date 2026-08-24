# Stock Control

Sistema de control de inventario para pequeñas y medianas empresas.
Proyecto de la asignatura **APTC106 - Taller de Desarrollo Web y Móvil**,
Universidad Andrés Bello.

**Prototipos publicados:** https://sjaradev.github.io/StockControl/

| Prototipo | Enlace directo |
|---|---|
| Plataforma web | https://sjaradev.github.io/StockControl/web.html |
| Aplicación móvil | https://sjaradev.github.io/StockControl/movil.html |

**Cuenta de prueba en ambos:** usuario `demo` / contraseña `demo`

---

## Que es Stock Control

Muchas empresas todavía controlan su bodega con planillas o anotaciones en papel.
Eso provoca diferencias de stock, compras duplicadas y poca claridad sobre donde
esta cada articulo. Stock Control propone una solución con dos canales conectados a
la misma información:

- **Plataforma web:** administración de artículos, categorías, usuarios e indicadores.
  Pensada para pantallas grandes y sesiones largas de trabajo.
- **Aplicación móvil:** registro de movimientos en la bodega mediante escaneo de
  códigos de barra o QR. Pensada para usarse de pie y con una sola mano.

## Como se integran los dos canales

La web y el móvil no son dos sistemas separados: son dos formas de entrar al mismo
sistema.

```
App móvil  ──┐
             ├── API REST ── Base de datos ── Plataforma web
Plataforma  ─┘
```

El recorrido de una operación es:

1. El operario escanea el código del articulo con la cámara del teléfono.
2. La API valida su identidad, sus permisos y que exista stock suficiente.
3. El movimiento se guarda una sola vez, con usuario, fecha, ubicación y origen.
4. El dato aparece de inmediato en los indicadores de la plataforma web.

Como consecuencia de este diseño:

- **Una sola base de datos:** el stock nunca queda distinto entre lo que ve el
  operario y lo que revisa el supervisor.
- **Las mismas cuentas:** un usuario sirve para los dos canales; lo que cambia son
  los permisos según el rol.
- **Origen identificado:** cada movimiento indica si se registro desde el móvil o
  desde la web. En el prototipo web esto se ve en la columna *Origen*.

---

## Contenido del repositorio

| Archivo o carpeta | Descripción |
|---|---|
| `index.html` | Pagina de inicio con acceso a los dos prototipos. |
| `web.html` | Mockup navegable de la plataforma web. |
| `movil.html` | Mockup navegable de la aplicación móvil. |
| `assets/css/` | Hojas de estilo de cada prototipo. |
| `assets/js/` | Navegación entre pantallas de cada prototipo. |
| `backend/` | Plataforma web CRUD desarrollada con Django. |
| `docs/` | Capturas de pantalla de los prototipos. |

---

## Prototipos

Ambos son navegables y están hechos con HTML, CSS y JavaScript, sin librerías
externas. Todavía **no tienen lógica de negocio ni conexión a la base de datos**:
su propósito es validar los flujos y el diseño antes de programar.

### Plataforma web (`web.html`)

Panel principal con indicadores, administración de artículos, detalle con historial,
listado de movimientos, alertas de stock y gestión de usuarios.

### Aplicación móvil (`movil.html`)

Diez pantallas: inicio de sesión, inicio con indicadores, listado de artículos,
detalle del articulo, escáner de códigos, registro de movimiento, confirmación,
historial, alertas y perfil.

### Verlos en tu computador

Como es un sitio estático, basta con abrir `index.html` en el navegador.
También puedes levantar un servidor local:

```bash
python -m http.server 8000
```

Luego entra a http://localhost:8000

---

## Backend web (Django)

La carpeta `backend/` contiene la aplicación web con el CRUD de artículos y
categorías, desarrollada en la entrega anterior.

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

> **Importante:** antes de crear un articulo debes crear al menos una categoría,
> porque cada articulo pertenece a una categoría.

> GitHub Pages solo publica sitios estáticos, por lo que el backend Django no se
> ejecuta ahí. En Pages se publican los prototipos; el backend se ejecuta de forma
> local o en un servicio que soporte Python.

---

## Tecnologías

- HTML5, CSS3 y JavaScript (sin librerías externas) para los prototipos.
- Python y Django para la plataforma web.
- SQLite como base de datos de desarrollo.
- Git y GitHub para el control de versiones y la publicación.

## Equipo

- Fernando Flores Tobar
- Sergio Jara Astete
- Rodrigo Rivas Riffo

## Licencia

Proyecto académico desarrollado con fines educativos para la asignatura APTC106.
