import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './resources/css/output.css';
import Home from './pages/Home';
import Login from './pages/Login';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} /> {/* Ruta por defecto al login */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)