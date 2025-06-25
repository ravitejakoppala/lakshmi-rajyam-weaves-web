
import { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Image, AlertTriangle } from 'lucide-react';
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      setDeleting(id);
      console.log('Deleting category with ID:', id);
      
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }
      
      console.log('Category deleted successfully');
      toast.success('Category deleted successfully');
      
      // Force refresh the categories
      await refreshCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading categories...</div>
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
                  onClick={() => handleDelete(category.id)}
                  className="text-xs px-2 py-1 h-auto"
                  disabled={deleting === category.id}
                >
                  {deleting === category.id ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                  ) : (
                    <Trash2 className="w-3 h-3 mr-1" />
                  )}
                  {deleting === category.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const CategoryForm = ({ formData, setFormData, onSubmit, onImageUpload, uploading }: any) => (
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
          <p className="text-xs text-blue-600">Uploading image...</p>
        )}
      </div>
    </div>

    <Button type="submit" className="w-full text-sm" disabled={uploading}>
      <Save className="w-4 h-4 mr-2" />
      Save Category
    </Button>
  </form>
);
