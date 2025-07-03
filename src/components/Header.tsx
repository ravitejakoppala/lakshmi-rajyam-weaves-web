
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useDeliverySettings } from '../hooks/useDeliverySettings';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigation } from '../hooks/useNavigation';
import { FavoritesModal } from './FavoritesModal';
import { CartModal } from './CartModal';
import { ProfileModal } from './ProfileModal';
import { AdminLogin } from './AdminLogin';
import { TopBar } from './header/TopBar';
import { Navigation } from './header/Navigation';
import { ActionButtons } from './header/ActionButtons';
import { MobileMenu } from './header/MobileMenu';
import { SearchModal } from './header/SearchModal';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  
  const { theme, toggleTheme } = useTheme();
  const { settings: deliverySettings } = useDeliverySettings();
  const { getTotalItems } = useCart();
  const { favorites } = useFavorites();
  const { categories } = useNavigation();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <TopBar deliverySettings={deliverySettings} />

      {/* Main Header */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Lakshmi Rajyam
            </div>
          </Link>

          <Navigation categories={categories} />

          <ActionButtons
            theme={theme}
            onToggleTheme={toggleTheme}
            onSearchClick={() => setIsSearchOpen(true)}
            onAdminClick={() => setShowAdmin(true)}
            onFavoritesClick={() => setShowFavorites(true)}
            onCartClick={() => setShowCart(true)}
            onProfileClick={() => setShowProfile(true)}
            onMenuClick={() => setIsMenuOpen(true)}
            favoritesCount={favorites.length}
            cartItemsCount={getTotalItems()}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onAdminClick={() => setShowAdmin(true)}
        categories={categories}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Modals */}
      {showFavorites && <FavoritesModal onClose={() => setShowFavorites(false)} />}
      {showCart && <CartModal onClose={() => setShowCart(false)} />}
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
      {showAdmin && <AdminLogin onClose={() => setShowAdmin(false)} />}
    </header>
  );
};
