
import { MessageCircle, Clock, Users, Phone } from 'lucide-react';

export const WhatsAppSupport = () => {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
              WhatsApp & Support
            </h2>
            <p className="text-lg text-gray-600">
              Need help? Chat with our style experts on WhatsApp for instant advice and personalised assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Support</h3>
                    <p className="text-gray-600">Get immediate responses to all your queries about sarees, sizes, and styling.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Style Experts</h3>
                    <p className="text-gray-600">Our experienced team helps you choose the perfect saree for any occasion.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Response</h3>
                    <p className="text-gray-600">Average response time under 5 minutes during business hours.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/919492607499?text=Hello! I'm interested in your sarees collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageCircle className="w-6 h-6" />
                  Chat on WhatsApp
                </a>
                
                <a 
                  href="tel:+919492607499"
                  className="flex items-center justify-center gap-3 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                >
                  <Phone className="w-6 h-6" />
                  Call Us
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
                <p className="text-gray-600 mb-1">Call/WhatsApp: +91-94926-07499</p>
                <p className="text-gray-600">Hours: Mon–Sat: 10:00 AM–7:00 PM</p>
              </div>
            </div>

            {/* WhatsApp Chat Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="bg-green-500 text-white p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Lakshmi Rajyam Support</h4>
                    <p className="text-sm opacity-90">Online now</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 h-80 bg-gray-50">
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
                      <p className="text-sm text-gray-700">Hello! Welcome to Lakshmi Rajyam Sarees. How can I help you today?</p>
                      <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-green-500 text-white rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Hi! I'm looking for a Kanjivaram saree for my sister's wedding.</p>
                      <p className="text-xs opacity-75 mt-1">10:31 AM</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 max-w-xs shadow-sm">
                      <p className="text-sm text-gray-700">Congratulations! I'd love to help you find the perfect Kanjivaram. What's your budget range?</p>
                      <p className="text-xs text-gray-500 mt-1">10:32 AM</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
                      Type a message...
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
