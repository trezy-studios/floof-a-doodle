// Module imports
import React, {
  useRef,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import UserOptions from './UserOptions'





// Local constants
const MENU_HOVER_INTENT_DELAY = 1000





const AllOptions = props => {
  const {
    close,
    hidden,
  } = props
  const timeoutID = useRef(null)

  const onMouseOut = () => {
    timeoutID.current = setTimeout(close, MENU_HOVER_INTENT_DELAY)
  }

  const onMouseOver = () => clearTimeout(timeoutID.current)

  return (
    <menu
      hidden={hidden}
      onBlur={onMouseOut}
      onFocus={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}>
      <UserOptions />
    </menu>
  )
}

AllOptions.defaultProps = {
  hidden: false,
}

AllOptions.propTypes = {
  close: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
}





export default AllOptions
