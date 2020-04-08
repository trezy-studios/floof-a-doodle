// Module imports
import React, {
  useContext,
  useRef,
} from 'react'





// Local imports
import { context as LocalConfigContext } from '../contexts/LocalConfigContext'
import OptionsList from './OptionsList'





const UserOptions = () => {
  const {
    color,
    opacity,
    setColor,
    setOpacity,
    setShowCanvas,
    showCanvas,
  } = useContext(LocalConfigContext)

  // Options are contained inside of `useRef` to prevent them from rerendering
  // every time and breaking functionality.
  // ALSO.
  // These `onChange` handlers set (in a gross, recursive way) their *own*
  // value on change. This is because the objects are created and stored
  // in `useRef`, so their data does not change on rerender. Consequently,
  // the value of the input does not change.
  const colorOption = useRef({
    label: 'Color',
    onChange: ({ target }) => {
      colorOption.current.value = target.value
      setColor(target.value)
    },
    type: 'color',
    value: color,
  })
  const sizeOption = useRef({
    label: 'Size',
    type: 'number',
    value: 1,
  })
  const brushOptions = useRef([
    colorOption.current,
    sizeOption.current,
  ])
  const opacityOption = useRef({
    label: 'Opacity',
    max: 100,
    min: 0,
    onChange: ({ target }) => {
      opacityOption.current.value = target.value
      setOpacity(target.value)
    },
    step: 1,
    type: 'range',
    value: opacity,
  })
  const showCanvasOption = useRef({
    label: 'Show Canvas?',
    onChange: ({ target }) => {
      showCanvasOption.current.value = target.checked
      setShowCanvas(target.checked)
    },
    type: 'checkbox',
    value: showCanvas,
  })
  const canvasOptions = useRef([
    opacityOption.current,
    showCanvasOption.current,
  ])

  return (
    <>
      <OptionsList
        options={brushOptions.current}
        title="Brush Options" />

      <hr />

      <OptionsList
        options={canvasOptions.current}
        title="Canvas Options" />
    </>
  )
}





export default UserOptions
