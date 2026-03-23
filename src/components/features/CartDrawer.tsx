import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useCurrencyStore } from '@/stores/currencyStore';
import { cn } from '@/lib/utils';
import type { CartItem } from '@/types';

const CartDrawer = () => {
    const { isOpen, closeCart, items, removeItem, updateQuantity, totalPriceUGX } = useCartStore();
    const { formatPrice } = useCurrencyStore();
    const cartTotal = totalPriceUGX();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={closeCart}
                    />
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-obsidian border-l border-gold/10 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gold/10 p-6">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="size-6 text-gold" />
                                <h2 className="font-display text-lg font-bold text-foreground">
                                    Your Cart
                                </h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="flex size-10 items-center justify-center rounded-full text-foreground/50 transition-colors hover:text-foreground"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                                    <ShoppingBag className="size-16 text-foreground/20" />
                                    <h3 className="font-display text-lg font-semibold text-foreground">
                                        Your cart is empty
                                    </h3>
                                    <p className="font-body text-sm text-foreground/40">
                                        Looks like you haven't added anything to your cart yet.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={`${item.productId}-${item.size}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-4 border-b border-gold/5 pb-4 last:border-b-0"
                                        >
                                            <div className="relative aspect-square h-20 flex-shrink-0 overflow-hidden rounded-md bg-obsidian-100">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    className="size-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col gap-1">
                                                <h4 className="font-body text-sm font-semibold text-foreground line-clamp-2">
                                                    {item.name}
                                                </h4>
                                                <p className="font-body text-xs text-foreground/50">
                                                    Size: <span className="font-medium">{item.size}</span>
                                                </p>
                                                <p className="font-display text-xs font-semibold tabular-nums text-gold">
                                                    {formatPrice(item.priceUGX)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 rounded border border-obsidian-50 bg-obsidian-100/50 px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                                                        className="flex size-6 items-center justify-center text-foreground/50 hover:text-gold"
                                                    >
                                                        <Minus className="size-3" />
                                                    </button>
                                                    <span className="font-body text-xs font-semibold tabular-nums text-foreground min-w-[20px] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                                                        className="flex size-6 items-center justify-center text-foreground/50 hover:text-gold"
                                                    >
                                                        <Plus className="size-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.productId, item.size)}
                                                    className="flex size-8 items-center justify-center rounded text-foreground/50 hover:text-gold"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="size-3" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gold/10 p-6">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-body text-sm font-medium text-foreground">
                                        Subtotal
                                    </span>
                                    <span className="font-display text-lg font-bold tabular-nums text-gold">
                                        {formatPrice(cartTotal)}
                                    </span>
                                </div>
                                <p className="font-body text-xs text-foreground/40">
                                    Shipping calculated at checkout. Taxes included where applicable.
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    closeCart();
                                    window.location.href = '/contact';
                                }}
                                className="mt-4 w-full rounded-sm bg-gold py-4 font-body text-sm font-semibold uppercase text-obsidian transition-colors hover:bg-gold-300"
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={closeCart}
                                className="mt-3 w-full rounded-sm border border-foreground/15 py-4 font-body text-sm font-medium uppercase text-foreground/70 transition-colors hover:border-gold/30 hover:text-gold"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;

