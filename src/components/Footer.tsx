
import { MapPin, Phone, Clock, Instagram, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-blue-400 mb-4">
              Lakshmi Rajyam Sarees
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Where every saree tells a story. Celebrating the rich heritage of South Indian handloom craftsmanship with divine elegance and timeless grace.
            </p>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/lakshmirajyamsarees" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-pink-600 hover:bg-pink-700 p-3 rounded-lg transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="mailto:lakshmirajyamsarees@gmail.com"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <a 
                href="https://maps.google.com/?q=Santinagar+3rd+Road,+Eluru+534007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-blue-400 transition-colors duration-200"
              >
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300">Santinagar 3rd Road</p>
                  <p className="text-gray-300">Eluru 534007</p>
                </div>
              </a>
              
              <a 
                href="tel:+919492607499"
                className="flex items-center gap-3 hover:text-blue-400 transition-colors duration-200"
              >
                <Phone className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300">+91-94926-07499</p>
              </a>
              
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-300">Mon–Sat</p>
                  <p className="text-gray-300">10:00 AM–7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Collections</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">New Arrivals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Care Instructions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Returns & Exchange</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 Lakshmi Rajyam Sarees – Where every saree tells a story.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">Shipping Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
