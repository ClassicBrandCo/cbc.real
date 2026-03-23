import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Minus, Plus, Check } from 'lucide-react';
import { PRODUCTS } from '@/constants/mockData';
import { useCurrencyStore } from '@/stores/currencyStore';
import { useCartStore } from '@/stores/cartStore';
import ProductCard from '@/components/features/ProductCard';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = PRODUCTS.find((p) => p.id === id);
    const { formatPrice } = useCurrencyStore();
    const { addItem, openCart } = useCartStore();

    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-obsidian pt-20">
                <p className="font-display text-2xl text-foreground">Product not found</p>
                <Link
                    to="/shop"
                    className="font-body text-sm text-gold underline underline-offset-4"
                >
                    Back to Shop
                </Link>
            </div>
        );
    }

    const related = PRODUCTS.filter(
        (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);

    const handleAddToCart = () => {
        if (!selectedSize) return;
        for (let i = 0; i < quantity; i++) {
            addItem({
                productId: product.id,
                name: product.name,
                priceUGX: product.priceUGX,
                imageUrl: product.imageUrl,
                size: selectedSize,
            });
        }
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            openCart();
        }, 800);
    };

    return (
        <div className="bg-obsidian pt-24 lg:pt-28">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                {/* Breadcrumb */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 font-body text-sm text-foreground/40 transition-colors hover:text-gold"
                >
                    <ArrowLeft className="size-4" />
                    Back
                </button>

                {/* Product layout */}
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-7"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-obsidian-100 sm:aspect-[4/5]">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="size-full object-cover"
                            />
                            {product.tag && (
                                <span className="absolute left-4 top-4 rounded-sm bg-gold px-3 py-1 font-body text-xs font-semibold uppercase text-obsidian">
                                    {product.tag}
                                </span>
                            )}
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="flex flex-col lg:col-span-5 lg:py-4"
                    >
                        <p className="mb-2 font-body text-[11px] font-semibold uppercase text-gold/50">
                            {product.category}
                        </p>
                        <h1 className="mb-3 font-display text-3xl font-bold text-foreground lg:text-4xl">
                            {product.name}
                        </h1>
                        <p className="mb-6 font-display text-2xl font-semibold tabular-nums text-gold">
                            {formatPrice(product.priceUGX)}
                        </p>
                        <p className="mb-8 font-body text-sm leading-relaxed text-foreground/45">
                            {product.description}
                        </p>

                        {/* Size selector */}
                        <div className="mb-6">
                            <p className="mb-3 font-body text-xs font-semibold uppercase text-foreground/50">
                                Size
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={cn(
                                            'flex min-w-[48px] items-center justify-center rounded-sm border px-3 py-2.5 font-body text-xs font-medium transition-all duration-200',
                                            selectedSize === size
                                                ? 'border-gold bg-gold/10 text-gold'
                                                : 'border-obsidian-50 text-foreground/50 hover:border-foreground/20 hover:text-foreground'
                                        )}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {!selectedSize && (
                                <p className="mt-2 font-body text-xs text-foreground/25">
                                    Please select a size
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="mb-8">
                            <p className="mb-3 font-body text-xs font-semibold uppercase text-foreground/50">
                                Quantity
                            </p>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="flex size-10 items-center justify-center rounded-sm border border-obsidian-50 text-foreground/60 transition-colors hover:border-gold/30 hover:text-gold"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus className="size-4" />
                                </button>
                                <span className="w-10 text-center font-body text-lg tabular-nums text-foreground">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="flex size-10 items-center justify-center rounded-sm border border-obsidian-50 text-foreground/60 transition-colors hover:border-gold/30 hover:text-gold"
                                    aria-label="Increase quantity"
                                >
                                    <Plus className="size-4" />
                                </button>
                            </div>
                        </div>

                        {/* Add to cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedSize || added}
                            className={cn(
                                'flex w-full items-center justify-center gap-2.5 rounded-sm px-8 py-4 font-body text-sm font-semibold uppercase transition-all duration-200',
                                added
                                    ? 'bg-emerald-600 text-white'
                                    : selectedSize
                                        ? 'bg-gold text-obsidian hover:bg-gold-300'
                                        : 'cursor-not-allowed bg-obsidian-50 text-foreground/25'
                            )}
                        >
                            {added ? (
                                <>
                                    <Check className="size-4" />
                                    Added to Cart
                                </>
                            ) : (
                                <>
                                    <ShoppingBag className="size-4" />
                                    Add to Cart
                                </>
                            )}
                        </button>

                        {/* Meta */}
                        <div className="mt-8 space-y-3 border-t border-gold/8 pt-6">
                            {[
                                ['Material', 'Premium 220gsm Cotton'],
                                ['Care', 'Machine wash cold, hang dry'],
                                ['Shipping', 'Free delivery within Kampala'],
                            ].map(([label, value]) => (
                                <div key={label} className="flex justify-between">
                                    <span className="font-body text-xs text-foreground/30">{label}</span>
                                    <span className="font-body text-xs text-foreground/60">{value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Related products */}
                {related.length > 0 && (
                    <section className="mt-20 border-t border-gold/8 py-16 lg:mt-28 lg:py-20">
                        <h2 className="mb-8 font-display text-2xl font-bold text-foreground">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                            {related.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <div className="h-16" />
        </div>
    );
};

export default ProductDetail;
