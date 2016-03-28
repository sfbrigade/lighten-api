import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'

export default class Location extends React.Component {

  static propTypes = {
    location: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {location} = this.props
    console.log(location)

    const address = location.addrtxtlines.join(', ')
    const uriEncodedAddress = encodeURIComponent(address)
    const googleMapsIframeUrl = [
      'https://www.google.com/maps/embed/v1/place',
      '?key=AIzaSyCLeuAb-KkMbNrB489TN77duPkdsqHCTco',
      '&zoom=14',
      `&q=${uriEncodedAddress}`
    ].join('')

    return (
      <div className='location'>
        <iframe
          width='600'
          height='450'
          frameBorder='0'
          style={{border: 0}}
          src={googleMapsIframeUrl}
          allowFullscreen></iframe>
        <DataBlock label='Address' value={address} />
      </div>
    )
  }
}
