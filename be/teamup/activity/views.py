from . import serializers as activity_serializes

from utils import viewset, http_code

from rest_framework import permissions, decorators, exceptions

from .models import Sport, Activity

class SportView(viewset.BaseView):
    permission_classes = [permissions.AllowAny, ]
    serializer_classes = {
        'get_list': activity_serializes.SportSerializer,
    }

    @decorators.action(methods=['GET', ], detail=False)
    def get_list(self, request):
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
        'infor': activity_serializes.ActivityInforSerializer,
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

    @decorators.action(methods=['GET', ], detail=False)
    def get_list(self, request):
        from django.db.models import Q
        personal_activity = Activity.objects.filter(Q(members__exact = request.user)).order_by('time')

        from utils.services import user as user_services
        friends = user_services.get_list_friend(request.user)

        friend_activity = Activity.objects.filter(Q(members__in=friends)).exclude(Q(members__exact=request.user)).order_by('time')

        other_activity = Activity.objects.exclude(Q(members__in=friends)|Q(members__exact=request.user)).order_by('time')

        data = {
            'personal': self.get_serializer(personal_activity,many=True).data,
            'friends': self.get_serializer(friend_activity, many=True).data,
            'other': self.get_serializer(other_activity, many=True).data
        }

        # serializer = self.get_serializer(Activity.objects.all(), many=True)
        return self.get_response(
            data=data,
            error_code=http_code.HttpSuccess
        )

    @decorators.action(methods=['GET', ], detail=False)
    def accept(self, request):
        try:
            activity = Activity.objects.get(uid=request.GET.get('uid', None))
            activity.members.add(request.user)
            activity.save()

            return self.get_response(
                data=None,
                error_code=http_code.HttpSuccess
            )
        except Exception as e:
            print(type(e))
            raise e

    @decorators.action(methods=['GET', ], detail=False)
    def infor(self, request):
        try:
            activity = Activity.objects.get(uid=request.GET.get('uid', None))
            serializer = self.get_serializer(activity)


            return self.get_response(
                data=serializer.data,
                error_code = http_code.HttpSuccess
            )

        except Exception as e:
            print(type(e))
            raise e

