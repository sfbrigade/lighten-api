import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'
import Location from '../components/Location'
import Hours from '../components/Hours'
import http from 'superagent'
import { parseOrganization } from '../utils/common'
import './Organization.scss'

export default class Organization extends React.Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  componentDidMount () {
    http.get(`api/organizations/${this.params.organizationId}`)
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
        this.setState((state) => {
          return Object.assign({}, state, {
            organization: response.body
          })
        })
      })
  }

  render () {
    const { organization } = this.state
    if (!organization) return null

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
              return <DataBlock key={contactKey} label={contactKey} value={contact.value} />
            })
          }
          { hoursMarkup }
          <DataBlock label='Notes' value={organization.notes} />
        </section>

        <section>

          <h2>Things to know</h2>
          <DataBlock label='Eligible population' values={organization.usage_requirements.usage_requirement_atoms[0].keys} />
          <DataBlock label='Languages' value={organization.languages_spoken.join(', ')} />
          <DataBlock label='Accessibility' value={organization.accessibility.accessibility_atoms[0].keys.join('. ')} />
          <DataBlock label='Faith-based' value={organization.faith_based} />

        </section>

        <section>
          <h2>Locations</h2>
          {
            Object.keys(organization.locations).map((locationKey) => {
              const location = organization.locations[locationKey]
              return <Location key={locationKey} location={location} />
            })
          }
        </section>

        <section>
          <h2>Services</h2>
        </section>
      </div>
    )
  }
}
