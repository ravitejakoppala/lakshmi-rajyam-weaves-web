
import { useState, useEffect } from 'react';

interface DeliverySettings {
  deliveryEnabled: boolean;
  freeShippingThreshold: number;
  codAvailable: boolean;
  showPromotionalContent: boolean;
}

export const useDeliverySettings = () => {
  const [settings, setSettings] = useState<DeliverySettings>(() => {
    const stored = localStorage.getItem('deliverySettings');
    return stored ? JSON.parse(stored) : {
      deliveryEnabled: false,
      freeShippingThreshold: 2000,
      codAvailable: false,
      showPromotionalContent: false
    };
  });

  useEffect(() => {
    localStorage.setItem('deliverySettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<DeliverySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
};
