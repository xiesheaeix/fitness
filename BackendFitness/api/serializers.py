from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Diet, Exercise, UserExerciseRelation
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields = '__all__'




class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password2', 'email']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Неверный старый пароль")
        return value

    def validate_new_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def save(self):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
    

# class BookReaderSerializer(ModelSerializer):

#     class Meta:
#         model = User
#         fields = ('first_name', 'last_name')


class ExerciseSerializer(ModelSerializer):
    # # likes_count = serializers.SerializerMethodField()
    # annotated_likes = serializers.IntegerField(read_only=True)
    # rating = serializers.DecimalField(
    #     max_digits=3, decimal_places=2, read_only=True)
    # owner_name = serializers.CharField(
    #     source='owner.username', default='', read_only=True)
    # readers = BookReaderSerializer(many=True, read_only=True)

    class Meta:
        model = Exercise
        fields = "__all__"

    # def get_likes_count(self, instance):
    #     return UserBookRelation.objects.filter(book=instance, like=True).count()


class UserExerciseRelationSerializer(ModelSerializer):
    class Meta:
        model = UserExerciseRelation
        fields = ('exercise', 'like', 'rate')




