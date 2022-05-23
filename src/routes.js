import React from 'react'

const BiodataPage = React.lazy(() => import('./views/biodata'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/biodata', name: 'Biodata', element: BiodataPage },
]

export default routes
