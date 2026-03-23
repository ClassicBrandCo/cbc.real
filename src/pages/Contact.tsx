import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageCircle, Check } from 'lucide-react';
import contactImg from '@/assets/contact-hero.jpg';
import { SITE_CONFIG } from '@/constants/config';
import { useCartStore } from '@/stores/cartStore';
import { useCurrencyStore } from '@/stores/currencyStore';
import { generateOrderId } from '@/lib/utils';
import type { OrderFormData } from '@/types';

const Contact = () => {
    const { items, totalPriceUGX, clearCart } = useCartStore();
    const { formatPrice } = useCurrencyStore();
    const cartTotal = totalPriceUGX();

    const [form, setForm] = useState<OrderFormData>({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        notes: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [orderId, setOrderId] = useState('');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const id = generateOrderId();
        const order = {
            id,
            customer: form,
            items,
            totalUGX: cartTotal,
            status: 'pending' as const,
            createdAt: new Date().toISOString(),
        };

        const existing = JSON.parse(localStorage.getItem('cbc-orders') || '[]');
        localStorage.setItem('cbc-orders', JSON.stringify([...existing, order]));

        setOrderId(id);
        setSubmitted(true);
        clearCart();
    };

    if (submitted) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-obsidian px-5 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="flex size-20 items-center justify-center rounded-full bg-gold"
                >
                    <Check className="size-8 text-obsidian" />
                </motion.div>
                <h1 className="font-display text-3xl font-bold text-foreground">
                    Order Placed!
                </h1>
                <p className="max-w-sm font-body text-sm text-foreground/45">
                    Your order <span className="font-semibold text-gold">{orderId}</span>{' '}
                    has been received. We'll contact you via WhatsApp to confirm details.
                </p>
                <a
                    href={`https://wa.me/${SITE_CONFIG.social.whatsapp.replace('+', '')}?text=Hi CBC! My order ID is ${orderId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2 rounded-sm bg-emerald-600 px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                >
                    <MessageCircle className="size-4" />
                    Chat on WhatsApp
                </a>
            </div>
        );
    }

    return (
        <div className="bg-obsidian">
            {/* Hero */}
            <section className="relative flex h-56 items-end overflow-hidden sm:h-72">
                <img
                    src={contactImg}
                    alt=""
                    className="absolute inset-0 size-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/30" />
                <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-8 lg:px-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl font-bold text-foreground"
                    >
                        {items.length > 0 ? 'Place Your Order' : 'Get in Touch'}
                    </motion.h1>
                    <p className="mt-2 font-body text-sm text-foreground/45">
                        {items.length > 0
                            ? `${items.length} item(s) in your order`
                            : 'We\'d love to hear from you'}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 lg:py-20">
                <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                        {/* Form */}
                        <div className="lg:col-span-7">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block font-body text-xs font-semibold uppercase text-foreground/50">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={form.fullName}
                                            onChange={handleChange}
                                            placeholder="Daniel M."
                                            className="w-full rounded-sm border border-obsidian-50 bg-obsidian-100/40 px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/20 outline-none transition-colors focus:border-gold/40"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block font-body text-xs font-semibold uppercase text-foreground/50">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+256 700 000 000"
                                            className="w-full rounded-sm border border-obsidian-50 bg-obsidian-100/40 px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/20 outline-none transition-colors focus:border-gold/40"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block font-body text-xs font-semibold uppercase text-foreground/50">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="you@email.com"
                                            className="w-full rounded-sm border border-obsidian-50 bg-obsidian-100/40 px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/20 outline-none transition-colors focus:border-gold/40"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block font-body text-xs font-semibold uppercase text-foreground/50">
                                            Delivery Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={form.address}
                                            onChange={handleChange}
                                            placeholder="Kampala, Uganda"
                                            className="w-full rounded-sm border border-obsidian-50 bg-obsidian-100/40 px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/20 outline-none transition-colors focus:border-gold/40"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block font-body text-xs font-semibold uppercase text-foreground/50">
                                        Notes / Special Requests
                                    </label>
                                    <textarea
                                        name="notes"
                                        rows={4}
                                        value={form.notes}
                                        onChange={handleChange}
                                        placeholder="Custom design requests, delivery instructions..."
                                        className="w-full resize-none rounded-sm border border-obsidian-50 bg-obsidian-100/40 px-4 py-3 font-body text-sm text-foreground placeholder:text-foreground/20 outline-none transition-colors focus:border-gold/40"
                                    />
                                </div>

                                {/* Order summary if cart has items */}
                                {items.length > 0 && (
                                    <div className="rounded-md border border-gold/10 bg-obsidian-100/30 p-5">
                                        <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
                                            Order Summary
                                        </h3>
                                        <div className="space-y-2">
                                            {items.map((item) => (
                                                <div
                                                    key={`${item.productId}-${item.size}`}
                                                    className="flex items-center justify-between"
                                                >
                                                    <span className="font-body text-xs text-foreground/50">
                                                        {item.name} ({item.size}) × {item.quantity}
                                                    </span>
                                                    <span className="font-body text-xs tabular-nums text-foreground/70">
                                                        {formatPrice(item.priceUGX * item.quantity)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-3 border-t border-gold/8 pt-3">
                                            <div className="flex items-center justify-between">
                                                <span className="font-body text-sm font-semibold text-foreground/60">
                                                    Total
                                                </span>
                                                <span className="font-display text-lg font-bold tabular-nums text-gold">
                                                    {formatPrice(cartTotal)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2.5 rounded-sm bg-gold px-8 py-4 font-body text-sm font-semibold uppercase text-obsidian transition-colors hover:bg-gold-300"
                                >
                                    <Send className="size-4" />
                                    {items.length > 0 ? 'Place Order' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact info sidebar */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-28 space-y-8">
                                <div>
                                    <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                                        Reach Us
                                    </h3>
                                    <div className="space-y-4">
                                        <a
                                            href={`https://wa.me/${SITE_CONFIG.social.whatsapp.replace('+', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 rounded-md border border-obsidian-50 bg-obsidian-100/30 p-4 transition-all duration-200 hover:border-emerald-500/30"
                                        >
                                            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-600/15">
                                                <MessageCircle className="size-5 text-emerald-500" />
                                            </div>
                                            <div>
                                                <p className="font-body text-sm font-medium text-foreground">
                                                    WhatsApp
                                                </p>
                                                <p className="font-body text-xs text-foreground/40">
                                                    {SITE_CONFIG.social.whatsapp}
                                                </p>
                                            </div>
                                        </a>

                                        <div className="flex items-center gap-4 rounded-md border border-obsidian-50 bg-obsidian-100/30 p-4">
                                            <div className="flex size-10 items-center justify-center rounded-full bg-gold/10">
                                                <Phone className="size-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="font-body text-sm font-medium text-foreground">
                                                    Phone
                                                </p>
                                                <p className="font-body text-xs text-foreground/40">
                                                    {SITE_CONFIG.social.whatsapp}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 rounded-md border border-obsidian-50 bg-obsidian-100/30 p-4">
                                            <div className="flex size-10 items-center justify-center rounded-full bg-gold/10">
                                                <Mail className="size-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="font-body text-sm font-medium text-foreground">
                                                    Email
                                                </p>
                                                <p className="font-body text-xs text-foreground/40">
                                                    {SITE_CONFIG.social.email}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 rounded-md border border-obsidian-50 bg-obsidian-100/30 p-4">
                                            <div className="flex size-10 items-center justify-center rounded-full bg-gold/10">
                                                <MapPin className="size-5 text-gold" />
                                            </div>
                                            <div>
                                                <p className="font-body text-sm font-medium text-foreground">
                                                    Location
                                                </p>
                                                <p className="font-body text-xs text-foreground/40">
                                                    Kampala, Uganda
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social */}
                                <div>
                                    <h3 className="mb-3 font-display text-sm font-semibold text-foreground">
                                        Follow Us
                                    </h3>
                                    <p className="font-body text-sm text-foreground/40">
                                        Instagram:{' '}
                                        <span className="text-gold">{SITE_CONFIG.social.instagram}</span>
                                    </p>
                                    <p className="mt-1 font-body text-sm text-foreground/40">
                                        Twitter:{' '}
                                        <span className="text-gold">{SITE_CONFIG.social.twitter}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
