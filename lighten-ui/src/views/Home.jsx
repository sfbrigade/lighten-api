import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import http from 'superagent'
import './Home.scss'

export class Home extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      organizations: []
    }
  }

  componentDidMount () {
    http.get('http://192.168.99.100:8080/api/organizations')
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
        this.setState((state) => {
          return Object.assign({}, state, {
            organizations: response
          })
        })
      })
  }

  render () {
    const { organizations } = this.state
    return (
      <div className='home-view'>
        <h1>Organizations</h1>
        <ul>
          {
            organizations.map((org, index) => {
              return <li key={index}><Link to={`${index}`}>{org.org_name}</Link></li>
            })
          }
        </ul>
      </div>
    )
  }
}
Home.propTypes = {}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, {})(Home)
