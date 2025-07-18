
import { useState } from 'react';
import { Save, MapPin, Phone, Instagram, Mail, Link as LinkIcon, Edit2, AlertTriangle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { storeSettingsSchema } from '../lib/validationSchemas';
import { sanitizeInput, sanitizeUrl } from '../lib/auth';
import { z } from 'zod';

interface StoreSettings {
  storeName: string;
  address: {
    street: string;
    city: string;
    pincode: string;
  };
  phone: string;
  email: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
  };
  hours: {
    weekdays: string;
    weekends: string;
  };
}

export const StoreSettingsManager = () => {
  const [storeSettings, setStoreSettings] = useLocalStorage<StoreSettings>('store-settings', {
    storeName: 'Lakshmi Rajyam Sarees',
    address: {
      street: 'Santinagar 3rd Road',
      city: 'Eluru',
      pincode: '534007'
    },
    phone: '+91-94926-07499',
    email: 'info@lakshmirajyam.com',
    socialMedia: {
      instagram: 'https://instagram.com/lakshmirajyamsarees',
      facebook: 'https://facebook.com/lakshmirajyamsarees',
      youtube: 'https://youtube.com/@lakshmirajyamsarees',
      whatsapp: '+91-94926-07499'
    },
    hours: {
      weekdays: '10:00 AM – 7:00 PM',
      weekends: '10:00 AM – 6:00 PM'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(storeSettings);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    setErrors({});

    try {
      // Sanitize all inputs
      const sanitizedSettings = {
        storeName: sanitizeInput(editedSettings.storeName),
        address: {
          street: sanitizeInput(editedSettings.address.street),
          city: sanitizeInput(editedSettings.address.city),
          pincode: sanitizeInput(editedSettings.address.pincode)
        },
        phone: sanitizeInput(editedSettings.phone),
        email: sanitizeInput(editedSettings.email),
        socialMedia: {
          instagram: sanitizeUrl(editedSettings.socialMedia.instagram),
          facebook: sanitizeUrl(editedSettings.socialMedia.facebook),
          youtube: sanitizeUrl(editedSettings.socialMedia.youtube),
          whatsapp: sanitizeInput(editedSettings.socialMedia.whatsapp)
        },
        hours: {
          weekdays: sanitizeInput(editedSettings.hours.weekdays),
          weekends: sanitizeInput(editedSettings.hours.weekends)
        }
      };

      // Validate
      const validatedSettings = storeSettingsSchema.parse(sanitizedSettings);
      
      // Create complete StoreSettings object with all required properties
      const completeSettings: StoreSettings = {
        storeName: validatedSettings.storeName,
        address: {
          street: validatedSettings.address.street,
          city: validatedSettings.address.city,
          pincode: validatedSettings.address.pincode
        },
        phone: validatedSettings.phone,
        email: validatedSettings.email,
        socialMedia: {
          instagram: validatedSettings.socialMedia.instagram || '',
          facebook: validatedSettings.socialMedia.facebook || '',
          youtube: validatedSettings.socialMedia.youtube || '',
          whatsapp: validatedSettings.socialMedia.whatsapp
        },
        hours: {
          weekdays: validatedSettings.hours.weekdays,
          weekends: validatedSettings.hours.weekends
        }
      };
      
      setStoreSettings(completeSettings);
      setIsEditing(false);
      console.log('Store settings updated successfully');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      }
      console.error('Validation error:', error);
    }
  };

  const handleCancel = () => {
    setEditedSettings(storeSettings);
    setIsEditing(false);
    setErrors({});
  };

  const updateSetting = (path: string, value: string) => {
    setEditedSettings(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return updated;
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Store Settings</h3>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit Settings
            </button>
          )}
        </div>
      </div>

      {/* Store Information */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Store Information
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Name</label>
            <input
              type="text"
              value={isEditing ? editedSettings.storeName : storeSettings.storeName}
              onChange={(e) => updateSetting('storeName', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors.storeName ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
              maxLength={100}
            />
            {errors.storeName && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.storeName}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              value={isEditing ? editedSettings.phone : storeSettings.phone}
              onChange={(e) => updateSetting('phone', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors.phone ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="+91-XXXXX-XXXXX"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={isEditing ? editedSettings.email : storeSettings.email}
              onChange={(e) => updateSetting('email', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors.email ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
            <input
              type="text"
              value={isEditing ? editedSettings.address.street : storeSettings.address.street}
              onChange={(e) => updateSetting('address.street', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors['address.street'] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
              maxLength={200}
            />
            {errors['address.street'] && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors['address.street']}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
            <input
              type="text"
              value={isEditing ? editedSettings.address.city : storeSettings.address.city}
              onChange={(e) => updateSetting('address.city', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors['address.city'] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
              maxLength={100}
            />
            {errors['address.city'] && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors['address.city']}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pincode</label>
            <input
              type="text"
              value={isEditing ? editedSettings.address.pincode : storeSettings.address.pincode}
              onChange={(e) => updateSetting('address.pincode', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors['address.pincode'] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="XXXXXX"
              maxLength={6}
            />
            {errors['address.pincode'] && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors['address.pincode']}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-blue-600" />
          Social Media Links
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Instagram URL
            </label>
            <input
              type="url"
              value={isEditing ? editedSettings.socialMedia.instagram : storeSettings.socialMedia.instagram}
              onChange={(e) => updateSetting('socialMedia.instagram', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors['socialMedia.instagram'] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors['socialMedia.instagram'] && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors['socialMedia.instagram']}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Facebook URL
            </label>
            <input
              type="url"
              value={isEditing ? editedSettings.socialMedia.facebook : storeSettings.socialMedia.facebook}
              onChange={(e) => updateSetting('socialMedia.facebook', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors['socialMedia.facebook'] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors['socialMedia.facebook'] && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors['socialMedia.facebook']}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">YouTube URL</label>
            <input
              type="url"
              value={isEditing ? editedSettings.socialMedia.youtube : storeSettings.socialMedia.youtube}
              onChange={(e) => updateSetting('socialMedia.youtube', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors['socialMedia.youtube'] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors['socialMedia.youtube'] && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors['socialMedia.youtube']}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={isEditing ? editedSettings.socialMedia.whatsapp : storeSettings.socialMedia.whatsapp}
              onChange={(e) => updateSetting('socialMedia.whatsapp', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors['socialMedia.whatsapp'] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="+91-XXXXX-XXXXX"
            />
            {errors['socialMedia.whatsapp'] && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors['socialMedia.whatsapp']}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Store Hours */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Store Hours</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monday - Saturday</label>
            <input
              type="text"
              value={isEditing ? editedSettings.hours.weekdays : storeSettings.hours.weekdays}
              onChange={(e) => updateSetting('hours.weekdays', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors['hours.weekdays'] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors['hours.weekdays'] && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors['hours.weekdays']}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sunday</label>
            <input
              type="text"
              value={isEditing ? editedSettings.hours.weekends : storeSettings.hours.weekends}
              onChange={(e) => updateSetting('hours.weekends', e.target.value)}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors['hours.weekends'] ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors['hours.weekends'] && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {errors['hours.weekends']}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
