import { useState, useEffect } from 'react';
import { ArrowRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';
import { useSupabaseCart } from '../hooks/useSupabaseCart';
import { useSupabaseFavorites } from '../hooks/useSupabaseFavorites';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';

export const QuickShop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useSupabaseCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useSupabaseFavorites();
  const { isLoggedIn } = useAuth();

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: "Royal Kanjivaram Silk",
      price: 28999,
      originalPrice: 32999,
      rating: 4.8,
      reviews: 124,
      image: "placeholder",
      discount: 12,
      category: "Kanjivaram"
    },
    {
      id: 2,
      name: "Artistic Kalamkari",
      price: 18999,
      originalPrice: 22999,
      rating: 4.7,
      reviews: 89,
      image: "placeholder",
      discount: 17,
      category: "Kalamkari"
    },
    {
      id: 3,
      name: "Vibrant Bandhani",
      price: 12999,
      originalPrice: 15999,
      rating: 4.6,
      reviews: 156,
      image: "placeholder",
      discount: 19,
      category: "Bandhani"
    },
    {
      id: 4,
      name: "Premium Block Print",
      price: 8999,
      originalPrice: 11999,
      rating: 4.5,
      reviews: 203,
      image: "placeholder",
      discount: 25,
      category: "Block Print"
    }
  ];

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      toast.error('Please log in to add items to favorites');
      return;
    }
    
    const productId = product.id.toString();
    const isCurrentlyFavorite = isFavorite(productId);
    
    try {
      if (isCurrentlyFavorite) {
        removeFromFavorites(productId);
        toast.success(`${product.name} removed from favorites!`);
      } else {
        addToFavorites({
          id: productId,
          name: product.name,
          price: product.price,
          category: product.category
        });
        toast.success(`${product.name} added to favorites!`);
      }
    } catch (error) {
      console.error('Error toggling favorites:', error);
      toast.error('Failed to update favorites');
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden">
                <Skeleton className="h-48 sm:h-64 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Shop
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Handpicked favorites from our premium collection
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative h-48 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-500">
                {product.discount > 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
                    {product.discount}% OFF
                  </span>
                )}
                <button 
                  onClick={(e) => handleToggleFavorite(e, product)}
                  className={`absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10 transform hover:scale-110 duration-200 ${
                    isFavorite(product.id.toString()) ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(product.id.toString()) ? 'fill-current' : ''}`} />
                </button>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white dark:bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>
                    <p className="text-sm font-medium">{product.category}</p>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {product.rating}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300 text-sm sm:text-base transform hover:scale-105"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button - Fixed to scroll to top of products page */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/products"
            onClick={() => {
              // Scroll to top after navigation
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
          >
            <span>View All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};
