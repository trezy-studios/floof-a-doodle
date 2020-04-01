// Module imports
import React, {
  useState,
} from 'react'





// Local imports
import AllOptions from './AllOptions'





const Chrome = () => {
  const [hidden, setHidden] = useState(true)

  const handleMenuButtonClick = () => setHidden(!hidden)

  return (
    <div className="chrome-wrapper">
      <button
        name="menu-control"
        type="button"
        onClick={handleMenuButtonClick}>
        <span>{'FD'}</span>
      </button>

      <AllOptions hidden={hidden} />
    </div>
  )
}





export default Chrome
