import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ADMIN_EMAILS } from '@/constants/config';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import type { Product, Order } from '@/types';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: '', priceUGX: 0, category: '', description: '', imageUrl: '', sizes: [], inStock: true, featured: false, tag: '' });
  const [editingId, setEditingId] = useState('');
  const [tab, setTab] = useState('products');

  useEffect(() => {
    if (!user || !ADMIN_EMAILS.includes(user.email || '')) {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const productsSnap = await getDocs(query(collection(db, 'products'), orderBy('name')));
      setProducts(productsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));

      const ordersSnap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
      setOrders(ordersSnap.docs.map(d => ({ id: d.id, ...d.data() } as Order)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), { ...newProduct, createdAt: new Date() });
      setNewProduct({ name: '', priceUGX: 0, category: '', description: '', imageUrl: '', sizes: [], inStock: true, featured: false, tag: '' });
      loadData();
    } catch (e) {
      alert('Add failed');
    }
  };

  const saveEdit = async (id: string, product: Product) => {
    try {
      await updateDoc(doc(db, 'products', id), product);
      setEditingId('');
      loadData();
    } catch (e) {
      alert('Update failed');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      loadData();
    } catch (e) {
      alert('Delete failed');
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status });
      loadData();
    } catch (e) {
      alert('Update failed');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">Manage products and orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1 bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Navigation</h2>
            <nav className="space-y-4">
              <button
                onClick={() => setTab('products')}
                className={`w-full p-4 rounded-xl transition-all ${tab === 'products' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
              >
                Products ({products.length})
              </button>
              <button
                onClick={() => setTab('orders')}
                className={`w-full p-4 rounded-xl transition-all ${tab === 'orders' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
              >
                Orders ({orders.length})
              </button>
            </nav>
            <button
              onClick={loadData}
              className="mt-8 w-full bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Refresh Data
            </button>
          </div>

          <div className="lg:col-span-3">
            {tab === 'products' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">➕ Add Product</h3>
                    <form onSubmit={addProduct} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          required
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Price (UGX)</label>
                          <input
                            type="number"
                            required
                            value={newProduct.priceUGX}
                            onChange={(e) => setNewProduct({...newProduct, priceUGX: Number(e.target.value)})}
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                          <input
                            type="text"
                            required
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input
                          type="url"
                          value={newProduct.imageUrl}
                          onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={3}
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 transition-all"
                        />
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newProduct.inStock}
                            onChange={(e) => setNewProduct({...newProduct, inStock: e.target.checked})}
                          />
                          In Stock
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newProduct.featured}
                            onChange={(e) => setNewProduct({...newProduct, featured: e.target.checked})}
                          />
                          Featured
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:from-green-600 hover:to-emerald-700"
                      >
                        ➕ Add Product
                      </button>
                    </form>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Stats</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                        <div className="text-3xl font-bold text-blue-600">{products.length}</div>
                        <div className="text-sm text-gray-600 mt-1">Total Products</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
                        <div className="text-3xl font-bold text-emerald-600">{products.filter(p => p.featured).length}</div>
                        <div className="text-sm text-gray-600 mt-1">Featured</div>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                        <div className="text-3xl font-bold text-orange-600">{products.filter(p => !p.inStock).length}</div>
                        <div className="text-sm text-gray-600 mt-1">Out of Stock</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">📦 Products List</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-6 text-left font-semibold text-gray-900">Image</th>
                          <th className="p-6 text-left font-semibold text-gray-900">Name</th>
                          <th className="p-6 text-left font-semibold text-gray-900">Price</th>
                          <th className="p-6 text-left font-semibold text-gray-900">Category</th>
                          <th className="p-6 text-left font-semibold text-gray-900">Stock</th>
                          <th className="p-6 text-left font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="p-6">
                              <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-xl shadow-md" />
                            </td>
                            <td className="p-6 font-medium text-gray-900">{product.name}</td>
                            <td className="p-6 font-semibold text-green-600">UGX {product.priceUGX.toLocaleString()}</td>
                            <td className="p-6">
                              <span className="px-4 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-semibold rounded-full">
                                {product.category}
                              </span>
                            </td>
                            <td className="p-6">
                              <span className={`px-3 py-1 rounded-full font-semibold text-sm ${
                                product.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="p-6">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setEditingId(product.id || '')}
                                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteProduct(product.id || '')}
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {editingId && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <h3 className="text-2xl font-bold mb-6">Edit Product</h3>
                      {/* Simplified edit form */}
                      <button onClick={() => setEditingId('')} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        ✕
                      </button>
                      <button onClick={() => saveEdit(editingId, products.find(p => p.id === editingId) || newProduct as Product)} className="bg-blue-500 text-white px-6 py-2 rounded-xl mb-4">
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {tab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Orders</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-6 text-left font-semibold text-gray-900">ID</th>
                        <th className="p-6 text-left font-semibold text-gray-900">Customer</th>
                        <th className="p-6 text-left font-semibold text-gray-900">Total</th>
                        <th className="p-6 text-left font-semibold text-gray-900">Status</th>
                        <th className="p-6 text-left font-semibold text-gray-900">Date</th>
                        <th className="p-6 text-left font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-6 font-mono text-sm text-gray-500">{order.id?.slice(-8)}</td>
                          <td className="p-6">{order.customer?.fullName}</td>
                          <td className="p-6 font-semibold text-green-600">UGX {order.totalUGX?.toLocaleString()}</td>
                          <td className="p-6">
                            <select
                              onChange={(e) => updateStatus(order.id || '', e.target.value)}
                              className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-emerald-100 focus:border-emerald-300 transition-all text-sm"
                              defaultValue={order.status}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="p-6 text-sm text-gray-500">{order.createdAt?.toDate().toLocaleDateString()}</td>
                          <td className="p-6">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all text-sm font-semibold">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {orders.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📦</div>
                      <h3 className="text-2xl font-bold text-gray-500 mb-2">No orders yet</h3>
                      <p className="text-gray-400">Orders will appear here when customers place them.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

