from rest_framework import serializers

from django.contrib import auth

from django.conf import settings

import jwt

User = auth.get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    """
        A user serializer for registering the user
    """

    class Meta:
        model = User
        fields = ('email', 'password', 'name')

    def validate_email(self, value):
        """
            Check for valid email (not exists in the system), and return an normalizer email
            If not, raise Error (type: serialzer.ValidationError)

            @param: value - A string of user's email
        """
        user = User.objects.filter(email=value)
        if user:
            raise serializers.ValidationError('Email is already taken')
        return auth.models.BaseUserManager.normalize_email(value)

    def validate_password(self, value):
        """
            Check for valid password (descriptions in settings module). 
            If not, raise Error.

            @param: value - A string of password
        """
        auth.password_validation.validate_password(value)
        return value

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


    def validate_email(self, value):
        user = User.objects.filter(email=value)
        if not user:
            raise serializers.ValidationError('Email is not exists')
        return auth.models.BaseUserManager.normalize_email(email=value)

    def validate_password(self, value):
        auth.password_validation.validate_password(password=value)
        return value


class AuthSerializer(serializers.Serializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'is_active', 'is_staff')
        read_only_fields = ('id', 'is_active', 'is_staff')
    
    def get_token(self, obj):
        from rest_framework_simplejwt.tokens import RefreshToken

        refresh = RefreshToken.for_user(user=obj)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return token

class UserInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('uid', 'email', 'password', 'name', 'age', 'sex')
        read_only_fields = ('uid', 'email',)
        extra_kwargs = {
            "password": {"required": False, "allow_null": True},
        }

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.age = validated_data.get('age', instance.age)
        instance.sex = validated_data.get('sex', instance.sex)
        instance.save()
        return instance





