import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'
import Hours from '../components/Hours'
import './Organization.scss'
import organizations from '../static/mock/orgs.json'

export default class Organization extends React.Component {

  constructor (props) {
    super(props)
    const { organizationId } = this.props.params
    this.state = {
      organization: organizations[organizationId]
    }
  }

  render () {
    const { organization } = this.state
    console.log(organization)

    let hoursMarkup
    if (organization.hours) {
      hoursMarkup = <Hours data={organization.hours} />
    }

    return (
      <div className='organization-view'>
        <h1 className='organization-name'>{organization.org_name}</h1>
        <p>{organization.description}</p>
        <section>
          <h2>To get connected</h2>
          {
            Object.keys(organization.contacts).map((contactKey) => {
              const contact = organization.contacts[contactKey]
              return <DataBlock label={contact.label} value={contact.value} />
            })
          }
          { hoursMarkup }
          <DataBlock label='Notes' value={organization.notes} />
        </section>

        <section>

          <h2>Things to know</h2>
          <DataBlock label='Eligible population' values={organization.usage_requirements.usage_requirement_atoms[0].keys} />
          <DataBlock label='Languages' value={organization.languages_spoken.join(', ')} />
          <DataBlock label='Accessibility' value={organization.accessibility.accessibility_atoms[0].keys} />
          <DataBlock label='Faith-based' value={organization.faith_based} />

        </section>

        <section>
          <h2>Locations</h2>
        </section>

        <section>
          <h2>Services</h2>
        </section>
      </div>
    )
  }
}
Organization.propTypes = {
  params: PropTypes.object.isRequired
}
