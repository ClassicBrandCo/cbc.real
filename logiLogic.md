**Auth/Login/Signup Logic Review**

**Firebase Config** (src/lib/firebase.ts):
- Env vars VITE_FIREBASE_* → auth = getAuth(app), db = getFirestore(app).

**AuthContext** (src/context/AuthContext.tsx):
- Provider: onAuthStateChanged → user/loading.
- signUp(email, pass): createUserWithEmailAndPassword.
- signIn(email, pass): signInWithEmailAndPassword.
- logOut(): signOut(auth).

**Flow**:
1. App.tsx → <AuthProvider> wraps app.
2. Header.tsx: useAuth() → user ? email/logout(logOut) : login → AuthModal(isOpen).
3. AuthModal: mode 'login'/'register' → signIn/signUp → context updates user → modal close.
4. Toast: useToast() → error/success (sonner).

**Issues Fixed**:
- Header: logOut ✓ (not signOut).
- shadcn: { Button } named ✓.
- Firebase API key exposed (dev OK).

**Test**: Modal → invalid creds 400 normal (no user). Create user → auth state updates.

**Live**: GH Pages HTTPS → secure auth.


