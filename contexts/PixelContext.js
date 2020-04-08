// Module imports
import React, {
  createContext,
  useState,
} from 'react'
import PropTypes from 'prop-types'





// Local constants
const context = createContext({
  localPixels: {},
  pixels: {},
  setLocalPixels: () => {},
  setPixels: () => {},
})





const Provider = props => {
  const [pixels, setPixels] = useState({})
  const [localPixels, setLocalPixels] = useState({})

  const { children } = props

  return (
    <context.Provider
      value={{
        localPixels,
        pixels,
        setLocalPixels,
        setPixels,
      }}>
      {children}
    </context.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}

export {
  context,
  Provider,
}
