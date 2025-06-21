
import { useState } from 'react';
import { Save, MapPin, Phone, Instagram, Mail, Link as LinkIcon, Edit2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

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

  const handleSave = () => {
    setStoreSettings(editedSettings);
    setIsEditing(false);
    console.log('Store settings updated:', editedSettings);
  };

  const handleCancel = () => {
    setEditedSettings(storeSettings);
    setIsEditing(false);
  };

  const updateSetting = (path: string, value: string) => {
    setEditedSettings(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return updated;
    });
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Store Settings</h3>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Store Information
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
            <input
              type="text"
              value={isEditing ? editedSettings.storeName : storeSettings.storeName}
              onChange={(e) => updateSetting('storeName', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={isEditing ? editedSettings.phone : storeSettings.phone}
              onChange={(e) => updateSetting('phone', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={isEditing ? editedSettings.email : storeSettings.email}
              onChange={(e) => updateSetting('email', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              value={isEditing ? editedSettings.address.street : storeSettings.address.street}
              onChange={(e) => updateSetting('address.street', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={isEditing ? editedSettings.address.city : storeSettings.address.city}
              onChange={(e) => updateSetting('address.city', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
            <input
              type="text"
              value={isEditing ? editedSettings.address.pincode : storeSettings.address.pincode}
              onChange={(e) => updateSetting('address.pincode', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-blue-600" />
          Social Media Links
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              Instagram URL
            </label>
            <input
              type="url"
              value={isEditing ? editedSettings.socialMedia.instagram : storeSettings.socialMedia.instagram}
              onChange={(e) => updateSetting('socialMedia.instagram', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Facebook URL
            </label>
            <input
              type="url"
              value={isEditing ? editedSettings.socialMedia.facebook : storeSettings.socialMedia.facebook}
              onChange={(e) => updateSetting('socialMedia.facebook', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
            <input
              type="url"
              value={isEditing ? editedSettings.socialMedia.youtube : storeSettings.socialMedia.youtube}
              onChange={(e) => updateSetting('socialMedia.youtube', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={isEditing ? editedSettings.socialMedia.whatsapp : storeSettings.socialMedia.whatsapp}
              onChange={(e) => updateSetting('socialMedia.whatsapp', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Store Hours */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Store Hours</h4>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monday - Saturday</label>
            <input
              type="text"
              value={isEditing ? editedSettings.hours.weekdays : storeSettings.hours.weekdays}
              onChange={(e) => updateSetting('hours.weekdays', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sunday</label>
            <input
              type="text"
              value={isEditing ? editedSettings.hours.weekends : storeSettings.hours.weekends}
              onChange={(e) => updateSetting('hours.weekends', e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
