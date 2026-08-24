# StockControl

Sistema de control de inventario para pequenas y medianas empresas.
Proyecto de la asignatura **APTC106 - Taller de Desarrollo Web y Movil**,
Universidad Andres Bello.

**Prototipos publicados:** https://sjaradev.github.io/stockcontrol/

| Prototipo | Enlace directo |
|---|---|
| Plataforma web | https://sjaradev.github.io/stockcontrol/web.html |
| Aplicacion movil | https://sjaradev.github.io/stockcontrol/movil.html |

**Cuenta de prueba en ambos:** usuario `demo` / contrasena `demo`

---

## Que es StockControl

Muchas empresas todavia controlan su bodega con planillas o anotaciones en papel.
Eso provoca diferencias de stock, compras duplicadas y poca claridad sobre donde
esta cada articulo. StockControl propone una solucion con dos canales conectados a
la misma informacion:

- **Plataforma web:** administracion de articulos, categorias, usuarios e indicadores.
  Pensada para pantallas grandes y sesiones largas de trabajo.
- **Aplicacion movil:** registro de movimientos en la bodega mediante escaneo de
  codigos de barra o QR. Pensada para usarse de pie y con una sola mano.

## Como se integran los dos canales

La web y el movil no son dos sistemas separados: son dos formas de entrar al mismo
sistema.

```
App movil  ──┐
             ├── API REST ── Base de datos ── Plataforma web
Plataforma  ─┘
```

El recorrido de una operacion es:

1. El operario escanea el codigo del articulo con la camara del telefono.
2. La API valida su identidad, sus permisos y que exista stock suficiente.
3. El movimiento se guarda una sola vez, con usuario, fecha, ubicacion y origen.
4. El dato aparece de inmediato en los indicadores de la plataforma web.

Como consecuencia de este diseno:

- **Una sola base de datos:** el stock nunca queda distinto entre lo que ve el
  operario y lo que revisa el supervisor.
- **Las mismas cuentas:** un usuario sirve para los dos canales; lo que cambia son
  los permisos segun el rol.
- **Origen identificado:** cada movimiento indica si se registro desde el movil o
  desde la web. En el prototipo web esto se ve en la columna *Origen*.

---

## Contenido del repositorio

| Archivo o carpeta | Descripcion |
|---|---|
| `index.html` | Pagina de inicio con acceso a los dos prototipos. |
| `web.html` | Mockup navegable de la plataforma web. |
| `movil.html` | Mockup navegable de la aplicacion movil. |
| `assets/css/` | Hojas de estilo de cada prototipo. |
| `assets/js/` | Navegacion entre pantallas de cada prototipo. |
| `backend/` | Plataforma web CRUD desarrollada con Django. |
| `docs/` | Capturas de pantalla de los prototipos. |

---

## Prototipos

Ambos son navegables y estan hechos con HTML, CSS y JavaScript, sin librerias
externas. Todavia **no tienen logica de negocio ni conexion a la base de datos**:
su proposito es validar los flujos y el diseno antes de programar.

### Plataforma web (`web.html`)

Panel principal con indicadores, administracion de articulos, detalle con historial,
listado de movimientos, alertas de stock y gestion de usuarios.

### Aplicacion movil (`movil.html`)

Diez pantallas: inicio de sesion, inicio con indicadores, listado de articulos,
detalle del articulo, escaner de codigos, registro de movimiento, confirmacion,
historial, alertas y perfil.

### Verlos en tu computador

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
> ejecuta ahi. En Pages se publican los prototipos; el backend se ejecuta de forma
> local o en un servicio que soporte Python.

---

## Tecnologias

- HTML5, CSS3 y JavaScript (sin librerias externas) para los prototipos.
- Python y Django para la plataforma web.
- SQLite como base de datos de desarrollo.
- Git y GitHub para el control de versiones y la publicacion.

## Equipo

- Fernando Flores Tobar
- Sergio Jara Astete
- Rodrigo Rivas Riffo

## Licencia

Proyecto academico desarrollado con fines educativos para la asignatura APTC106.
