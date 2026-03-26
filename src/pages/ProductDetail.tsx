import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Minus, Plus, Check } from 'lucide-react';
import { useProducts } from '@/services/firestoreService';
import { useCurrencyStore } from '@/stores/currencyStore';
import { useCartStore } from '@/stores/cartStore';
import ProductCard from '@/components/features/ProductCard';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: allProducts = [] } = useProducts(50, 1);  // Load enough for detail
    const { formatPrice } = useCurrencyStore();
    const { addItem, openCart } = useCartStore();

    const product = allProducts.find((p: Product) => p.id === id);
    const related = allProducts.filter((p: Product) => p.category === product?.category && p.id !== id).slice(0, 4);

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
                {/* existing JSX for product detail unchanged */}
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
                                onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                            />
                            {product.tag && (
                                <span className="absolute left-4 top-4 rounded-sm bg-gold px-3 py-1 font-body text-xs font-semibold uppercase text-obsidian">
                                    {product.tag}
                                </span>
                            )}
                        </div>
                    </motion.div>

                    {/* Details - unchanged */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="flex flex-col lg:col-span-5 lg:py-4"
                    >
                        {/* existing details JSX */}
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

