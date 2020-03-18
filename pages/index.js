/* global Twitch */

// Style imports
import '../scss/app.scss'





// Module imports
import React, {
  useEffect,
  useRef,
  useState,
} from 'react'
import Color from 'color-me-maybe'
import firebase from 'firebase/app'
/* eslint-disable-next-line import/no-unassigned-import */
import 'firebase/database'





// Local imports
import firebaseConfig from '../helpers/firebaseConfig'





// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const database = firebase.database()





const Page = () => {
  const [canvasSize, setCanvasSize] = useState({
    height: 0,
    width: 0,
  })
  const effectsCanvasRef = useRef(null)
  const pixelMultiplier = 4
  const mainCanvasRef = useRef(null)
  const [pixels, setPixels] = useState({})
  const [authToken, setAuthToken] = useState(null)
  const [channelID, setChannelID] = useState(null)
  const [userID, setUserID] = useState(null)

  const setPixelData = options => {
    const {
      color,
      coordinates: [
        pixelX,
        pixelY,
      ],
      imageDataArray,
    } = options
    const colorData = Color.fromHex(color)
    const index = pixelMultiplier * (pixelY * canvasSize.width + pixelX)
    /* eslint-disable no-magic-numbers */
    // Red
    imageDataArray[index + 0] = colorData.red()

    // Green
    imageDataArray[index + 1] = colorData.green()

    // Blue
    imageDataArray[index + 2] = colorData.blue()

    // Alpha
    imageDataArray[index + 3] = 255
    /* eslint-enable no-magic-numbers */
  }

  const generateImage = () => {
    const canvasElement = mainCanvasRef.current
    const imageDataArray = new Uint8ClampedArray(pixelMultiplier * (canvasElement.width * canvasElement.height))
    const processedPixels = Object.entries(pixels).reduce((accumulator, [coordinates, pixel]) => {
      const [
        pixelX,
        pixelY,
      ] = coordinates.split('-').map(coordinate => parseInt(coordinate, 10))

      setPixelData({
        color: pixel.color,
        coordinates: [pixelX, pixelY],
        imageDataArray: accumulator,
      })

      return accumulator
    }, imageDataArray)

    return processedPixels
  }

  // Setup database listeners
  useEffect(() => {
    if (channelID) {
      const query = database.ref(`${channelID}/pixels`)

      query.orderByChild('isVerified').equalTo(true)

      query.on('value', snapshot => {
        const pixelEntries = Object.entries(snapshot.val())
        const filteredPixels = pixelEntries.reduce((accumulator, pixelData) => {
          const [
            coordinates,
            pixel,
          ] = pixelData

          if (accumulator[coordinates]?.timestamp > pixel.timestamp) {
            return accumulator
          }

          accumulator[coordinates] = {
            ...pixel,
            hasBeenSet: false,
          }

          return accumulator
        }, {})

        setPixels(filteredPixels)
      })

      return () => database.ref(`${channelID}/pixels`).off('value')
    }

    return () => {}
  }, [channelID])

  // Setup canvas dimensions
  useEffect(() => {
    setTimeout(() => {
      const [{
        height,
        width,
      }] = document.body.getClientRects()
      setCanvasSize({
        height: height / pixelMultiplier,
        width: width / pixelMultiplier,
      })
    }, 0)
  }, [])

  // Render pixels from the database
  useEffect(() => {
    if ((canvasSize.width + canvasSize.height) > 0) {
      const generatedImage = generateImage()
      const canvasElement = mainCanvasRef.current
      const context = canvasElement.getContext('2d', { alpha: true })

      const imageData = new ImageData(generatedImage, canvasElement.width, canvasElement.height)

      context.putImageData(imageData, 0, 0)
    }
  }, [
    canvasSize,
    pixels,
  ])

  // Initialize the render loop
  useEffect(() => {
    let stopLoop = false

    if ((canvasSize.width + canvasSize.height) > 0) {
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
        if (effectsCanvasRef.current) {
          const context = effectsCanvasRef.current.getContext('2d', { alpha: true })

          context.clearRect(0, 0, canvasSize.width, canvasSize.height)
          context.shadowBlur = 1
          context.shadowColor = 'black'
          context.fillStyle = '#ff0000'
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
  }, [canvasSize])

  // Handle auth stuff
  useEffect(() => {
    Twitch.ext.onAuthorized(auth => {
      setAuthToken(auth.token)
      setChannelID(auth.channelId)
      setUserID(auth.userId)
    })
  }, [])

  const handleCanvasClick = event => {
    if (!authToken || !channelID || !userID) {
      return
    }

    const {
      clientX,
      clientY,
    } = event
    const pixelX = Math.floor(clientX / pixelMultiplier)
    const pixelY = Math.floor(clientY / pixelMultiplier)

    database.ref(`${channelID}/unverifiedPixels/${pixelX}-${pixelY}`).set({
      authToken,
      color: '#ff0000',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      userID,
    })
  }

  return (
    <>
      <canvas
        ref={mainCanvasRef}
        className="main-canvas"
        height={canvasSize.height}
        width={canvasSize.width} />

      <canvas
        ref={effectsCanvasRef}
        className="effects-canvas"
        height={canvasSize.height}
        width={canvasSize.width}
        /* eslint-disable-next-line react/jsx-no-bind */
        onClick={handleCanvasClick} />
    </>
  )
}





export default Page
