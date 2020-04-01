// Module imports
import React from 'react'





// Local imports
import OptionsList from './OptionsList'





const UserOptions = () => (
  <>
    <OptionsList
      options={[
        {
          label: 'Color',
          type: 'color',
          value: '#ff0000',
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





export default UserOptions
