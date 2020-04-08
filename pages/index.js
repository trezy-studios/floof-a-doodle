// Style imports
import '../scss/app.scss'





// Module imports
import React, {
  useEffect,
  useState,
} from 'react'





// Local imports
import { Provider as LocalConfigProvider } from '../contexts/LocalConfigContext'
import { Provider as PixelProvider } from '../contexts/PixelContext'
import Chrome from '../components/Chrome'
import EffectsCanvas from '../components/EffectsCanvas'
import MainCanvas from '../components/MainCanvas'





const Page = () => {
  const [canvasSize, setCanvasSize] = useState({
    height: 0,
    width: 0,
  })
  const pixelMultiplier = 4

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

  return (
    <LocalConfigProvider>
      <PixelProvider>
        <MainCanvas {...canvasSize} />

        <EffectsCanvas {...canvasSize} />

        <Chrome />
      </PixelProvider>
    </LocalConfigProvider>
  )
}





export default Page
