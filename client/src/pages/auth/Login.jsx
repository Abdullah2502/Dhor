import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            email,
            password
        });

        // DEBUGGING: Open your browser console (F12) to see this!
        console.log("Full Login Response:", res.data);
        console.log("User Role:", res.data.user?.role);
        console.log("Role Type:", typeof res.data.user?.role);

        if (res && res.data.success) {
            toast.success(res.data.message);
            
            localStorage.setItem('auth', JSON.stringify(res.data));
            
            // --- FIXED REDIRECT LOGIC ---
            // usage of == instead of === allows "1" to equal 1
            if (res.data.user.role == 1) { 
                navigate('/dashboard/admin');
            } else {
                navigate('/');
            }
            // ----------------------
            
        } else {
            toast.error(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }
}

  return (
    <div className='min-h-screen bg-gray-50'>
        <Navbar/>
        <div className='flex justify-center items-center mt-30 px-4 pt-10'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Welcome Back</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email Address</label>
                        <input 
                            type="email" 
                            id="email"
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>Password</label>
                        <input 
                            type="password" 
                            id="password"
                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type='submit' className='w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300'>
                        Login
                    </button>
                </form>
                <p className='mt-4 text-center text-gray-600 text-sm'>
                    Don't have an account? <Link to="/register" className='text-yellow-600 hover:underline'>Register</Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login;