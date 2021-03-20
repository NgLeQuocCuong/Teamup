from . import serializers as activity_serializes

from utils import viewset, http_code

from rest_framework import permissions, decorators, exceptions

from .models import Sport, Activity

class SportView(viewset.BaseView):
    permission_classes = [permissions.AllowAny, ]
    serializer_classes = {
        'get_sport_list': activity_serializes.SportSerializer,
    }

    @decorators.action(methods=['GET', ], detail=False)
    def get_sport_list(self, request):
        serializer = self.get_serializer(Sport.objects.all(), many=True)
        return self.get_response(
            data=serializer.data,
            error_code=http_code.HttpSuccess
        )


class ActivityView(viewset.BaseView):
    permission_classes = [permissions.AllowAny, ]
    serializer_classes = {
        'add': activity_serializes.ActivitySerializer,
        'get_list': activity_serializes.ActivitySerializer,
    }

    @decorators.action(methods=['POST', ], detail=False)
    def add(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            activity = serializer.save()

            activity.host.set([request.user])
            activity.members.set([request.user])
            activity.save()

            return self.get_response(
                data=None,
                error_code=http_code.HttpSuccess
            )
        except exceptions.ValidationError as e:
            return self.get_response(
                data = e.detail,
                error_code=e.status_code
            )

        except Exception as e:
            print(e)
            raise e

    @decorators.action(methods=['GET', ], detail=False)
    def get_list(self, request):
        serializer = self.get_serializer(Activity.objects.all(), many=True)
        return self.get_response(
            data=serializer.data,
            error_code=http_code.HttpSuccess
        )