import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";	
import ButtonP from "../components/general/Button-project";
import '../App.css';


function Register() {
    const [DatafromForm, setDatafromForm] = useState ({
        name: "",
        last_name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleData = (e) => {
        setDatafromForm({
            ...DatafromForm,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(DatafromForm));
        alert("Registro exitoso!");
        navigate('/login')
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images5.alphacoders.com/128/1285059.jpg)' }}>
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-md w-full bg-transparent p-6 rounded-lg shadow-lg">
                <div className="max-w-md mx-auto p-4 rounded-md bg-black/70 text-white shadow-xl shadow-black/60">
                    <h2 className="text-4xl font-handjet font-medium text-center mb-4 text-rickgreen">Create Your Account</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="First Name"
                            value={DatafromForm.name}
                            onChange={handleData}
                            className="w-full p-2 mb-2 border border-green-600  rounded"
                            required
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={DatafromForm.last_name}
                            onChange={handleData}
                            className="w-full p-2 mb-2 border  border-green-600 rounded"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={DatafromForm.email}
                            onChange={handleData}
                            className="w-full p-2 mb-2 border  border-green-600  rounded"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={DatafromForm.password}
                            onChange={handleData}
                            className="w-full p-2 mb-2 border border-green-600 rounded"
                            required
                        />
                        <ButtonP>Register</ButtonP>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default Register;