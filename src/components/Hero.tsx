
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Timeless Elegance in Every Thread",
      subtitle: "Discover our exquisite collection of handwoven sarees",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=800&fit=crop",
      cta: "Shop Collection"
    },
    {
      title: "Heritage Meets Modern Grace",
      subtitle: "Traditional craftsmanship for the contemporary woman",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&h=800&fit=crop",
      cta: "Explore Now"
    },
    {
      title: "Celebrate Your Special Moments",
      subtitle: "Perfect sarees for weddings and festivals",
      image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1200&h=800&fit=crop",
      cta: "View Wedding Collection"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Add extra padding to prevent navbar overlap */}
      <div className="absolute inset-0 pt-20 sm:pt-24 lg:pt-32">
        <div className="container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Content */}
            <div className="text-white space-y-6 lg:space-y-8 z-10">
              {/* Quality Badge */}
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full px-3 sm:px-4 py-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-green-300 font-medium text-sm sm:text-base">Premium Quality</span>
                </div>
                <span className="text-gray-300 text-sm sm:text-base">Handwoven Silk</span>
              </div>

              {/* Handcrafted Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 sm:px-4 py-2 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-300 font-medium text-sm sm:text-base">Handcrafted with Love</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white">Timeless </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Elegance
                </span>
                <br />
                <span className="text-white">in Every Thread</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Discover our exquisite collection of handwoven sarees that blend traditional artistry with contemporary elegance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <Link
                  to="/new-arrivals"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300"
                >
                  New Arrivals
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 sm:gap-8 pt-6 sm:pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">1000+</div>
                  <div className="text-gray-400 text-sm sm:text-base">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                  <div className="text-gray-400 text-sm sm:text-base">Unique Designs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">50+</div>
                  <div className="text-gray-400 text-sm sm:text-base">Years Legacy</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative lg:block hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"
                  alt="Beautiful Saree Collection"
                  className="relative w-full h-[600px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
    </div>
  );
};
