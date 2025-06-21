
import { ShoppingBag, Star } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Brand Name */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-blue-900 leading-tight">
                Lakshmi
                <span className="block text-blue-600">Rajyam</span>
                <span className="block text-3xl lg:text-4xl font-medium text-gray-700">Sarees</span>
              </h1>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-semibold text-blue-800">
                Divine Weaves, Timeless Grace
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                Step into Lakshmi Rajyam – where each six-yard is woven from tradition. Our sarees are handwoven in rich Kanchipuram silk with gleaming gold zari, each piece embodying blessings, heritage and artistry.
              </p>
              <p className="text-lg font-medium text-blue-700">
                Elevate every occasion in our signature weaves.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                View Collections
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">5.0 Rating</span>
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">2000+</span> Happy Customers
              </div>
              <div className="text-gray-600">
                <span className="font-semibold">100%</span> Handloom Certified
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[600px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-2xl overflow-hidden">
              {/* Placeholder for saree image */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center text-blue-600">
                  <div className="w-32 h-32 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                    <div className="w-20 h-20 bg-blue-400 rounded-full opacity-60"></div>
                  </div>
                  <p className="text-lg font-medium">Beautiful Saree Image</p>
                  <p className="text-sm opacity-75">Handwoven Kanchipuram Silk</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-blue-600">
                New Arrival
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-800">Starting from</div>
                <div className="text-lg font-bold text-blue-600">₹15,999</div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 transform rotate-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15</div>
                <div className="text-sm text-gray-600">Day Returns</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 transform -rotate-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">✓</div>
                <div className="text-sm text-gray-600">Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
