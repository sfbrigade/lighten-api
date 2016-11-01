from rest_assured.testcases import ReadWriteRESTAPITestCaseMixin, BaseRESTAPITestCase

from .factories import OrganizationFactory


class OrganizationApiTestCase(ReadWriteRESTAPITestCaseMixin, BaseRESTAPITestCase):
    base_name = 'organization'
    factory_class = OrganizationFactory
    attributes_to_check = ['uuid', 'json']
    lookup_field = 'uuid'
    relationship_lookup_field = 'uuid'
    response_lookup_field = 'uuid'
    create_data = {'json': {'name': 'Test Organization 1'}}
    update_data = {'json': {'name': 'Test Organization 2'}}
