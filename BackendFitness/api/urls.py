from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import (
    hello_world, diet_list, ExerciseViewSet, UserExerciseRelationship,
    ChangePasswordView, PasswordResetRequestView,
    PasswordResetConfirmView, ask_api, profile, register
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = SimpleRouter()
router.register(r'exercises', ExerciseViewSet, basename='exercise')
router.register(r'exercise_relation', UserExerciseRelationship, basename='rel')


urlpatterns = [
    path('hello/', hello_world),
    path('diet/', diet_list),
    path('register/', register, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('ask_api/', ask_api),
    path('profile/', profile),
    path('', include(router.urls)),  # <-- подключение маршрутов из ViewSet
]
