// Module imports
import Color from 'color-me-maybe'





// Local constants
const PIXEL_MULTIPLIER = 4





const setPixelData = options => {
  const {
    canvasSize: {
      width: canvasWidth,
    },
    color: pixelColor,
    coordinates: [
      pixelX,
      pixelY,
    ],
    imageDataArray,
  } = options
  const colorData = Color.fromHex(pixelColor)
  const index = PIXEL_MULTIPLIER * (pixelY * canvasWidth + pixelX)

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





export default setPixelData
