
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Star, Heart, ShoppingCart, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useProducts } from '../hooks/useProducts';

export const ProductsPage = () => {
  const { products, categories, loading } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

  // Filter products
  let filteredProducts = products.filter(product => {
    const matchesCategory = categoryFilter === 'all' || product.category_id === categoryFilter;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesCategory && matchesPrice && product.status === 'active';
  });

  // Sort products
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading products...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Explore our complete collection of handcrafted sarees
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
            >
              <Filter className="w-4 h-4" />
              Filters & Sort
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`${
            showFilters ? 'fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:relative lg:inset-auto' : 'hidden'
          } lg:block`}>
            <div className={`${
              showFilters ? 'absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-800 p-4 overflow-y-auto' : ''
            } lg:relative lg:w-80 lg:bg-white lg:dark:bg-gray-800 lg:p-6 lg:rounded-lg lg:shadow-md lg:h-fit`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 dark:text-gray-400 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={categoryFilter === 'all'}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={categoryFilter === category.id}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="mr-2 text-blue-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">Min Price</label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-sm text-gray-700 dark:text-gray-300">₹{priceRange.min.toLocaleString()}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 dark:text-gray-400">Max Price</label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="text-sm text-gray-700 dark:text-gray-300">₹{priceRange.max.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setSortBy('name');
                  setPriceRange({ min: 0, max: 50000 });
                }}
                className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 sm:mb-6">
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Showing {filteredProducts.length} products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                      {product.discount_percentage > 0 && (
                        <span className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {product.discount_percentage}% OFF
                        </span>
                      )}
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <div className="text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                            </div>
                            <p className="font-medium text-sm">Product Image</p>
                          </div>
                        </div>
                      )}
                      <button className="absolute top-2 sm:top-3 right-2 sm:right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>

                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">4.5</span>
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">(50+ reviews)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.original_price && product.original_price > product.price && (
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                            ₹{product.original_price.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm sm:text-base">
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setCategoryFilter('all');
                    setSortBy('name');
                    setPriceRange({ min: 0, max: 50000 });
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Reset filters to see all products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
