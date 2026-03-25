import { db } from '../lib/firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { Product } from '../types';

const productsCollection = collection(db, 'products');

export const fetchAllProducts = async (): Promise<Product[]> => {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Product) : null;
};