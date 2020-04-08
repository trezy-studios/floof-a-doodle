// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import idify from '../helpers/idify'





const Option = props => {
  const {
    label,
    min,
    max,
    onChange,
    step,
    type,
    value,
  } = props

  const id = idify(label)

  return (
    <li className="option">
      <label htmlFor={id}>
        {label}
      </label>

      {['color', 'number'].includes(type) && (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange} />
      )}

      {(type === 'checkbox') && (
        <input
          checked={value}
          id={id}
          name={id}
          type="checkbox"
          onChange={onChange} />
      )}

      {(type === 'range') && (
        <input
          id={id}
          max={max}
          min={min}
          name={id}
          step={step}
          type="range"
          value={value}
          onChange={onChange} />
      )}
    </li>
  )
}

Option.defaultProps = {
  max: 100,
  min: 0,
  onChange: () => {},
  step: 1,
}

Option.propTypes = {
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}





export default Option
