import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Clock, DollarSign, Package } from 'lucide-react';
import { useCurrencyStore } from '@/stores/currencyStore';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import type { Order } from '@/types';

const Profile = () => {
  const { formatPrice } = useCurrencyStore();
  const { user, logOut } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Order })));
      setLoading(false);
    }, (error) => {
      toast({
        title: 'Error loading orders',
        description: error.message,
        variant: 'destructive',
      });
      setLoading(false);
    });

    return unsubscribe;
  }, [user?.uid, toast]);

  if (!user) {
    return (
      <div className="min-h-screen bg-obsidian py-20 text-center">
        <p className="font-body text-sm text-foreground/50">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian py-12 lg:py-20">
      <div className="mx-auto max-w-4xl px-5 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 space-y-6 rounded-lg border border-obsidian-50/50 bg-gradient-to-b from-obsidian-100/20 to-obsidian backdrop-blur-md p-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-gold">
              <User className="size-7 text-obsidian font-bold" />
            </div>
            <div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                My Profile
              </h1>
              <p className="font-body text-sm text-foreground/70">
                {user.email}
              </p>
            </div>
          </div>
          <button
            onClick={logOut}
            className="w-full rounded-sm border border-foreground/20 bg-obsidian px-8 py-3 font-body text-sm font-semibold uppercase text-foreground transition-colors hover:border-gold hover:bg-gold/5 hover:text-gold lg:w-auto"
          >
            Log Out
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          <h2 className="font-display text-xl font-bold text-foreground">
            Your Orders
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map(i => (
                <div key={i} className="animate-pulse rounded-md border border-obsidian-50 bg-obsidian-100/30 p-6"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <Package className="size-16 text-foreground/20" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                No orders yet
              </h3>
              <p className="font-body text-sm text-foreground/40 max-w-md">
                Place your first order from the shop and it will appear here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group rounded-md border border-obsidian-50 bg-obsidian-100/30 p-6 shadow-sm hover:shadow-gold/20 transition-all duration-200"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div className={`flex size-2.5 rounded-full ${
                      order.status === 'completed' ? 'bg-emerald-500' 
                      : order.status === 'pending' ? 'bg-amber-500' 
                      : 'bg-slate-500'
                    }`} />
                    <span className={`font-body text-xs font-semibold uppercase ${
                      order.status === 'completed' ? 'text-emerald-500' 
                      : order.status === 'pending' ? 'text-amber-500' 
                      : 'text-slate-500'
                    }`} >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="font-display text-lg font-bold text-gold tabular-nums">
                    {formatPrice(order.totalUGX)}
                  </p>
                  <p className="mt-2 font-body text-sm text-foreground/70">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mt-1 font-body text-xs text-foreground/50">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
