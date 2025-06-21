
import { ArrowRight, Crown, Palette, Droplets, Stamp } from 'lucide-react';

export const FeaturedCollections = () => {
  const collections = [
    {
      name: "Kanjivaram Silks",
      subtitle: "Regal silks from Tamil Nadu",
      description: "Each Kanjivaram saree weaves a 400-year-old legacy, spun from pure South-Indian mulberry silk and rich gold-silver zari. Its majestic borders and craftsmanship make it perfect for weddings and festivals.",
      icon: Crown,
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700"
    },
    {
      name: "Kalamkari Prints",
      subtitle: "Artistry in every stroke",
      description: "These Andhra masterpieces feature hand-painted mythic motifs, drawn with natural dyes and bamboo pens. Revered for their rich heritage and elaborate handwork, Kalamkaris bring folk tales and peacock trails to life in vibrant color.",
      icon: Palette,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    {
      name: "Bandhani (Tie-Dye)",
      subtitle: "Bursting with color and joy",
      description: "Originating in Gujarat/Rajasthan, Bandhani sarees carry a 5,000-year-old legacy. Each dotted pattern is tied and dyed by skilled hands, symbolizing festivity and good fortune. Our Bandhanis reflect the spirited craftsmanship of India's heritage.",
      icon: Droplets,
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700"
    },
    {
      name: "Hand-Block Prints",
      subtitle: "Earthy charm meets contemporary style",
      description: "These cotton sarees are stamped with timeless floral and geometric designs using carved wooden blocks. Printed with eco-friendly dyes on breathable fabrics, they celebrate India's ancient block-printing artistry.",
      icon: Stamp,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">
            Featured Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of traditional Indian textiles, each collection telling its own unique story of heritage and craftsmanship.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {collections.map((collection, index) => {
            const Icon = collection.icon;
            return (
              <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className={`${collection.bgColor} p-8`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${collection.color} rounded-2xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{collection.name}</h3>
                      <p className={`${collection.textColor} font-medium`}>{collection.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {collection.description}
                  </p>
                  
                  <button className="group/btn flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                    <span>Explore {collection.name.split(' ')[0]}</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-20 h-20 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                      <Icon className="w-10 h-10" />
                    </div>
                    <p className="font-medium">{collection.name}</p>
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
