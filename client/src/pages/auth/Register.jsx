import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    // Add registration logic here
    console.log('Register submitted:', formData)
  }

  return (
    <div className='min-h-screen bg-gray-50'>
        <Navbar/>

        <div className='flex justify-center items-center mt-10 px-4 mb-10'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Create Account</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4 mb-4'>
                        <div>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='firstName'>
                                First Name
                            </label>
                            <input 
                                type="text" 
                                id="firstName"
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
                                placeholder='First Name'
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastName'>
                                Last Name
                            </label>
                            <input 
                                type="text" 
                                id="lastName"
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
                                placeholder='Last Name'
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
                            placeholder='Enter your email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
                            Phone Number
                        </label>
                        <input 
                            type="tel" 
                            id="phone"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
                            placeholder='Enter your phone number'
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
                            placeholder='Create a password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='confirmPassword'>
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword"
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
                            placeholder='Confirm your password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
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
    </div>
  )
}

export default Register