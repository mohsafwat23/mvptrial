# Generated by Django 3.2.5 on 2021-08-05 17:44

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('cuisine', models.TextField(null=True)),
                ('name', models.TextField(null=True)),
                ('rating', models.TextField(null=True)),
            ],
        ),
    ]
