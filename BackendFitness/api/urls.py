# api/urls.py
from django.urls import path
from .views import hello_world,  diet_list

urlpatterns = [
    path('hello/', hello_world),
    path('diet/', diet_list),
]
