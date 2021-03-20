from django.db.models import fields

from .sex_choices import SexChoices

class SexField(fields.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 1
        kwargs['choices'] = SexChoices.choices
        kwargs['default'] = SexChoices.OTHER
        super().__init__(*args, **kwargs)