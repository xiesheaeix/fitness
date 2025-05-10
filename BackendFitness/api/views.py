from django.shortcuts import render

from .models import Diet, Exercise, UserExerciseRelation
from .serializers import DietSerializer, ExerciseSerializer, UserExerciseRelationSerializer, ChangePasswordSerializer, RegisterSerializer
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.mixins import UpdateModelMixin   
from rest_framework.permissions  import IsAuthenticated   


from django.contrib.auth.tokens import default_token_generator

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.contrib.auth.models import User


from .serializers import DietSerializer
import traceback, json, re
from django.http import JsonResponse

#gemini 
import google.generativeai as genai
genai.configure(api_key="AIzaSyB1C2lqJfUEpIMoDHUNMV3Cz2F5sLwTm7I")


@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello from Django!"})

@api_view(['GET'])
def diet_list(request):
    diets = Diet.objects.all()
    serializer = DietSerializer(diets, many=True)
    return Response(serializer.data)



class ExerciseViewSet(ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    
    
class UserExerciseRelationship(UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserExerciseRelation.objects.all()
    serializer_class = UserExerciseRelationSerializer
    lookup_field = 'exercise'
    
    def get_object(self):
        obj,_ = UserExerciseRelationship.objects.get_or_create(user=self.request.user, exercise_id=self.kwargs['exercise'])
        return obj
        



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
          
@api_view(['POST'])  # Changed to POST since you're using request.data
def ask_api(request):
    try:
        # Parse the diet data from the request
        diet_data = request.data.get('diet')
        if not diet_data:
            return Response({"error": "Diet data is required."}, status=400)

        # Extract diet details
        name = diet_data.get("name", "")
        description = diet_data.get("description", "")
        image_url = request.build_absolute_uri(diet_data.get("image", ""))

        # Construct the prompt for the generative model
        prompt = (
            f"Using the following diet information, generate a structured JSON object. "
            f"The object should include:\n"
            f"- 'name': the name of the diet\n"
            f"- 'summary': a short description of the diet\n"
            f"- 'recipes': a list of recipe objects for that diet. Each recipe object must include:\n"
            f"    - 'title': name of the recipe\n"
            f"    - 'instructions': preparation steps\n"
            f"    - 'nutrition': an object with keys: 'calories' (int), 'protein' (g), 'carbs' (g), 'fat' (g)\n\n"
            f"Diet:\n"
            f"- Name: {name}\n"
            f"- Description: {description}\n"
            f"- Image: {image_url}\n"
            f"Respond ONLY with a raw JSON object. Do not include any headings, explanations, or markdown."
        )

        # Generate content using the generative model
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)

        # Strip markdown formatting like ```json ... ```
        cleaned = re.sub(r"^```json|```$", "", response.text.strip(), flags=re.MULTILINE).strip()

        # Parse the cleaned JSON string
        parsed_json = json.loads(cleaned)

        return Response(parsed_json)

    except Exception as e:
        traceback.print_exc()  # Print the full stack trace for debugging
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
def profile(request):
    try:
        # Assuming you have a user profile model
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "User not authenticated"}, status=401)

        # Fetch the user's profile data
        profile_data = {
            "username": user.username,
            "avatar": user.profile.avatar if hasattr(user, 'profile') else None,
            "age": user.profile.age if hasattr(user, 'profile') else None,
            "height": user.profile.height if hasattr(user, 'profile') else None,
            "weight": user.profile.weight if hasattr(user, 'profile') else None,
            "daily_calories": user.profile.daily_calories if hasattr(user, 'profile') else None,
        }

        return Response(profile_data)
    except Exception as e:
        traceback.print_exc()
        return Response({"error": str(e)}, status=500)

