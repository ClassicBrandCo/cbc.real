import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Product } from '@/types';

export default function Admin() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    priceUGX: '',
    category: '',
    description: '',
    imageUrl: '',
    sizes: 'S,M,L,XL',
    inStock: true,
    featured: false,
    tag: '',
  });

  // Admin check – replace with your own logic (e.g., email list or custom claim)
  const isAdmin = user?.email === 'admin@example.com'; // CHANGE THIS TO YOUR ADMIN EMAIL

  useEffect(() => {
    if (!isAdmin) return;
    loadProducts();
    loadOrders();
  }, [isAdmin]);

  const loadProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    setProducts(data);
  };

  const loadOrders = async () => {
    const snapshot = await getDocs(collection(db, 'orders'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setOrders(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name: formData.name,
      price: Number(formData.priceUGX),
      category: formData.category,
      description: formData.description,
      imageUrl: formData.imageUrl,
      sizes: formData.sizes.split(',').map(s => s.trim()),
      inStock: formData.inStock,
      featured: formData.featured,
      tag: formData.tag || '',
    };
    if (editingProduct) {
      await updateDoc(doc(db, 'products', editingProduct.id), productData);
    } else {
      await addDoc(collection(db, 'products'), productData);
    }
    resetForm();
    loadProducts();
  };

  const deleteProduct = async (id: string) => {
    if (confirm('Delete product?')) {
      await deleteDoc(doc(db, 'products', id));
      loadProducts();
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      priceUGX: '',
      category: '',
      description: '',
      imageUrl: '',
      sizes: 'S,M,L,XL',
      inStock: true,
      featured: false,
      tag: '',
    });
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      priceUGX: product.priceUGX.toString(),
      category: product.category,
      description: product.description || '',
      imageUrl: product.imageUrl || '',
      sizes: product.sizes?.join(',') || 'S,M,L,XL',
      inStock: product.inStock !== false,
      featured: product.featured || false,
      tag: product.tag || '',
    });
  };

  if (!isAdmin) {
    return <div className="text-center py-20 text-red-500">Access Denied – Admins only.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-display font-bold text-gold mb-8">Admin Dashboard</h1>

      <div className="flex gap-4 border-b border-gold/20 mb-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-2 px-4 font-semibold ${activeTab === 'products' ? 'border-b-2 border-gold text-gold' : 'text-foreground/60'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 px-4 font-semibold ${activeTab === 'orders' ? 'border-b-2 border-gold text-gold' : 'text-foreground/60'}`}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-obsidian-100 p-6 rounded-lg border border-gold/20">
            <h2 className="text-xl font-display mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 rounded border border-obsidian-50 bg-obsidian-900/30 text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price (UGX)</label>
                <input
                  type="number"
                  required
                  value={formData.priceUGX}
                  onChange={e => setFormData({ ...formData, priceUGX: e.target.value })}
                  className="w-full p-2 rounded border border-obsidian-50 bg-obsidian-900/30 text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 rounded border border-obsidian-50 bg-obsidian-900/30 text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 rounded border border-obsidian-50 bg-obsidian-900/30 text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2 rounded border border-obsidian-50 bg-obsidian-900/30 text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sizes (comma separated)</label>
                <input
                  type="text"
                  value={formData.sizes}
                  onChange={e => setFormData({ ...formData, sizes: e.target.value })}
                  className="w-full p-2 rounded border border-obsidian-50 bg-obsidian-900/30 text-foreground"
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                  />
                  In Stock
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Featured
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tag (e.g., Bestseller, New)</label>
                <input
                  type="text"
                  value={formData.tag}
                  onChange={e => setFormData({ ...formData, tag: e.target.value })}
                  className="w-full p-2 rounded border border-obsidian-50 bg-obsidian-900/30 text-foreground"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-gold text-obsidian px-6 py-2 rounded font-semibold hover:bg-yellow-400"
                >
                  {editingProduct ? 'Update' : 'Create'}
                </button>
                {editingProduct && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="border border-gold/50 text-gold px-6 py-2 rounded font-semibold hover:bg-gold/10"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Product List */}
          <div className="bg-obsidian-100 p-6 rounded-lg border border-gold/20 overflow-auto max-h-[600px]">
            <h2 className="text-xl font-display mb-4">Product List</h2>
            <div className="space-y-3">
              {products.map(p => (
                <div key={p.id} className="flex justify-between items-center border-b border-obsidian-50 pb-2">
                  <div>
                    <span className="font-medium">{p.name}</span>
                    <span className="text-sm text-foreground/60 ml-2">UGX {p.priceUGX}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editProduct(p)}
                      className="text-gold hover:text-yellow-400 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="text-red-400 hover:text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-obsidian-100 p-6 rounded-lg border border-gold/20 overflow-auto">
          <h2 className="text-xl font-display mb-4">Orders</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-obsidian-50">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b border-obsidian-50/50">
                  <td className="py-2">{order.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}</td>
                  <td className="py-2">{order.customer?.fullName || order.customer?.email || '?'}</td>
                  <td className="py-2">UGX {order.totalUGX?.toLocaleString()}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-900 text-green-300' :
                        order.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-gray-800 text-gray-300'
                      }`}>
                      {order.status || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}