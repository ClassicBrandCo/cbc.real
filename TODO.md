# Firebase + React E-Commerce Setup TODO

## [ ] 1. Upgrade Dependencies
- Update package.json: firebase ^12.6.1
- Run `bun install`

## [ ] 2. Environment Variables
- Create/update .env.example with VITE_FIREBASE_* vars

## [ ] 3. Firebase Modular Setup
- Update src/lib/firebase.ts (v12 + Storage)

## [ ] 4. Firebase Types
- Create src/types/firebase.ts (User/Product/Order/Category)

## [ ] 5. Firestore Service + React Query Hooks
- Create src/services/firestoreService.ts (Products/Categories/Orders/Users)

## [ ] 6. Update Auth Context
- Edit src/context/AuthContext.tsx (Google auth + role sync)

## [ ] 7. Update Existing Types
- Edit src/types/index.ts (import firebase types)

## [ ] 8. Firestore Rules & Indexes
- Provide rules snippet
- Suggest indexes

## [ ] 9. Integration & Testing
- Update Shop/Admin/Profile pages to use services
- Test auth/data sync

**Progress: Starting...**
