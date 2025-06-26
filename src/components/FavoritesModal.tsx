
import { X, Heart, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';

interface FavoritesModalProps {
  onClose: () => void;
}

export const FavoritesModal = ({ onClose }: FavoritesModalProps) => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    try {
      addToCart({
        id: item.id.toString(),
        name: item.name,
        price: item.price,
        image: 'placeholder'
      });
      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            My Favorites
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 z-[10000] relative"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mb-6">
                Start shopping and add items to your favorites!
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {favorites.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromFavorites(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                      title="Remove from Favorites"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
