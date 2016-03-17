import React, { PropTypes } from 'react'
import './DataBlock.scss'

export default class DataBlock extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    values: PropTypes.array,
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { label, value, values } = this.props
    if (Array.isArray(value)) console.log('value', label, value)

    let labelMarkup
    if (label) {
      labelMarkup = <label>{label}</label>
    }

    let valuesMarkup
    if (values) {
      valuesMarkup = values.map((value, index) => {
        return <div key={index} className='value'>{value}</div>
      })
    } else if (value) {
      valuesMarkup = <div className='value'>{value}</div>
    }

    return (
      <div className='data-block'>
        { labelMarkup }
        { valuesMarkup }
      </div>
    )
  }
}
