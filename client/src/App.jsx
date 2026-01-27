
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './pages/customer/Home'




function App() {
  

  return (
    <>
      <Routes>
        
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
      </Routes>
    </>
    
  )
}

export default App
