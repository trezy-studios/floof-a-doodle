// Module imports
import React, {
  createRef,
  // forwardRef,
  useContext,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { context as LocalConfigContext } from '../contexts/LocalConfigContext'
import { context as PixelContext } from '../contexts/PixelContext'
import RequiresAuthentication from './RequiresAuthentication'
import firebase from '../helpers/firebase'
import generateImage from '../helpers/generateImage'





// Local constants
const database = firebase.database()





const MainCanvas = props => {
  const {
    height,
    width,
  } = props
  const {
    localPixels,
    pixels,
    setLocalPixels,
    setPixels,
  } = useContext(PixelContext)
  const {
    channelID,
  } = useContext(LocalConfigContext)
  const canvasElementRef = createRef(null)

  // const { color } = useContext(LocalConfigContext)

  // Setup database listeners
  useEffect(() => {
    if (channelID) {
      const query = database.ref(`${channelID}/pixels`)

      query.orderByChild('isVerified').equalTo(true)

      query.on('value', snapshot => {
        if (snapshot.exists()) {
          const localPixelsClone = {
            ...localPixels,
          }
          const pixelEntries = Object.values(snapshot.val()).reverse()
          const filteredPixels = pixelEntries.reduce((accumulator, pixel) => {
            const coordinateString = `${pixel.coordinates.x}-${pixel.coordinates.y}`

            if (accumulator[coordinateString]?.timestamp > pixel.timestamp) {
              return accumulator
            }

            accumulator[coordinateString] = {
              ...pixel,
              hasBeenSet: false,
            }

            delete localPixels[coordinateString]

            return accumulator
          }, {})

          setLocalPixels(localPixelsClone)
          setPixels(filteredPixels)
        }
      })

      return () => database.ref(`${channelID}/pixels`).off('value')
    }

    return () => {}
  }, [channelID])

  useEffect(() => {
    const canvasElement = canvasElementRef.current

    if (!canvasElement || ((canvasElement.width + canvasElement.height) === 0)) {
      return
    }

    const generatedImage = generateImage({
      canvasSize: {
        height,
        width,
      },
      pixels: {
        ...localPixels,
        ...pixels,
      },
    })

    const context = canvasElement.getContext('2d', { alpha: true })

    const imageData = new ImageData(generatedImage, canvasElement.width, canvasElement.height)

    context.putImageData(imageData, 0, 0)
  }, [
    height,
    localPixels,
    pixels,
    width,
  ])

  return (
    <RequiresAuthentication>
      <canvas
        ref={canvasElementRef}
        className="main-canvas"
        height={height}
        width={width} />
    </RequiresAuthentication>
  )
}

MainCanvas.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}





export default MainCanvas
