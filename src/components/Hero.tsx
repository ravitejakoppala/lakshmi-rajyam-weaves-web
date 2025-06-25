
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-gray-900 dark:via-slate-900 dark:to-black overflow-hidden">
      {/* Ensure proper spacing from header with increased top padding */}
      <div className="absolute inset-0 pt-32 sm:pt-36 lg:pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full max-w-7xl mx-auto">
            {/* Content with improved spacing and z-index */}
            <div className="text-white space-y-8 lg:space-y-10 z-50 relative">
              {/* Quality Badge with better positioning */}
              <div className="flex flex-wrap items-center gap-4 mb-8 relative z-50">
                <div className="flex items-center gap-3 bg-green-500/20 dark:bg-green-600/30 backdrop-blur-sm border border-green-400/30 dark:border-green-500/40 rounded-full px-5 py-3">
                  <Sparkles className="w-5 h-5 text-green-400 dark:text-green-300" />
                  <span className="text-green-300 dark:text-green-200 font-medium text-base">Premium Quality</span>
                </div>
                <span className="text-gray-300 dark:text-gray-400 text-base font-medium">Handwoven Silk</span>
              </div>

              {/* Handcrafted Badge with improved styling */}
              <div className="inline-flex items-center gap-3 bg-blue-500/20 dark:bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 dark:border-blue-500/40 rounded-full px-5 py-3 mb-8 relative z-50">
                <div className="w-3 h-3 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse"></div>
                <span className="text-blue-300 dark:text-blue-200 font-medium text-base">Handcrafted with Love</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 relative z-50">
                <span className="text-white dark:text-gray-100">Timeless </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
                  Elegance
                </span>
                <br />
                <span className="text-white dark:text-gray-100">in Every Thread</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 dark:text-gray-400 leading-relaxed max-w-2xl mb-12 relative z-50">
                Discover our exquisite collection of handwoven sarees that blend traditional artistry with contemporary elegance.
              </p>

              {/* Buttons with proper spacing, z-index, and no overlap - FIXED POSITIONING */}
              <div className="flex flex-col sm:flex-row gap-6 relative z-50 mb-20 sm:mb-24 lg:mb-32">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-sm border border-white/10 min-w-[200px] relative z-50"
                >
                  Shop Collection
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link
                  to="/new-arrivals"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/15 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl min-w-[180px] relative z-50"
                >
                  New Arrivals
                </Link>
              </div>

              {/* Stats with better spacing and positioning */}
              <div className="flex flex-wrap gap-8 relative z-50">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white dark:text-gray-100">1000+</div>
                  <div className="text-gray-400 dark:text-gray-500 text-base">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white dark:text-gray-100">500+</div>
                  <div className="text-gray-400 dark:text-gray-500 text-base">Unique Designs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white dark:text-gray-100">50+</div>
                  <div className="text-gray-400 dark:text-gray-500 text-base">Years Legacy</div>
                </div>
              </div>
            </div>

            {/* Hero Image with loading animation */}
            <div className="relative lg:block hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-600/30 dark:to-purple-600/30 rounded-3xl blur-3xl"></div>
                {!imageLoaded && (
                  <div className="w-full h-[600px] bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-3xl animate-pulse"></div>
                )}
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"
                  alt="Beautiful Saree Collection"
                  className={`relative w-full h-[600px] object-cover rounded-3xl shadow-2xl transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 dark:from-black/50 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
    </div>
  );
};
