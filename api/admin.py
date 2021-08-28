from django.contrib import admin
from .models import Room, SwipedRight, User, Restaurant

admin.site.register(Room)
admin.site.register(User)
admin.site.register(Restaurant)
admin.site.register(SwipedRight)
# Register your models here.
