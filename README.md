# Stock Control

Sistema de control de inventario para pequeñas y medianas empresas.
Proyecto de la asignatura **APTC106 - Taller de Desarrollo Web y Móvil**,
Universidad Andrés Bello.

**Sitio publicado:** https://sjaradev.github.io/StockControl/

| Prototipo | Enlace directo |
|---|---|
| Aplicación móvil (Ionic) | https://sjaradev.github.io/StockControl/app/ |
| Plataforma web | https://sjaradev.github.io/StockControl/web.html |

**Cuenta de prueba en ambos:** usuario `demo` / contraseña `demo`

---

## Qué es StockControl

Muchas empresas todavía controlan su bodega con planillas o anotaciones en papel.
Eso provoca diferencias de stock, compras duplicadas y poca claridad sobre dónde
está cada artículo. StockControl propone una solución con dos canales conectados a
la misma información:

- **Aplicación móvil:** registro de movimientos en la bodega mediante escaneo de
  códigos de barra o QR. Pensada para usarse de pie y con una sola mano.
- **Plataforma web:** administración de artículos, categorías, usuarios e indicadores.
  Pensada para pantallas grandes y sesiones largas de trabajo.

---

## Aplicación móvil híbrida

La aplicación está construida con **Ionic**, un framework híbrido que permite escribir
el código una sola vez y ejecutarlo tanto en iOS como en Android. Los componentes de
Ionic se adaptan solos al sistema operativo: la misma pantalla se dibuja con el estilo
de iOS o con el de Android según el dispositivo.

Para poder mostrar ese comportamiento desde un computador, la aplicación incluye un
conmutador que cambia entre ambos estilos. Está en la pantalla de inicio de sesión y
también en Perfil → Estilo de interfaz. También se puede forzar por dirección:

```
app/index.html?modo=ios
app/index.html?modo=android
```

### Instalación en el teléfono

La aplicación es una PWA, así que se instala desde el navegador sin pasar por App Store
ni Google Play:

1. Abre https://sjaradev.github.io/StockControl/app/ en el teléfono.
2. En Android, toca el menú del navegador y elige **Instalar aplicación**.
   En iPhone, toca **Compartir** y luego **Agregar a pantalla de inicio**.
3. Queda con su propio icono y se abre a pantalla completa.

Gracias al *service worker*, una vez instalada se abre aunque no haya señal, algo
habitual dentro de una bodega.

### Empaquetado nativo

El archivo `capacitor.config.json` deja preparada la configuración para generar los
proyectos nativos con Capacitor, que es la herramienta que Ionic usa para ese paso:

```bash
npm install @capacitor/cli @capacitor/core
npx cap add android
npx cap add ios
npx cap sync
```

### Pantallas

Inicio de sesión, inicio con indicadores, listado de artículos con buscador, detalle
del artículo, escáner de códigos, registro de movimiento, confirmación, historial de
movimientos, alertas de stock y perfil.

---

## Cómo se integran los dos canales

La web y el móvil no son dos sistemas separados: son dos formas de entrar al mismo
sistema.

```
App móvil  ──┐
             ├── API REST ── Base de datos ── Plataforma web
Plataforma  ─┘
```

El recorrido de una operación es:

1. El operario escanea el código del artículo con la cámara del teléfono.
2. La API valida su identidad, sus permisos y que exista stock suficiente.
3. El movimiento se guarda una sola vez, con usuario, fecha, ubicación y origen.
4. El dato aparece de inmediato en los indicadores de la plataforma web.

Como consecuencia de este diseño:

- **Una sola base de datos:** el stock nunca queda distinto entre lo que ve el
  operario y lo que revisa el supervisor.
- **Las mismas cuentas:** un usuario sirve para los dos canales; lo que cambia son
  los permisos según el rol.
- **Origen identificado:** cada movimiento indica si se registró desde el móvil o
  desde la web. En la plataforma web esto se ve en la columna *Origen*.

---

## Contenido del repositorio

| Archivo o carpeta | Descripción |
|---|---|
| `index.html` | Página de inicio con acceso a los prototipos. |
| `app/` | Aplicación móvil construida con Ionic (PWA instalable). |
| `web.html` | Prototipo navegable de la plataforma web. |
| `movil.html` | Primer prototipo móvil, hecho sin framework. Se conserva como referencia. |
| `assets/` | Hojas de estilo y navegación de los prototipos del sitio. |
| `backend/` | Plataforma web CRUD desarrollada con Django. |
| `docs/` | Capturas de pantalla del proyecto. |

---

## Ejecutar el sitio en tu computador

Es un sitio estático, así que basta con abrir `index.html` en el navegador.
Para que el service worker funcione conviene levantar un servidor local:

```bash
python -m http.server 8000
```

Luego entra a http://localhost:8000

---

## Backend web (Django)

La carpeta `backend/` contiene la aplicación web con el CRUD de artículos y
categorías, desarrollada en una entrega anterior.

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

> **Importante:** antes de crear un artículo debes crear al menos una categoría,
> porque cada artículo pertenece a una categoría.

> GitHub Pages solo publica sitios estáticos, por lo que el backend Django no se
> ejecuta ahí. En Pages se publican los prototipos; el backend se ejecuta de forma
> local o en un servicio que soporte Python.

---

## Tecnologías

- **Ionic 7** como framework híbrido para la aplicación móvil.
- **Capacitor** para el empaquetado hacia iOS y Android.
- PWA con manifiesto y service worker para instalar la aplicación sin tienda.
- HTML5, CSS3 y JavaScript para el sitio y el prototipo web.
- Python y Django para la plataforma web administrativa.
- SQLite como base de datos de desarrollo.
- Git y GitHub Pages para el control de versiones y la publicación.

## Equipo

- Fernando Flores Tobar
- Sergio Jara Astete
- Rodrigo Rivas Riffo

## Licencia

Proyecto académico desarrollado con fines educativos para la asignatura APTC106.
