import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '@/constants/config';

const Footer = () => {
    return (
        <footer className="border-t border-gold/8 bg-obsidian">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                {/* Main footer grid */}
                <div className="grid gap-10 py-16 md:grid-cols-12">
                    {/* Brand column */}
                    <div className="md:col-span-5">
                        <Link to="/" className="mb-5 flex items-center gap-3">
                            <img
                                src={SITE_CONFIG.logo}
                                alt="CBC"
                                className="size-10 rounded-full object-cover"
                            />
                            <span className="font-display text-lg font-semibold text-foreground">
                                Classic Brand Co
                            </span>
                        </Link>
                        <p className="max-w-sm font-body text-sm leading-relaxed text-foreground/40">
                            {SITE_CONFIG.description}
                        </p>
                        <div className="mt-6 flex gap-3">
                            <a
                                href="#"
                                className="flex size-9 items-center justify-center rounded-full border border-obsidian-50 text-foreground/40 transition-all duration-200 hover:border-gold/30 hover:text-gold"
                                aria-label="Instagram"
                            >
                                <Instagram className="size-4" />
                            </a>
                            <a
                                href="#"
                                className="flex size-9 items-center justify-center rounded-full border border-obsidian-50 text-foreground/40 transition-all duration-200 hover:border-gold/30 hover:text-gold"
                                aria-label="Twitter"
                            >
                                <Twitter className="size-4" />
                            </a>
                            <a
                                href={`mailto:${SITE_CONFIG.social.email}`}
                                className="flex size-9 items-center justify-center rounded-full border border-obsidian-50 text-foreground/40 transition-all duration-200 hover:border-gold/30 hover:text-gold"
                                aria-label="Email"
                            >
                                <Mail className="size-4" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-3">
                        <h4 className="mb-4 font-display text-sm font-semibold text-foreground">
                            Navigation
                        </h4>
                        <nav className="flex flex-col gap-2.5">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="font-body text-sm text-foreground/40 transition-colors hover:text-gold"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Categories */}
                    <div className="md:col-span-2">
                        <h4 className="mb-4 font-display text-sm font-semibold text-foreground">
                            Categories
                        </h4>
                        <nav className="flex flex-col gap-2.5">
                            {['T-Shirts', 'Hoodies', 'Caps', 'Jackets', 'Accessories'].map(
                                (cat) => (
                                    <Link
                                        key={cat}
                                        to="/shop"
                                        className="font-body text-sm text-foreground/40 transition-colors hover:text-gold"
                                    >
                                        {cat}
                                    </Link>
                                )
                            )}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-2">
                        <h4 className="mb-4 font-display text-sm font-semibold text-foreground">
                            Contact
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold/50" />
                                <p className="font-body text-sm text-foreground/40">
                                    Kampala, Uganda
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <Mail className="mt-0.5 size-3.5 shrink-0 text-gold/50" />
                                <a
                                    href={`mailto:${SITE_CONFIG.social.email}`}
                                    className="font-body text-sm text-foreground/40 transition-colors hover:text-gold"
                                >
                                    {SITE_CONFIG.social.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-3 border-t border-gold/8 py-6 sm:flex-row">
                    <p className="font-body text-xs text-foreground/25">
                        © {new Date().getFullYear()} Classic Brand Co. All rights reserved.
                    </p>
                    <p className="font-body text-xs text-foreground/25">
                        Designed & built with precision.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
