// Module imports
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import firebase from '../helpers/firebase'
import PropTypes from 'prop-types'





// Local imports
import { context as LocalConfigContext } from '../contexts/LocalConfigContext'
import { context as PixelContext } from '../contexts/PixelContext'
import RequiresAuthentication from './RequiresAuthentication'





// Local constants
const database = firebase.database()
const LOCAL_PIXEL_TIMEOUT = 1000





const EffectsCanvas = props => {
  const {
    height,
    width,
  } = props
  const pixelMultiplier = 4

  const canvasElementRef = useRef(null)
  const [unverifiedPixelsRef, setUnverifiedPixelsRef] = useState(null)

  const {
    authToken,
    channelID,
    color,
    showCanvas,
    userID,
  } = useContext(LocalConfigContext)
  const { setLocalPixels } = useContext(PixelContext)

  // Initialize the render loop
  useEffect(() => {
    let stopLoop = false

    if ((width + height) > 0) {
      let cursorX = 0
      let cursorY = 0

      document.addEventListener('mousemove', event => {
        const {
          clientX,
          clientY,
        } = event

        cursorX = Math.floor(clientX / pixelMultiplier) - 1
        cursorY = Math.floor(clientY / pixelMultiplier) - 1
      })

      const _loop = () => {
        const canvasElement = canvasElementRef.current

        if (canvasElement) {
          const context = canvasElement.getContext('2d', { alpha: true })

          context.clearRect(0, 0, width, height)
          context.shadowBlur = 1
          context.shadowColor = 'black'
          context.fillStyle = color
          context.fillRect(cursorX, cursorY, 1, 1)
        }

        if (stopLoop) {
          return
        }

        requestAnimationFrame(_loop)
      }

      _loop()
    }

    return () => {
      stopLoop = true
    }
  }, [
    color,
    height,
    width,
  ])

  useEffect(() => {
    if (channelID) {
      setUnverifiedPixelsRef(database.ref(`${channelID}/unverifiedPixels`))
    }
  }, [channelID])

  const handleCanvasClick = event => {
    const {
      clientX,
      clientY,
    } = event
    const pixelX = Math.floor(clientX / pixelMultiplier)
    const pixelY = Math.floor(clientY / pixelMultiplier)

    setLocalPixels(previousLocalPixels => ({
      ...previousLocalPixels,
      [`${pixelX}-${pixelY}`]: { color },
    }))

    setTimeout(() => {
      setLocalPixels(previousLocalPixels => {
        const previousLocalPixelsClone = {
          ...previousLocalPixels,
        }
        delete previousLocalPixelsClone[`${pixelX}-${pixelY}`]
        return previousLocalPixelsClone
      })
    }, LOCAL_PIXEL_TIMEOUT)

    unverifiedPixelsRef.push({
      authToken,
      color,
      coordinates: {
        x: pixelX,
        y: pixelY,
      },
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      userID,
    })
  }

  return (
    <RequiresAuthentication>
      <canvas
        ref={canvasElementRef}
        className="effects-canvas"
        height={height}
        hidden={!showCanvas}
        width={width}
        onClick={handleCanvasClick} />
    </RequiresAuthentication>
  )
}

EffectsCanvas.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}





export default EffectsCanvas
