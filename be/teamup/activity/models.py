from django.db import models
from utils.model import BaseModel
from utils.fields.timestamp import TimeStamp

from user.models import User

class Sport(BaseModel):
    name = models.CharField(verbose_name="Type name", max_length=100)

    def __str__(self):
        return self.name
    

class Activity(BaseModel):
    name = models.CharField(verbose_name="Activity name", max_length=100)

    sport = models.ManyToManyField(to=Sport)

    location = models.CharField(verbose_name="Location", max_length=100)

    members = models.ManyToManyField(to=User, related_name="activity_members", related_query_name="activity_memebers")

    description = models.CharField(verbose_name="Activity description", max_length=200)

    time = TimeStamp(auto_now=False, auto_now_add=False)

    age = models.IntegerField(default=18)

    host = models.ManyToManyField(to=User)

    def __str__(self):
        return self.name


