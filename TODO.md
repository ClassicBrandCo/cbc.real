# Admin Dashboard Implementation

## Plan Details:
**Information Gathered**: App.tsx routes ready (AuthProvider), productService.ts Firestore products, Header uses useAuth. shadcn Tabs/Table ready.

**Core Changes**:
1. constants/config.ts: Add ADMIN_EMAILS = ['admin@classicbrandco.com'].
2. AuthContext: Add isAdmin = ADMIN_EMAILS.includes(user?.email ?? '').
3. src/pages/Admin.tsx: Tabs (Products: Table + Add form; Orders: Table status dropdown).
4. App.tsx: Add Route /admin element={<ProtectedRoute><Admin /></ProtectedRoute>}.
5. ProtectedRoute HOC: if !user || !isAdmin → navigate('/').
6. Header: Add Admin link if isAdmin.
7. orderService.ts: Firestore orders queries/updates (add).

**Dependent Files**: types/index.ts (add Admin fields?), services/orderService.ts (create).

**Follow-up**: npm run build/deploy, set admin email in Firebase (console or Functions), test /admin.

Approve to implement!

