
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200, 'Name too long'),
  category: z.enum(['Kanjivaram', 'Kalamkari', 'Bandhani', 'Block Print'], {
    errorMap: () => ({ message: 'Invalid category' })
  }),
  price: z.number().min(1, 'Price must be positive').max(1000000, 'Price too high'),
  stock: z.number().min(0, 'Stock cannot be negative').max(10000, 'Stock too high'),
  description: z.string().max(1000, 'Description too long').optional(),
  status: z.enum(['Active', 'Inactive']).optional()
});

export const newArrivalSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200),
  description: z.string().min(1, 'Description is required').max(500),
  price: z.number().min(1, 'Price must be positive').max(1000000),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  category: z.enum(['Kanjivaram', 'Kalamkari', 'Bandhani', 'Block Print']),
  featured: z.boolean(),
  customerPhoto: z.string().url('Invalid customer photo URL').optional().or(z.literal('')),
  customerName: z.string().max(100, 'Customer name too long').optional().or(z.literal(''))
});

export const storeSettingsSchema = z.object({
  storeName: z.string().min(1, 'Store name is required').max(100),
  address: z.object({
    street: z.string().min(1, 'Street address is required').max(200),
    city: z.string().min(1, 'City is required').max(100),
    pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode format')
  }),
  phone: z.string().regex(/^\+\d{1,3}-\d{5}-\d{5}$/, 'Invalid phone format'),
  email: z.string().email('Invalid email format'),
  socialMedia: z.object({
    instagram: z.string().url('Invalid Instagram URL').optional().or(z.literal('')),
    facebook: z.string().url('Invalid Facebook URL').optional().or(z.literal('')),
    youtube: z.string().url('Invalid YouTube URL').optional().or(z.literal('')),
    whatsapp: z.string().regex(/^\+\d{1,3}-\d{5}-\d{5}$/, 'Invalid WhatsApp format')
  }),
  hours: z.object({
    weekdays: z.string().min(1, 'Weekday hours required'),
    weekends: z.string().min(1, 'Weekend hours required')
  })
});

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});
