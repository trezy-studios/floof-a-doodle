// Module imports
import { ChromePicker } from 'react-color'
import React from 'react'
import PropTypes from 'prop-types'





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
    <>
      <dt className="option">
        <label htmlFor={id}>
          {label}
        </label>
      </dt>

      <dd>
        {(type === 'color') && (
          <ChromePicker
            disableAlpha
            color={value}
            onChange={onChange} />
        )}

        {(type === 'number') && (
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
      </dd>
    </>
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
