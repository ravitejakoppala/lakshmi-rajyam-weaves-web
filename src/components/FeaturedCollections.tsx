
import { useState, useEffect } from 'react';
import { ArrowRight, Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from './ui/skeleton';
import { useSupabaseCart } from '../hooks/useSupabaseCart';
import { useSupabaseFavorites } from '../hooks/useSupabaseFavorites';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'sonner';

export const FeaturedCollections = () => {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  
  const { addToCart } = useSupabaseCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useSupabaseFavorites();
  const { products, loading } = useProducts();
  const { isLoggedIn } = useAuth();

  // Get featured products from database, fallback to any products if no featured ones
  const featuredProducts = products.filter(product => product.is_featured).slice(0, 6);
  const displayProducts = featuredProducts.length > 0 
    ? featuredProducts 
    : products.slice(0, 6); // Show first 6 products if no featured ones

  const handleImageLoad = (id: string) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  const handleCollectionClick = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorites = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Favorites button clicked for product:', product.name, 'User logged in:', isLoggedIn);
    
    if (!isLoggedIn) {
      toast.error('Please log in to add items to favorites');
      return;
    }
    
    const productId = product.id;
    const isCurrentlyFavorite = isFavorite(productId);
    
    console.log('Product ID:', productId, 'Is favorite:', isCurrentlyFavorite);
    
    try {
      if (isCurrentlyFavorite) {
        removeFromFavorites(productId);
        toast.success(`${product.name} removed from favorites!`);
      } else {
        addToFavorites({
          id: productId,
          name: product.name,
          price: product.price,
          category: 'Featured Product'
        });
        toast.success(`${product.name} added to favorites!`);
      }
    } catch (error) {
      console.error('Error toggling favorites:', error);
      toast.error('Failed to update favorites');
    }
  };

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Cart button clicked for product:', product.name, 'User logged in:', isLoggedIn);
    
    if (!isLoggedIn) {
      toast.error('Please log in to add items to cart');
      return;
    }
    
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const formatPrice = (price: number) => `₹${price.toLocaleString()}`;
  const calculateDiscount = (price: number, originalPrice: number | null) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  if (loading) {
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
          {displayProducts.length > 0 ? (
            displayProducts.map((product, index) => {
              const discount = calculateDiscount(product.price, product.original_price);
              return (
                <div
                  key={product.id}
                  className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    {!imagesLoaded[product.id] && (
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=800&fit=crop'}
                      alt={product.name}
                      className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                        imagesLoaded[product.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(product.id)}
                    />
                    {discount && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {discount}% OFF
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={(e) => handleToggleFavorites(product, e)}
                        className={`p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors ${
                          isFavorite(product.id) ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'
                        }`}
                        title={isFavorite(product.id) ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 hover:text-blue-500"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.5</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">(0 Reviews)</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
                      {product.original_price && product.original_price > product.price && (
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">{formatPrice(product.original_price)}</span>
                      )}
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => handleCollectionClick(`/product/${product.id}`)}
                      className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      View Product
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No featured products available.</p>
            </div>
          )}
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
