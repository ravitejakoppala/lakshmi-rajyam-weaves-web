import { useState, useEffect } from 'react';
import { useProducts } from './useProducts';

export interface NavigationCategory {
  name: string;
  path: string;
}

export const useNavigation = () => {
  const { categories, loading } = useProducts();
  const [navigationCategories, setNavigationCategories] = useState<NavigationCategory[]>([]);

  useEffect(() => {
    if (!loading && categories.length > 0) {
      const dynamicCategories = categories
        .filter(category => category.name) // Only categories with names
        .map(category => ({
          name: category.name,
          path: `/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`
        }));

      // Add static navigation items
      const staticCategories = [
        { name: 'New Arrivals', path: '/new-arrivals' },
        { name: 'Sale', path: '/sale' }
      ];

      setNavigationCategories([...dynamicCategories, ...staticCategories]);
    } else if (!loading && categories.length === 0) {
      // Fallback to static categories if no dynamic categories are available
      setNavigationCategories([
        { name: 'Kanjivaram', path: '/category/kanjivaram' },
        { name: 'Kalamkari', path: '/category/kalamkari' },
        { name: 'Bandhani', path: '/category/bandhani' },
        { name: 'Block Print', path: '/category/block-print' },
        { name: 'New Arrivals', path: '/new-arrivals' },
        { name: 'Sale', path: '/sale' }
      ]);
    }
  }, [categories, loading]);

  return {
    categories: navigationCategories,
    loading
  };
};