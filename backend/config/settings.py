"""Configuracion general del proyecto Django para el entorno de desarrollo."""

from pathlib import Path

# Ruta base utilizada para construir las demas rutas del proyecto.
BASE_DIR = Path(__file__).resolve().parent.parent

# Estos valores son apropiados solo para ejecutar el proyecto localmente.
SECRET_KEY = "clave-solo-para-desarrollo-no-usar-en-produccion"
DEBUG = True
ALLOWED_HOSTS = []

# Aplicaciones propias y componentes incluidos por Django.
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "inventario",
]

# Capas que procesan cada solicitud y respuesta en el orden indicado.
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# SQLite mantiene la base de desarrollo en el archivo backend/db.sqlite3.
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Sin validadores para que sea facil crear un usuario de prueba (ej: 1234).
AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = "es"
TIME_ZONE = "America/Santiago"
USE_I18N = True
USE_TZ = True

# Configuracion de archivos estaticos y claves primarias automaticas.
STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Si un usuario no logueado entra a una pagina protegida, lo mandamos al login.
LOGIN_URL = "inventario:login"
