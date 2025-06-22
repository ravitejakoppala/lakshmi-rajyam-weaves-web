
import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Filter, AlertTriangle, Percent } from 'lucide-react';
import { productSchema } from '../lib/validationSchemas';
import { sanitizeInput } from '../lib/auth';
import { z } from 'zod';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  stock: number;
  status: string;
  image: string;
  description?: string;
}

export const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Royal Kanjivaram Silk Saree',
      category: 'Kanjivaram',
      price: 25999,
      stock: 12,
      status: 'Active',
      image: 'placeholder'
    },
    {
      id: 2,
      name: 'Handpainted Kalamkari Saree',
      category: 'Kalamkari',
      price: 18500,
      originalPrice: 22000,
      discountPercentage: 16,
      stock: 8,
      status: 'Active',
      image: 'placeholder'
    },
    {
      id: 3,
      name: 'Traditional Bandhani Saree',
      category: 'Bandhani',
      price: 12000,
      stock: 15,
      status: 'Active',
      image: 'placeholder'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [showFilters, setShowFilters] = useState(false);

  const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number) => {
    return Math.round(originalPrice * (1 - discountPercentage / 100));
  };

  const handleAddProduct = (newProduct: any) => {
    try {
      const validatedProduct = productSchema.parse(newProduct);
      let finalPrice = validatedProduct.price;
      
      // Calculate discounted price if discount is provided
      if (newProduct.discountPercentage && newProduct.discountPercentage > 0) {
        finalPrice = calculateDiscountedPrice(validatedProduct.price, newProduct.discountPercentage);
      }
      
      const product: Product = {
        id: Date.now(),
        name: validatedProduct.name,
        category: validatedProduct.category,
        price: finalPrice,
        originalPrice: newProduct.discountPercentage > 0 ? validatedProduct.price : undefined,
        discountPercentage: newProduct.discountPercentage > 0 ? newProduct.discountPercentage : undefined,
        stock: validatedProduct.stock,
        status: validatedProduct.status || 'Active',
        image: 'placeholder',
        description: validatedProduct.description
      };
      setProducts([...products, product]);
      setShowAddForm(false);
      console.log('Product added successfully:', product.name);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleEditProduct = (updatedProduct: any) => {
    try {
      const validatedProduct = productSchema.parse(updatedProduct);
      setProducts(products.map(p => p.id === updatedProduct.id ? {
        ...p,
        name: validatedProduct.name,
        category: validatedProduct.category,
        price: validatedProduct.price,
        stock: validatedProduct.stock,
        status: validatedProduct.status || 'Active',
        description: validatedProduct.description
      } : p));
      setEditingProduct(null);
      console.log('Product updated successfully:', validatedProduct.name);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      console.log('Product deleted:', id);
    }
  };

  const sanitizedSearchTerm = sanitizeInput(searchTerm);
  let filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(sanitizedSearchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(sanitizedSearchTerm.toLowerCase())
  );

  // Apply category filter
  if (filterCategory) {
    filteredProducts = filteredProducts.filter(product => product.category === filterCategory);
  }

  // Apply price range filter
  filteredProducts = filteredProducts.filter(product => 
    product.price >= priceRange.min && product.price <= priceRange.max
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Product Management</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            maxLength={100}
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">All Categories</option>
                <option value="Kanjivaram">Kanjivaram</option>
                <option value="Kalamkari">Kalamkari</option>
                <option value="Bandhani">Bandhani</option>
                <option value="Block Print">Block Print</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Price (₹)</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Max Price (₹)</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 100000 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                min="0"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                setFilterCategory('');
                setPriceRange({ min: 0, max: 100000 });
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
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
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</div>
                      {product.discountPercentage && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            <Percent className="w-3 h-3 mr-1" />
                            {product.discountPercentage}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {product.originalPrice ? (
                      <>
                        <div className="font-bold text-red-600 dark:text-red-400">₹{product.price.toLocaleString()}</div>
                        <div className="text-gray-500 dark:text-gray-400 line-through text-xs">₹{product.originalPrice.toLocaleString()}</div>
                      </>
                    ) : (
                      <div className="font-medium text-gray-900 dark:text-white">₹{product.price.toLocaleString()}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {product.status}
                  </span>
                </td>
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

      {/* Add/Edit Product Form */}
      {(showAddForm || editingProduct) && (
        <ProductForm
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

// Product Form Component with discount functionality
const ProductForm = ({ product, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Kanjivaram',
    price: product?.originalPrice || product?.price || '',
    discountPercentage: product?.discountPercentage || 0,
    stock: product?.stock || '',
    description: product?.description || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const discountedPrice = formData.price && formData.discountPercentage > 0
    ? Math.round(formData.price * (1 - formData.discountPercentage / 100))
    : formData.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        category: formData.category,
        price: parseInt(formData.price.toString()),
        discountPercentage: formData.discountPercentage,
        stock: parseInt(formData.stock.toString()),
        description: sanitizeInput(formData.description)
      };

      // Validate
      const validatedData = productSchema.parse(sanitizedData);
      
      onSave({
        ...product,
        ...validatedData,
        discountPercentage: sanitizedData.discountPercentage
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[10000] p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {product ? 'Edit Product' : 'Add New Product'}
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
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                  errors.name ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                }`}
                required
                maxLength={200}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                  errors.price ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                }`}
                required
                min="1"
                max="1000000"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {errors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Discount % (Optional)</label>
              <input
                type="number"
                value={formData.discountPercentage}
                onChange={(e) => setFormData({ ...formData, discountPercentage: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                min="0"
                max="90"
              />
            </div>

            {formData.discountPercentage > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Final Price (Auto-calculated)</label>
                <input
                  type="text"
                  value={`₹${discountedPrice.toLocaleString()}`}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  readOnly
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                  errors.stock ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                }`}
                required
                min="0"
                max="10000"
              />
              {errors.stock && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {errors.stock}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              maxLength={1000}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
            >
              {product ? 'Update' : 'Add'} Product
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
