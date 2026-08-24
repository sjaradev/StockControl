import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Categoria",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=150)),
                ("descripcion", models.CharField(blank=True, max_length=256)),
                ("creado", models.DateTimeField(auto_now_add=True)),
                ("actualizado", models.DateTimeField(auto_now=True)),
            ],
            options={"verbose_name": "Categoria", "verbose_name_plural": "Categorias"},
        ),
        migrations.CreateModel(
            name="Articulo",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nombre", models.CharField(max_length=150)),
                ("codigo", models.CharField(max_length=50, verbose_name="Codigo de barra / QR")),
                ("descripcion", models.CharField(blank=True, max_length=256)),
                ("stock", models.IntegerField(default=0)),
                ("ubicacion", models.CharField(max_length=100, verbose_name="Ubicacion / Bodega")),
                ("creado", models.DateTimeField(auto_now_add=True)),
                ("actualizado", models.DateTimeField(auto_now=True)),
                ("categoria", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="inventario.categoria")),
            ],
            options={"verbose_name": "Articulo", "verbose_name_plural": "Articulos"},
        ),
    ]
