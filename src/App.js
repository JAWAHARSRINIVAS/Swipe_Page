import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DesignProvider } from './contexts/authDesign'

const RouteHome = React.lazy(() => import('./pages/Home'))
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={
          <React.Suspense fallback="Loading..." >
             <DesignProvider>
                <RouteHome />
             </DesignProvider>
          </React.Suspense>
        } />
      </Routes>
    </div>
  )
}

export default App
