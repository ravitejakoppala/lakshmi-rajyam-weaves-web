
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Star, Heart, ShoppingCart, Truck, Shield, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '../hooks/useProducts';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('Free Size');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        // Transform the data to match our Product interface
        const transformedProduct: Product = {
          id: data.id,
          name: data.name,
          description: data.description,
          price: Number(data.price),
          original_price: data.original_price ? Number(data.original_price) : null,
          discount_percentage: data.discount_percentage,
          category_id: data.category_id,
          stock_quantity: data.stock_quantity,
          image_url: data.image_url,
          images: Array.isArray(data.images) ? data.images as string[] : [],
          is_featured: data.is_featured,
          is_new_arrival: data.is_new_arrival,
          is_on_sale: data.is_on_sale,
          status: data.status,
          sku: data.sku,
          weight: data.weight ? Number(data.weight) : null,
          dimensions: data.dimensions,
          tags: data.tags,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        
        setProduct(transformedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const sizes = ['Free Size'];

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading product...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
            <Link to="/products" className="text-blue-600 dark:text-blue-400 hover:underline">
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-3 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-12">
          {/* Product Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-8 sm:h-8 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                  </div>
                  <p className="font-medium text-sm sm:text-base">Product Image</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-3 sm:space-y-6">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base">4.8</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">(50+ reviews)</span>
                </div>
                <span className="text-xs sm:text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded w-fit">
                  {product.sku || 'Saree'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                ₹{product.price.toLocaleString()}
              </span>
              {product.original_price && product.original_price > product.price && (
                <>
                  <span className="text-base sm:text-xl text-gray-500 dark:text-gray-400 line-through">
                    ₹{product.original_price.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                    {product.discount_percentage}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
              {product.description || "Exquisite handwoven saree featuring intricate designs and traditional motifs. Perfect for weddings and special occasions."}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Size</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 sm:px-4 py-2 border rounded-lg font-medium transition-colors text-sm sm:text-base ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                >
                  -
                </button>
                <span className="w-12 sm:w-16 text-center font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 sm:w-10 sm:h-10 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-3 sm:px-6 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors text-sm sm:text-base">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                Add to Cart
              </button>
              <button className="p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <Truck className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Free Shipping</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">On orders above ₹2000</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Authentic</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">100% Genuine Products</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Easy Returns</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">7-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
