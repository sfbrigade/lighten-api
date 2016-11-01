from django.db import models
from django.contrib.postgres.fields import JSONField
from django_smalluuid.models import SmallUUIDField, uuid_default


# Create your models here.
class Organization(models.Model):
    # We're using UUID v1 since its time ordering would keep the clustered
    # index efficient if we were to make uuid the primary key
    # http://rob.conery.io/2014/05/29/a-better-id-generator-for-postgresql/
    uuid = SmallUUIDField(default=uuid_default(version=1))
    json = JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
