
import { Search, Moon, Sun, Shield, Heart, ShoppingBag, User, Menu } from 'lucide-react';

interface ActionButtonsProps {
  theme: string;
  onToggleTheme: () => void;
  onSearchClick: () => void;
  onAdminClick: () => void;
  onFavoritesClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
  onMenuClick: () => void;
  favoritesCount: number;
  cartItemsCount: number;
}

export const ActionButtons = ({
  theme,
  onToggleTheme,
  onSearchClick,
  onAdminClick,
  onFavoritesClick,
  onCartClick,
  onProfileClick,
  onMenuClick,
  favoritesCount,
  cartItemsCount
}: ActionButtonsProps) => {
  return (
    <div className="flex items-center space-x-4">
      {/* Search */}
      <button
        onClick={onSearchClick}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Theme Toggle */}
      <button
        onClick={onToggleTheme}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Admin Access */}
      <button 
        onClick={onAdminClick}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        title="Admin Access"
      >
        <Shield className="w-5 h-5" />
      </button>

      {/* Wishlist */}
      <button 
        onClick={onFavoritesClick}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative"
      >
        <Heart className="w-5 h-5" />
        {favoritesCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {favoritesCount}
          </span>
        )}
      </button>

      {/* Cart */}
      <button 
        onClick={onCartClick}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </button>

      {/* User Account */}
      <button 
        onClick={onProfileClick}
        className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      >
        <User className="w-5 h-5" />
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-gray-700 dark:text-gray-300"
      >
        <Menu className="w-5 h-5" />
      </button>
    </div>
  );
};
