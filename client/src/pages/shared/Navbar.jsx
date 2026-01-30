import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const auth = JSON.parse(localStorage.getItem('auth'))

  const toggleMenu = () => {
    setIsOpen(!isOpen)
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

            <div className='hidden md:block'>
                {!auth ? (
                    <Link to="/login" className='bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition'>Login</Link>
                ) : (
                    <div className="relative group">
                        <button className="flex items-center gap-2 focus:outline-none">
                            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-lg">
                                {auth?.user?.firstName ? auth.user.firstName[0].toUpperCase() : 'U'}
                            </div>
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Profile</Link>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600">Logout</button>
                        </div>
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
              className='block hover:text-yellow-500 transition py-2'
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className='block hover:text-yellow-500 transition py-2'
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <div className="py-2">
                <span className="block text-gray-500 text-sm mb-2 font-semibold">Categories</span>
                <div className="pl-4 space-y-2 border-l-2 border-gray-300">
                    <Link to="/shop?category=men" onClick={() => setIsOpen(false)} className="block hover:text-yellow-500 transition">Men</Link>
                    <Link to="/shop?category=women" onClick={() => setIsOpen(false)} className="block hover:text-yellow-500 transition">Women</Link>
                    <Link to="/shop?category=accessories" onClick={() => setIsOpen(false)} className="block hover:text-yellow-500 transition">Accessories</Link>
                </div>
            </div>
            {!auth ? (
                <Link to="/login" onClick={() => setIsOpen(false)} className='block w-full bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition text-center'>
                  Login
                </Link>
            ) : (
                <>
                    <Link to="/profile" onClick={() => setIsOpen(false)} className='block hover:text-yellow-500 transition py-2'>Profile</Link>
                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className='block w-full text-left hover:text-yellow-500 transition py-2'>Logout</button>
                </>
            )}
          </div>
        )}
    </div>
  )
}

export default Navbar