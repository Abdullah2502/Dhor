import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const AdminMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth');
        navigate('/login');
    };

    const activeStyle = "w-full text-left px-4 py-2 bg-yellow-400 text-black font-semibold rounded shadow-sm flex items-center gap-2";
    const inactiveStyle = "w-full text-left px-4 py-2 hover:bg-gray-100 rounded transition text-gray-700 flex items-center gap-2";

    return (
        <div className="bg-white shadow-md h-full p-4">
            <div className="flex justify-center mb-4 border-b pb-2">
                <img src="/DHOR.png" alt="Admin Logo" className="w-32" />
            </div>
            <ul className="space-y-2">
                <li>
                    <NavLink to="/dashboard/admin" end className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/admin/products" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Manage Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/admin/orders" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Manage Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/admin/users" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Manage Users
                    </NavLink>
                </li>
                <li className="pt-4 mt-4 border-t border-gray-200">
                    <Link to="/" className={inactiveStyle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded transition flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default AdminMenu;
