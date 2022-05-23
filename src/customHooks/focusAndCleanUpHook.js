import React from 'react'
import { useLocation } from 'react-router-dom'
import Helper from 'src/helper/helper'

const useFocusAndCleanUpHook = (menuName, action, cleanUp = () => {}) => {
  const location = useLocation()

  React.useEffect(() => {
    const activeMenu = Helper.getLastPathSegment(location.pathname)
    if (activeMenu === menuName) {
      action()
    }
    return cleanUp()
  }, [location])

  return () => {}
}

export default useFocusAndCleanUpHook
