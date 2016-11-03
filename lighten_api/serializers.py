from rest_framework import serializers
from smalluuid import SmallUUID

from .models import Organization


class SmallUUIDField(serializers.Field):
    def to_representation(self, obj):
        return str(obj)

    def to_internal_value(self, data):
        return SmallUUID(data, version=1)


class OrganizationSerializer(serializers.HyperlinkedModelSerializer):
    uuid = SmallUUIDField()

    class Meta:
        model = Organization
        fields = ('url', 'uuid', 'json',)
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
