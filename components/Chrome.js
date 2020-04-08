// Module imports
import React, {
  useState,
} from 'react'





// Local imports
import AllOptions from './AllOptions'
import RequiresAuthentication from './RequiresAuthentication'





const Chrome = () => {
  const [hidden, setHidden] = useState(true)

  const handleMenuButtonClick = () => setHidden(!hidden)

  return (
    <RequiresAuthentication>
      <div className="chrome-wrapper">
        <button
          name="menu-control"
          type="button"
          onClick={handleMenuButtonClick}>
          <span>{'FD'}</span>
        </button>

        <AllOptions hidden={hidden} />
      </div>
    </RequiresAuthentication>
  )
}





export default Chrome
