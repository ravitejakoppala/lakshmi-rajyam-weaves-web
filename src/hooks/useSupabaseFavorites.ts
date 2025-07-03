import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  category: string;
  addedAt: Date;
}

export const useSupabaseFavorites = () => {
  const { user, isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load favorites when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [isLoggedIn, user]);

  const loadFavorites = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          created_at,
          products (
            id,
            name,
            price,
            categories (
              name
            )
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading favorites:', error);
        return;
      }

      const formattedItems = data?.map((item: any) => ({
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        category: item.products.categories?.name || 'Uncategorized',
        addedAt: new Date(item.created_at)
      })) || [];

      setFavorites(formattedItems);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (item: Omit<FavoriteItem, 'addedAt'>) => {
    if (!user) {
      console.error('User must be logged in to add to favorites');
      return;
    }

    try {
      // Check if already in favorites
      const { data: existingFavorite } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', item.id)
        .single();

      if (existingFavorite) {
        console.log('Item already in favorites');
        return;
      }

      // Add to favorites
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          product_id: item.id
        });

      if (error) {
        console.error('Error adding to favorites:', error);
        return;
      }

      // Update local state
      setFavorites(prev => [...prev, { ...item, addedAt: new Date() }]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) {
        console.error('Error removing from favorites:', error);
        return;
      }

      // Update local state
      setFavorites(prev => prev.filter(fav => fav.id !== productId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId);
  };

  return {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};