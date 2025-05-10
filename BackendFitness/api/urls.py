# api/urls.py
from django.urls import path
from .views import hello_world,  diet_list,  ChangePasswordView, PasswordResetRequestView, PasswordResetConfirmView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views 
from django.urls import path

from .views import hello_world,  diet_list, ask_api , profile

urlpatterns = [
    path('hello/', hello_world),
    path('diet/', diet_list),
    path('register/', views.register, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
   


    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('ask_api/', ask_api), 
    path('profile/', profile),
]

