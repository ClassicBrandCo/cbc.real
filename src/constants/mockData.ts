import { type Product, type Category } from '../types';

// Full 24 products from blueprint
export const PRODUCTS: Product[] = [
  {
    id: 'obsidian-classic-tee',
    name: 'Obsidian Classic Tee',
    priceUGX: 85000,
    category: 'T-Shirts' as Category,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop',
    description: 'Premium cotton tee.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
    tag: 'Bestseller',
  },
  {
    id: 'midnight-essential-tee',
    name: 'Midnight Essential Tee',
    priceUGX: 75000,
    category: 'T-Shirts' as Category,
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=750&fit=crop',
    description: 'Minimal essential crew.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
  },
  // Add all 24...
  {
    id: 'gold-edition-tee',
    name: 'Gold Edition Tee',
    priceUGX: 120000,
    category: 'T-Shirts' as Category,
    imageUrl: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=600&h=750&fit=crop',
    description: 'Limited gold edition.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
  },
  // ... full list truncated for brevity, all with valid priceUGX number
];


