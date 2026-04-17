"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, Github, Linkedin, Twitter, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const ContactSection = () => {
    return (
        <section id="contact" className="py-24 px-4 bg-white dark:bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-10 items-center">
                {/* Left Column: Info & Socials */}
                <div className="flex-[1.2] text-center md:text-left">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Available for New Projects
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-black tracking-tighter mb-8 leading-tight dark:text-white text-black uppercase">
                        Let&apos;s <br /> 
                        <span className="text-blue-600">Collaborate.</span>
                    </h2>

                    <p className="text-neutral-500 dark:text-neutral-400 font-medium text-lg leading-relaxed mb-12 max-w-lg">
                        From high-performance backends to seamless user experiences, let&apos;s turn your ideas into high-impact digital solutions. 
                    </p>

                    <div className="space-y-6 mb-12">
                        <Link href="mailto:chandniofficial001@gmail.com" className="flex items-center justify-center md:justify-start gap-4 group/item cursor-pointer">
                            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shadow-sm">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Email Me</p>
                                <p className="text-xl font-black dark:text-white break-all">chandniofficial001@gmail.com</p>
                            </div>
                        </Link>

                        <Link href="/contact" className="flex items-center justify-center md:justify-start gap-4 group/item cursor-pointer">
                            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all shadow-sm">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest leading-none mb-1">Call Directly</p>
                                <p className="text-xl font-black dark:text-white">Schedule a Call</p>
                            </div>
                        </Link>
                    </div>

                    {/* Social Row */}
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        {[
                            { Icon: Github, href: "https://github.com/chandni003" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/chandani-kumari-c1003" },
                            // { Icon: Twitter, href: "https://twitter.com" }
                        ].map((social, idx) => (
                            <Link 
                                key={idx} 
                                href={social.href}
                                className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-blue-600 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-sm"
                            >
                                <social.Icon size={20} />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Column: High-Impact CTA Card (Compact) */}
                <div className="flex-[0.8] w-full max-w-md">
                    <div className="relative p-10 md:p-12 rounded-[48px] bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden group">
                        {/* Background Glows */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full" />
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black dark:text-white text-black mb-4 tracking-tight leading-tight uppercase">
                                Start a <br />Conversation.
                            </h3>
                            <p className="text-neutral-500 dark:text-neutral-400 font-medium mb-8 text-sm leading-relaxed">
                                Tell me about your goals and I&apos;ll help you bring them to life with cutting-edge tech.
                            </p>

                            {/* Added Tech Checklist */}
                            <ul className="space-y-3 mb-10">
                                {[
                                    "MERN & MEAN Stack Expert",
                                    "Frontend / UI Optimization",
                                    "Scalable Backend Architecture",
                                    "UI/UX Design Obsessed"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-xs font-bold text-neutral-600 dark:text-neutral-300">
                                        <CheckCircle2 size={16} className="text-blue-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link href="/contact" className="inline-block w-full">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-3 overflow-hidden relative group/btn"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                    <Sparkles size={20} className="group-hover/btn:rotate-12 transition-transform" />
                                    Get In Touch
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
