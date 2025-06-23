
import { useState } from 'react';
import { X, Package, Settings, Truck, Star, Store } from 'lucide-react';
import { ProductManager } from './ProductManager';
import { NewArrivalsManager } from './NewArrivalsManager';
import { StoreSettingsManager } from './StoreSettingsManager';
import { DeliverySettingsManager } from './DeliverySettingsManager';
import { SalesManager } from './SalesManager';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard = ({ onClose }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'new-arrivals', label: 'New Arrivals', icon: Star },
    { id: 'sales', label: 'Sales', icon: Settings },
    { id: 'delivery', label: 'Delivery Settings', icon: Truck },
    { id: 'store', label: 'Store Settings', icon: Store },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200 z-[10001] relative"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(95vh-80px)]">
          {/* Sidebar */}
          <div className="w-full lg:w-64 bg-gray-50 dark:bg-gray-800 border-b lg:border-r lg:border-b-0 border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline lg:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'products' && <ProductManager />}
            {activeTab === 'new-arrivals' && <NewArrivalsManager />}
            {activeTab === 'sales' && <SalesManager />}
            {activeTab === 'delivery' && <DeliverySettingsManager />}
            {activeTab === 'store' && <StoreSettingsManager />}
          </div>
        </div>
      </div>
    </div>
  );
};
