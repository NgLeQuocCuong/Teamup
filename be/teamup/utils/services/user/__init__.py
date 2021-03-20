from django.contrib import auth
import jwt
from django.conf import settings

def create_user_account(email, password, name='No Name'):
    """
        A services function to create a normal user

        @param: email - A string of user's email
        @param: password - A string of user's password
    """
    user = auth.get_user_model().objects.create_user(
        email=email,
        password=password,
        is_admin=False,
        name=name
    )

    from utils.fields.status import StatusChoices
    user.status = StatusChoices.ACTIVE

    user.save()

    return user

def get_and_authenticate_user(email, password):
    user = auth.authenticate(email=email, password=password)
    if user is None:
        from rest_framework import serializers
        raise serializers.ValidationError("Invalid username/password")
    return user

def logout_user_account(token):
    from rest_framework_simplejwt.tokens import RefreshToken
    try:
        token = RefreshToken(token['token'])
        token.blacklist()
        return None, True
    except Exception as e:
        print(e)
        return e.args, False

def get_list_friend(user):
    from user.models import Friend
    from django.db.models import Q
    friendship = Friend.objects.filter(Q(creator=user)|Q(friend=user))
    return [obj.friend if obj.creator == user else obj.creator for obj in friendship]
