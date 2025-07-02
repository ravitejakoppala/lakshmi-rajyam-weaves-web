
import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Image, Loader2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Image compression utility - Fixed the Image constructor issue
const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    
    const img = document.createElement('img'); // Fixed: Use document.createElement instead of new Image()
    
    img.onload = () => {
      const { width, height } = img;
      const ratio = Math.min(maxWidth / width, maxWidth / height);
      
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to compress image'));
        }
      }, 'image/jpeg', quality);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const ProductManager = () => {
  const { products, categories, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category_id: '',
    stock_quantity: '',
    image_url: '',
    images: [] as string[],
    sku: '',
    is_featured: false,
    is_new_arrival: false,
    is_on_sale: false,
    status: 'active' as const,
    weight: '',
    dimensions: null,
    tags: [] as string[]
  });

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      console.log('Starting image upload and compression...', file.name, file.size);
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('File size must be less than 10MB');
      }

      // Compress image
      const compressedBlob = await compressImage(file);
      const compressedFile = new File([compressedBlob], file.name, { type: 'image/jpeg' });
      
      console.log('Image compressed from', file.size, 'to', compressedFile.size);

      const fileExt = 'jpg'; // Always use jpg for compressed images
      const fileName = `product-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      console.log('Uploading compressed image to Supabase storage...');

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, compressedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw new Error(error.message || 'Failed to upload image');
      }

      console.log('Upload successful:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      console.log('Public URL generated:', publicUrl);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast.success('Image uploaded and compressed successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    console.log('Validating form data:', formData);
    
    if (!formData.name?.trim()) {
      toast.error('Product name is required');
      return false;
    }
    
    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      toast.error('Valid price is required and must be greater than 0');
      return false;
    }

    if (formData.original_price && (isNaN(parseFloat(formData.original_price)) || parseFloat(formData.original_price) <= 0)) {
      toast.error('Original price must be a valid number greater than 0');
      return false;
    }

    if (formData.stock_quantity && (isNaN(parseInt(formData.stock_quantity)) || parseInt(formData.stock_quantity) < 0)) {
      toast.error('Stock quantity must be a valid number greater than or equal to 0');
      return false;
    }

    if (formData.weight && (isNaN(parseFloat(formData.weight)) || parseFloat(formData.weight) <= 0)) {
      toast.error('Weight must be a valid number greater than 0');
      return false;
    }

    console.log('Form validation passed');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      console.log('Saving product with data:', formData);

      // Clean and prepare data for database

      const productData = {
        name: String(formData.name).trim(),
        description: formData.description ? String(formData.description).trim() : null,
        price: Number(parseFloat(formData.price)),
        original_price: formData.original_price ? Number(parseFloat(formData.original_price)) : null,
        discount_percentage: formData.original_price && formData.price ? 
          Math.round(((parseFloat(formData.original_price) - parseFloat(formData.price)) / parseFloat(formData.original_price)) * 100) : null,
        category_id: formData.category_id || null,
        stock_quantity: formData.stock_quantity ? Number(parseInt(formData.stock_quantity)) : null,
        image_url: formData.image_url || null,
        images: Array.isArray(formData.images) ? formData.images : [],
        sku: formData.sku ? String(formData.sku).trim() : null,
        is_featured: Boolean(formData.is_featured),
        is_new_arrival: Boolean(formData.is_new_arrival),
        is_on_sale: Boolean(formData.is_on_sale),
        status: String(formData.status) || 'active',
        weight: formData.weight ? Number(parseFloat(formData.weight)) : null,
        dimensions: formData.dimensions,
        tags: Array.isArray(formData.tags) ? formData.tags : []
      };

      console.log('Cleaned product data for save:', productData);

      let result;
      if (editingProduct) {
        console.log('Updating existing product:', editingProduct.id);
        result = await updateProduct(editingProduct.id, productData);
        setEditingProduct(null);
      } else {
        console.log('Creating new product');
        result = await addProduct(productData);
        setIsAddDialogOpen(false);
      }

      console.log('Product save result:', result);

      // Reset form after successful save
      setFormData({
        name: '',
        description: '',
        price: '',
        original_price: '',
        category_id: '',
        stock_quantity: '',
        image_url: '',
        images: [],
        sku: '',
        is_featured: false,
        is_new_arrival: false,
        is_on_sale: false,
        status: 'active',
        weight: '',
        dimensions: null,
        tags: []
      });

      console.log('Product saved successfully');
    } catch (error) {
      console.error('Detailed error saving product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to save product: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (product: any) => {
    console.log('Editing product:', product);
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      original_price: product.original_price?.toString() || '',
      category_id: product.category_id || '',
      stock_quantity: product.stock_quantity?.toString() || '',
      image_url: product.image_url || '',
      images: Array.isArray(product.images) ? product.images : [],
      sku: product.sku || '',
      is_featured: Boolean(product.is_featured),
      is_new_arrival: Boolean(product.is_new_arrival),
      is_on_sale: Boolean(product.is_on_sale),
      status: product.status || 'active',
      weight: product.weight?.toString() || '',
      dimensions: product.dimensions || null,
      tags: Array.isArray(product.tags) ? product.tags : []
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 text-lg">Loading products...</span>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
          Product Management
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto text-sm">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              onSubmit={handleSubmit}
              onImageUpload={handleImageUpload}
              uploading={uploading}
              saving={saving}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 sm:pl-10 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="w-full sm:w-16 h-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Image className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {product.name}
                  </h3>
                  <div className="flex gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="text-xs sm:text-sm px-2 py-1 h-auto"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                      className="text-xs sm:text-sm px-2 py-1 h-auto"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span>Price: ₹{product.price}</span>
                  <span>Stock: {product.stock_quantity || 0}</span>
                  <span>Status: {product.status}</span>
                  <span>SKU: {product.sku || 'N/A'}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {product.is_featured && <span className="px-1 sm:px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Featured</span>}
                  {product.is_new_arrival && <span className="px-1 sm:px-2 py-1 bg-green-100 text-green-800 rounded text-xs">New</span>}
                  {product.is_on_sale && <span className="px-1 sm:px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Sale</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <Dialog open={true} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              onSubmit={handleSubmit}
              onImageUpload={handleImageUpload}
              uploading={uploading}
              saving={saving}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const ProductForm = ({ formData, setFormData, categories, onSubmit, onImageUpload, uploading, saving }: any) => (
  <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div>
        <Label htmlFor="name" className="text-sm">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
          required
          className="text-sm"
          placeholder="Enter product name"
        />
      </div>
      <div>
        <Label htmlFor="category" className="text-sm">Category</Label>
        <Select
          value={formData.category_id}
          onValueChange={(value) => setFormData((prev: any) => ({ ...prev, category_id: value }))}
        >
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category: any) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <div>
      <Label htmlFor="description" className="text-sm">Description</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
        rows={3}
        className="text-sm"
        placeholder="Enter product description"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <div>
        <Label htmlFor="price" className="text-sm">Price *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, price: e.target.value }))}
          required
          className="text-sm"
          placeholder="0.00"
        />
      </div>
      <div>
        <Label htmlFor="original_price" className="text-sm">Original Price</Label>
        <Input
          id="original_price"
          type="number"
          step="0.01"
          min="0"
          value={formData.original_price}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, original_price: e.target.value }))}
          className="text-sm"
          placeholder="0.00"
        />
      </div>
      <div>
        <Label htmlFor="stock" className="text-sm">Stock Quantity</Label>
        <Input
          id="stock"
          type="number"
          min="0"
          value={formData.stock_quantity}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, stock_quantity: e.target.value }))}
          className="text-sm"
          placeholder="0"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div>
        <Label htmlFor="image_url" className="text-sm">Product Image</Label>
        <div className="space-y-2">
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, image_url: e.target.value }))}
            placeholder="Enter image URL or upload below"
            className="text-sm"
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Or upload (auto-compressed):</span>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && onImageUpload) onImageUpload(file);
              }}
              disabled={uploading}
              className="text-xs"
            />
          </div>
          {uploading && (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <p className="text-xs text-blue-600">Compressing and uploading image...</p>
            </div>
          )}
          {formData.image_url && (
            <div className="mt-2">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-20 h-20 object-cover rounded border"
                onError={(e) => {
                  console.error('Image preview error:', e);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="sku" className="text-sm">SKU</Label>
        <Input
          id="sku"
          value={formData.sku}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, sku: e.target.value }))}
          placeholder="Product SKU"
          className="text-sm"
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div>
        <Label htmlFor="status" className="text-sm">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData((prev: any) => ({ ...prev, status: value }))}
        >
          <SelectTrigger className="text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="weight" className="text-sm">Weight (kg)</Label>
        <Input
          id="weight"
          type="number"
          step="0.01"
          min="0"
          value={formData.weight}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, weight: e.target.value }))}
          className="text-sm"
          placeholder="0.00"
        />
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.is_featured}
          onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, is_featured: checked }))}
        />
        <Label htmlFor="featured" className="text-sm">Featured</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="new_arrival"
          checked={formData.is_new_arrival}
          onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, is_new_arrival: checked }))}
        />
        <Label htmlFor="new_arrival" className="text-sm">New Arrival</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="on_sale"
          checked={formData.is_on_sale}
          onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, is_on_sale: checked }))}
        />
        <Label htmlFor="on_sale" className="text-sm">On Sale</Label>
      </div>
    </div>

    <Button type="submit" className="w-full text-sm" disabled={uploading || saving}>
      {saving ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Saving Product...
        </>
      ) : uploading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Uploading Image...
        </>
      ) : (
        'Save Product'
      )}
    </Button>
  </form>
);
