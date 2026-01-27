import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Link } from 'react-router-dom'

const Home = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    // TODO: Fetch categories and products from API
  }, [])

  return (
    <div className='font-sans text-gray-800'>
      <Navbar />
      
      {/* Hero Section */}
      <section className='relative bg-gray-900 text-white h-[85vh] flex items-center justify-center overflow-hidden'>
        <div 
            className='absolute inset-0 bg-cover bg-center opacity-60' 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}
        ></div>
        <div className='relative z-10 text-center px-4 animate-fade-in-up'>
            <h1 className='text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg'>Redefine Your Style</h1>
            <p className='text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto drop-shadow-md'>
                Timeless essentials for the modern wardrobe. Sustainable, comfortable, and effortlessly chic.
            </p>
            <Link to="/shop" className='bg-yellow-400 text-black font-bold py-3 px-10 rounded-full hover:bg-yellow-500 transition duration-300 transform hover:scale-105 inline-block shadow-lg'>
                Shop Collection
            </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className='py-20 px-4 max-w-7xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-16 tracking-wide'>Shop by Category</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {categories.map((category) => (
                <div key={category.name} className='relative group overflow-hidden rounded-xl shadow-xl cursor-pointer h-96'>
                    <img 
                        src={category.image} 
                        alt={category.name} 
                        className='w-full h-full object-cover transition duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-10'>
                        <h3 className='text-white text-3xl font-bold uppercase tracking-widest group-hover:text-yellow-400 transition-colors duration-300'>{category.name}</h3>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Trending / New Arrivals */}
      <section className='py-20 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4'>
            <div className='flex justify-between items-end mb-12'>
                <div>
                    <h2 className='text-3xl md:text-4xl font-bold mb-2'>Trending Now</h2>
                    <p className='text-gray-500'>Our latest drops, fresh from the studio.</p>
                </div>
                <Link to="/shop" className='hidden md:block text-yellow-600 font-semibold hover:text-yellow-700 transition'>View All Products &rarr;</Link>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                {products.map((product) => (
                    <div key={product.id} className='bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group'>
                        <div className='h-80 bg-gray-200 relative overflow-hidden'>
                             <img 
                                src={product.image} 
                                alt={product.name} 
                                className='w-full h-full object-cover transition duration-500 group-hover:scale-105' 
                             />
                             <span className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-sm'>New</span>
                             
                             {/* Quick Add Button Overlay */}
                             <div className='absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300'>
                                <button className='w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition'>Add to Cart</button>
                             </div>
                        </div>
                        <div className='p-5'>
                            <h3 className='text-lg font-semibold mb-1 text-gray-900'>{product.name}</h3>
                            <p className='text-gray-500 text-sm mb-3'>Premium Collection</p>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg text-gray-900'>{product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-8 text-center md:hidden'>
                <Link to="/shop" className='text-yellow-600 font-semibold hover:text-yellow-700 transition'>View All Products &rarr;</Link>
            </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
            <h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>Why Choose Dhor?</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12 text-center'>
                <div className='p-6'>
                    <div className='w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className='text-xl font-bold mb-4'>Premium Quality</h3>
                    <p className='text-gray-600'>Crafted with the finest materials to ensure durability and comfort that lasts.</p>
                </div>
                <div className='p-6'>
                    <div className='w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className='text-xl font-bold mb-4'>Sustainable Fashion</h3>
                    <p className='text-gray-600'>Eco-friendly production processes and materials that care for the planet.</p>
                </div>
                <div className='p-6'>
                    <div className='w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                    </div>
                    <h3 className='text-xl font-bold mb-4'>Fast Shipping</h3>
                    <p className='text-gray-600'>Quick and reliable delivery to your doorstep, anywhere in the world.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-white border-t border-gray-200 pt-16 pb-8 px-4'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
            <div className='col-span-1 md:col-span-1'>
                <h3 className='font-bold text-2xl mb-6 tracking-tighter'>DHOR.</h3>
                <p className='text-gray-500 text-sm leading-relaxed'>
                    Redefining modern aesthetics with sustainable fashion choices. Quality craftsmanship meets contemporary design.
                </p>
            </div>
            <div>
                <h4 className='font-bold mb-6 text-gray-900'>Shop</h4>
                <ul className='space-y-3 text-sm text-gray-600'>
                    <li><Link to="#" className='hover:text-yellow-600 transition'>New Arrivals</Link></li>
                    <li><Link to="#" className='hover:text-yellow-600 transition'>Best Sellers</Link></li>
                    <li><Link to="#" className='hover:text-yellow-600 transition'>Accessories</Link></li>
                    <li><Link to="#" className='hover:text-yellow-600 transition'>Sale</Link></li>
                </ul>
            </div>
            <div>
                <h4 className='font-bold mb-6 text-gray-900'>Support</h4>
                <ul className='space-y-3 text-sm text-gray-600'>
                    <li><Link to="#" className='hover:text-yellow-600 transition'>FAQ</Link></li>
                    <li><Link to="#" className='hover:text-yellow-600 transition'>Shipping & Returns</Link></li>
                    <li><Link to="#" className='hover:text-yellow-600 transition'>Size Guide</Link></li>
                    <li><Link to="#" className='hover:text-yellow-600 transition'>Contact Us</Link></li>
                </ul>
            </div>
            <div>
                <h4 className='font-bold mb-6 text-gray-900'>Follow Us</h4>
                <div className='flex space-x-4'>
                    {/* Social Icons */}
                    {['Facebook', 'Twitter', 'Instagram'].map(social => (
                        <div key={social} className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-white transition cursor-pointer duration-300'>
                            <span className='sr-only'>{social}</span>
                            <div className='w-4 h-4 bg-current rounded-sm'></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className='border-t border-gray-100 pt-8 text-center text-gray-400 text-sm'>
            &copy; {new Date().getFullYear()} Dhor Apparels. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home