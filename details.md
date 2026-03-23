# Classic Brand Co (CBC) — Complete Web App Blueprint v2.0

> **This document is the single source of truth for rebuilding the Classic Brand Co web app from scratch.**
> Any developer with this file can recreate the exact same application.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Design System](#2-design-system)
3. [Technology Stack](#3-technology-stack)
4. [Project Structure](#4-project-structure)
5. [Configuration Files](#5-configuration-files)
6. [Styling & Theme](#6-styling--theme)
7. [TypeScript Types](#7-typescript-types)
8. [State Management](#8-state-management)
9. [Utility Functions](#9-utility-functions)
10. [Constants & Data](#10-constants--data)
11. [Components](#11-components)
12. [Pages](#12-pages)
13. [Routing](#13-routing)
14. [Assets](#14-assets)
15. [SEO & Meta](#15-seo--meta)
16. [Deployment Guide](#16-deployment-guide)
17. [Extending the App](#17-extending-the-app)

---

## 1. Executive Summary

**Classic Brand Co (CBC)** is a premium streetwear brand based in Kampala, Uganda. This web app serves as the brand's online storefront with the following capabilities:

- **Product catalog** — 24 items across 6 categories (T-Shirts, Hoodies, Caps, Pants, Jackets, Accessories)
- **Shopping cart** — Persistent cart with add/remove/quantity controls
- **Currency toggle** — UGX ↔ USD conversion (rate: 3,750 UGX = 1 USD)
- **Order placement** — Contact form that captures order details and saves to localStorage
- **WhatsApp integration** — Direct chat links for order confirmation
- **5 pages** — Home, Shop, Product Detail, About, Contact
- **Fully static** — No backend required; all data is mock data stored in constants

### Brand Identity

| Property        | Value                                      |
| --------------- | ------------------------------------------ |
| Brand Name      | Classic Brand Co (CBC)                     |
| Tagline         | Premium Streetwear                         |
| Primary Color   | Gold `#F6C14E`                             |
| Background      | Obsidian `#050505`                         |
| Location        | Kampala, Uganda                            |
| Currency        | UGX (primary), USD (toggle)                |
| WhatsApp        | +256700000000                              |
| Email           | info@classicbrandco.com                    |
| Instagram       | @classicbrandco                            |
| Twitter         | @classicbrandco                            |

### Logo

The brand logo is hosted at:
```
https://cdn-ai.onspace.ai/onspace/files/Ev2SzLQEgQpRY8GqpLgRdK/ClassicBrandCo_ic.jpg
```
It features an ornate gold hexagonal emblem with the letter "C" and a t-shirt silhouette on a dark background.

---

## 2. Design System

### 2.1 Design Philosophy

- **Metaphor**: Theatrical Stage — dramatic lighting, cinematic depth, spotlight reveals
- **Mood**: Dark luxury, premium exclusivity, understated confidence
- **Signatures**: Obsidian+Gold palette, glassmorphic elements, diagonal gold line accents, gold text gradients

### 2.2 Color Palette

#### Brand Colors
```
Obsidian (Background):
  DEFAULT: #050505
  50:      #1A1A1A
  100:     #141414
  200:     #111111
  300:     #0D0D0D
  400:     #0A0A0A
  500:     #050505

Gold (Accent):
  DEFAULT: #F6C14E
  50:      #FEF7E6
  100:     #FDECC0
  200:     #FBDF96
  300:     #F9D26C
  400:     #F6C14E
  500:     #E5A820
  600:     #C48E18
  700:     #9A6F13
  800:     #70500E
  900:     #46320A
```

#### Semantic HSL Tokens (CSS Variables)
```css
--background: 0 0% 2%;           /* Near-black */
--foreground: 48 20% 92%;        /* Warm off-white */
--primary: 43 90% 64%;           /* Gold */
--primary-foreground: 0 0% 2%;   /* Black on gold */
--secondary: 0 0% 10%;           /* Dark gray */
--muted: 0 0% 10%;
--muted-foreground: 0 0% 54%;
--border: 0 0% 12%;
--ring: 43 90% 64%;              /* Gold ring */
--destructive: 0 84% 60%;       /* Red for errors */
```

### 2.3 Typography

| Role      | Font Family       | Weights     | Usage                       |
| --------- | ----------------- | ----------- | --------------------------- |
| Display   | Playfair Display  | 400–800     | Headings, titles, prices    |
| Body      | DM Sans           | 300–700     | Body text, buttons, labels  |

**Scale**:
- Hero headings: `text-5xl` to `text-7xl` / `font-bold`
- Section headings: `text-3xl` to `text-4xl` / `font-bold`
- Product name: `text-sm` / `font-medium`
- Body text: `text-sm` / `font-normal` / `leading-relaxed`
- Labels/caps: `text-[11px]` / `font-semibold` / `uppercase`
- Buttons: `text-sm` / `font-semibold` / `uppercase`

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap
```

### 2.4 Iconography

- **Library**: `lucide-react` (outline, rounded style)
- **Size conventions**: `size-3.5` (inline), `size-4` (buttons), `size-5` (nav/header), `size-6` (feature icons)
- **Color**: `text-gold` for emphasis, `text-foreground/40-60` for secondary, `text-obsidian` on gold backgrounds

### 2.5 Custom CSS Utilities

```css
.text-gold-gradient     → Gold shimmer gradient text (135deg)
.border-gold-glow       → Subtle gold glow box-shadow
.glass-obsidian         → Glassmorphic dark panel (blur 16px, gold border)
.glass-card             → Lighter glassmorphic card (blur 12px)
.gold-line              → Horizontal gradient line (transparent → gold → transparent)
.gold-line-vertical     → Vertical gradient line
.shimmer-gold           → Animated gold shimmer effect
.hero-gradient          → Radial gold glow at 50% 40%
```

### 2.6 Animations

| Name        | Duration | Use                                |
| ----------- | -------- | ---------------------------------- |
| `fade-up`   | 0.7s     | Content reveal on scroll           |
| `fade-in`   | 0.5s     | Opacity entrance                   |
| `shimmer`   | 2.5s     | Gold shimmer loop                  |
| Spring      | Varies   | Framer Motion page/drawer anims    |

### 2.7 Spacing

- **Container max-width**: 1400px with `px-5 lg:px-10`
- **Section padding**: `py-16 lg:py-20` (standard), `py-20 lg:py-28` (feature sections)
- **Card gaps**: `gap-4 sm:gap-6`
- **Grid**: `grid-cols-2 lg:grid-cols-4` (products), `lg:grid-cols-12` (layouts)

### 2.8 Component Patterns

- **Buttons**: `rounded-sm`, gold bg with obsidian text (primary), border with transparent bg (secondary)
- **Inputs**: `rounded-sm border border-obsidian-50 bg-obsidian-100/40`, gold border on focus
- **Cards**: No border-radius or `rounded-md`, `border border-obsidian-50 bg-obsidian-100/40`
- **Tags/badges**: `rounded-sm bg-gold px-2.5 py-1 text-obsidian`
- **Section dividers**: `border-t border-gold/8` or `gold-line`

---

## 3. Technology Stack

### Core
| Package                | Version  | Purpose                     |
| ---------------------- | -------- | --------------------------- |
| React                  | 18.3.1   | UI framework                |
| Vite                   | 5.4.1    | Build tool & dev server     |
| TypeScript             | 5.5.3    | Type safety                 |
| Tailwind CSS           | 3.4.11   | Utility-first styling       |
| tailwindcss-animate    | latest   | Animation plugin            |

### State & Routing
| Package                | Purpose                          |
| ---------------------- | -------------------------------- |
| zustand                | Global state (cart, currency)    |
| react-router-dom v6    | Client-side routing              |

### UI & Animation
| Package                | Purpose                          |
| ---------------------- | -------------------------------- |
| framer-motion          | Page transitions, scroll anims   |
| lucide-react           | Icon library                     |
| clsx + tailwind-merge  | Conditional class names          |

### Utilities
| Package                | Purpose                          |
| ---------------------- | -------------------------------- |
| sonner                 | Toast notifications              |

---

## 4. Project Structure

```
├── index.html                    # Entry HTML with SEO meta, fonts
├── tailwind.config.ts            # Tailwind theme (obsidian, gold, fonts)
├── vite.config.ts                # Vite config with @ alias
├── tsconfig.json                 # TypeScript config
├── public/
│   └── og-image.jpg              # Social media preview image
├── src/
│   ├── main.tsx                  # React entry point
│   ├── App.tsx                   # Router + layout + lazy routes
│   ├── index.css                 # Global styles, CSS vars, utilities
│   ├── vite-env.d.ts             # Vite type reference
│   ├── assets/                   # AI-generated images
│   │   ├── hero-main.jpg         # Home hero (21:9, dramatic gold rays)
│   │   ├── hero-shop.jpg         # Shop hero (16:9, clothing rack)
│   │   ├── about-craft.jpg       # About hero (16:9, workshop)
│   │   ├── contact-hero.jpg      # Contact hero (16:9, gold patterns)
│   │   └── empty-state.jpg       # Empty state illustration (1:1)
│   ├── types/
│   │   └── index.ts              # Product, CartItem, Order, etc.
│   ├── constants/
│   │   ├── config.ts             # Site config, categories, nav links
│   │   └── mockData.ts           # 24 products with full details
│   ├── lib/
│   │   └── utils.ts              # cn(), formatUGX(), formatUSD(), generateOrderId()
│   ├── stores/
│   │   ├── currencyStore.ts      # Zustand: currency state + formatPrice
│   │   └── cartStore.ts          # Zustand: cart items, totals, open/close
│   ├── components/
│   │   ├── features/
│   │   │   ├── CartDrawer.tsx     # Slide-in cart panel
│   │   │   ├── CategoryFilter.tsx # Category pill buttons
│   │   │   ├── CurrencyToggle.tsx # UGX/USD toggle button
│   │   │   ├── LoadingSpinner.tsx # Full-screen loading
│   │   │   └── ProductCard.tsx    # Product card with quick-add
│   │   └── layout/
│   │       ├── Header.tsx         # Fixed header + mobile menu
│   │       ├── Footer.tsx         # 4-column footer
│   │       └── Layout.tsx         # Scroll-to-top wrapper
│   └── pages/
│       ├── Home.tsx               # Hero + pillars + featured + brand + stats + CTA
│       ├── Shop.tsx               # Hero + filters + product grid
│       ├── ProductDetail.tsx      # Image + details + size/qty + related
│       ├── About.tsx              # Hero + mission + values + timeline + CTA
│       ├── Contact.tsx            # Order form + contact sidebar
│       └── NotFound.tsx           # 404 page
```

---

## 5. Configuration Files

### index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/jpeg" href="/og-image.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Classic Brand Co — Premium Streetwear</title>
    <meta name="description" content="Classic Brand Co delivers premium streetwear crafted with obsidian elegance. Shop exclusive collections from Uganda's finest fashion house." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Classic Brand Co — Premium Streetwear" />
    <meta property="og:description" content="Classic Brand Co delivers premium streetwear crafted with obsidian elegance." />
    <meta property="og:image" content="/og-image.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Classic Brand Co — Premium Streetwear" />
    <meta name="twitter:image" content="/og-image.jpg" />
    <!-- Google Fonts: Playfair Display + DM Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### tailwind.config.ts — Key Customizations
```typescript
// Custom font families
fontFamily: {
  display: ['"Playfair Display"', 'Georgia', 'serif'],
  body: ['"DM Sans"', 'system-ui', 'sans-serif'],
}

// Custom colors
colors: {
  obsidian: { DEFAULT: '#050505', 50: '#1A1A1A', 100: '#141414', ... },
  gold: { DEFAULT: '#F6C14E', 50: '#FEF7E6', 100: '#FDECC0', ... },
  // + all shadcn semantic tokens via hsl(var(--*))
}

// Custom animations
animation: {
  'fade-up': 'fade-up 0.7s ease-out forwards',
  'fade-in': 'fade-in 0.5s ease-out forwards',
}
```

---

## 6. Styling & Theme

### src/index.css — Complete CSS

The CSS file contains three layers:

1. **@layer base** — CSS custom properties (HSL format for all colors), body defaults, font assignments, selection color
2. **@layer utilities** — Custom utility classes: `.text-gold-gradient`, `.glass-obsidian`, `.glass-card`, `.gold-line`, `.gold-line-vertical`, `.shimmer-gold`, `.hero-gradient`
3. **Scrollbar styling** — Custom WebKit scrollbar with gold accents

Key CSS variable pattern:
```css
:root {
  --background: 0 0% 2%;      /* HSL without hsl() wrapper */
  --foreground: 48 20% 92%;   /* Tailwind adds hsl() via theme */
  --primary: 43 90% 64%;      /* Gold */
  /* ... */
}
```

---

## 7. TypeScript Types

### src/types/index.ts
```typescript
interface Product {
  id: string;
  name: string;
  priceUGX: number;
  category: Category;
  imageUrl: string;
  description: string;
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  tag?: string;         // "Bestseller", "New", "Limited", "Premium", etc.
}

interface CartItem {
  productId: string;
  name: string;
  priceUGX: number;
  imageUrl: string;
  size: string;
  quantity: number;
}

interface OrderFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

interface Order {
  id: string;
  customer: OrderFormData;
  items: CartItem[];
  totalUGX: number;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
}

type Currency = 'UGX' | 'USD';
type Category = 'All' | 'T-Shirts' | 'Hoodies' | 'Caps' | 'Pants' | 'Jackets' | 'Accessories';
```

---

## 8. State Management

### Currency Store (`src/stores/currencyStore.ts`)
```
Zustand + persist middleware → localStorage key: "cbc-currency"
State:
  - currency: 'UGX' | 'USD' (default: 'UGX')
  - rate: 3750
Actions:
  - toggleCurrency() → switches between UGX and USD
  - formatPrice(priceUGX) → returns formatted string ("UGX 85,000" or "$22.67")
```

### Cart Store (`src/stores/cartStore.ts`)
```
Zustand + persist middleware → localStorage key: "cbc-cart" (only items persisted)
State:
  - items: CartItem[]
  - isOpen: boolean
Actions:
  - addItem(item) → adds or increments quantity if same productId+size
  - removeItem(productId, size)
  - updateQuantity(productId, size, qty) → removes if qty <= 0
  - clearCart()
  - openCart() / closeCart() / toggleCart()
Computed:
  - totalItems() → sum of all quantities
  - totalPriceUGX() → sum of price × quantity
```

---

## 9. Utility Functions

### src/lib/utils.ts
```typescript
cn(...inputs)           → Merges Tailwind classes (clsx + twMerge)
formatUGX(amount)       → "UGX 85,000"
formatUSD(amountUGX, rate) → "$22.67"
generateOrderId()       → "CBC-XXXXX-XXXX" (base36 timestamp + random)
```

---

## 10. Constants & Data

### Site Config (`src/constants/config.ts`)
```typescript
SITE_CONFIG = {
  name: 'Classic Brand Co',
  tagline: 'Premium Streetwear',
  description: 'Crafted with obsidian elegance...',
  currency: { default: 'UGX', rate: 3750 },
  social: {
    whatsapp: '+256700000000',
    instagram: '@classicbrandco',
    twitter: '@classicbrandco',
    email: 'info@classicbrandco.com',
  },
  logo: 'https://cdn-ai.onspace.ai/onspace/files/Ev2SzLQEgQpRY8GqpLgRdK/ClassicBrandCo_ic.jpg',
}

CATEGORIES = ['All', 'T-Shirts', 'Hoodies', 'Caps', 'Pants', 'Jackets', 'Accessories']

NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]
```

### Product Catalog (`src/constants/mockData.ts`)

24 products organized by category:

| # | ID | Name | Price (UGX) | Category | Tag | Sizes |
|---|---|---|---|---|---|---|
| 1 | obsidian-classic-tee | Obsidian Classic Tee | 85,000 | T-Shirts | Bestseller | S–XXL |
| 2 | midnight-essential-tee | Midnight Essential Tee | 75,000 | T-Shirts | — | XS–XL |
| 3 | shadow-vneck | Shadow V-Neck | 90,000 | T-Shirts | — | S–XL |
| 4 | heritage-logo-tee | Heritage Logo Tee | 95,000 | T-Shirts | New | S–XXL |
| 5 | onyx-crew-neck | Onyx Crew Neck | 80,000 | T-Shirts | — | M–XL |
| 6 | charcoal-oversized | Charcoal Oversized Tee | 100,000 | T-Shirts | — | S–XL |
| 7 | gold-edition-tee | Gold Edition Tee | 120,000 | T-Shirts | Limited | S–XL |
| 8 | stealth-pocket-tee | Stealth Pocket Tee | 88,000 | T-Shirts | — | S–XXL |
| 9 | eclipse-hoodie | Eclipse Hoodie | 185,000 | Hoodies | Bestseller | S–XXL |
| 10 | obsidian-pullover | Obsidian Pullover | 175,000 | Hoodies | — | M–XL |
| 11 | urban-shield-hoodie | Urban Shield Hoodie | 210,000 | Hoodies | New | S–XL |
| 12 | midnight-zipup | Midnight Zip-Up | 200,000 | Hoodies | — | S–XXL |
| 13 | classic-logo-hoodie | Classic Logo Hoodie | 190,000 | Hoodies | — | S–XL |
| 14 | gold-emblem-cap | Gold Emblem Cap | 55,000 | Caps | Bestseller | One Size |
| 15 | shadow-snapback | Shadow Snapback | 60,000 | Caps | — | One Size |
| 16 | heritage-dad-hat | Heritage Dad Hat | 48,000 | Caps | — | One Size |
| 17 | obsidian-joggers | Obsidian Joggers | 140,000 | Pants | Popular | S–XL |
| 18 | dark-denim-classic | Dark Denim Classic | 160,000 | Pants | — | 30–38 |
| 19 | stealth-cargo | Stealth Cargo Pants | 155,000 | Pants | — | S–XL |
| 20 | leather-reign-jacket | Leather Reign Jacket | 320,000 | Jackets | Premium | S–XL |
| 21 | urban-bomber | Urban Bomber | 250,000 | Jackets | — | M–XXL |
| 22 | noir-windbreaker | Noir Windbreaker | 195,000 | Jackets | — | S–XL |
| 23 | classic-duffle | Classic Duffle Bag | 135,000 | Accessories | — | One Size |
| 24 | gold-link-watch | Gold Link Timepiece | 280,000 | Accessories | Exclusive | One Size |

### Product Image Sources (Unsplash)
All product images use Unsplash with `?w=600&h=750&fit=crop`:

```
T-Shirts:
  photo-1521572163474-6864f9cf17ab  (Obsidian Classic)
  photo-1583743814966-8936f5b7be1a  (Midnight Essential)
  photo-1618354691373-d851c5c3a990  (Shadow V-Neck)
  photo-1562157873-818bc0726f68     (Heritage Logo)
  photo-1529374255404-311a2a4f1fd9  (Onyx Crew)
  photo-1576566588028-4147f3842f27  (Charcoal Oversized)
  photo-1622445275463-afa2ab738c34  (Gold Edition)
  photo-1554568218-0f1715e72254     (Stealth Pocket)

Hoodies:
  photo-1556821840-3a63f95609a7     (Eclipse)
  photo-1578768079052-aa76e52ff62e  (Obsidian Pullover)
  photo-1620799140408-edc6dcb6d633  (Urban Shield)
  photo-1611312449408-fcece27cdbb7  (Midnight Zip-Up)
  photo-1509942774463-acf339cf87d5  (Classic Logo)

Caps:
  photo-1588850561407-ed78c334e67a  (Gold Emblem)
  photo-1575428652377-a2d80e2277fc  (Shadow Snapback)
  photo-1521369909029-2afed882baee  (Heritage Dad Hat)

Pants:
  photo-1624378439575-d8705ad7ae80  (Obsidian Joggers)
  photo-1542272604-787c3835535d     (Dark Denim)
  photo-1541099649105-f69ad21f3246  (Stealth Cargo)

Jackets:
  photo-1551028719-00167b16eac5     (Leather Reign)
  photo-1591047139829-d91aecb6caea  (Urban Bomber)
  photo-1548883354-94bcfe321cbb     (Noir Windbreaker)

Accessories:
  photo-1553062407-98eeb64c6a62     (Classic Duffle)
  photo-1523170335258-f5ed11844a49  (Gold Link Watch)

Brand/Lifestyle (Home page):
  photo-1558618666-fcd25c85f82e?w=900&h=700&fit=crop  (Brand split section)
```

---

## 11. Components

### Layout Components

#### Header (`src/components/layout/Header.tsx`)
- Fixed position with glass-morphism effect on scroll (40px threshold)
- Logo (image + "Classic Brand Co" text) on left
- Desktop nav links centered with animated gold underline indicator (framer-motion `layoutId="nav-indicator"`)
- Right side: CurrencyToggle + Cart button with badge count
- Mobile: hamburger menu → slide-in panel from left (framer-motion spring animation)
- Active route highlighting with `text-gold` color

#### Footer (`src/components/layout/Footer.tsx`)
- 4-column grid: Brand (5 cols), Navigation (3 cols), Categories (2 cols), Contact (2 cols)
- Social icons: Instagram, Twitter, Mail
- Bottom bar with copyright + tagline
- All links route to respective pages

#### Layout (`src/components/layout/Layout.tsx`)
- Wraps `<Header />`, `<main>{children}</main>`, `<Footer />`, `<CartDrawer />`
- Scrolls to top on route change (`window.scrollTo({ top: 0, behavior: 'instant' })`)

### Feature Components

#### ProductCard (`src/components/features/ProductCard.tsx`)
- Aspect ratio `3:4` image container
- Hover: scale image 105%, gradient overlay, reveal quick-add button
- Tag badge (top-left, gold background)
- Quick-add: adds middle size to cart and opens drawer
- Info: category label, product name, formatted price
- Staggered scroll animation (`index * 0.08` delay)

#### CartDrawer (`src/components/features/CartDrawer.tsx`)
- Slide-in from right (framer-motion spring)
- Backdrop with blur
- Empty state: dashed circle icon + "Browse Collection" link
- Item cards: 80px thumbnail, name, size, quantity controls, price, remove button
- Footer: subtotal + "Place Order" button (navigates to /contact)

#### CurrencyToggle (`src/components/features/CurrencyToggle.tsx`)
- Pill button with DollarSign icon
- Displays current currency code ("UGX" or "USD")
- Gold border with hover effect

#### CategoryFilter (`src/components/features/CategoryFilter.tsx`)
- Horizontal pill buttons for each category
- Active: `bg-gold text-obsidian`
- Inactive: transparent with border, hover gold accent

#### LoadingSpinner (`src/components/features/LoadingSpinner.tsx`)
- Full-screen overlay
- Spinning gold ring with "Classic Brand Co" text below

---

## 12. Pages

### Home (`src/pages/Home.tsx`)
Sections:
1. **Hero** — Full viewport, background image with gradient overlay, diagonal gold lines, animated badge + heading ("Wear the Obsidian Standard") + CTA buttons
2. **Pillars** — 3-column grid: Premium Quality (Crown), Unique Design (Gem), Limited Drops (Star)
3. **Featured Products** — 8 featured items in 4-column grid with "View All" link
4. **Brand Split** — 2-column: lifestyle image left, brand story text right
5. **Stats** — 4-column: 24+ Products, 5K+ Customers, 6 Categories, 100% Premium Cotton
6. **CTA** — "Join the Movement" with Shop Now + Get in Touch buttons

### Shop (`src/pages/Shop.tsx`)
Sections:
1. **Hero Banner** — Shorter hero (h-64/h-80) with shop background image, title, product count
2. **Filter Bar** — CategoryFilter pills + sort dropdown (Default, Price Low→High, Price High→Low)
3. **Product Grid** — 2 cols mobile, 3 cols tablet, 4 cols desktop
4. **Count** — "Showing X of 24 products"

### Product Detail (`src/pages/ProductDetail.tsx`)
Sections:
1. **Back Button** — `navigate(-1)` with arrow icon
2. **Two-column Layout** — Image (7 cols, 3:4 aspect) + Details (5 cols)
3. **Details Panel**: Category label, product name, formatted price, description, size selector buttons, quantity +/- controls, "Add to Cart" button (disabled until size selected, green "Added" confirmation for 800ms)
4. **Meta Info** — Material, Care, Shipping
5. **Related Products** — Up to 4 items from same category

### About (`src/pages/About.tsx`)
Sections:
1. **Hero** — Min-height 60vh, background image, "Built From the Ground Up" heading
2. **Mission** — 2-column: "The Obsidian Standard" heading + philosophy text
3. **Values Grid** — 4 cards: Craftsmanship, African Roots, Community First, Limited Editions
4. **Timeline** — Vertical gold line with alternating year markers (2021–2024)
5. **CTA** — "Ready to Experience CBC?" with shop link

### Contact (`src/pages/Contact.tsx`)
Sections:
1. **Hero** — Dynamic title ("Place Your Order" if cart has items, "Get in Touch" if empty)
2. **Two-column Layout**:
   - **Form (7 cols)**: Full Name*, Phone*, Email, Address, Notes, Order Summary (if cart has items), Submit button
   - **Sidebar (5 cols)**: WhatsApp link (green), Phone, Email, Location, Social handles
3. **Success State** — Full-screen confirmation with order ID, checkmark animation, WhatsApp chat link

### NotFound (`src/pages/NotFound.tsx`)
- Centered 404 with gold gradient number
- "Page Not Found" message
- "Back to Home" button

---

## 13. Routing

### Route Map
```
/                → Home
/shop            → Shop
/product/:id     → ProductDetail (id matches product.id from mockData)
/about           → About
/contact         → Contact
/*               → NotFound (404 catch-all)
```

### Router Setup
```typescript
<BrowserRouter>
  <Layout>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Layout>
</BrowserRouter>
```

All page components are lazy-loaded with `React.lazy()` + `Suspense`.

---

## 14. Assets

### AI-Generated Images

| File | Dimensions | Prompt Summary |
|------|-----------|----------------|
| `src/assets/hero-main.jpg` | 21:9 | Dark obsidian bg, golden light rays, premium black clothing, theatrical spotlight |
| `src/assets/hero-shop.jpg` | 16:9 | Dark studio, warm gold lighting, premium streetwear on industrial rack |
| `src/assets/about-craft.jpg` | 16:9 | Dark workshop studio, golden warm lighting, fabric rolls, artisan scene |
| `src/assets/contact-hero.jpg` | 16:9 | Obsidian bg, geometric gold line patterns, Art Deco inspired |
| `src/assets/empty-state.jpg` | 1:1 | Gold line drawing of empty hanger rack on black bg |
| `public/og-image.jpg` | 16:9 | Dark bg with gold emblem, "CLASSIC BRAND CO" text |

### External Assets
- **Logo**: `https://cdn-ai.onspace.ai/onspace/files/Ev2SzLQEgQpRY8GqpLgRdK/ClassicBrandCo_ic.jpg`
- **Product images**: Unsplash (see Section 10 for all photo IDs)
- **Brand lifestyle**: Unsplash `photo-1558618666-fcd25c85f82e`

---

## 15. SEO & Meta

```html
<title>Classic Brand Co — Premium Streetwear</title>
<meta name="description" content="Classic Brand Co delivers premium streetwear crafted with obsidian elegance. Shop exclusive collections from Uganda's finest fashion house." />

Open Graph:
  og:type = website
  og:title = Classic Brand Co — Premium Streetwear
  og:image = /og-image.jpg

Twitter:
  twitter:card = summary_large_image
  twitter:title = Classic Brand Co — Premium Streetwear
  twitter:image = /og-image.jpg
```

---

## 16. Deployment Guide

### GitHub Pages (Free Hosting)

1. **Switch to HashRouter** (for GitHub Pages compatibility):
   ```typescript
   // In App.tsx, replace:
   import { BrowserRouter } from 'react-router-dom';
   // With:
   import { HashRouter } from 'react-router-dom';
   // And replace <BrowserRouter> with <HashRouter>
   ```

2. **Set base URL** in `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ...
   })
   ```

3. **Build**:
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages**:
   - Push the `dist/` folder to the `gh-pages` branch
   - Or use the `gh-pages` npm package:
   ```bash
   npm install --save-dev gh-pages
   npx gh-pages -d dist
   ```
   - Enable GitHub Pages in repo Settings → Pages → Branch: `gh-pages`

5. **Site will be live at**: `https://yourusername.github.io/your-repo-name/`

### Netlify (Alternative)
```
1. Connect GitHub repo
2. Build command: npm run build
3. Publish directory: dist
4. Deploy → site live at *.netlify.app
```

### Vercel (Alternative)
```
1. Import project from GitHub
2. Framework: Vite
3. Auto-deploys on push
```

---

## 17. Extending the App

### Add a New Product
1. Add entry to `src/constants/mockData.ts` following the `Product` interface
2. Provide Unsplash image URL with `?w=600&h=750&fit=crop`
3. Set `featured: true` to show on Home page
4. Add optional `tag` for badge display

### Add a New Page
1. Create `src/pages/NewPage.tsx`
2. Add lazy import in `App.tsx`
3. Add `<Route>` in the Routes block
4. Add to `NAV_LINKS` in `config.ts` (if in main nav)

### Add a New Category
1. Add to `CATEGORIES` array in `config.ts`
2. Add to `Category` type in `types/index.ts`
3. Add products with the new category

### Connect Real Backend (Firebase)
1. Install Firebase SDK: `npm install firebase`
2. Create `src/lib/firebase.ts` with your config
3. Replace mock data reads with Firestore `onSnapshot` listeners
4. Replace localStorage order saving with Firestore `addDoc`

### Connect Payment (Stripe)
1. Enable OnSpace Cloud backend
2. Create Stripe checkout edge function
3. Replace "Place Order" with Stripe checkout redirect

### Add Authentication
1. Enable OnSpace Cloud backend
2. Implement Supabase auth (email/password or OAuth)
3. Gate order history and profile pages behind auth

---

## Appendix: Key Design Tokens Quick Reference

```
Background:     #050505 (obsidian)
Surface:        #141414 (obsidian-100)
Border:         #1A1A1A (obsidian-50) at 8-20% gold opacity
Text Primary:   hsl(48, 20%, 92%) (warm off-white)
Text Secondary: foreground at 40-60% opacity
Accent:         #F6C14E (gold)
Accent Hover:   #F9D26C (gold-300)
Success:        emerald-600
Error:          destructive (red)
Font Display:   Playfair Display
Font Body:      DM Sans
Border Radius:  rounded-sm (buttons/inputs), rounded-md (cards), rounded-full (pills/avatars)
Transition:     duration-200 (micro), duration-300 (standard), duration-700 (images)
Max Width:      1400px
Mobile Break:   640px (sm), 768px (md), 1024px (lg)
```

---

**Version**: 2.0
**Built with**: React 18 + Vite 5 + TypeScript + Tailwind CSS 3 + Zustand + Framer Motion
**Platform**: OnSpace WebSite Builder
**Status**: Production Ready
