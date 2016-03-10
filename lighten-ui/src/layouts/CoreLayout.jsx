import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import '../styles/core.scss'

class CoreLayout extends Component {
  render () {
    return (
      <div>
        <Header />
        { this.props.children }
      </div>
    )
  }
}
CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
