import { useState } from 'react';
import { Plus, Edit, Trash2, Image, Save, X, AlertTriangle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { newArrivalSchema } from '../lib/validationSchemas';
import { sanitizeInput, sanitizeUrl } from '../lib/auth';
import { z } from 'zod';

interface NewArrival {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  featured: boolean;
  customerPhoto?: string;
  customerName?: string;
  createdAt: Date;
}

export const NewArrivalsManager = () => {
  const [newArrivals, setNewArrivals] = useLocalStorage<NewArrival[]>('new-arrivals', [
    {
      id: 1,
      name: 'Royal Blue Kanjivaram',
      description: 'Stunning royal blue Kanjivaram with gold zari work',
      price: 28999,
      imageUrl: '/placeholder.svg',
      category: 'Kanjivaram',
      featured: true,
      customerPhoto: '/placeholder.svg',
      customerName: 'Priya M.',
      createdAt: new Date('2025-01-20')
    }
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<NewArrival>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAdd = () => {
    setErrors({});

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name || ''),
        description: sanitizeInput(formData.description || ''),
        price: formData.price || 0,
        imageUrl: sanitizeUrl(formData.imageUrl || ''),
        category: formData.category || '',
        featured: formData.featured || false,
        customerPhoto: formData.customerPhoto ? sanitizeUrl(formData.customerPhoto) : '',
        customerName: formData.customerName ? sanitizeInput(formData.customerName) : ''
      };

      // Validate
      const validatedData = newArrivalSchema.parse(sanitizedData);

      // Create NewArrival with all required properties
      const newArrival: NewArrival = {
        id: Date.now(),
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        imageUrl: validatedData.imageUrl || '',
        category: validatedData.category,
        featured: validatedData.featured,
        customerPhoto: validatedData.customerPhoto || '',
        customerName: validatedData.customerName || '',
        createdAt: new Date()
      };
      
      setNewArrivals([...newArrivals, newArrival]);
      setIsAddingNew(false);
      setFormData({});
      console.log('New arrival added successfully:', newArrival.name);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      console.error('Validation error:', error);
    }
  };

  const handleEdit = (arrival: NewArrival) => {
    setEditingId(arrival.id);
    setFormData(arrival);
    setErrors({});
  };

  const handleUpdate = () => {
    setErrors({});

    try {
      // Sanitize inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name || ''),
        description: sanitizeInput(formData.description || ''),
        price: formData.price || 0,
        imageUrl: sanitizeUrl(formData.imageUrl || ''),
        category: formData.category || '',
        featured: formData.featured || false,
        customerPhoto: formData.customerPhoto ? sanitizeUrl(formData.customerPhoto) : '',
        customerName: formData.customerName ? sanitizeInput(formData.customerName) : ''
      };

      // Validate
      const validatedData = newArrivalSchema.parse(sanitizedData);

      setNewArrivals(newArrivals.map(arrival => 
        arrival.id === editingId 
          ? { 
              ...arrival, 
              name: validatedData.name,
              description: validatedData.description,
              price: validatedData.price,
              imageUrl: validatedData.imageUrl || '',
              category: validatedData.category,
              featured: validatedData.featured,
              customerPhoto: validatedData.customerPhoto || '',
              customerName: validatedData.customerName || ''
            }
          : arrival
      ));
      setEditingId(null);
      setFormData({});
      console.log('New arrival updated successfully');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      console.error('Validation error:', error);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setNewArrivals(newArrivals.filter(arrival => arrival.id !== id));
      console.log('New arrival deleted:', id);
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({});
    setErrors({});
  };

  const renderForm = () => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter product name"
            maxLength={200}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {errors.name}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            value={formData.category || ''}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.category ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select category</option>
            <option value="Kanjivaram">Kanjivaram</option>
            <option value="Kalamkari">Kalamkari</option>
            <option value="Bandhani">Bandhani</option>
            <option value="Block Print">Block Print</option>
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {errors.category}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
          <input
            type="number"
            value={formData.price || ''}
            onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.price ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter price"
            min="1"
            max="1000000"
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {errors.price}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image URL</label>
          <input
            type="url"
            value={formData.imageUrl || ''}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.imageUrl ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter image URL"
          />
          {errors.imageUrl && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {errors.imageUrl}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name (Optional)</label>
          <input
            type="text"
            value={formData.customerName || ''}
            onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Customer who purchased"
            maxLength={100}
          />
          {errors.customerName && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {errors.customerName}
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Photo URL (Optional)</label>
          <input
            type="url"
            value={formData.customerPhoto || ''}
            onChange={(e) => setFormData({...formData, customerPhoto: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerPhoto ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Customer photo URL"
          />
          {errors.customerPhoto && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {errors.customerPhoto}
            </p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Enter product description"
            maxLength={500}
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {errors.description}
            </p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured || false}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              className="rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Feature this item</span>
          </label>
        </div>
      </div>
      
      <div className="flex gap-3 mt-6">
        <button
          onClick={editingId ? handleUpdate : handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          {editingId ? 'Update' : 'Add'} Item
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">New Arrivals Management</h3>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Arrival
        </button>
      </div>

      {(isAddingNew || editingId) && renderForm()}

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {newArrivals.map((arrival) => (
          <div key={arrival.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {arrival.imageUrl ? (
                <img 
                  src={arrival.imageUrl} 
                  alt={arrival.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={arrival.imageUrl ? 'hidden' : ''}>
                <Image className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-800 line-clamp-1">{arrival.name}</h4>
                {arrival.featured && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Featured</span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{arrival.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-2">₹{arrival.price.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mb-3">{arrival.category}</p>
              
              {arrival.customerName && (
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  {arrival.customerPhoto && (
                    <img 
                      src={arrival.customerPhoto} 
                      alt={arrival.customerName}
                      className="w-6 h-6 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <span>Worn by {arrival.customerName}</span>
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(arrival)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(arrival.id)}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {newArrivals.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No new arrivals yet. Add your first item to get started.</p>
        </div>
      )}
    </div>
  );
};
