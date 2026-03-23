import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import heroShopImg from '@/assets/hero-shop.jpg';
import { PRODUCTS } from '@/constants/mockData';
import type { Category } from '@/types';
import ProductCard from '@/components/features/ProductCard';
import CategoryFilter from '@/components/features/CategoryFilter';

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('All');
    const [sortBy, setSortBy] = useState<'default' | 'low' | 'high'>('default');

    const filtered = useMemo(() => {
        let items =
            activeCategory === 'All'
                ? PRODUCTS
                : PRODUCTS.filter((p) => p.category === activeCategory);

        if (sortBy === 'low') items = [...items].sort((a, b) => a.priceUGX - b.priceUGX);
        if (sortBy === 'high') items = [...items].sort((a, b) => b.priceUGX - a.priceUGX);

        return items;
    }, [activeCategory, sortBy]);

    return (
        <div>
            {/* Hero banner */}
            <section className="relative flex h-64 items-end overflow-hidden sm:h-80">
                <img
                    src={heroShopImg}
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/30" />
                <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-8 lg:px-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-display text-4xl font-bold text-foreground lg:text-5xl"
                    >
                        The Collection
                    </motion.h1>
                    <p className="mt-2 font-body text-sm text-foreground/45">
                        {PRODUCTS.length} pieces crafted for the culture
                    </p>
                </div>
            </section>

            {/* Filters & grid */}
            <section className="bg-obsidian py-10 lg:py-14">
                <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                    {/* Filter bar */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="w-40 rounded-sm border border-obsidian-50 bg-obsidian px-3 py-2 font-body text-xs text-foreground/60 outline-none transition-colors focus:border-gold/30"
                        >
                            <option value="default">Sort: Default</option>
                            <option value="low">Price: Low → High</option>
                            <option value="high">Price: High → Low</option>
                        </select>
                    </div>

                    {/* Product grid */}
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                            {filtered.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="font-body text-sm text-foreground/30">
                                No products in this category yet.
                            </p>
                        </div>
                    )}

                    {/* Count */}
                    <div className="mt-10 text-center">
                        <p className="font-body text-xs text-foreground/25">
                            Showing {filtered.length} of {PRODUCTS.length} products
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Shop;
