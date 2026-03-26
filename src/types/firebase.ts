export interface FirebaseUser {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'admin' | 'client';
  phoneNumber?: string;
  updatedAt: string;
  createdAt: string;
}

export interface FirebaseProduct {
  id: string;
  name: string;
  priceUGX: number;
  priceUSD?: number;
  categoryId: string;
  categoryName?: string;
  category?: string; // legacy compatibility
  imageUrls: string[];
  imageUrl?: string; // legacy for ProductCard
  description: string;
  sizes: string[];
  inStock: number;
  featured: boolean;
  tags?: string[];
  tag?: string; // legacy
  updatedAt: string;
  createdAt: string;
}

export interface FirebaseCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  updatedAt: string;
  createdAt: string;
}

export interface FirebaseOrder {
  id: string;
  userId: string;
  userEmail: string;
  items: Array<{
    productId: string;
    name: string;
    priceUGX: number;
    size: string;
    quantity: number;
  }>;
  totalUGX: number;
  totalUSD: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
  };
  notes?: string;
  updatedAt: string;
  createdAt: string;
}

