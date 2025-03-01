import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTrip from './create-trip/index.jsx';
import Header from './components/custom/header.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/create-trip' element={<CreateTrip />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
