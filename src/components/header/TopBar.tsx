
interface TopBarProps {
  deliverySettings: {
    deliveryEnabled: boolean;
    showPromotionalContent: boolean;
    freeShippingThreshold: number;
    codAvailable: boolean;
  };
}

export const TopBar = ({ deliverySettings }: TopBarProps) => {
  if (!deliverySettings.deliveryEnabled || !deliverySettings.showPromotionalContent) {
    return null;
  }

  return (
    <div className="bg-blue-600 dark:bg-blue-700 text-white py-2">
      <div className="container mx-auto px-6 text-center text-sm">
        <span>
          Free shipping on orders above ₹{deliverySettings.freeShippingThreshold.toLocaleString()}
          {deliverySettings.codAvailable && ' | COD Available'}
        </span>
      </div>
    </div>
  );
};
