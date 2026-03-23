export interface Product {
    id: string;
    name: string;
    priceUGX: number;
    category: Category;
    imageUrl: string;
    description: string;
    sizes: string[];
    inStock: boolean;
    featured: boolean;
    tag?: string;
}

export interface CartItem {
    productId: string;
    name: string;
    priceUGX: number;
    imageUrl: string;
    size: string;
    quantity: number;
}

export interface OrderFormData {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
}

export interface Order {
    id: string;
    customer: OrderFormData;
    items: CartItem[];
    totalUGX: number;
    status: 'pending' | 'processing' | 'completed';
    createdAt: string;
}

export type Currency = 'UGX' | 'USD';

export type Category = 'All' | 'T-Shirts' | 'Hoodies' | 'Caps' | 'Pants' | 'Jackets' | 'Accessories';
