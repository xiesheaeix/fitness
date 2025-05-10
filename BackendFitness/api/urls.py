# api/urls.py
from django.urls import path
from .views import hello_world,  diet_list, ask_api , profile

urlpatterns = [
    path('hello/', hello_world),
    path('diet/', diet_list),
    path('ask_api/', ask_api), 
    path('profile/', profile),
]
