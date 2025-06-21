
// Simple in-memory database simulation for demo purposes
// In production, this would connect to a real database

import { Product, Order, Customer } from '../types/product';

class Database {
  private products: Product[] = [
    {
      id: 1,
      name: 'Royal Kanjivaram Silk Saree',
      category: 'Kanjivaram',
      price: 25999,
      stock: 12,
      status: 'Active',
      description: 'Handwoven Kanjivaram silk saree with gold zari work',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01')
    },
    {
      id: 2,
      name: 'Handpainted Kalamkari Saree',
      category: 'Kalamkari',
      price: 18500,
      stock: 8,
      status: 'Active',
      description: 'Traditional Kalamkari print with mythological motifs',
      createdAt: new Date('2025-01-02'),
      updatedAt: new Date('2025-01-02')
    },
    {
      id: 3,
      name: 'Traditional Bandhani Saree',
      category: 'Bandhani',
      price: 12000,
      stock: 15,
      status: 'Active',
      description: 'Authentic Bandhani tie-dye technique from Gujarat',
      createdAt: new Date('2025-01-03'),
      updatedAt: new Date('2025-01-03')
    }
  ];

  private orders: Order[] = [
    {
      id: 1,
      customerId: 1,
      customerName: 'Anjali R.',
      customerEmail: 'anjali@example.com',
      products: [{ productId: 1, productName: 'Royal Kanjivaram Silk Saree', quantity: 1, price: 25999 }],
      totalAmount: 25999,
      status: 'Shipped',
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-16')
    },
    {
      id: 2,
      customerId: 2,
      customerName: 'Meera S.',
      customerEmail: 'meera@example.com',
      products: [{ productId: 2, productName: 'Handpainted Kalamkari Saree', quantity: 1, price: 18500 }],
      totalAmount: 18500,
      status: 'Processing',
      createdAt: new Date('2025-01-16'),
      updatedAt: new Date('2025-01-16')
    }
  ];

  private customers: Customer[] = [
    {
      id: 1,
      name: 'Anjali R.',
      email: 'anjali@example.com',
      phone: '+91-9876543210',
      totalOrders: 3,
      totalSpent: 75500,
      createdAt: new Date('2024-12-01')
    },
    {
      id: 2,
      name: 'Meera S.',
      email: 'meera@example.com',
      phone: '+91-9876543211',
      totalOrders: 2,
      totalSpent: 48000,
      createdAt: new Date('2024-12-15')
    }
  ];

  // Product operations
  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Product {
    const newProduct: Product = {
      ...product,
      id: Math.max(...this.products.map(p => p.id), 0) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(id: number, updates: Partial<Product>): Product | null {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.products[index] = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date()
    };
    return this.products[index];
  }

  deleteProduct(id: number): boolean {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    return true;
  }

  // Order operations
  getAllOrders(): Order[] {
    return [...this.orders];
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  addOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
    const newOrder: Order = {
      ...order,
      id: Math.max(...this.orders.map(o => o.id), 0) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  updateOrder(id: number, updates: Partial<Order>): Order | null {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    this.orders[index] = {
      ...this.orders[index],
      ...updates,
      updatedAt: new Date()
    };
    return this.orders[index];
  }

  // Customer operations
  getAllCustomers(): Customer[] {
    return [...this.customers];
  }

  getCustomerById(id: number): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }

  addCustomer(customer: Omit<Customer, 'id' | 'createdAt'>): Customer {
    const newCustomer: Customer = {
      ...customer,
      id: Math.max(...this.customers.map(c => c.id), 0) + 1,
      createdAt: new Date()
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  updateCustomer(id: number, updates: Partial<Customer>): Customer | null {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    this.customers[index] = {
      ...this.customers[index],
      ...updates
    };
    return this.customers[index];
  }
}

// Export a singleton instance
export const database = new Database();
