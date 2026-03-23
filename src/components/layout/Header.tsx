import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/constants/config';
import CurrencyToggle from '@/components/features/CurrencyToggle';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

const Header = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const openCart = useCartStore((s) => s.openCart);
    const totalItems = useCartStore((s) => s.totalItems);
    const count = totalItems();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <>
            <header
                className={cn(
                    'fixed left-0 right-0 top-0 z-30 transition-all duration-300',
                    scrolled
                        ? 'glass-obsidian border-b border-gold/8 py-3'
                        : 'bg-transparent py-5'
                )}
            >
                <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 lg:px-10">
                    {/* Mobile menu trigger */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="flex size-10 items-center justify-center text-foreground lg:hidden"
                        aria-label="Open menu"
                    >
                        <Menu className="size-5" />
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img
                            src={SITE_CONFIG.logo}
                            alt="CBC"
                            className="size-9 rounded-full object-cover"
                        />
                        <span className="hidden font-display text-base font-semibold text-foreground sm:block">
                            Classic Brand Co
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-8 lg:flex">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    'relative font-body text-[13px] font-medium uppercase transition-colors duration-200',
                                    location.pathname === link.path
                                        ? 'text-gold'
                                        : 'text-foreground/60 hover:text-foreground'
                                )}
                            >
                                {link.label}
                                {location.pathname === link.path && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1.5 left-0 right-0 h-px bg-gold"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        <CurrencyToggle />
                        <button
                            onClick={openCart}
                            className="relative flex size-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:text-gold"
                            aria-label="Open cart"
                        >
                            <ShoppingBag className="size-5" />
                            {count > 0 && (
                                <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-gold font-body text-[10px] font-bold text-obsidian">
                                    {count > 9 ? '9+' : count}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-black/70"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-gold/10 bg-obsidian px-6 py-8"
                        >
                            <div className="mb-10 flex items-center justify-between">
                                <Link to="/" className="flex items-center gap-3">
                                    <img
                                        src={SITE_CONFIG.logo}
                                        alt="CBC"
                                        className="size-8 rounded-full object-cover"
                                    />
                                    <span className="font-display text-sm font-semibold text-foreground">
                                        CBC
                                    </span>
                                </Link>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="flex size-9 items-center justify-center text-foreground/50"
                                    aria-label="Close menu"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-1">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={cn(
                                            'rounded-md px-4 py-3 font-body text-sm font-medium transition-colors',
                                            location.pathname === link.path
                                                ? 'bg-gold/10 text-gold'
                                                : 'text-foreground/60 hover:bg-obsidian-50 hover:text-foreground'
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto">
                                <div className="gold-line mb-6" />
                                <p className="font-body text-xs text-foreground/30">
                                    © Classic Brand Co
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
