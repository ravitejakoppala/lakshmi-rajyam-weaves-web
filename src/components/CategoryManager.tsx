
import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Image, AlertTriangle, Loader2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const CategoryManager = () => {
  const { categories, loading, refreshCategories } = useProducts();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `category-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('category-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('category-images')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Category name is required');
      return;
    }

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update({
            name: formData.name.trim(),
            description: formData.description?.trim() || null,
            image_url: formData.image_url || null
          })
          .eq('id', editingCategory.id);

        if (error) throw error;
        toast.success('Category updated successfully');
        setEditingCategory(null);
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([{
            name: formData.name.trim(),
            description: formData.description?.trim() || null,
            image_url: formData.image_url || null
          }]);

        if (error) throw error;
        toast.success('Category added successfully');
        setIsAddDialogOpen(false);
      }

      setFormData({ name: '', description: '', image_url: '' });
      await refreshCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Failed to save category');
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      description: category.description || '',
      image_url: category.image_url || ''
    });
  };

  const handleDelete = async (categoryId: string, categoryName: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${categoryName}"? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    try {
      setDeleting(categoryId);
      console.log('Attempting to delete category:', categoryId, categoryName);
      
      // First, check if any products are using this category
      const { data: productsInCategory, error: checkError } = await supabase
        .from('products')
        .select('id, name')
        .eq('category_id', categoryId);

      if (checkError) {
        console.error('Error checking for products in category:', checkError);
        throw new Error('Failed to check category usage');
      }

      if (productsInCategory && productsInCategory.length > 0) {
        const productNames = productsInCategory.map(p => p.name).join(', ');
        toast.error(`Cannot delete category "${categoryName}" because it contains products: ${productNames}. Please reassign or delete these products first.`);
        return;
      }

      // Proceed with deletion
      const { error: deleteError, count } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId)
        .select('id', { count: 'exact' });

      if (deleteError) {
        console.error('Delete error:', deleteError);
        throw deleteError;
      }

      console.log('Category deletion result:', { deletedCount: count });
      
      if (count === 0) {
        throw new Error('Category not found or already deleted');
      }

      // Force refresh of categories with a slight delay to ensure database consistency
      setTimeout(async () => {
        await refreshCategories();
      }, 500);
      
      toast.success(`Category "${categoryName}" deleted successfully`);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(`Failed to delete category: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeleting(null);
    }
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setIsAddDialogOpen(false);
    setFormData({ name: '', description: '', image_url: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2 text-lg">Loading categories...</span>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
          Category Management
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto text-sm">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onImageUpload={handleImageUpload}
              uploading={uploading}
              onCancel={handleCancel}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              {category.image_url ? (
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image className="w-12 h-12 text-gray-400" />
              )}
            </div>
            
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {category.description}
                </p>
              )}
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(category)}
                  className="text-xs px-2 py-1 h-auto"
                  disabled={deleting === category.id}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category.id, category.name)}
                  className="text-xs px-2 py-1 h-auto"
                  disabled={deleting === category.id}
                >
                  {deleting === category.id ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin mr-1" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No categories yet. Add your first category to get started.</p>
        </div>
      )}

      {editingCategory && (
        <Dialog open={true} onOpenChange={() => setEditingCategory(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
            </DialogHeader>
            <CategoryForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onImageUpload={handleImageUpload}
              uploading={uploading}
              onCancel={handleCancel}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const CategoryForm = ({ formData, setFormData, onSubmit, onImageUpload, uploading, onCancel }: any) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <Label htmlFor="name" className="text-sm">Category Name *</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        required
        className="text-sm"
        placeholder="e.g., Kanjivaram, Silk Sarees"
      />
    </div>

    <div>
      <Label htmlFor="description" className="text-sm">Description</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        rows={3}
        className="text-sm"
        placeholder="Brief description of the category"
      />
    </div>

    <div>
      <Label htmlFor="image" className="text-sm">Category Image</Label>
      <div className="space-y-2">
        <Input
          id="image_url"
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
          placeholder="Image URL or upload below"
          className="text-sm"
        />
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Or upload:</span>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImageUpload(file);
            }}
            disabled={uploading}
            className="text-xs"
          />
        </div>
        {uploading && (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
            <p className="text-xs text-blue-600">Uploading image...</p>
          </div>
        )}
        {formData.image_url && (
          <div className="mt-2">
            <img
              src={formData.image_url}
              alt="Preview"
              className="w-20 h-20 object-cover rounded border"
            />
          </div>
        )}
      </div>
    </div>

    <div className="flex gap-3">
      <Button type="submit" className="flex-1 text-sm" disabled={uploading}>
        {uploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Uploading...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save Category
          </>
        )}
      </Button>
      <Button type="button" variant="outline" onClick={onCancel} className="text-sm">
        <X className="w-4 h-4 mr-2" />
        Cancel
      </Button>
    </div>
  </form>
);
