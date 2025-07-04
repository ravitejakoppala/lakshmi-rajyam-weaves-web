
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Star, Heart, ShoppingCart, Filter } from 'lucide-react';

export const CategoryPage = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);

  // Mock products data - in real app this would come from API/database
  const products = [
    {
      id: 1,
      name: "Royal Kanjivaram Silk Saree",
      price: 25999,
      originalPrice: 32999,
      rating: 4.8,
      reviews: 124,
      image: "placeholder",
      category: "Kanjivaram"
    },
    {
      id: 2,
      name: "Traditional Kanjivaram Wedding Saree",
      price: 35999,
      originalPrice: 42999,
      rating: 4.9,
      reviews: 89,
      image: "placeholder",
      category: "Kanjivaram"
    },
    {
      id: 3,
      name: "Handwoven Kanjivaram Silk",
      price: 18999,
      originalPrice: 23999,
      rating: 4.7,
      reviews: 156,
      image: "placeholder",
      category: "Kanjivaram"
    }
  ];

  const categoryTitles = {
    'kanjivaram': 'Kanjivaram Silk Sarees',
    'kalamkari': 'Kalamkari Sarees',
    'bandhani': 'Bandhani Sarees',
    'block-print': 'Block Print Sarees'
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {categoryTitles[category as keyof typeof categoryTitles] || 'Category'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our collection of {category} sarees
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>
              
              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Product Image */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                    <button className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
                      <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm">{product.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Actions */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
