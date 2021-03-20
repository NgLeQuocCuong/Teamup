from rest_framework import serializers

from .models import Activity, Sport

from user.serializers import UserInformationSerializer

from datetime import datetime
from django.utils import timezone

class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = ('uid', 'name')


class ActivitySerializer(serializers.ModelSerializer):

    time = serializers.DateTimeField(format='%s')

    sport = serializers.UUIDField(read_only=False)

    class Meta:
        model = Activity
        fields = ('name', 'description', 'location', 'age', 'time', 'sport')

    def create(self, validated_data):
        sport_id = validated_data.pop('sport')
        sport = Sport.objects.get(uid=sport_id)

        print(validated_data)

        activity = Activity(
            **validated_data
        )

        activity.save()

        activity.sport.set([sport])

        activity.save()

        return activity
