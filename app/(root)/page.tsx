"use client";

import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import { KnowledgeSection } from "../../../portfolio/components/KnowledgeSection";
import { AboutSection } from "../../../portfolio/components/AboutSection";
import { ContactSection } from "../../../portfolio/components/ContactSection";
import { Footer } from "../../../portfolio/components/Footer";

export default function Home() {
    return (
        <main className="relative w-full overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 bg-white dark:bg-[#0a0a0a]">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/20 blur-[120px]" />
            </div>

            {/* Hero Section - First Fold */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 md:pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
                >
                    {/* Left Side: Content */}
                    <div className="flex-1 text-left">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8 inline-block"
                        >
                            Full Stack Developer & Software Engineer
                        </motion.span>

                        <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                            Scalable <br />
                            <span className="bg-gradient-to-r from-blue-600 to-black dark:to-white bg-clip-text text-transparent">Solutions.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-12 max-w-xl leading-relaxed font-medium">
                            I am <span className="text-black dark:text-white font-bold">Chandani Kumari</span>, a full stack developer dedicated to building high-performance web applications using the <span className="text-blue-600 dark:text-blue-400 font-bold">MERN Stack</span> and <span className="text-blue-600 dark:text-blue-400 font-bold">Next.js</span>. Delivering professional, modern digital experiences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 mb-10">
                            <Link
                                href="/projects"
                                className="group relative px-6 py-4 bg-black dark:bg-blue-600 text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 text-center"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Latest Work
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <Link
                                href="/contact"
                                className="group px-8 py-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-bold text-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                            >
                                Connect Now
                                <Send size={20} className="group-hover:-rotate-45 transition-transform" />
                            </Link>
                        </div>

                        {/* Stats Badges = future use */}
                        {/* <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                <span className="text-sm font-bold text-neutral-600 dark:text-neutral-300">2+ Years Experience</span>
                            </div>
                            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-sm">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-sm font-bold text-neutral-600 dark:text-neutral-300">10+ Projects</span>
                            </div>
                        </div> */}
                    </div>

                    {/* Right Side: Image with Blue/Black Aesthetic */}
                    <div className="flex-1 relative group w-full max-w-sm aspect-square lg:aspect-auto lg:h-[500px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                            className="relative h-full w-full rounded-[40px] overflow-hidden border-8 border-white dark:border-neutral-900 shadow-2xl transition-all group-hover:scale-[1.02]"
                        >
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-black/20 z-0" />

                            {/* The Image (Placeholder - Swap with public/hero-portrait.png) */}
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000"
                                alt="Chandani Kumari Portfolio Portrait"
                                className="h-full w-full object-cover relative z-10 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                            />

                            {/* Decorative Elements */}
                            <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/40 backdrop-blur-xl border border-white/20 rounded-3xl z-20">
                                <p className="text-white text-sm font-bold tracking-widest uppercase">Chandani Kumari</p>
                                <p className="text-blue-300 text-xs mt-1 font-bold">Full Stack Developer</p>
                            </div>
                        </motion.div>

                        {/* Floating Aesthetic Card */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-10 -right-10 hidden lg:flex flex-col p-6 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl z-30"
                        >
                            <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 bg-blue-500 rounded-sm" />)}
                            </div>
                            <p className="text-xs font-black dark:text-white uppercase tracking-tighter">Next.js / MERN STACK EXPERT</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Aesthetic Section Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-400"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
                </motion.div>
            </section>

            <KnowledgeSection />
            <AboutSection />
            <ContactSection />
        </main>
    );
}
