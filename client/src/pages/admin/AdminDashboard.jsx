import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminMenu from './AdminMenu';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        lowStockProducts: [],
        mostSoldProducts: []
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

    if (loading) return <div className="min-h-screen flex justify-center items-center">Loading Admin Panel...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 hidden md:block fixed h-full">
                <AdminMenu />
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 p-8">
                <div className="max-w-6xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
                        
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
                                <div>
                                    <h3 className="text-gray-500 text-sm font-semibold uppercase">Total Users</h3>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalUsers}</p>
                                </div>
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 flex items-center justify-between">
                                <div>
                                    <h3 className="text-gray-500 text-sm font-semibold uppercase">Revenue</h3>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">${stats.totalRevenue}</p>
                                </div>
                                <div className="p-3 rounded-full bg-green-100 text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500 flex items-center justify-between">
                                <div>
                                    <h3 className="text-gray-500 text-sm font-semibold uppercase">Products</h3>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProducts}</p>
                                </div>
                                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 flex items-center justify-between">
                                <div>
                                    <h3 className="text-gray-500 text-sm font-semibold uppercase">Orders</h3>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalOrders}</p>
                                </div>
                                <div className="p-3 rounded-full bg-red-100 text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Analytics Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {/* Low Stock Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    Low Stock Alert
                                </h3>
                                {stats.lowStockProducts?.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                                <tr>
                                                    <th className="px-4 py-2 text-left rounded-l-md">Product</th>
                                                    <th className="px-4 py-2 text-right rounded-r-md">Stock</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {stats.lowStockProducts.map((p, i) => (
                                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{p.name}</td>
                                                        <td className="px-4 py-3 text-sm text-right text-red-600 font-bold">{p.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm italic text-center py-4">No low stock items.</p>
                                )}
                            </div>

                            {/* Most Sold Section */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    Top Selling Products
                                </h3>
                                {stats.mostSoldProducts?.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                                <tr>
                                                    <th className="px-4 py-2 text-left rounded-l-md">Product</th>
                                                    <th className="px-4 py-2 text-right rounded-r-md">Sold</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {stats.mostSoldProducts.map((p, i) => (
                                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{p.name}</td>
                                                        <td className="px-4 py-3 text-sm text-right text-green-600 font-bold">{p.sold}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm italic text-center py-4">No sales data available.</p>
                                )}
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
    );
};

export default AdminDashboard;