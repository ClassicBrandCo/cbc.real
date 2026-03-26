import { useQuery, useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { collection, doc, getDoc, getDocs, query, where, orderBy, limit, addDoc, updateDoc, serverTimestamp, QueryConstraint } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { FirebaseUser, FirebaseProduct, FirebaseCategory, FirebaseOrder } from '@/types/firebase';
import { useAuth } from '@/context/AuthContext';

const COLLECTION_USERS = 'users';
const COLLECTION_PRODUCTS = 'products';
const COLLECTION_CATEGORIES = 'categories';
const COLLECTION_ORDERS = 'orders';

export const useProducts = (pageSize = 20, page = 1, categoryId?: string, realTime = false) => {
    const getProductsQueryKey = ['products', { pageSize, page, categoryId, realTime }];

    return useQuery({
        queryKey: getProductsQueryKey,
        queryFn: async () => {
            const constraints: QueryConstraint[] = [
                orderBy('createdAt', 'desc'),
                limit(pageSize)
            ];

            if (categoryId) {
                constraints.unshift(where('categoryId', '==', categoryId));
            }

            const q = query(
                collection(db, COLLECTION_PRODUCTS),
                ...constraints
            );

            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseProduct));
        },
        staleTime: realTime ? 0 : 5 * 60 * 1000, // 5min if not real-time
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const snapshot = await getDocs(collection(db, COLLECTION_CATEGORIES));
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseCategory));
        },
    });
};

export const useUserOrders = (userId: string) => {
    return useQuery({
        queryKey: ['orders', userId],
        queryFn: async () => {
            const q = query(
                collection(db, COLLECTION_ORDERS),
                where('userId', '==', userId),
                orderBy('createdAt', 'desc')
            );

            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseOrder));
        },
    });
};

export const useAdminOrders = (status?: FirebaseOrder['status']) => {
    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];

    if (status) {
        constraints.unshift(where('status', '==', status));
    }

    return useQuery({
        queryKey: ['adminOrders', status],
        queryFn: async () => {
            const q = query(collection(db, COLLECTION_ORDERS), ...constraints);
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseOrder));
        },
    });
};

export const useUserProfile = (userId: string) => {
    return useQuery({
        queryKey: ['userProfile', userId],
        queryFn: async () => {
            const userDoc = await getDoc(doc(db, COLLECTION_USERS, userId));
            if (userDoc.exists()) {
                return userDoc.data() as FirebaseUser;
            }
            return null;
        },
    });
};

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (orderData: Omit<FirebaseOrder, 'id' | 'createdAt' | 'updatedAt'>) => {
            const newOrder = await addDoc(collection(db, COLLECTION_ORDERS), {
                ...orderData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            return { id: newOrder.id, ...orderData };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ orderId, status }: { orderId: string; status: FirebaseOrder['status'] }) => {
            await updateDoc(doc(db, COLLECTION_ORDERS, orderId), {
                status,
                updatedAt: serverTimestamp(),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
};

