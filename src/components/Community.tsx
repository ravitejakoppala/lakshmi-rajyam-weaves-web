
import { Instagram, Camera, Users, Heart } from 'lucide-react';

export const Community = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Share your Lakshmi Rajyam style! Tag @LakshmiRajyamSarees on Instagram and be featured in our gallery. See how women nationwide celebrate their heritage in our weaves.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Instagram Feature */}
          <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Share Your Style</h3>
            <p className="text-gray-600 mb-4">Tag us @LakshmiRajyamSarees</p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              Follow Us
            </button>
          </div>

          {/* Gallery Feature */}
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Featured</h3>
            <p className="text-gray-600 mb-4">Be part of our gallery</p>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              View Gallery
            </button>
          </div>

          {/* Community Stats */}
          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">2000+ Members</h3>
            <p className="text-gray-600 mb-4">Women celebrating heritage</p>
            <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
              Join Community
            </button>
          </div>
        </div>

        {/* Instagram Grid Mockup */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            #LakshmiRajyamStyle
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Camera className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs">Customer Photo</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
