// Module imports
import PropTypes from 'prop-types'
import React from 'react'





const Input = props => {
  const { suffix } = props
  const inputProps = { ...props }

  // Remove props that native inputs can't handle
  delete inputProps.suffix

  return (
    <span>
      <input {...inputProps} />

      {Boolean(suffix) && (
        <span>{suffix}</span>
      )}
    </span>
  )
}

Input.defaultProps = {
  suffix: '',
}

Input.propTypes = {
  suffix: PropTypes.string,
}





export default Input
