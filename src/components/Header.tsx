
import { useState } from 'react';
import { ShoppingBag, Menu, X, Search, User, Moon, Sun, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useDeliverySettings } from '../hooks/useDeliverySettings';
import { useSearch } from '../hooks/useSearch';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { settings: deliverySettings } = useDeliverySettings();
  const { query, setQuery, results, isLoading } = useSearch();

  const categories = [
    { name: 'Kanjivaram', path: '/category/kanjivaram' },
    { name: 'Kalamkari', path: '/category/kalamkari' },
    { name: 'Bandhani', path: '/category/bandhani' },
    { name: 'Block Print', path: '/category/block-print' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Sale', path: '/sale' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      {/* Top Bar - Only show if delivery is enabled */}
      {deliverySettings.deliveryEnabled && deliverySettings.showPromotionalContent && (
        <div className="bg-blue-600 dark:bg-blue-700 text-white py-2">
          <div className="container mx-auto px-6 text-center text-sm">
            <span>
              Free shipping on orders above ₹{deliverySettings.freeShippingThreshold.toLocaleString()}
              {deliverySettings.codAvailable && ' | COD Available'}
            </span>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Lakshmi Rajyam
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Cart */}
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>

            {/* User Account */}
            <button className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-500 dark:text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-6 space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for sarees, collections..."
                  className="flex-1 text-lg border-none outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-500 dark:text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Search Results */}
              {query && (
                <div className="max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      Searching...
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-2">
                      {results.map((result) => (
                        <button
                          key={result.id}
                          className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setQuery('');
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {result.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {result.type === 'product' && result.category && `${result.category} • `}
                                {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                              </div>
                            </div>
                            {result.price && (
                              <div className="text-blue-600 dark:text-blue-400 font-medium">
                                ₹{result.price.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No results found for "{query}"
                    </div>
                  )}
                </div>
              )}
              
              {!query && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Popular searches: Kanjivaram silk, wedding sarees, festival collection
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
