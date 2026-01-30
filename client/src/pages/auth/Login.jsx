import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'success', // 'success' | 'error'
    onOk: null
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => {
    if (modal.onOk) {
      modal.onOk();
    }
    setModal({ ...modal, isOpen: false, onOk: null });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
            localStorage.setItem('auth', JSON.stringify(res.data));
            
            if (res.data.user.role == 1) { 
                navigate('/dashboard/admin');
            } else {
                navigate('/');
            }
        } else {
            setModal({
                isOpen: true,
                title: 'Error',
                message: res.data.message,
                type: 'error',
                onOk: null
            });
        }
    } catch (error) {
        console.log(error);
        setModal({
            isOpen: true,
            title: 'Error',
            message: 'Something went wrong',
            type: 'error',
            onOk: null
        });
    } finally {
        setLoading(false);
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
                    <button type='submit' disabled={loading} className={`w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : 'Login'}
                    </button>
                </form>
                <p className='mt-4 text-center text-gray-600 text-sm'>
                    Don't have an account? <Link to="/register" className='text-yellow-600 hover:underline'>Register</Link>
                </p>
            </div>
        </div>

        {modal.isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${modal.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {modal.type === 'success' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{modal.title}</h3>
                    <p className="text-gray-600 mb-6">{modal.message}</p>
                    <button onClick={closeModal} className={`w-full font-bold py-2 px-4 rounded-md transition duration-300 ${modal.type === 'success' ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
                        {modal.type === 'success' ? 'Continue' : 'Close'}
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}

export default Login;