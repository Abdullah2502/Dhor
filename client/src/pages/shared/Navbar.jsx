import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false)
  const navigate = useNavigate()
  const auth = JSON.parse(localStorage.getItem('auth'))

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate('/login')
  }

  return (
    <div>
        <nav className='bg-neutral-200 shadow-md flex justify-between items-center p-3'>
            <div className='flex-shrink-0'>
                <Link to="/"><img src="/DHOR.png" alt="Logo" className='w-24 md:w-30'/></Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex justify-between gap-6 items-center'>
                <Link to="/" className='hover:text-yellow-500 transition'>Home</Link>
                <Link to="/shop" className='hover:text-yellow-500 transition'>Shop</Link>
                <div className="relative group">
                    <button className="flex items-center gap-1 hover:text-yellow-500 transition focus:outline-none">
                        Categories
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <Link to="/shop?category=men" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Men</Link>
                        <Link to="/shop?category=women" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Women</Link>
                        <Link to="/shop?category=accessories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Accessories</Link>
                    </div>
                </div>
            </div>

            <div className='hidden md:flex items-center gap-4'>
                <Link to="/cart" className="hover:text-yellow-500 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </Link>
                {!auth ? (
                    <Link to="/login" className='bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition'>Login</Link>
                ) : (
                    <div className="relative">
                        <button onClick={toggleDropdown} className="flex items-center gap-2 focus:outline-none">
                            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-lg">
                                {auth?.user?.lastName ? auth.user.lastName[0].toUpperCase() : (auth?.user?.firstName ? auth.user.firstName[0].toUpperCase() : 'U')}
                            </div>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className='md:hidden flex flex-col gap-1 focus:outline-none'
            >
              <span className={`w-6 h-0.5 bg-black transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-black transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='md:hidden bg-[#EEEEEE] shadow-md p-4 space-y-3'>
            <Link 
              to="/" 
              className='block hover:text-yellow-500 transition py-2 text-sm  text-gray-500 font-semibold'
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className='block hover:text-yellow-500 transition py-2 text-sm  text-gray-500 font-semibold'
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <div className="py-2">
                <button 
                    onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                    className="flex items-center justify-between w-full text-gray-500 text-sm mb-2 font-semibold focus:outline-none"
                >
                    Categories
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isMobileCategoriesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isMobileCategoriesOpen && (
                    <div className="pl-4 space-y-2 border-l-2 border-gray-300">
                        <Link to="/shop?category=men" onClick={() => setIsOpen(false)} className="block  text-gray-500 hover:text-yellow-500 transition ">Men</Link>
                        <Link to="/shop?category=women" onClick={() => setIsOpen(false)} className="block  text-gray-500 hover:text-yellow-500 transition">Women</Link>
                        <Link to="/shop?category=accessories" onClick={() => setIsOpen(false)} className="block  text-gray-500 hover:text-yellow-500 transition">Accessories</Link>
                    </div>
                )}
            </div>
            
            <div className="flex gap-2 pt-2 border-t border-gray-300 mt-2">
                <Link 
                  to="/cart" 
                  className='flex-1 bg-white text-center py-2 rounded shadow-sm hover:bg-gray-50 transition text-sm font-medium'
                  onClick={() => setIsOpen(false)}
                  title="Cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </Link>
                {!auth ? (
                    <Link to="/login" onClick={() => setIsOpen(false)} className='flex-1 bg-yellow-400 text-black text-center py-2 rounded shadow-sm hover:bg-yellow-500 transition text-sm font-medium' title="Login">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                    </Link>
                ) : (
                    <>
                        <Link to="/profile" onClick={() => setIsOpen(false)} className='flex-1 bg-white text-center py-2 rounded shadow-sm hover:bg-gray-50 transition text-sm font-medium' title="Profile">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>
                        <button onClick={() => { handleLogout(); setIsOpen(false); }} className='flex-1 bg-yellow-400 text-white text-center py-2 rounded shadow-sm hover:bg-yellow-500 transition text-sm font-medium' title="Logout">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
          </div>
        )}
    </div>
  )
}

export default Navbar