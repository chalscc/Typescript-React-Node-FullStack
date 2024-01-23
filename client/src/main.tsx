import React from 'react'
import ReactDOM from 'react-dom/client'
import OperationsApp from './features/operations/OperationsApp'
import './index.css'

import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <OperationsApp />
    </Provider>
  </React.StrictMode>,
)
