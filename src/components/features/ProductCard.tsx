import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCurrencyStore } from '@/stores/currencyStore';
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types';

interface ProductCardProps {
    product: Product;
    index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
    const { formatPrice } = useCurrencyStore();
    const addItem = useCartStore((s) => s.addItem);
    const openCart = useCartStore((s) => s.openCart);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            productId: product.id,
            name: product.name,
            priceUGX: product.priceUGX,
            imageUrl: product.imageUrl,
            size: product.sizes[Math.floor(product.sizes.length / 2)],
        });
        openCart();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <Link
                to={`/product/${product.id}`}
                className="group relative block overflow-hidden"
            >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-obsidian-100">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Tag badge */}
                    {product.tag && (
                        <span className="absolute left-3 top-3 rounded-sm bg-gold px-2.5 py-1 font-body text-[10px] font-semibold uppercase text-obsidian">
                            {product.tag}
                        </span>
                    )}

                    {/* Quick add button */}
                    <button
                        onClick={handleQuickAdd}
                        className="absolute bottom-3 right-3 flex size-10 translate-y-4 items-center justify-center rounded-full bg-gold text-obsidian opacity-0 transition-all duration-300 hover:bg-gold-300 group-hover:translate-y-0 group-hover:opacity-100"
                        aria-label={`Quick add ${product.name}`}
                    >
                        <ShoppingBag className="size-4" />
                    </button>
                </div>

                {/* Info */}
                <div className="mt-3 space-y-1">
                    <p className="font-body text-[11px] font-medium uppercase text-gold/50">
                        {product.category}
                    </p>
                    <h3 className="font-display text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-gold">
                        {product.name}
                    </h3>
                    <p className="font-body text-sm font-semibold tabular-nums text-gold">
                        {formatPrice(product.priceUGX)}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
