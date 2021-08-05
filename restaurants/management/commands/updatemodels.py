from django.core.management.base import BaseCommand
import pandas as pd
from restaurants.models import Restaurant
class Command(BaseCommand):
    help = 'import booms'

    def add_arguments(self, parser):
        pass
    def handle(self, *args, **options):
        df=pd.read_csv('test_rest.csv')
        for CUISINE, NAME, RATING in zip(df.Cuisine,df.Name,df.Rating):
            models = Restaurant(cuisine=CUISINE, name = NAME, rating=RATING)
            models.save()
