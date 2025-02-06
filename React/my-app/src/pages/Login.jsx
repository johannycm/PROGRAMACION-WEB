import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import ButtonP from '../components/general/Button-project';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
    
        // Retrieve stored user from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
    
        if (storedUser && username === storedUser.email && password === storedUser.password) {
            console.log("Login successful");
          navigate('/home'); // Redirect only if user exists and credentials match
        } else {
            alert("Invalid username or password. Please try again or register.");
        }
        };


return (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center" 
    style={{
      backgroundImage: 'url(https://images4.alphacoders.com/133/thumb-1920-1335140.jpg)'
    }}>
    <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-md w-full bg-transparent p-6 rounded-lg shadow-lg">
        <div className="max-w-md mx-auto p-4 rounded-md bg-black/70 text-white shadow-xl shadow-black/60">
            <h1 className="text-4xl font-handjet font-medium text-center mb-4 text-rickgreen">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                Username
                </label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border border-green-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border border-green-600 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="flex-col items-center justify-between space-y-4">
                    <ButtonP type="submit">Log in</ButtonP>
                    <ButtonP>
                    New Here? Register
                    </ButtonP>
                </div>
            </form>
        </div>
    </motion.div>
    </div>
  );
};

export default Login;