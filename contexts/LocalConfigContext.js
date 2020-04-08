// Module imports
import React, {
  createContext,
  useState,
} from 'react'
import PropTypes from 'prop-types'





// Local constants
const LOCAL_CONFIG_DEFAULTS = {
  authToken: null,
  channelID: null,
  color: '#ff0000',
  opacity: 40,
  userID: null,
  setAuthToken: () => {},
  setChannelID: () => {},
  setColor: () => {},
  setOpacity: () => {},
  setShowCanvas: () => {},
  setUserID: () => {},
  showCanvas: true,
}
const context = createContext(LOCAL_CONFIG_DEFAULTS)





const Provider = props => {
  const [authToken, setAuthToken] = useState(LOCAL_CONFIG_DEFAULTS.authToken)
  const [channelID, setChannelID] = useState(LOCAL_CONFIG_DEFAULTS.channelID)
  const [color, setColor] = useState(LOCAL_CONFIG_DEFAULTS.color)
  const [opacity, setOpacity] = useState(LOCAL_CONFIG_DEFAULTS.opacity)
  const [showCanvas, setShowCanvas] = useState(LOCAL_CONFIG_DEFAULTS.showCanvas)
  const [userID, setUserID] = useState(LOCAL_CONFIG_DEFAULTS.userID)

  const { children } = props

  return (
    <context.Provider
      value={{
        authToken,
        channelID,
        color,
        opacity,
        userID,
        setAuthToken,
        setChannelID,
        setColor,
        setOpacity,
        setShowCanvas,
        setUserID,
        showCanvas,
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
