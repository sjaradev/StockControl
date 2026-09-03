from .settings import *

INSTALLED_APPS = [
    *INSTALLED_APPS,
    "django_distill",
]

ROOT_URLCONF = "config.urls_pages"

ALLOWED_HOSTS = ["*"]

# GitHub Pages publica el repositorio bajo este prefijo.
FORCE_SCRIPT_NAME = "/StockControl"

STATIC_ROOT = BASE_DIR / "staticfiles"
DISTILL_DIR = BASE_DIR / "public"