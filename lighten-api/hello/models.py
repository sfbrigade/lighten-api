from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class Greeting(models.Model):
    when = models.DateTimeField('date created', auto_now_add=True)

class Organization(models.Model):
    json = JSONField()
