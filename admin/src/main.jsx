import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { OrderContextProvider } from './contexts/OrderContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <OrderContextProvider>
        <ToastContainer
          autoClose={2000}
          style={{
            top: '70px', right: '0px'
          }}
        />
        <App />
      </OrderContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
