
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const { query, setQuery, results, isLoading } = useSearch();

  if (!isOpen) return null;

  return (
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
              onClick={onClose}
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
                        onClose();
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
  );
};
