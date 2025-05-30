from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('n/a', 'N/A'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, unique=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='n/a')
    avatar = models.CharField(max_length=200, default='https://i.imgur.com/1t8xewY.png')
    age = models.IntegerField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    daily_calories = models.FloatField(null=True, blank=True)
    activity_level = models.CharField(max_length=50, null=True, blank=True)
    goal = models.CharField(max_length=50, null=True, blank=True)

 
 



    def __str__(self):
        return f"{self.user.username} Profile"

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, username=instance.username)

class Diet(models.Model):
 name = models.CharField(max_length=100)
 nameTag = models.CharField(max_length=100, default='default_tag')
 image = models.ImageField(upload_to='', blank=True, null=True)
 description = models.TextField()

 def __str__(self):
    return self.name


class Exercise(models.Model):
    name = models.CharField(max_length=250)
    duration = models.IntegerField()
    burn_calories = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(upload_to='', blank=True, null=True)
    sportsman = models.ManyToManyField(User, through='UserExerciseRelation',
                                     related_name='exercise')

    def __str__(self):
        return f'{self.name}'


class UserExerciseRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE, null=True)
    like = models.BooleanField(default=False)
    in_exercisemarks = models.BooleanField(default=False)
    
    def __str__(self):
        return f' {self.user.username} exercise: {self.exercise},'

    # def save(self, *args, **kwargs):
    #     from store.logic import set_rating
    #     old_rate = self.rate
    #     creating = not self.pk
    #     super().save(*args, **kwargs)
    #     new_rate = self.rate
    #     if old_rate != new_rate or creating:
    #         set_rating(self.book)

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