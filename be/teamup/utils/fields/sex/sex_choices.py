from django.db import models

class SexChoices(models.TextChoices):
    MAN = 'M'
    WOMAN = 'W'
    OTHER = 'O'

