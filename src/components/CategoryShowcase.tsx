
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CategoryShowcase = () => {
  const categories = [
    {
      name: "Kanjivaram Silk",
      description: "Luxurious silk sarees with rich gold zari work",
      image: "placeholder",
      itemCount: 150,
      path: "/category/kanjivaram",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      name: "Kalamkari",
      description: "Hand-painted artistic sarees with mythological motifs",
      image: "placeholder",
      itemCount: 89,
      path: "/category/kalamkari",
      color: "from-purple-400 to-purple-600"
    },
    {
      name: "Bandhani",
      description: "Vibrant tie-dye sarees from Gujarat and Rajasthan",
      image: "placeholder",
      itemCount: 124,
      path: "/category/bandhani",
      color: "from-pink-400 to-pink-600"
    },
    {
      name: "Block Print",
      description: "Eco-friendly cotton sarees with traditional prints",
      image: "placeholder",
      itemCount: 203,
      path: "/category/block-print",
      color: "from-green-400 to-green-600"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our diverse collection of traditional Indian sarees
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="group bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Category Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <div className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-full`}></div>
                    </div>
                    <p className="font-medium">{category.name}</p>
                  </div>
                </div>
              </div>

              {/* Category Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {category.itemCount} items
                  </span>
                  <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
