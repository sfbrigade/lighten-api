// make some changes to the organization object to make it easier to consume
export const parseOrganization = (organization) => {
  // pull locations out of contacts
  organization.locations = {}
  Object.keys(organization.contacts).forEach((key) => {
    const contact = organization.contacts[key]
    if (typeof contact.value === 'object' && contact.value._type === 'address1') {
      organization.locations[key] = contact.value
      delete organization.contacts[key]
    }
  })
  return organization
}
