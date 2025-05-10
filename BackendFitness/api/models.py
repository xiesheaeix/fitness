from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
 user = models.OneToOneField(User, on_delete=models.CASCADE)
 username = models.CharField(max_length=100, unique=True)
 avatar = models.CharField(max_length=200, default='https://i.imgur.com/1t8xewY.png')
 age = models.IntegerField(null=True, blank=True)
 height = models.FloatField(null=True, blank=True)
 weight = models.FloatField(null=True, blank=True)

 def __str__(self):
    return f"{self.user.username} Profile"

class Diet(models.Model):
 name = models.CharField(max_length=100)
 image = models.ImageField(upload_to='media/', blank=True, null=True)
 description = models.TextField()

 def __str__(self):
    return self.name


# class Exercise(models.Model):
#  user = models.ForeignKey(User, on_delete=models.CASCADE)
#  name = models.CharField(max_length=100)
 
#  calories_burned_per_hour = models.FloatField()

#  def __str__(self):
#     return self.name

# class UserExerciseEntry(models.Model):
#  user = models.ForeignKey(User, on_delete=models.CASCADE)
#  exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
#  duration_minutes = models.IntegerField()
#  date = models.DateField(auto_now_add=True)

#  def get_burned_calories(self):
#     return (self.exercise.calories_burned_per_hour / 60) * self.duration_minutes

#  def __str__(self):
#     return f"{self.user.username} did {self.exercise.name} for {self.duration_minutes} min"class Food(models.Model):
      

#  name = models.CharField(max_length=100)
#  calories = models.FloatField(help_text="Калории на 100 г")
#  protein = models.FloatField()
#  fat = models.FloatField()
#  carbs = models.FloatField()

#  def __str__(self):
#     return self.name

# class UserFoodEntry(models.Model):
#  user = models.ForeignKey(User, on_delete=models.CASCADE)
#  food = models.ForeignKey(Food, on_delete=models.CASCADE)
#  amount = models.FloatField(help_text="Количество в граммах")
#  date = models.DateField(auto_now_add=True)

#  def get_total_calories(self):
#     return (self.food.calories * self.amount) / 100

#  def __str__(self):
#     return f"{self.user.username} ate {self.amount}g of {self.food.name}"