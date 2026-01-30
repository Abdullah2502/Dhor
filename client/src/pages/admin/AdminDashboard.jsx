import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    // Fetch Admin Stats
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const authData = JSON.parse(localStorage.getItem('auth'));
                
                // Safety Check: If no token exists, redirect to login
                if (!authData?.token) {
                    navigate('/login');
                    return;
                }

                // --- THE FIX IS HERE ---
                // Added "Bearer " before the token
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/admin-stats`, {
                    headers: { 
                        Authorization: `Bearer ${authData.token}` 
                    }
                });
                // -----------------------

                if (data?.success) {
                    setStats(data);
                }
            } catch (error) {
                console.log("Admin Dashboard Error:", error);
                
                // Only redirect if it is strictly an Auth error (401)
                if (error.response?.status === 401) {
                    navigate('/'); 
                }
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, [navigate]);

    const AdminMenu = () => (
        <div className="bg-white shadow-md rounded-lg p-4 h-fit">
            <h4 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Admin Panel</h4>
            <ul className="space-y-2">
                <li>
                    <button className="w-full text-left px-4 py-2 bg-yellow-400 text-black font-semibold rounded shadow-sm">
                        Dashboard
                    </button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition text-gray-700">
                        Manage Products
                    </button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition text-gray-700">
                        Manage Orders
                    </button>
                </li>
                <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition text-gray-700">
                        Manage Users
                    </button>
                </li>
            </ul>
        </div>
    );

    if (loading) return <div className="min-h-screen flex justify-center items-center">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <AdminMenu />
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                                <h3 className="text-gray-500 text-sm font-semibold uppercase">Total Users</h3>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                                <h3 className="text-gray-500 text-sm font-semibold uppercase">Revenue</h3>
                                <p className="text-3xl font-bold text-gray-800 mt-2">${stats.totalRevenue}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                                <h3 className="text-gray-500 text-sm font-semibold uppercase">Products</h3>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                                <h3 className="text-gray-500 text-sm font-semibold uppercase">Orders</h3>
                                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
                            </div>
                        </div>

                        {/* Recent Activity Placeholder */}
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                            <p className="text-gray-500 italic">No recent orders found.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;