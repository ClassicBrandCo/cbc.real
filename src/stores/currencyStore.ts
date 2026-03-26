import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Currency } from '@/types';

interface CurrencyState {
    currency: Currency;
    rate: number;
    toggleCurrency: () => void;
    formatPrice: (priceUGX: number) => string;
}

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set, get) => ({
            currency: 'UGX',
            rate: 3750,
            toggleCurrency: () =>
                set((state) => ({
                    currency: state.currency === 'UGX' ? 'USD' : 'UGX',
                })),
formatPrice: (priceUGX: number | undefined | null) => {
                const safePrice = Number(priceUGX || 0);
                const { currency, rate } = get();
                if (currency === 'UGX') {
                    return `UGX ${safePrice.toLocaleString('en-US')}`;
                }
                return `$${(safePrice / rate).toFixed(2)}`;
            },

        }),
        { name: 'cbc-currency' }
    )
);
