
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface CartModalProps {
  onClose: () => void;
}

export const CartModal = ({ onClose }: CartModalProps) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Checkout functionality will be implemented soon!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-500" />
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 z-[10000] relative"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Added proper scrolling */}
        <div className="flex flex-col h-full max-h-[calc(80vh-80px)]">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  Start shopping and add items to your cart!
                </p>
                <button
                  onClick={onClose}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Scrollable Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-1 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 p-1 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                          title="Remove from Cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Fixed Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-900">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Total: ₹{getTotalPrice().toLocaleString()}
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
