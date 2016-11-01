from rest_framework import serializers

from .models import Organization


class OrganizationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Organization
        fields = ('url', 'uuid', 'json',)
        extra_kwargs = {
            'url': {'lookup_field': 'uuid'}
        }
