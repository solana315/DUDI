import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dudi from './Dudi.jsx'
import Galeria from './Galeria.jsx'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dudi" element={<Dudi />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)