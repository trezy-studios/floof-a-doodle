// Module imports
import React, {
  createContext,
  useState,
} from 'react'
import PropTypes from 'prop-types'





// Local constants
const context = createContext({
  authToken: null,
  channelID: null,
  color: '#ff0000',
  userID: null,
  setAuthToken: () => {},
  setChannelID: () => {},
  setColor: () => {},
  setUserID: () => {},
})





const Provider = props => {
  const [authToken, setAuthToken] = useState(null)
  const [channelID, setChannelID] = useState(null)
  const [color, setColor] = useState('#ff0000')
  const [userID, setUserID] = useState(null)

  const { children } = props

  return (
    <context.Provider
      value={{
        authToken,
        channelID,
        color,
        userID,
        setAuthToken,
        setChannelID,
        setColor,
        setUserID,
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
