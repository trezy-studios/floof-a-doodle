// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Local imports
import UserOptions from './UserOptions'





const AllOptions = props => {
  const { hidden } = props

  return (
    <menu hidden={hidden}>
      <UserOptions />
    </menu>
  )
}

AllOptions.defaultProps = {
  hidden: false,
}

AllOptions.propTypes = {
  hidden: PropTypes.bool,
}





export default AllOptions
