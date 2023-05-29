import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/*Cuando te conectas al localhost BrowserRouter te dirige a App.jsx. Funcionamiento de controlador principal*/}
    </BrowserRouter>
    
  </React.StrictMode>,
)
