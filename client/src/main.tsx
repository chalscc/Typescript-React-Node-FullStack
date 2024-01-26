import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { store } from './store'
import { Provider } from 'react-redux'
import { AppRouter } from './router/AppRouter'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter />        
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
