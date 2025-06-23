
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden px-4 sm:px-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 sm:w-64 h-32 sm:h-64 border-2 border-blue-300 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 sm:w-48 h-24 sm:h-48 border-2 border-purple-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 border border-pink-300 rounded-full"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Handcrafted with Love
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Timeless
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> 
                {" "}Elegance
              </span>
              <br />
              in Every Thread
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Discover our exquisite collection of handwoven sarees, where traditional craftsmanship meets contemporary style.
            </p>

            {/* Features */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <span>1000+ Happy Customers</span>
              <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
              <span>Authentic Handloom</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              
              <Link
                to="/new-arrivals"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300"
              >
                View Collection
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 sm:gap-8 pt-4 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Designs</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">25+</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Authentic</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative z-20">
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-3xl overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Sparkles className="w-8 sm:w-12 h-8 sm:h-12 text-white" />
                    </div>
                    <p className="text-base sm:text-lg font-medium">Featured Saree</p>
                    <p className="text-sm">Premium Collection</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="w-3 sm:w-4 h-3 sm:h-4 text-white fill-current" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">Premium Quality</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Handwoven Silk</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">₹28,999</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Starting from</div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -top-8 sm:-top-12 -right-8 sm:-right-12 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-12 sm:w-24 h-12 sm:h-24 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
