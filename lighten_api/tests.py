from rest_assured.testcases import ReadWriteRESTAPITestCaseMixin, BaseRESTAPITestCase

from .factories import OrganizationFactory


class OrganizationApiTestCase(ReadWriteRESTAPITestCaseMixin, BaseRESTAPITestCase):
    base_name = 'organization'
    factory_class = OrganizationFactory
    create_data = {'json': {'name': 'Test Organization 1'}}
    update_data = {'json': {'name': 'Test Organization 2'}}
