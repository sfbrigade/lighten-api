from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class Organization(models.Model):
    json = JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
