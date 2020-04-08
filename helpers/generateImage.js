// Local imports
import setPixelData from './setPixelData'





// Local constants
const PIXEL_MULTIPLIER = 4





const generateImage = options => {
  const {
    canvasSize,
    pixels,
  } = options
  const {
    height: canvasHeight,
    width: canvasWidth,
  } = canvasSize
  const imageDataArray = new Uint8ClampedArray(PIXEL_MULTIPLIER * (canvasWidth * canvasHeight))
  const unprocessedPixels = Object.entries(pixels)
  const processedPixels = unprocessedPixels.reduce((accumulator, [coordinates, pixel]) => {
    const [
      pixelX,
      pixelY,
    ] = coordinates.split('-').map(coordinate => parseInt(coordinate, 10))

    setPixelData({
      canvasSize,
      color: pixel.color,
      coordinates: [pixelX, pixelY],
      imageDataArray: accumulator,
    })

    return accumulator
  }, imageDataArray)

  return processedPixels
}





export default generateImage
