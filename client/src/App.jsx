import { Routes, Route } from "react-router-dom";
import Home from "./pages/customer/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/customer/Profile";
import Cart from "./pages/customer/Cart";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard/admin" element={<AdminDashboard/>} />
        <Route path="/dashboard/admin/products" element={<ManageProducts/>} />
      </Routes>
    </div>
    
  );
}

export default App;