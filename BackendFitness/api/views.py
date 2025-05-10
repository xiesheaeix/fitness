from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Diet
from .serializers import DietSerializer, ChangePasswordSerializer, RegisterSerializer
from rest_framework import status, permissions
from rest_framework.views import APIView
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.contrib.auth.models import User




@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from Django!"})

@api_view(['GET'])
def diet_list(request):
    diets = Diet.objects.all()
    serializer = DietSerializer(diets, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # только для аутентифицированных пользователей

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Пароль успешно изменен"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# fogot password


class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            reset_link = f"http://localhost:3000/reset-password/{uid}/{token}/"
            
            send_mail(
                'Password Reset',
                f'Click the link to reset your password: {reset_link}',
                'noreply@example.com',
                [email],
            )
            return Response({'detail': 'Password reset link sent to your email.'})
        except User.DoesNotExist:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)



class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        password = request.data.get('password')
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, token):
                user.set_password(password)
                user.save()
                return Response({'detail': 'Password has been reset.'})
            else:
                return Response({'detail': 'Invalid or expired token.'}, status=400)
        except Exception:
            return Response({'detail': 'Invalid link.'}, status=400)