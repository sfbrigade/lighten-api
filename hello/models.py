from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class Greeting(models.Model):
    when = models.DateTimeField('date created', auto_now_add=True)

class Example(models.Model):
    content = models.TextField()
    json = JSONField(null=True)

class Organization(models.Model):
    json = JSONField()
