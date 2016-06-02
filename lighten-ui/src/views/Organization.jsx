import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'
import Location from '../components/Location'
import Hours from '../components/Hours'
import http from 'superagent'
import {flattenOrganizationProperties} from '../utils/common'
import './Organization.scss'

export default class Organization extends React.Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    http.get(`api/organizations/${this.props.params.organizationId}`)
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
        this.setState((state) => {
          return Object.assign({}, state, {
            organization: flattenOrganizationProperties(response.body)
          })
        })
      })
  }

  render () {
    const { organization } = this.state
    if (!organization) return null

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
            Object.keys(organization.contacts)
              .filter((contactKey) => contactKey !== 'service_site')
              .map((contactKey) => {
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
          <DataBlock label='Accessibility' value={organization.accessiblity.accessibility_atoms[0].keys.join('. ')} />
          <DataBlock label='Faith-based' value={organization.faith_based} />

        </section>

        <section>
          <h2>Service site</h2>
          {<Location location={organization.contacts.service_site.value} />}
        </section>

        <section>
          <h2>Services</h2>
        </section>
      </div>
    )
  }
}
