"""Punto de entrada ASGI para servidores compatibles con tareas asincronas."""

import os
from django.core.asgi import get_asgi_application

# Indica a Django donde se encuentra la configuracion del proyecto.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_asgi_application()
