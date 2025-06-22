
import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Star, Heart, ShoppingCart, Filter, X } from 'lucide-react';

export const SalePage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('price-low');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

  const allSaleProducts = [
    {
      id: 1,
      name: "Discounted Kanjivaram",
      price: 22999,
      originalPrice: 32999,
      rating: 4.7,
      reviews: 89,
      image: "placeholder",
      discount: 30,
      category: "Kanjivaram"
    },
    {
      id: 2,
      name: "Sale Block Print",
      price: 8999,
      originalPrice: 12999,
      rating: 4.6,
      reviews: 124,
      image: "placeholder",
      discount: 31,
      category: "Block Print"
    },
    {
      id: 3,
      name: "Traditional Kanjivaram Wedding Saree",
      price: 35999,
      originalPrice: 42999,
      rating: 4.9,
      reviews: 89,
      image: "placeholder",
      discount: 16,
      category: "Kanjivaram"
    },
    {
      id: 4,
      name: "Handwoven Kanjivaram Silk",
      price: 18999,
      originalPrice: 23999,
      rating: 4.7,
      reviews: 156,
      image: "placeholder",
      discount: 21,
      category: "Kanjivaram"
    }
  ];

  // Filter and sort products
  let filteredProducts = allSaleProducts.filter(product => 
    product.price >= priceRange.min && product.price <= priceRange.max
  );

  // Sort products
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      filteredProducts.sort((a, b) => b.discount - a.discount);
      break;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sale Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Get amazing discounts on premium sarees
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-80 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-500 dark:text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
                <option value="discount">Discount: High to Low</option>
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
                setSortBy('price-low');
                setPriceRange({ min: 0, max: 50000 });
              }}
              className="w-full text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} products
              </p>
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                    <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.discount}% OFF
                    </span>
                    <button className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.rating}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setSortBy('price-low');
                    setPriceRange({ min: 0, max: 50000 });
                  }}
                  className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
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
