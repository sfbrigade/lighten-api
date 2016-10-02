import factory

from . import models


class OrganizationFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.Organization

    json = {
        'name': str(factory.Faker('company')),
        'description': str(factory.Faker('paragraph')),
    }
