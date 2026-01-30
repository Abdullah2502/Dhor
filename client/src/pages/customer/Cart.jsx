import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        // Check auth status
        const authData = localStorage.getItem('auth');
        if (authData) {
            setAuth(JSON.parse(authData));
        }

        // Load cart from local storage
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success("Item removed");
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedCart = cartItems.map(item => 
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            // Handle price if it's a string (e.g. "$50.00") or number
            const price = typeof item.price === 'string' 
                ? parseFloat(item.price.replace(/[^0-9.-]+/g,"")) 
                : item.price;
            return total + (price * item.quantity);
        }, 0);
    };

    const handleCheckout = () => {
        if (auth?.token) {
            navigate('/checkout');
        } else {
            toast.error("Please login to checkout");
            // Redirect to login and pass the current location to redirect back after login
            navigate('/login', { state: { from: '/cart' } });
        }
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-6xl mx-auto mt-10 px-4 mb-10'>
                <h1 className='text-3xl font-bold mb-8 text-gray-800'>Shopping Cart</h1>
                
                {cartItems.length === 0 ? (
                    <div className='text-center py-16 bg-white rounded-lg shadow-sm'>
                        <div className="mb-4 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-semibold text-gray-600 mb-2'>Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                        <button onClick={() => navigate('/shop')} className='bg-yellow-400 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition shadow-md'>
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Cart Items List */}
                        <div className='lg:col-span-2 space-y-4'>
                            {cartItems.map((item) => (
                                <div key={item.id} className='bg-white p-4 rounded-lg shadow-sm flex gap-4 items-center transition hover:shadow-md'>
                                    <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <h3 className='text-lg font-semibold text-gray-800 truncate'>{item.name}</h3>
                                        <p className='text-gray-500 text-sm mb-1'>{item.category || 'Product'}</p>
                                        <p className='text-gray-900 font-bold'>${typeof item.price === 'string' ? item.price : item.price.toFixed(2)}</p>
                                    </div>
                                    <div className='flex flex-col items-end gap-3'>
                                        <button onClick={() => removeFromCart(item.id)} className='text-gray-400 hover:text-red-500 transition' title="Remove item">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                        <div className='flex items-center border rounded-md'>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className='px-3 py-1 hover:bg-gray-100 text-gray-600'>-</button>
                                            <span className='px-2 py-1 font-medium text-gray-800 min-w-[2rem] text-center'>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className='px-3 py-1 hover:bg-gray-100 text-gray-600'>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className='lg:col-span-1'>
                            <div className='bg-white p-6 rounded-lg shadow-sm sticky top-24'>
                                <h2 className='text-xl font-bold mb-6 text-gray-800 border-b pb-4'>Order Summary</h2>
                                <div className='space-y-3 mb-6'>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Subtotal</span>
                                        <span>${calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between text-gray-600'>
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className='border-t pt-4 flex justify-between font-bold text-xl text-gray-900'>
                                        <span>Total</span>
                                        <span>${calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleCheckout}
                                    className='w-full bg-black text-white font-bold py-3 px-4 rounded-md hover:bg-gray-800 transition duration-300 shadow-lg transform active:scale-95'
                                >
                                    Proceed to Checkout
                                </button>
                                <div className="mt-4 text-center">
                                    <span className="text-gray-500 text-sm">or </span>
                                    <button onClick={() => navigate('/shop')} className='text-yellow-600 font-medium hover:underline text-sm'>
                                        Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;