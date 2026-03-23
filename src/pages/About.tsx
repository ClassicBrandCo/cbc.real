import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Scissors, Globe, Heart, Sparkles } from 'lucide-react';
import aboutImg from '@/assets/about-craft.jpg';
import { SITE_CONFIG } from '@/constants/config';

const VALUES = [
    {
        icon: Scissors,
        title: 'Craftsmanship',
        text: 'Each garment passes through 12 quality checkpoints before earning the CBC label.',
    },
    {
        icon: Globe,
        title: 'African Roots',
        text: 'Born in Kampala, inspired by the continent. Our designs celebrate African creativity worldwide.',
    },
    {
        icon: Heart,
        title: 'Community First',
        text: 'We employ local tailors and source materials from Ugandan suppliers wherever possible.',
    },
    {
        icon: Sparkles,
        title: 'Limited Editions',
        text: 'Small-batch production means less waste and more exclusivity. Every piece matters.',
    },
];

const TIMELINE = [
    { year: '2021', event: 'Classic Brand Co founded in Kampala, Uganda' },
    { year: '2022', event: 'Launched first full collection — "Obsidian Origins"' },
    { year: '2023', event: 'Expanded to 5,000+ customers across East Africa' },
    { year: '2024', event: 'Tri-platform ecosystem: Web, Android Admin & Client' },
];

const About = () => {
    return (
        <div className="bg-obsidian">
            {/* Hero */}
            <section className="relative flex min-h-[60vh] items-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={aboutImg}
                        alt=""
                        className="size-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/50" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-32 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-xl"
                    >
                        <span className="mb-3 block font-body text-[11px] font-semibold uppercase text-gold/50">
                            Our Story
                        </span>
                        <h1 className="mb-6 font-display text-4xl font-bold text-foreground lg:text-5xl">
                            Built From the{' '}
                            <span className="text-gold-gradient">Ground Up</span>
                        </h1>
                        <p className="font-body text-base leading-relaxed text-foreground/45">
                            Classic Brand Co didn't start in a boardroom. It started on the
                            streets of Kampala — fueled by a passion for premium fashion that
                            represents where we come from and where we're going.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission statement */}
            <section className="border-y border-gold/8 py-16 lg:py-20">
                <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                    <div className="grid gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="font-display text-3xl font-bold text-foreground lg:text-4xl"
                            >
                                The Obsidian
                                <br />
                                <span className="text-gold">Standard</span>
                            </motion.h2>
                        </div>
                        <div className="space-y-5 lg:col-span-7">
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="font-body text-sm leading-relaxed text-foreground/50"
                            >
                                We named our brand philosophy "The Obsidian Standard" because obsidian
                                is formed under pressure — just like the best ideas. It's dark,
                                it's sharp, and it reflects everything around it with clarity.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="font-body text-sm leading-relaxed text-foreground/50"
                            >
                                Every CBC piece is designed to embody that energy. Premium
                                materials, meticulous construction, and a design language that
                                speaks confidence without saying a word.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values grid */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center font-display text-3xl font-bold text-foreground"
                    >
                        What We Stand For
                    </motion.h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {VALUES.map((val, i) => (
                            <motion.div
                                key={val.title}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group rounded-md border border-obsidian-50 bg-obsidian-100/40 p-6 transition-all duration-300 hover:border-gold/15"
                            >
                                <val.icon className="mb-4 size-6 text-gold/50 transition-colors group-hover:text-gold" />
                                <h3 className="mb-2 font-display text-base font-semibold text-foreground">
                                    {val.title}
                                </h3>
                                <p className="font-body text-sm leading-relaxed text-foreground/40">
                                    {val.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="border-t border-gold/8 py-16 lg:py-24">
                <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center font-display text-3xl font-bold text-foreground"
                    >
                        The Journey
                    </motion.h2>

                    <div className="relative mx-auto max-w-2xl">
                        {/* Vertical gold line */}
                        <div className="absolute left-6 top-0 h-full gold-line-vertical sm:left-1/2 sm:-translate-x-px" />

                        <div className="space-y-10">
                            {TIMELINE.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="relative pl-16 sm:pl-0"
                                >
                                    {/* Dot */}
                                    <div className="absolute left-4 top-1 size-4 rounded-full border-2 border-gold bg-obsidian sm:left-1/2 sm:-translate-x-1/2" />

                                    <div
                                        className={`sm:w-5/12 ${i % 2 === 0 ? 'sm:text-right' : 'sm:ml-auto'
                                            }`}
                                    >
                                        <p className="font-display text-xl font-bold tabular-nums text-gold">
                                            {item.year}
                                        </p>
                                        <p className="mt-1 font-body text-sm text-foreground/45">
                                            {item.event}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-gold/8 py-16 lg:py-20">
                <div className="mx-auto max-w-[1400px] px-5 text-center lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
                            Ready to Experience CBC?
                        </h2>
                        <p className="mx-auto mb-8 max-w-md font-body text-sm text-foreground/40">
                            Explore our full collection and find the pieces that speak to you.
                        </p>
                        <Link
                            to="/shop"
                            className="group inline-flex items-center gap-2 rounded-sm bg-gold px-8 py-3.5 font-body text-sm font-semibold uppercase text-obsidian transition-colors hover:bg-gold-300"
                        >
                            Shop Collection
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
