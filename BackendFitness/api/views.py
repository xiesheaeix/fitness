from django.shortcuts import render

# Create your views here.
# api/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Diet
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

@api_view(['POST', 'GET'])  # Changed to POST since you're using request.data
def ask_api(request):
    try:
        diets = Diet.objects.all()

        # Accumulate all diet descriptions
        diet_descriptions = ""
        for diet in diets:
            image_url = request.build_absolute_uri(diet.image.url) if diet.image else "No image"
            diet_descriptions += (
                f"\n- Name: {diet.name}\n"
                f"  Description: {diet.description}\n"
                f"  Image: {image_url}\n"
            )

        # Construct the prompt
        prompt = (
            "Using the following list of diets, generate a structured JSON array. "
            "Each object in the array should include:\n"
            "- 'name': the name of the diet\n"
            "- 'summary': a short description of the diet\n"
            "- 'recipes': a list of recipe objects for that diet. Each recipe object must include:\n"
            "    - 'title': name of the recipe\n"
            "    - 'instructions': preparation steps\n"
            "    - 'nutrition': an object with keys: 'calories' (int), 'protein' (g), 'carbs' (g), 'fat' (g)\n\n"
            f"Diets:\n{diet_descriptions}\n"
            "Respond ONLY with a raw JSON array. Do not include any headings, explanations, or markdown."
        )

              # Ensure the prompt is not empty
        if not diet_descriptions.strip():
            return Response({"error": "No diets available to generate the prompt."}, status=400)

        # Generate content using the model
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)


         # Strip markdown formatting like ```json ... ```
        cleaned = re.sub(r"^```json|```$", "", response.text.strip(), flags=re.MULTILINE).strip()

        # Parse the cleaned JSON string
        parsed_json = json.loads(cleaned)

        return Response(parsed_json)


        # return Response({"result": response.text})
    except Exception as e:
        traceback.print_exc()  # 🔥 Prints full stack trace in the console
        return Response({"error": str(e)}, status=500)