import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Password Change State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Address Update State
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    // Fetch User Data
    const fetchUserData = async () => {
        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            if (!authData?.token) {
                navigate('/login');
                return;
            }

            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                headers: { Authorization: authData.token }
            });

            if (data?.success) {
                setUser(data.user);
                // Pre-fill address form with existing data
                if (data.user.address) {
                    setAddressLine1(data.user.address.line1 || '');
                    setAddressLine2(data.user.address.line2 || '');
                    setCity(data.user.address.city || '');
                    setPostalCode(data.user.address.zip || '');
                    setCountry(data.user.address.country || '');
                }
            }
        } catch (error) {
            console.log("Error fetching profile:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem('auth');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [navigate]);

    // Handle Address Update
    const handleAddressUpdate = async (e) => {
        e.preventDefault();
        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            const { data } = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/auth/update-address`,
                { addressLine1, addressLine2, city, postalCode, country },
                { headers: { Authorization: authData?.token } }
            );

            if (data?.success) {
                toast.success("Changes saved", { position: "top-right" });
                fetchUserData(); // Refresh data to show updates
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update address");
        }
    };

    // Handle Password Change
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            return toast.error("New passwords do not match");
        }
        
        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/auth/change-password`, {
                currentPassword,
                newPassword
            }, {
                headers: { Authorization: authData?.token }
            });

            if (res.data.success) {
                toast.success("Changes saved", { position: "top-right" });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to change password");
        }
    }

    if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
    if (!user) return <div className="min-h-screen flex justify-center items-center">User not found.</div>;

    return (
        <div className='min-h-screen bg-gray-50'>
            
            <Navbar />
            <div className='max-w-6xl mx-auto mt-10 px-4 mb-10'>
                <h1 className='text-3xl font-bold mb-8 text-gray-800'>My Profile</h1>
                
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* LEFT COLUMN: Personal Details & Address */}
                    <div className='lg:col-span-2 space-y-6'>
                        
                        {/* Static Personal Info */}
                        <div className='bg-white p-6 rounded-lg shadow-md'>
                            <div className="flex items-center gap-4 mb-6 border-b pb-4">
                                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-2xl">
                                    {user?.firstName ? user.firstName[0].toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <h2 className='text-xl font-bold text-gray-800'>{user.firstName} {user.lastName}</h2>
                                    <p className="text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <h3 className='text-lg font-semibold mb-4 text-gray-700'>Personal Information</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1'>First Name</label>
                                    <p className='text-gray-900 font-medium bg-gray-50 p-2 rounded border border-gray-100'>{user.firstName}</p>
                                </div>
                                <div>
                                    <label className='block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1'>Last Name</label>
                                    <p className='text-gray-900 font-medium bg-gray-50 p-2 rounded border border-gray-100'>{user.lastName}</p>
                                </div>
                                <div>
                                    <label className='block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1'>Email</label>
                                    <p className='text-gray-900 font-medium bg-gray-50 p-2 rounded border border-gray-100'>{user.email}</p>
                                </div>
                                <div>
                                    <label className='block text-gray-500 text-xs uppercase tracking-wide font-semibold mb-1'>Phone</label>
                                    <p className='text-gray-900 font-medium bg-gray-50 p-2 rounded border border-gray-100'>{user.phone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Editable Address Form */}
                        <div className='bg-white p-6 rounded-lg shadow-md'>
                            <h3 className='text-lg font-semibold mb-4 text-gray-700'>Shipping Address</h3>
                            <form onSubmit={handleAddressUpdate} className='space-y-4'>
                                <div>
                                    <label className='block text-gray-700 text-sm font-bold mb-1'>Address Line 1</label>
                                    <input 
                                        type="text" 
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition'
                                        value={addressLine1}
                                        onChange={(e) => setAddressLine1(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block text-gray-700 text-sm font-bold mb-1'>Address Line 2 (Optional)</label>
                                    <input 
                                        type="text" 
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition'
                                        value={addressLine2}
                                        onChange={(e) => setAddressLine2(e.target.value)}
                                    />
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <div>
                                        <label className='block text-gray-700 text-sm font-bold mb-1'>City</label>
                                        <input 
                                            type="text" 
                                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition'
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-gray-700 text-sm font-bold mb-1'>Postal Code</label>
                                        <input 
                                            type="text" 
                                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition'
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-gray-700 text-sm font-bold mb-1'>Country</label>
                                        <input 
                                            type="text" 
                                            className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition'
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="text-right mt-4">
                                    <button type='submit' className='bg-gray-900 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition shadow-sm'>
                                        Save Address
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Change Password */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white p-6 rounded-lg shadow-md sticky top-4'>
                            <h3 className='text-lg font-semibold mb-4 text-gray-700'>Security</h3>
                            <form onSubmit={handlePasswordChange}>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'>Current Password</label>
                                    <input 
                                        type="password" 
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition'
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'>New Password</label>
                                    <input 
                                        type="password" 
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div className='mb-6'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2'>Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <button type='submit' className='w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-300 shadow-sm'>
                                    Update Password
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;