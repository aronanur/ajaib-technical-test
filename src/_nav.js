import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilNotes } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Biodata',
    to: '/biodata',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default _nav
