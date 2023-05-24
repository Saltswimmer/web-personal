import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './index.jsx'
import './index.css'
import { IconContext } from 'react-icons'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IconContext.Provider value={{ color: "white", width: '50px' }}>
      <Index />
    </IconContext.Provider>
  </React.StrictMode>,
)
