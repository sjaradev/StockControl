"""Punto de entrada WSGI utilizado al desplegar Django en un servidor web."""

import os
from django.core.wsgi import get_wsgi_application

# Indica a Django donde se encuentra la configuracion del proyecto.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
application = get_wsgi_application()
