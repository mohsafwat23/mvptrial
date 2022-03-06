from django.shortcuts import render

# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def privacy(request, *args, **kwargs):
    return render(request, 'frontend/privacy.html')

def terms(request, *args, **kwargs):
    return render(request, 'frontend/terms.html')