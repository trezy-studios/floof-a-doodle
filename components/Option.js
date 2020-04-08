// Module imports
import { ChromePicker } from 'react-color'
import React from 'react'
import PropTypes from 'prop-types'





// Local imports
import idify from '../helpers/idify'
import Input from './Input'





const Option = props => {
  const {
    label,
    min,
    max,
    onChange,
    step,
    suffix,
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
          <Input
            id={id}
            name={id}
            suffix={suffix}
            type={type}
            value={value}
            onChange={onChange} />
        )}

        {(type === 'checkbox') && (
          <Input
            checked={value}
            id={id}
            name={id}
            suffix={suffix}
            type="checkbox"
            onChange={onChange} />
        )}

        {(type === 'range') && (
          <Input
            id={id}
            max={max}
            min={min}
            name={id}
            step={step}
            suffix={suffix}
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
  suffix: '',
}

Option.propTypes = {
  label: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func,
  step: PropTypes.number,
  suffix: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
}





export default Option
