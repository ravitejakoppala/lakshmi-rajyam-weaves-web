
import { useState } from 'react';
import { X, Package, Settings, Truck, Star, Store } from 'lucide-react';
import { ProductManager } from './ProductManager';
import { NewArrivalsManager } from './NewArrivalsManager';
import { StoreSettingsManager } from './StoreSettingsManager';
import { DeliverySettingsManager } from './DeliverySettingsManager';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard = ({ onClose }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'new-arrivals', label: 'New Arrivals', icon: Star },
    { id: 'delivery', label: 'Delivery Settings', icon: Truck },
    { id: 'store', label: 'Store Settings', icon: Store },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'products' && <ProductManager />}
            {activeTab === 'new-arrivals' && <NewArrivalsManager />}
            {activeTab === 'delivery' && <DeliverySettingsManager />}
            {activeTab === 'store' && <StoreSettingsManager />}
          </div>
        </div>
      </div>
    </div>
  );
};
