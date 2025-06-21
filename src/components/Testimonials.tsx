
import { Star, ShieldCheck, RotateCcw, CreditCard } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Anjali R.",
      location: "Bengaluru",
      text: "Draping a Lakshmi Rajyam saree makes me feel like royalty!",
      rating: 5
    },
    {
      name: "Meera S.",
      location: "Chennai",
      text: "Exquisite craftsmanship and wonderful service. I am thrilled!",
      rating: 5
    }
  ];

  const guarantees = [
    {
      icon: RotateCcw,
      title: "15-Day Easy Returns",
      description: "Hassle-free returns within 15 days",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: CreditCard,
      title: "Secure Checkout",
      description: "100% secure payment gateway",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "100% Handloom Certified",
      description: "Authentic handloom quality guaranteed",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Trust & Guarantees */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Your Satisfaction is Guaranteed
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Thousands of women trust Lakshmi Rajyam for authentic, hassle-free shopping.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 ${guarantee.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{guarantee.title}</h3>
                  <p className="text-gray-600">{guarantee.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            What Our Customers Say
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-blue-50 rounded-2xl p-8 relative">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.location}</div>
                  </div>
                </div>

                {/* Quote decoration */}
                <div className="absolute top-4 right-6 text-6xl text-blue-200 font-serif">"</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
