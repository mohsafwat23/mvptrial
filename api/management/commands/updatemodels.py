from django.core.management.base import BaseCommand
import pandas as pd
from api.models import Restaurant
class Command(BaseCommand):
    help = 'import booms'

    def add_arguments(self, parser):
        pass
    def handle(self, *args, **options):
        df=pd.read_csv('Madison_Restaurants_final.csv')
        for CUISINE, NAME, RATING, IMAGE, MAP_URL, PRICE, MENU in zip(df.Cuisine,df.Name,df.Rating, df.Image, df.map_url, df.Price, df.Menu):
            models = Restaurant(cuisine=CUISINE, name = NAME, rating=RATING, image=IMAGE, map_url=MAP_URL, price=PRICE, menu=MENU)
            models.save()
