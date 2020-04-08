// Module imports
import React, {
  useContext,
} from 'react'





// Local imports
import { context as LocalConfigContext } from '../contexts/LocalConfigContext'
import OptionsList from './OptionsList'





const UserOptions = () => {
  const {
    color,
    setColor,
  } = useContext(LocalConfigContext)

  return (
    <>
      <OptionsList
        options={[
          {
            label: 'Color',
            onChange: ({ target }) => setColor(target.value),
            type: 'color',
            value: color,
          },

          {
            label: 'Size',
            type: 'number',
            value: 1,
          },
        ]}
        title="Brush Options" />

      <hr />

      <OptionsList
        options={[
          {
            label: 'Opacity',
            max: 100,
            min: 0,
            step: 1,
            type: 'range',
            value: 40,
          },

          {
            label: 'Show Canvas?',
            type: 'checkbox',
            value: true,
          },
        ]}
        title="Canvas Options" />
    </>
  )
}





export default UserOptions
