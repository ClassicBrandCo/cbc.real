export const SITE_CONFIG = {
    name: 'Classic Brand Co',
    tagline: 'Premium Streetwear',
    description: 'Crafted with obsidian elegance. Uganda\'s finest fashion house delivering premium streetwear that speaks without words.',
    currency: {
        default: 'UGX' as const,
        rate: 3750,
    },
    social: {
        whatsapp: '+256700000000',
        instagram: '@classicbrandco',
        twitter: '@classicbrandco',
        email: 'info@classicbrandco.com',
    },
    logo: 'https://cdn-ai.onspace.ai/onspace/files/Ev2SzLQEgQpRY8GqpLgRdK/ClassicBrandCo_ic.jpg',
};

export const CATEGORIES = [
    'All',
    'T-Shirts',
    'Hoodies',
    'Caps',
    'Pants',
    'Jackets',
    'Accessories',
] as const;

export const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
];

// Roles now managed via Firestore user profiles (profile.role === 'admin')

