
import { useState } from 'react';
import { Plus, Edit, Trash2, Search, Image } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const ProductManager = () => {
  const { products, categories, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category_id: '',
    stock_quantity: '',
    image_url: '',
    is_featured: false,
    is_new_arrival: false,
    is_on_sale: false,
    status: 'active' as const
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        discount_percentage: formData.original_price ? 
          Math.round(((parseFloat(formData.original_price) - parseFloat(formData.price)) / parseFloat(formData.original_price)) * 100) : 0
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        setEditingProduct(null);
      } else {
        await addProduct(productData);
        setIsAddDialogOpen(false);
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        original_price: '',
        category_id: '',
        stock_quantity: '',
        image_url: '',
        is_featured: false,
        is_new_arrival: false,
        is_on_sale: false,
        status: 'active'
      });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      category_id: product.category_id || '',
      stock_quantity: product.stock_quantity.toString(),
      image_url: product.image_url || '',
      is_featured: product.is_featured,
      is_new_arrival: product.is_new_arrival,
      is_on_sale: product.is_on_sale,
      status: product.status
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Product Management
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
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
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Image className="w-8 h-8 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {product.name}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="text-xs sm:text-sm"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                      className="text-xs sm:text-sm"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span>Price: ₹{product.price}</span>
                  <span>Stock: {product.stock_quantity}</span>
                  <span>Status: {product.status}</span>
                  <span>SKU: {product.sku || 'N/A'}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {product.is_featured && <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Featured</span>}
                  {product.is_new_arrival && <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">New</span>}
                  {product.is_on_sale && <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Sale</span>}
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
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const ProductForm = ({ formData, setFormData, categories, onSubmit }: any) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.category_id}
          onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <div>
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        rows={3}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="price">Price *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="original_price">Original Price</Label>
        <Input
          id="original_price"
          type="number"
          step="0.01"
          value={formData.original_price}
          onChange={(e) => setFormData(prev => ({ ...prev, original_price: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="stock">Stock Quantity</Label>
        <Input
          id="stock"
          type="number"
          value={formData.stock_quantity}
          onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: e.target.value }))}
        />
      </div>
    </div>

    <div>
      <Label htmlFor="image_url">Image URL</Label>
      <Input
        id="image_url"
        type="url"
        value={formData.image_url}
        onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
        placeholder="https://example.com/image.jpg"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="featured"
          checked={formData.is_featured}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
        />
        <Label htmlFor="featured">Featured</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="new_arrival"
          checked={formData.is_new_arrival}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_new_arrival: checked }))}
        />
        <Label htmlFor="new_arrival">New Arrival</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="on_sale"
          checked={formData.is_on_sale}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_on_sale: checked }))}
        />
        <Label htmlFor="on_sale">On Sale</Label>
      </div>
    </div>

    <Button type="submit" className="w-full">
      Save Product
    </Button>
  </form>
);
