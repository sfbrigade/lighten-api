import React, { Component } from 'react'
import { Link } from 'react-router'

export class NotFound extends Component {
  render () {
    return (
      <div>
        <h1>404 :(</h1>
        <hr />
        <Link to='/'>Back To Home</Link>
      </div>
    )
  }
}

export default NotFound
