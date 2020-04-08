/* globals Twitch */
// Module imports
import React, {
  useContext,
  useEffect,
  useState,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { context as LocalConfigContext } from '../contexts/LocalConfigContext'





const RequiresAuthentication = props => {
  const { children } = props

  const [isLoading, setIsLoading] = useState(true)

  const {
    authToken,
    channelID,
    userID,
    setAuthToken,
    setChannelID,
    setUserID,
  } = useContext(LocalConfigContext)

  // Handle auth stuff
  useEffect(() => {
    Twitch.ext.onAuthorized(auth => {
      setAuthToken(auth.token)
      setChannelID(auth.channelId)
      setUserID(auth.userId)
    })
  }, [])

  useEffect(() => {
    if (authToken && channelID && userID) {
      setIsLoading(false)
    }
  }, [
    authToken,
    channelID,
    userID,
  ])

  if (isLoading) {
    return (
      <div className="loading">
        {'Loading Floof-a-Doodle...'}
      </div>
    )
  }

  return children
}

RequiresAuthentication.propTypes = {
  children: PropTypes.node.isRequired,
}





export default RequiresAuthentication
