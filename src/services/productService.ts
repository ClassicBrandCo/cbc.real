import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import type { Product } from '@/types';

export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name || '',
        priceUGX: Number(data.price) || 0,
        category: data.category || 'T-Shirts',
        imageUrl: data.imageUrl || '',
        description: data.description || '',
        sizes: data.sizes || ['S', 'M', 'L', 'XL'],
        inStock: data.inStock !== undefined ? data.inStock : true,
        featured: data.featured !== undefined ? data.featured : false,
        tag: data.tag || '',
      };
    });
  } catch (error) {
    console.error('Firestore error:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const docSnap = await getDoc(doc(db, 'products', id));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id,
        name: data.name || '',
        priceUGX: Number(data.price) || 0,
        category: data.category || 'T-Shirts',
        imageUrl: data.imageUrl || '',
        description: data.description || '',
        sizes: data.sizes || ['S', 'M', 'L', 'XL'],
        inStock: data.inStock !== undefined ? data.inStock : true,
        featured: data.featured !== undefined ? data.featured : false,
        tag: data.tag || '',
      };
    }
    return null;
  } catch (error) {
    console.error('Product error:', error);
    return null;
  }
};

