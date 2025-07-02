
import { useState, useEffect } from 'react';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  category: string;
  addedAt: Date;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log('Favorites saved to localStorage:', favorites);
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === item.id);
      if (exists) return prev;
      return [...prev, { ...item, addedAt: new Date() }];
    });
  };

  const removeFromFavorites = (id: string) => {
    console.log('Removing from favorites:', id);
    setFavorites(prev => {
      const updated = prev.filter(fav => fav.id !== id);
      console.log('Favorites after removal:', updated);
      return updated;
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  return { favorites, addToFavorites, removeFromFavorites, isFavorite };
};
