
import { ShoppingBag, Star, ArrowRight, Truck, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-300 dark:bg-blue-700 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400 dark:bg-blue-600 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Brand Name */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-blue-900 dark:text-blue-100 leading-tight">
                Lakshmi
                <span className="block text-blue-600 dark:text-blue-400">Rajyam</span>
                <span className="block text-3xl lg:text-4xl font-medium text-gray-700 dark:text-gray-300">Sarees</span>
              </h1>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-semibold text-blue-800 dark:text-blue-200">
                Premium Handloom Collection
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                Discover our exquisite collection of handwoven sarees. From luxurious Kanjivaram silks to vibrant Bandhani prints, each piece is crafted with love and tradition.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </Link>
              <Link
                to="/categories"
                className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Browse Collections
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Free Shipping</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Above ₹2000</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">15 Day Returns</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Easy Exchange</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">Certified</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">100% Handloom</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[600px] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 rounded-3xl shadow-2xl overflow-hidden">
              {/* Featured Product */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-blue-500/20 dark:from-blue-800/20 dark:to-blue-600/20 flex items-center justify-center">
                <div className="text-center text-blue-600 dark:text-blue-300">
                  <div className="w-32 h-32 mx-auto mb-4 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center">
                    <div className="w-20 h-20 bg-blue-400 dark:bg-blue-500 rounded-full opacity-60"></div>
                  </div>
                  <p className="text-lg font-medium">Featured Collection</p>
                  <p className="text-sm opacity-75">Royal Kanjivaram Silks</p>
                </div>
              </div>
              
              {/* Product Badge */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-full px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                Bestseller
              </div>
              
              {/* Price Tag */}
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Starting from</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">₹15,999</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 line-through">₹19,999</div>
              </div>

              {/* Quick Action */}
              <div className="absolute bottom-4 right-4">
                <Link
                  to="/products"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Floating Rating Card */}
            <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 transform rotate-12">
              <div className="flex items-center gap-2">
                <div className="flex">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">5.0 Rating</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">2000+ Reviews</div>
            </div>
            
            {/* Floating Discount Badge */}
            <div className="absolute -bottom-6 -right-6 bg-green-500 dark:bg-green-600 text-white rounded-2xl shadow-xl p-4 transform -rotate-12">
              <div className="text-center">
                <div className="text-2xl font-bold">20%</div>
                <div className="text-sm">OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
