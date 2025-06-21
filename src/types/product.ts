
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'Active' | 'Inactive';
  description?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  customerEmail: string;
  products: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: Date;
}
