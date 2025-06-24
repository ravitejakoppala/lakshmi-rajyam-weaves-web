
import { useState } from 'react';
import { ArrowRight, Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';

export const FeaturedCollections = () => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  });

  const collections = [
    {
      id: 1,
      name: "Wedding Collection",
      description: "Exquisite bridal sarees for your special day",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
      price: "₹25,000",
      originalPrice: "₹35,000",
      discount: "30% OFF",
      rating: 4.8,
      reviews: 124,
      path: "/category/wedding"
    },
    {
      id: 2,
      name: "Festival Special",
      description: "Vibrant colors for celebration",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop",
      price: "₹15,000",
      originalPrice: "₹20,000",
      discount: "25% OFF",
      rating: 4.7,
      reviews: 89,
      path: "/category/festival"
    },
    {
      id: 3,
      name: "Premium Silk",
      description: "Luxury handwoven silk collection",
      image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=800&fit=crop",
      price: "₹40,000",
      originalPrice: "₹50,000",
      discount: "20% OFF",
      rating: 4.9,
      reviews: 156,
      path: "/category/premium"
    }
  ];

  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  const handleCollectionClick = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <Skeleton className="h-80 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Collections
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Handpicked selections that showcase the finest in traditional Indian craftsmanship
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                {!imagesLoaded[collection.id] && (
                  <Skeleton className="absolute inset-0 w-full h-full" />
                )}
                <img
                  src={collection.image}
                  alt={collection.name}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                    imagesLoaded[collection.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(collection.id)}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {collection.discount}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <Heart className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors">
                    <ShoppingBag className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{collection.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({collection.reviews} reviews)</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {collection.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {collection.description}
                </p>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{collection.price}</span>
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">{collection.originalPrice}</span>
                </div>

                <Link
                  to={collection.path}
                  onClick={() => handleCollectionClick(collection.path)}
                  className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  View Collection
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/products"
            onClick={() => handleCollectionClick("/products")}
            className="inline-flex items-center gap-2 bg-transparent border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View All Collections
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
