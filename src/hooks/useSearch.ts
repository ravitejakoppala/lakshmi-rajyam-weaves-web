
import { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  title: string;
  type: 'product' | 'category' | 'collection';
  category?: string;
  price?: number;
}

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock search data - in real app this would come from database
  const searchData: SearchResult[] = [
    { id: '1', title: 'Kanjivaram Silk Saree', type: 'product', category: 'Kanjivaram', price: 25999 },
    { id: '2', title: 'Royal Kanjivaram', type: 'product', category: 'Kanjivaram', price: 35999 },
    { id: '3', title: 'Kalamkari Hand Painted', type: 'product', category: 'Kalamkari', price: 18999 },
    { id: '4', title: 'Traditional Bandhani', type: 'product', category: 'Bandhani', price: 12999 },
    { id: '5', title: 'Block Print Cotton', type: 'product', category: 'Block Print', price: 8999 },
    { id: '6', title: 'Kanjivaram Collection', type: 'category' },
    { id: '7', title: 'Kalamkari Collection', type: 'category' },
    { id: '8', title: 'Bandhani Collection', type: 'category' },
    { id: '9', title: 'Block Print Collection', type: 'category' },
    { id: '10', title: 'Wedding Collection', type: 'collection' },
    { id: '11', title: 'Festival Collection', type: 'collection' },
    { id: '12', title: 'Silk Sarees', type: 'product', category: 'Various' },
    { id: '13', title: 'Cotton Sarees', type: 'product', category: 'Various' },
  ];

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8); // Limit to 8 results
      
      setResults(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isLoading
  };
};
