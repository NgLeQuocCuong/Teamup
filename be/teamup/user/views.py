from . import serializers as user_serializers
from utils import viewset, http_code

from utils.services import user as user_services

from rest_framework import permissions, decorators, exceptions

from django.urls import reverse

class AuthViewSet(viewset.BaseView):
    permission_classes = [permissions.AllowAny, ]
    serializer_classes = {
        'register': user_serializers.RegisterSerializer,
        'login': user_serializers.LoginSerializer,
    }

    @decorators.action(methods=['POST', ], detail=False)
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = user_services.create_user_account(**serializer.validated_data)
            return self.get_response(
                data=None,
                error_code=http_code.HttpSuccess
            )
        except exceptions.ValidationError as e:
            return self.get_response(data=e.detail, error_code=e.status_code)

    @decorators.action(methods=['POST', ], detail=False)
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = user_services.get_and_authenticate_user(**serializer.validated_data)
            data = user_serializers.AuthSerializer(user).data
            return self.get_response(
                data = data,
                error_code=http_code.HttpSuccess
            )
        except exceptions.ValidationError as e:
            return self.get_response(
                data = e.detail,
                error_code=e.status_code
            )

    @decorators.action(methods=['GET', ],detail=False, permission_classes=[permissions.IsAuthenticated, ])
    def logout(self, request):
        data, is_complete = user_services.logout_user_account(request.data)
        if is_complete:
            return self.get_response(data=None, error_code=http_code.HttpSuccess)
        return self.get_response(data=data, error_code=http_code.HttpSomethingWentWrong)

class UserInformationViewSet(viewset.BaseView):
    permission_classes = [permissions.AllowAny]
    serializer_classes = {
        'get_information': user_serializers.UserInformationSerializer,
        'update_information': user_serializers.UserInformationSerializer
    }

    @decorators.action(methods=['GET', ], detail=False)
    def get_information(self, request):
        serializer = self.get_serializer(request.user)
        try: 
            return self.get_response(
                data=serializer.data,
                error_code=http_code.HttpSuccess
            )
        except exceptions.ValidationError as e:
            return self.get_response(
                data=e.detail,
                error_code=e.status_code
            )

    @decorators.action(methods=['POST', ], detail=False)
    def update_information(self, request):
        serializer = self.get_serializer(request.user, data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return self.get_response(
                data=None,
                error_code=http_code.HttpSuccess
            )

        except exceptions.ValidationError as e:
            return self.get_response(
                data=e.detail,
                error_code=e.status_code
            )



        






