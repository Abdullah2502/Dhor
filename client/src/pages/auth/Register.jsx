import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    // Personal Info
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Address Info
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                firstName,
                lastName,
                email,
                password,
                phone,
                address,
                city,
                postalCode,
                country
            });

            if (res.data.success) {
                setShowModal(true);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar/>
            <div className='flex justify-center items-center mt-10 px-4 mb-10'>
                <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
                    <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Create Account</h2>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Personal Details */}
                        <div className='grid grid-cols-2 gap-4 mb-4'>
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>First Name</label>
                                <input type="text" className='w-full px-3 py-2 border rounded-md' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Last Name</label>
                                <input type="text" className='w-full px-3 py-2 border rounded-md' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                            <input type="email" className='w-full px-3 py-2 border rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Phone</label>
                            <input type="tel" className='w-full px-3 py-2 border rounded-md' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>

                        {/* Address Section */}
                        <h3 className="text-gray-500 text-sm font-bold mb-2 uppercase border-b pb-1 mt-6">Shipping Address</h3>
                        
                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Address Line 1</label>
                            <input type="text" placeholder="Street address, P.O. box" className='w-full px-3 py-2 border rounded-md' value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>

                        <div className='grid grid-cols-2 gap-4 mb-4'>
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>City</label>
                                <input type="text" className='w-full px-3 py-2 border rounded-md' value={city} onChange={(e) => setCity(e.target.value)} required />
                            </div>
                            <div>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>Postal Code</label>
                                <input type="text" className='w-full px-3 py-2 border rounded-md' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Country</label>
                            <input type="text" className='w-full px-3 py-2 border rounded-md' value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </div>

                        {/* Security */}
                        <h3 className="text-gray-500 text-sm font-bold mb-2 uppercase border-b pb-1 mt-6">Security</h3>

                        <div className='mb-4'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                            <input type="password" className='w-full px-3 py-2 border rounded-md' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <div className='mb-6'>
                            <label className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password</label>
                            <input type="password" className='w-full px-3 py-2 border rounded-md' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>

                        <button type='submit' className='w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300'>
                            Register
                        </button>
                    </form>

                    <p className='mt-4 text-center text-gray-600 text-sm'>
                        Already have an account? <Link to="/login" className='text-yellow-600 hover:underline'>Login</Link>
                    </p>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">Signup Successful!</h3>
                        <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
                        <button onClick={() => navigate('/login')} className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300">
                            Continue to Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Register;