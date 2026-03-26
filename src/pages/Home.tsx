import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, Gem, Star } from 'lucide-react';
import heroImg from '@/assets/hero-main.jpg';
import { useProducts } from '@/services/firestoreService';
import ProductCard from '@/components/features/ProductCard';
import LoadingSpinner from '@/components/features/LoadingSpinner';

const PILLARS = [
  {
    icon: Crown,
    title: 'Premium Quality',
    description: 'Every piece crafted from the finest materials sourced across the continent.',
  },
  {
    icon: Gem,
    title: 'Unique Design',
    description: 'Original patterns and cuts that define the modern African streetwear movement.',
  },
  {
    icon: Star,
    title: 'Limited Drops',
    description: 'Small-batch production ensures exclusivity. When it\'s gone, it\'s gone.',
  },
];

const Home = () => {
  const { data: products = [], isLoading } = useProducts(20, 1);
  const featured = products.filter((p) => p.featured).slice(0, 8);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/40" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="absolute right-[15%] top-0 hidden h-full gold-line-vertical opacity-20 lg:block" />
        <div className="absolute right-[35%] top-0 hidden h-full gold-line-vertical opacity-10 lg:block" />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-20 pt-32 lg:px-10 lg:pt-0">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="mb-4 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 font-body text-[11px] font-semibold uppercase text-gold">
                Premium Streetwear · Kampala
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mb-6 font-display text-5xl font-bold leading-[1.1] text-foreground sm:text-6xl lg:text-7xl"
            >
              Wear the
              <br />
              <span className="text-gold-gradient">Obsidian Standard</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mb-10 max-w-md font-body text-base leading-relaxed text-foreground/50"
            >
              Crafted for those who lead, not follow. Classic Brand Co delivers premium streetwear that speaks without words — from Kampala to the world.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/shop"
                className="group flex items-center gap-2 rounded-sm bg-gold px-8 py-4 font-body text-sm font-semibold uppercase text-obsidian transition-all duration-200 hover:bg-gold-300"
              >
                Shop Collection
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="rounded-sm border border-foreground/15 px-8 py-4 font-body text-sm font-medium uppercase text-foreground/70 transition-all duration-200 hover:border-gold/30 hover:text-gold"
              >
                Our Story
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-[10px] uppercase text-foreground/25">
              Scroll
            </span>
            <div className="h-8 w-px bg-gradient-to-b from-gold/40 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="border-b border-gold/8 bg-obsidian">
        <div className="mx-auto grid max-w-[1400px] gap-px md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group border-r border-gold/8 p-8 last:border-r-0 lg:p-12"
            >
              <pillar.icon className="mb-4 size-6 text-gold/60 transition-colors duration-300 group-hover:text-gold" />
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-foreground/40">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-obsidian py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <motion.span
                className="mb-2 block font-body text-[11px] font-semibold uppercase text-gold/50"
              >
                The Collection
              </motion.span>
              <motion.h2
                className="font-display text-3xl font-bold text-foreground lg:text-4xl"
              >
                Featured Pieces
              </motion.h2>
            </div>
            <Link
              to="/shop"
              className="group hidden items-center gap-2 font-body text-sm font-medium text-gold/70 transition-colors hover:text-gold sm:flex"
            >
              View All
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product as any} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-gold"
            >
              View All Collection
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rest unchanged */}
    </div>
  );
};

export default Home;

