from django.db import models
import uuid

class Restaurant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cuisine = models.TextField(null=True)
    name = models.TextField(null=True)
    rating = models.FloatField(null=True)
    image = models.TextField(null=True)
    map_url = models.TextField(null=True)
    price = models.TextField(null=True)
    menu = models.TextField(null=True)
    def __str__(self):
        return self.name


# Create your models here.
