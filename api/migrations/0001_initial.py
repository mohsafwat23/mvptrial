# Generated by Django 3.2.5 on 2021-09-20 14:41

import api.models
from django.db import migrations, models
import django.db.models.deletion
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
                ('rating', models.FloatField(null=True)),
                ('image', models.TextField(null=True)),
                ('map_url', models.TextField(null=True)),
                ('price', models.TextField(null=True)),
                ('menu', models.TextField(null=True)),
                ('monday_opening', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=api.models.generate_unique_code, max_length=8, unique=True)),
                ('host', models.CharField(max_length=50, unique=True)),
                ('host_username', models.CharField(default='None', max_length=50)),
                ('guest_can_pause', models.BooleanField(default=False)),
                ('votes_to_skip', models.IntegerField(default=1)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('head_count', models.IntegerField(default=1)),
                ('restaurant', models.ManyToManyField(default='None', to='api.Restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50)),
                ('session_key', models.CharField(max_length=50, unique=True)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.room')),
            ],
        ),
        migrations.CreateModel(
            name='RoomRightSwipes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('restaurant', models.ManyToManyField(default='None', to='api.Restaurant')),
                ('room', models.ForeignKey(default='None', on_delete=django.db.models.deletion.CASCADE, to='api.room')),
            ],
        ),
    ]
