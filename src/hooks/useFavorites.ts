
import { useState, useEffect } from 'react';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  category: string;
  addedAt: Date;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === item.id);
      if (exists) return prev;
      return [...prev, { ...item, addedAt: new Date() }];
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id);
  };

  return { favorites, addToFavorites, removeFromFavorites, isFavorite };
};
