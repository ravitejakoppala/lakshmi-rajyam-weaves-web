
import { ArrowRight, Sparkles, Shirt, Star } from 'lucide-react';

export const ShopByCategory = () => {
  const categories = [
    {
      name: "Sarees",
      description: "Explore our curated saree collection – from luxurious Kanjivarams to breezy cottons.",
      icon: Sparkles,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      items: "200+ Designs",
      cta: "Shop Kanjivarams"
    },
    {
      name: "Dress Materials",
      description: "Create your own style with our premium fabric dress materials.",
      icon: Shirt,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      items: "150+ Options",
      cta: "Shop Dress Materials"
    },
    {
      name: "New Arrivals",
      description: "Discover the latest handloom designs and festival specials.",
      icon: Star,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      items: "50+ Fresh Designs",
      cta: "Explore New Arrivals"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect piece for every occasion from our carefully curated collections.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className={`${category.bgColor} p-8 text-center`}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-sm font-medium text-gray-600">{category.items}</p>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {category.description}
                  </p>
                  
                  <button className="group/btn w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
                    <span>{category.cta}</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Visual Element */}
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Icon className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm font-medium">{category.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
