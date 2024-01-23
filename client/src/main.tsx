import React from 'react'
import ReactDOM from 'react-dom/client'
import OperationsApp from './features/operations/OperationsApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OperationsApp />
  </React.StrictMode>,
)
