
import { Link } from 'react-router-dom';
import { X, Shield } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAdminClick: () => void;
  categories: Array<{ name: string; path: string }>;
}

export const MobileMenu = ({ isOpen, onClose, onAdminClick, categories }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
          <button
            onClick={onClose}
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
              onClick={onClose}
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              {category.name}
            </Link>
          ))}
          <button
            onClick={() => {
              onAdminClick();
              onClose();
            }}
            className="flex items-center gap-2 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
          >
            <Shield className="w-4 h-4" />
            Admin Access
          </button>
        </nav>
      </div>
    </div>
  );
};
