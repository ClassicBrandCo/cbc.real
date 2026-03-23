# CBC Site Troubleshooting & Local Setup Guide (v2)

---

## 0. BUILD ERROR: "default" is not exported by CartDrawer.tsx

### The Error
```
src/components/layout/Layout.tsx (5:7): "default" is not exported by
"src/components/features/CartDrawer.tsx"
```

### Root Cause
Your local copy of `src/components/features/CartDrawer.tsx` is **truncated** — the last line `export default CartDrawer;` is missing. This happens when files are copy-pasted incompletely or the download gets cut off.

### Fix
Open `src/components/features/CartDrawer.tsx` on your machine and **scroll to the very bottom**. The file must end with:

```tsx
};

export default CartDrawer;
```

If `export default CartDrawer;` is missing, add it. Then rebuild:
```bash
npm run build
```

### Verify ALL Exports — Full Checklist
Every component file **must** end with a default export. Open each file on your machine and confirm the last line:

| File | Must end with |
|------|---------------|
| `src/components/features/CartDrawer.tsx` | `export default CartDrawer;` |
| `src/components/features/ProductCard.tsx` | `export default ProductCard;` |
| `src/components/features/CategoryFilter.tsx` | `export default CategoryFilter;` |
| `src/components/features/CurrencyToggle.tsx` | `export default CurrencyToggle;` |
| `src/components/features/LoadingSpinner.tsx` | `export default LoadingSpinner;` |
| `src/components/layout/Header.tsx` | `export default Header;` |
| `src/components/layout/Footer.tsx` | `export default Footer;` |
| `src/components/layout/Layout.tsx` | `export default Layout;` |
| `src/pages/Home.tsx` | `export default Home;` |
| `src/pages/Shop.tsx` | `export default Shop;` |
| `src/pages/ProductDetail.tsx` | `export default ProductDetail;` |
| `src/pages/About.tsx` | `export default About;` |
| `src/pages/Contact.tsx` | `export default Contact;` |
| `src/pages/NotFound.tsx` | `export default NotFound;` |
| `src/App.tsx` | `export default App;` |

If **any** of those lines are missing, add them and rebuild.

---

## 1. PREVIOUS ERROR: Failed to resolve "@/constants/config"

```
Failed to resolve import "@/constants/config" from "src/components/layout/Footer.tsx"
```

## Why This Happens

The `@/` in imports like `@/constants/config` is a **path alias** — it's a shortcut that tells Vite "replace `@/` with `./src/`". This alias must be configured in **two places**:

1. **`vite.config.ts`** — tells Vite's dev server and bundler where `@/` points
2. **`tsconfig.app.json`** (or `tsconfig.json`) — tells TypeScript's type-checker where `@/` points

If either configuration is missing or the file structure doesn't match, you get this error.

### Common Causes

| Cause | Fix |
|-------|-----|
| Missing `path` import in vite.config.ts | Add `import path from "path"` at the top |
| Missing `resolve.alias` in vite.config.ts | Add the alias block (see below) |
| Missing `baseUrl` + `paths` in tsconfig | Add both settings (see below) |
| `src/constants/config.ts` file doesn't exist | Create it with the contents below |
| Wrong folder structure | Ensure all files are inside `src/` |
| `node_modules` not installed | Run `npm install` |
| Stale cache | Delete `node_modules/.vite` and restart |

---

## Step-by-Step Fix

### Step 1: Install Dependencies

```bash
cd cbc-pro
npm install
```

Make sure these packages are in your `package.json` dependencies:
- `react`, `react-dom`
- `react-router-dom`
- `framer-motion`
- `lucide-react`
- `zustand`
- `clsx`, `tailwind-merge`
- `tailwindcss`, `postcss`, `autoprefixer`
- `tailwindcss-animate`
- `@vitejs/plugin-react-swc`

If any are missing, install them:
```bash
npm install react react-dom react-router-dom framer-motion lucide-react zustand clsx tailwind-merge tailwindcss-animate
npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react-swc
```

### Step 2: Verify `vite.config.ts`

Your `vite.config.ts` **must** look like this:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Key part**: The `resolve.alias` block maps `@` → `./src`. Without this, Vite has no idea what `@/constants/config` means.

### Step 3: Verify `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitAny": false,
    "noFallthroughCasesInSwitch": false,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

**Key part**: `baseUrl` and `paths` tell TypeScript where `@/*` resolves.

### Step 4: Verify File Structure

Your project folder must look **exactly** like this:

```
cbc-pro/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.ts
├── postcss.config.js
├── package.json
├── public/
│   └── og-image.jpg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── assets/
    │   ├── hero-main.jpg
    │   ├── hero-shop.jpg
    │   ├── about-craft.jpg
    │   ├── contact-hero.jpg
    │   └── empty-state.jpg
    ├── components/
    │   ├── features/
    │   │   ├── CartDrawer.tsx
    │   │   ├── CategoryFilter.tsx
    │   │   ├── CurrencyToggle.tsx
    │   │   ├── LoadingSpinner.tsx
    │   │   └── ProductCard.tsx
    │   └── layout/
    │       ├── Header.tsx
    │       ├── Footer.tsx
    │       └── Layout.tsx
    ├── constants/
    │   ├── config.ts          ← THIS FILE MUST EXIST
    │   └── mockData.ts
    ├── lib/
    │   └── utils.ts
    ├── pages/
    │   ├── Home.tsx
    │   ├── Shop.tsx
    │   ├── ProductDetail.tsx
    │   ├── About.tsx
    │   ├── Contact.tsx
    │   └── NotFound.tsx
    ├── stores/
    │   ├── cartStore.ts
    │   └── currencyStore.ts
    └── types/
        └── index.ts
```

If `src/constants/config.ts` doesn't exist, that's your direct error cause.

### Step 5: Clear Cache & Restart

```bash
# Delete Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

### Step 6: Verify `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Step 7: Verify `tsconfig.json` (root)

The root `tsconfig.json` should reference the app config:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

---

## For GitHub Pages Deployment

GitHub Pages doesn't support client-side routing (BrowserRouter). You must use **HashRouter**.

### In `src/App.tsx`, change:

```tsx
// BEFORE (doesn't work on GitHub Pages)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// AFTER (works on GitHub Pages)
import { HashRouter, Routes, Route } from 'react-router-dom';

// Then replace <BrowserRouter> with <HashRouter>
```

### In `vite.config.ts`, add the `base` path:

```ts
export default defineConfig({
  base: '/your-repo-name/',  // ← replace with your actual GitHub repo name
  // ... rest of config
});
```

### Build & Deploy Commands

```bash
# Build the production bundle
npm run build

# The output is in the dist/ folder
# Deploy ONLY the dist/ folder to GitHub Pages
```

### GitHub Pages Setup

1. Push your code to GitHub
2. Run `npm run build` locally
3. Push the `dist/` folder to a `gh-pages` branch, OR use GitHub Actions:

**Option A — Manual with `gh-pages` package:**
```bash
npm install -D gh-pages
```

Add to `package.json` scripts:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

Then: `npm run deploy`

**Option B — GitHub Actions (automated):**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. In GitHub repo → Settings → Pages → Source → `gh-pages` branch → `/ (root)`

---

## Quick Checklist

- [ ] `npm install` ran successfully
- [ ] `vite.config.ts` has `resolve.alias` for `@`
- [ ] `tsconfig.app.json` has `baseUrl` and `paths`
- [ ] `src/constants/config.ts` file exists
- [ ] `src/constants/mockData.ts` file exists
- [ ] All image files exist in `src/assets/`
- [ ] `npm run dev` starts without errors
- [ ] For GitHub Pages: switched to `HashRouter`
- [ ] For GitHub Pages: added `base` to vite config
- [ ] For GitHub Pages: deployed `dist/` folder (not source)
