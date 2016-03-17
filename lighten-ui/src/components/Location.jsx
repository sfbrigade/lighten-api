import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'

export default class Location extends React.Component {

  static propTypes = {
    location: PropTypes.object,
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {location} = this.props
    return (
      <div className='location'>
        <DataBlock label='Address' value={location.addrtxtlines.join(', ')} />
      </div>
    )
  }
}
