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
            formatPrice: (priceUGX: number) => {
                const { currency, rate } = get();
                if (currency === 'UGX') {
                    return `UGX ${priceUGX.toLocaleString('en-US')}`;
                }
                return `$${(priceUGX / rate).toFixed(2)}`;
            },
        }),
        { name: 'cbc-currency' }
    )
);
