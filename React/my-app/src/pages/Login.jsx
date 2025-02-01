import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = (e) => {
  e.preventDefault();
  // Aquí va la lógica de autenticación
  console.log('Username:', username);
  console.log('Password:', password);
  // Navegar a la página de inicio después del login
  navigate('/home');
};

return (
  <div 
    className="min-h-screen flex items-center justify-center bg-cover bg-center" 
    style={{ 
      backgroundImage: 'url(https://images4.alphacoders.com/133/thumb-1920-1335140.jpg)'
    }}>
  <div className="bg-white bg-opacity-75 p-8 rounded shadow-md w-full max-w-sm">
    <h1 className="text-2xl font-bold mb-4 text-gray-800">Login</h1>
    
  <form onSubmit={handleLogin}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
      Username
      </label>
    <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
      Password
      </label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
    </div>
    <div className="flex items-center justify-between">
      <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Login
      </button>
    </div>
  </form>
    </div>
    </div>
  );
};

export default Login;
