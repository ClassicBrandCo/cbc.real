import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    totalItems: () => number;
    totalPriceUGX: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (newItem) =>
                set((state) => {
                    const existing = state.items.find(
                        (i) => i.productId === newItem.productId && i.size === newItem.size
                    );
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.productId === newItem.productId && i.size === newItem.size
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, { ...newItem, quantity: 1 }] };
                }),

            removeItem: (productId, size) =>
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.productId === productId && i.size === size)
                    ),
                })),

            updateQuantity: (productId, size, quantity) =>
                set((state) => ({
                    items:
                        quantity <= 0
                            ? state.items.filter(
                                (i) => !(i.productId === productId && i.size === size)
                            )
                            : state.items.map((i) =>
                                i.productId === productId && i.size === size
                                    ? { ...i, quantity }
                                    : i
                            ),
                })),

            clearCart: () => set({ items: [] }),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

            totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
            totalPriceUGX: () =>
                get().items.reduce((sum, i) => sum + i.priceUGX * i.quantity, 0),
        }),
        {
            name: 'cbc-cart',
            partialize: (state) => ({ items: state.items }),
        }
    )
);
