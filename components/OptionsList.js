// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import idify from '../helpers/idify'
import Option from './Option'





const OptionsList = props => {
  const {
    options,
    title,
  } = props

  return (
    <div className="options-list">
      <header>{title}</header>

      <ul>
        {options.map(option => (
          <Option
            key={idify(option.label)}
            {...option} />
        ))}
      </ul>
    </div>
  )
}

OptionsList.defaultProps = {
  options: [],
}

OptionsList.propTypes = {
  options: PropTypes.array,
  title: PropTypes.string.isRequired,
}





export default OptionsList
