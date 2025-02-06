import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './resources/css/output.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)