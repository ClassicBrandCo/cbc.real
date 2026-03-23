import { useCurrencyStore } from '@/stores/currencyStore';
import { DollarSign } from 'lucide-react';

const CurrencyToggle = () => {
    const { currency, toggleCurrency } = useCurrencyStore();

    return (
        <button
            onClick={toggleCurrency}
            className="group flex items-center gap-1.5 rounded-full border border-gold/20 bg-obsidian-50/50 px-3 py-1.5 font-body text-xs font-medium text-gold transition-all duration-200 hover:border-gold/40 hover:bg-gold/10"
            aria-label={`Switch to ${currency === 'UGX' ? 'USD' : 'UGX'}`}
        >
            <DollarSign className="size-3.5 transition-transform duration-200 group-hover:scale-110" />
            <span>{currency}</span>
        </button>
    );
};

export default CurrencyToggle;
