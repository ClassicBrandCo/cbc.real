import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-obsidian px-5 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <p className="mb-2 font-display text-8xl font-bold text-gold-gradient lg:text-9xl">
                    404
                </p>
                <h1 className="mb-3 font-display text-2xl font-bold text-foreground">
                    Page Not Found
                </h1>
                <p className="mb-8 max-w-sm font-body text-sm text-foreground/40">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 font-body text-sm font-semibold uppercase text-obsidian transition-colors hover:bg-gold-300"
                >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
