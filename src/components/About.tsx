
import { Heart, Award, Users, Shield } from 'lucide-react';

export const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Our Heritage & Promise
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Rooted in Eluru's handloom heritage, Lakshmi Rajyam Sarees is a family-owned boutique celebrating South Indian craftsmanship. We honor generations of artisans by bringing authentic handloom beauty to modern wardrobes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-blue-800">Inspired by Divine Elegance</h3>
              <p className="text-gray-600 leading-relaxed">
                Inspired by the goddess of prosperity, each collection blends divine elegance with quality. Our promise is simple: exquisite weaves and exceptional value in every saree.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Family Heritage</h4>
                  <p className="text-sm text-gray-600">Generations of craftsmanship</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Quality Assured</h4>
                  <p className="text-sm text-gray-600">100% handloom certified</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Supporting Artisans</h4>
                  <p className="text-sm text-gray-600">Empowering local craftsmen</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Authentic Weaves</h4>
                  <p className="text-sm text-gray-600">Traditional techniques</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg flex items-center justify-center">
              <div className="text-center text-blue-600">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-400 rounded-full opacity-60"></div>
                </div>
                <p className="font-medium">Artisan at Work Image</p>
                <p className="text-sm opacity-75">Traditional Handloom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
