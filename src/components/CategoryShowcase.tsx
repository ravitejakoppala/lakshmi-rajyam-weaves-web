
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

  const handleCategoryClick = (path: string) => {
    // Scroll to top when navigating to category page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore our diverse collection of traditional Indian sarees, each crafted with passion and heritage
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              onClick={() => handleCategoryClick(category.path)}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Category Image */}
              <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 dark:opacity-30`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-600 dark:text-gray-300">
                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                      <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-full`}></div>
                    </div>
                    <p className="font-semibold text-lg">{category.name}</p>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-all duration-300"></div>
              </div>

              {/* Category Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    {category.itemCount} items
                  </span>
                  <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
