
import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, AlertTriangle, Percent } from 'lucide-react';
import { productSchema } from '../lib/validationSchemas';
import { sanitizeInput } from '../lib/auth';
import { z } from 'zod';

interface SalesProduct {
  id: number;
  name: string;
  category: string;
  originalPrice: number;
  discountPercentage: number;
  discountedPrice: number;
  stock: number;
  status: string;
  image: string;
  description?: string;
}

export const SalesManager = () => {
  const [salesProducts, setSalesProducts] = useState<SalesProduct[]>([
    {
      id: 1,
      name: 'Discounted Royal Kanjivaram',
      category: 'Kanjivaram',
      originalPrice: 35999,
      discountPercentage: 35,
      discountedPrice: 23399,
      stock: 8,
      status: 'Active',
      image: 'placeholder'
    },
    {
      id: 2,
      name: 'Festival Sale Kalamkari',
      category: 'Kalamkari',
      originalPrice: 22500,
      discountPercentage: 40,
      discountedPrice: 13500,
      stock: 5,
      status: 'Active',
      image: 'placeholder'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SalesProduct | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number) => {
    return Math.round(originalPrice * (1 - discountPercentage / 100));
  };

  const handleAddProduct = (newProduct: any) => {
    try {
      const discountedPrice = calculateDiscountedPrice(newProduct.originalPrice, newProduct.discountPercentage);
      
      const product: SalesProduct = {
        id: Date.now(),
        name: sanitizeInput(newProduct.name),
        category: newProduct.category,
        originalPrice: newProduct.originalPrice,
        discountPercentage: newProduct.discountPercentage,
        discountedPrice,
        stock: newProduct.stock,
        status: newProduct.status || 'Active',
        image: 'placeholder',
        description: sanitizeInput(newProduct.description || '')
      };
      
      setSalesProducts([...salesProducts, product]);
      setShowAddForm(false);
      console.log('Sales product added successfully:', product.name);
    } catch (error) {
      console.error('Error adding sales product:', error);
    }
  };

  const handleEditProduct = (updatedProduct: any) => {
    try {
      const discountedPrice = calculateDiscountedPrice(updatedProduct.originalPrice, updatedProduct.discountPercentage);
      
      setSalesProducts(salesProducts.map(p => p.id === updatedProduct.id ? {
        ...p,
        name: sanitizeInput(updatedProduct.name),
        category: updatedProduct.category,
        originalPrice: updatedProduct.originalPrice,
        discountPercentage: updatedProduct.discountPercentage,
        discountedPrice,
        stock: updatedProduct.stock,
        status: updatedProduct.status || 'Active',
        description: sanitizeInput(updatedProduct.description || '')
      } : p));
      
      setEditingProduct(null);
      console.log('Sales product updated successfully');
    } catch (error) {
      console.error('Error updating sales product:', error);
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this sales product?')) {
      setSalesProducts(salesProducts.filter(p => p.id !== id));
      console.log('Sales product deleted:', id);
    }
  };

  const sanitizedSearchTerm = sanitizeInput(searchTerm);
  const filteredProducts = salesProducts.filter(product =>
    product.name.toLowerCase().includes(sanitizedSearchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(sanitizedSearchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Sales Management</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Products with discount ≥ 30%</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Sale Product
        </button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search sales products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            maxLength={100}
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Original Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Discount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sale Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">IMG</span>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    <Percent className="w-3 h-3 mr-1" />
                    {product.discountPercentage}% OFF
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600 dark:text-red-400">₹{product.discountedPrice.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingProduct) && (
        <SalesProductForm
          product={editingProduct}
          onSave={editingProduct ? handleEditProduct : handleAddProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

const SalesProductForm = ({ product, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Kanjivaram',
    originalPrice: product?.originalPrice || '',
    discountPercentage: product?.discountPercentage || 30,
    stock: product?.stock || '',
    description: product?.description || ''
  });

  const discountedPrice = formData.originalPrice && formData.discountPercentage 
    ? Math.round(formData.originalPrice * (1 - formData.discountPercentage / 100))
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.discountPercentage < 30) {
      alert('Discount percentage must be at least 30% for sales products');
      return;
    }

    onSave({
      ...product,
      ...formData,
      originalPrice: parseInt(formData.originalPrice.toString()),
      stock: parseInt(formData.stock.toString())
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {product ? 'Edit Sales Product' : 'Add Sales Product'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
                maxLength={200}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="Kanjivaram">Kanjivaram</option>
                <option value="Kalamkari">Kalamkari</option>
                <option value="Bandhani">Bandhani</option>
                <option value="Block Print">Block Print</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Original Price (₹)</label>
              <input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount % (Min 30%)</label>
              <input
                type="number"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({ ...formData, discountPercentage: parseInt(e.target.value) || 30 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
                min="30"
                max="90"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sale Price (Auto-calculated)</label>
              <input
                type="text"
                value={`₹${discountedPrice.toLocaleString()}`}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              maxLength={1000}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
            >
              {product ? 'Update' : 'Add'} Sales Product
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
