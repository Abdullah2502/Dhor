import React, { useState, useEffect } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/product/get-product`);
            if (data?.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while getting products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            const productData = { name, description, price, quantity, category, image };
            
            if (editingProduct) {
                const { data } = await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/product/update-product/${editingProduct._id}`,
                    productData,
                    { headers: { Authorization: `Bearer ${authData?.token}` } }
                );
                if (data?.success) {
                    toast.success("Product Updated Successfully");
                    fetchProducts();
                    closeModal();
                } else {
                    toast.error(data?.message);
                }
            } else {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/product/create-product`,
                    productData,
                    { headers: { Authorization: `Bearer ${authData?.token}` } }
                );
                if (data?.success) {
                    toast.success("Product Created Successfully");
                    fetchProducts();
                    closeModal();
                } else {
                    toast.error(data?.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleDelete = async (id) => {
        try {
            const authData = JSON.parse(localStorage.getItem('auth'));
            let answer = window.confirm("Are you sure you want to delete this product?");
            if (!answer) return;
            
            const { data } = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/product/delete-product/${id}`,
                { headers: { Authorization: `Bearer ${authData?.token}` } }
            );
            if (data?.success) {
                toast.success("Product Deleted Successfully");
                fetchProducts();
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const openModal = (product = null) => {
        setModalOpen(true);
        if (product) {
            setEditingProduct(product);
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setQuantity(product.quantity);
            setCategory(product.category?._id || product.category);
            setImage(product.image);
        } else {
            setEditingProduct(null);
            setName("");
            setDescription("");
            setPrice("");
            setQuantity("");
            setCategory("");
            setImage("");
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingProduct(null);
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="w-64 hidden md:block fixed h-full">
                <AdminMenu />
            </div>
            <div className="flex-1 md:ml-64 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
                        <button 
                            onClick={() => openModal()}
                            className="bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow hover:bg-yellow-500 transition"
                        >
                            Add Product
                        </button>
                    </div>

                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((p) => (
                                    <tr key={p._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    {p.image ? (
                                                        <img className="w-full h-full rounded-full object-cover" src={p.image} alt={p.name} />
                                                    ) : (
                                                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">No Img</div>
                                                    )}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap font-semibold">{p.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap truncate max-w-xs">{p.description}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">${p.price}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{p.quantity}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex gap-2">
                                                <button onClick={() => openModal(p)} className="text-blue-600 hover:text-blue-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-900">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    required 
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                    <input 
                                        type="number" 
                                        value={price} 
                                        onChange={(e) => setPrice(e.target.value)} 
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                                    <input 
                                        type="number" 
                                        value={quantity} 
                                        onChange={(e) => setQuantity(e.target.value)} 
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                        required 
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                                <input 
                                    type="text" 
                                    value={category} 
                                    onChange={(e) => setCategory(e.target.value)} 
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    placeholder="Category ID or Name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                                <input 
                                    type="text" 
                                    value={image} 
                                    onChange={(e) => setImage(e.target.value)} 
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition">
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
