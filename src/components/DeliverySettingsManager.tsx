
import { useState } from 'react';
import { Truck, Package, CreditCard, Megaphone, Save } from 'lucide-react';
import { useDeliverySettings } from '../hooks/useDeliverySettings';

export const DeliverySettingsManager = () => {
  const { settings, updateSettings } = useDeliverySettings();
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(tempSettings);
    console.log('Delivery settings saved:', tempSettings);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Truck className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Delivery Settings</h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Enable Delivery */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg gap-4">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Enable Delivery Service</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Turn on delivery functionality for your store</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tempSettings.deliveryEnabled}
              onChange={(e) => setTempSettings({...tempSettings, deliveryEnabled: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Free Shipping Threshold */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Free Shipping Threshold (₹)
          </label>
          <input
            type="number"
            value={tempSettings.freeShippingThreshold}
            onChange={(e) => setTempSettings({...tempSettings, freeShippingThreshold: parseInt(e.target.value) || 0})}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Enter minimum amount for free shipping"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Orders above this amount will get free shipping
          </p>
        </div>

        {/* COD Available */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg gap-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Cash on Delivery (COD)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Allow customers to pay on delivery</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tempSettings.codAvailable}
              onChange={(e) => setTempSettings({...tempSettings, codAvailable: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Show Promotional Content */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg gap-4">
          <div className="flex items-center gap-3">
            <Megaphone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Show Promotional Content</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Display shipping offers and promotional banners</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={tempSettings.showPromotionalContent}
              onChange={(e) => setTempSettings({...tempSettings, showPromotionalContent: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors duration-200"
        >
          <Save className="w-5 h-5" />
          Save Delivery Settings
        </button>
      </div>
    </div>
  );
};
