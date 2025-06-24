
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

// Use the actual database types
type DbProduct = Database['public']['Tables']['products']['Row'];
type DbCategory = Database['public']['Tables']['categories']['Row'];

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  discount_percentage: number | null;
  category_id: string | null;
  stock_quantity: number | null;
  image_url: string | null;
  images: string[];
  is_featured: boolean | null;
  is_new_arrival: boolean | null;
  is_on_sale: boolean | null;
  status: string | null;
  sku: string | null;
  weight: number | null;
  dimensions: any;
  tags: string[] | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  created_at: string | null;
}

// Transform database product to our Product interface
const transformDbProduct = (dbProduct: DbProduct): Product => ({
  id: dbProduct.id,
  name: dbProduct.name,
  description: dbProduct.description,
  price: Number(dbProduct.price),
  original_price: dbProduct.original_price ? Number(dbProduct.original_price) : null,
  discount_percentage: dbProduct.discount_percentage,
  category_id: dbProduct.category_id,
  stock_quantity: dbProduct.stock_quantity,
  image_url: dbProduct.image_url,
  images: Array.isArray(dbProduct.images) ? dbProduct.images as string[] : [],
  is_featured: dbProduct.is_featured,
  is_new_arrival: dbProduct.is_new_arrival,
  is_on_sale: dbProduct.is_on_sale,
  status: dbProduct.status,
  sku: dbProduct.sku,
  weight: dbProduct.weight ? Number(dbProduct.weight) : null,
  dimensions: dbProduct.dimensions,
  tags: dbProduct.tags,
  created_at: dbProduct.created_at,
  updated_at: dbProduct.updated_at,
});

// Transform database category to our Category interface
const transformDbCategory = (dbCategory: DbCategory): Category => ({
  id: dbCategory.id,
  name: dbCategory.name,
  description: dbCategory.description,
  image_url: dbCategory.image_url,
  created_at: dbCategory.created_at,
});

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching products:', error);
        throw error;
      }
      
      const transformedProducts = (data || []).map(transformDbProduct);
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Supabase error fetching categories:', error);
        throw error;
      }
      
      const transformedCategories = (data || []).map(transformDbCategory);
      setCategories(transformedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: product.name,
          description: product.description,
          price: product.price,
          original_price: product.original_price,
          discount_percentage: product.discount_percentage ?? 0,
          category_id: product.category_id,
          stock_quantity: product.stock_quantity ?? 0,
          image_url: product.image_url,
          images: product.images || [],
          is_featured: product.is_featured ?? false,
          is_new_arrival: product.is_new_arrival ?? false,
          is_on_sale: product.is_on_sale ?? false,
          status: product.status ?? 'active',
          sku: product.sku,
          weight: product.weight,
          dimensions: product.dimensions,
          tags: product.tags
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error adding product:', error);
        throw error;
      }
      
      const transformedProduct = transformDbProduct(data);
      setProducts(prev => [transformedProduct, ...prev]);
      toast.success('Product added successfully');
      return transformedProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          name: updates.name,
          description: updates.description,
          price: updates.price,
          original_price: updates.original_price,
          discount_percentage: updates.discount_percentage,
          category_id: updates.category_id,
          stock_quantity: updates.stock_quantity,
          image_url: updates.image_url,
          images: updates.images,
          is_featured: updates.is_featured,
          is_new_arrival: updates.is_new_arrival,
          is_on_sale: updates.is_on_sale,
          status: updates.status,
          sku: updates.sku,
          weight: updates.weight,
          dimensions: updates.dimensions,
          tags: updates.tags
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error updating product:', error);
        throw error;
      }
      
      const transformedProduct = transformDbProduct(data);
      setProducts(prev => prev.map(p => p.id === id ? transformedProduct : p));
      toast.success('Product updated successfully');
      return transformedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error deleting product:', error);
        throw error;
      }
      
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchProducts(), fetchCategories()]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    products,
    categories,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts,
    refreshCategories: fetchCategories
  };
};
