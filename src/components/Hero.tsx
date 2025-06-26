
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-gray-900 dark:via-slate-900 dark:to-black overflow-hidden">
      {/* Fixed spacing with proper padding for header */}
      <div className="absolute inset-0 pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full max-w-7xl mx-auto">
            {/* Content with improved spacing and z-index */}
            <div className="text-white space-y-6 lg:space-y-8 relative z-10">
              {/* Quality Badge */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-3 bg-green-600/90 backdrop-blur-sm border border-green-400/50 rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4 text-green-300" />
                  <span className="text-green-100 font-medium text-sm">Premium Quality</span>
                </div>
                <span className="text-gray-300 text-sm font-medium">Handwoven Silk</span>
              </div>

              {/* Handcrafted Badge */}
              <div className="inline-flex items-center gap-3 bg-blue-600/90 backdrop-blur-sm border border-blue-400/50 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-100 font-medium text-sm">Handcrafted with Love</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span className="text-white">Timeless </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Elegance
                </span>
                <br />
                <span className="text-white">in Every Thread</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Discover our exquisite collection of handwoven sarees that blend traditional artistry with contemporary elegance.
              </p>

              {/* Buttons with improved spacing and isolation */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-8 relative z-20">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/10 min-w-[180px] relative z-30"
                >
                  Shop Collection
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/new-arrivals"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl min-w-[160px] relative z-30"
                >
                  New Arrivals
                </Link>
              </div>

              {/* Stats - Improved responsive design for tablets */}
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-4">
                <div className="text-center min-w-[80px] sm:min-w-[100px]">
                  <div className="text-xl sm:text-2xl font-bold text-white">1000+</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Happy Customers</div>
                </div>
                <div className="text-center min-w-[80px] sm:min-w-[100px]">
                  <div className="text-xl sm:text-2xl font-bold text-white">500+</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Unique Designs</div>
                </div>
                <div className="text-center min-w-[80px] sm:min-w-[100px]">
                  <div className="text-xl sm:text-2xl font-bold text-white">50+</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Years Legacy</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:block hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                {!imageLoaded && (
                  <div className="w-full h-[600px] bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl animate-pulse"></div>
                )}
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"
                  alt="Beautiful Saree Collection"
                  className={`relative w-full h-[600px] object-cover rounded-3xl shadow-2xl transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
    </div>
  );
};
