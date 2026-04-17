"use client";

import { motion } from "framer-motion";
import { PhoneCall, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import React from 'react';
import { usePathname } from 'next/navigation';

export const CallToAction = () => {
    const pathname = usePathname();

    if (pathname === '/contact' || pathname === '/contact/') {
        return null;
    }

    return (
        <section className="py-20 px-4 mt-10 bg-transparent">
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[2rem] bg-[#161821] dark:bg-[#161821] border border-white/5 p-10 md:p-14 text-center shadow-2xl"
                >
                    {/* Background glow effects */}
                    <div className="absolute -top-[100px] -left-[100px] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-[100px] -right-[100px] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                            Let's Build Something Amazing Together
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-10 font-medium">
                            Whether you're launching a startup, revamping an existing product, or need a powerful digital presence — I'll help transform your vision into reality with clean, efficient, and scalable solutions.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <Link href="/contact" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                                <PhoneCall className="w-[18px] h-[18px]" />
                                Schedule a Call
                            </Link>

                            <Link href="mailto:chandniofficial001@gmail.com" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20">
                                <Mail className="w-[18px] h-[18px]" />
                                Email Me
                            </Link>

                            <Link href="/contact" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/10 text-gray-300 font-semibold rounded-xl transition-colors">
                                <Calendar className="w-[18px] h-[18px]" />
                                Book Meeting
                            </Link>
                        </div>

                        <p className="text-xs text-gray-500 font-medium">
                            Typically respond within 24 hours
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
