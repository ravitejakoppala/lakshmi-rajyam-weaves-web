
import { Mail, Gift, Bell, Star } from 'lucide-react';

export const Newsletter = () => {
  return (
    <section className="py-20 bg-blue-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay Connected
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter and enjoy 10% off your first order. Get exclusive updates on new arrivals and special offers.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">10% Off First Order</h3>
              <p className="text-blue-200">Exclusive welcome discount for new subscribers</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Early Access</h3>
              <p className="text-blue-200">Be the first to see new collections</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-200" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Special Offers</h3>
              <p className="text-blue-200">Exclusive deals and seasonal discounts</p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Join Our Newsletter</h3>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap">
                  Subscribe Now
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">2000+ Subscribers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">No Spam</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Unsubscribe Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
