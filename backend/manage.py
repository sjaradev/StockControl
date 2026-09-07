#!/usr/bin/env python
"""Punto de entrada para ejecutar comandos administrativos de Django."""

import os, sys


def main():
    """Carga la configuracion del proyecto y ejecuta el comando solicitado."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
