
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Star, Heart, ShoppingCart, Truck, Shield, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('Free Size');
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, this would be fetched based on ID
  const product = {
    id: parseInt(id || '1'),
    name: "Traditional Kanjivaram Silk Saree",
    price: 28999,
    originalPrice: 32999,
    rating: 4.8,
    reviews: 124,
    discount: 12,
    category: "Kanjivaram",
    description: "Exquisite handwoven Kanjivaram silk saree featuring intricate gold zari work and traditional motifs. Perfect for weddings and special occasions.",
    features: [
      "100% Pure Silk",
      "Handwoven by master craftsmen",
      "Rich gold zari work",
      "Traditional temple border",
      "Includes matching blouse piece"
    ],
    specifications: {
      "Fabric": "Pure Kanjivaram Silk",
      "Length": "6.5 meters + 0.8m blouse",
      "Care": "Dry clean only",
      "Origin": "Kanchipuram, Tamil Nadu",
      "Weight": "650 grams"
    },
    images: ["placeholder", "placeholder", "placeholder"]
  };

  const sizes = ['Free Size'];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                </div>
                <p className="font-medium">Product Image</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((_, index) => (
                <div key={index} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {product.rating}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Size</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  -
                </button>
                <span className="w-16 text-center font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Heart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">On orders above ₹2000</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Authentic</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">100% Genuine Products</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">Easy Returns</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">7-day return policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Specifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <span className="font-medium text-gray-600 dark:text-gray-400">{key}:</span>
                <span className="text-gray-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
