import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'

const createHoursMarkup = (hoursAtoms) => {
  // create a key:value pair of day:hours
  const dayHoursMap = hoursAtoms.reduce((acc, atom) => {
    if (!Array.isArray(acc[atom.mday])) {
      acc[atom.mday] = []
    }
    acc[atom.mday].push(`${atom.open} - ${atom.close}`)
    return acc
  }, {})
  return Object.keys(dayHoursMap).map((day) => {
    return <div>{`${day}: ${dayHoursMap[day].join(', ')}`}</div>
  })
}

export default class Hours extends React.Component {

  static propTypes = {
    data: PropTypes.object,
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { data } = this.props

    return (
      <div className='data-block'>
        {
          Object.keys(data).map(key => {
            const hours = data[key]
            return <DataBlock
              key={key}
              label={key}
              values={createHoursMarkup(hours.hours_atoms)} />
          })
        }
      </div>
    )
  }
}
