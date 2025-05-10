from django.contrib import admin
from .models import Diet,Exercise, UserExerciseRelation

@admin.register(Diet)
class DietAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('name', 'duration', 'burn_calories')
    
    
@admin.register(UserExerciseRelation)
class UserExerciseRelationAdmin(admin.ModelAdmin):
    pass