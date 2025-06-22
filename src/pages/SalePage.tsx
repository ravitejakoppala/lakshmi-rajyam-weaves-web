
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Star, Heart, ShoppingCart } from 'lucide-react';

export const SalePage = () => {
  const saleProducts = [
    {
      id: 1,
      name: "Discounted Kanjivaram",
      price: 22999,
      originalPrice: 32999,
      rating: 4.7,
      reviews: 89,
      image: "placeholder",
      discount: 30
    },
    {
      id: 2,
      name: "Sale Block Print",
      price: 8999,
      originalPrice: 12999,
      rating: 4.6,
      reviews: 124,
      image: "placeholder",
      discount: 31
    }
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {saleProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {product.discount}% OFF
                </span>
                <button className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md">
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
      </div>

      <Footer />
    </div>
  );
};
