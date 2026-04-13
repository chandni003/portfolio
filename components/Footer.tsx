"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export const Footer = () => {
    const pathname = usePathname();

    // Hide footer on admin pages
    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="w-full bg-white dark:bg-[#0a0a0a] pt-24 pb-12 px-4 border-t border-neutral-100 dark:border-neutral-900">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
                    {/* Brand & Tagline */}
                    <div className="flex-1 max-w-sm">
                        <Logo className="mb-8" />
                        <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                            Crafting high-performance digital experiences through elegant code and modern architecture. 
                            Specializing in the MERN stack and Next.js.
                        </p>
                    </div>

                    {/* Quick & Social Links Grid */}
                    <div className="flex-[1.5] grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-8">Navigation</h4>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-blue-600 transition-colors uppercase tracking-widest">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-8">Connect</h4>
                            <div className="flex gap-4">
                                {[Github, Linkedin, Twitter].map((Icon, idx) => (
                                    <Link key={idx} href="#" className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-blue-600 hover:border-blue-500/50 transition-all shadow-sm">
                                        <Icon size={20} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-8">Direct</h4>
                            <div className="space-y-4">
                                <Link href="mailto:chandanidev@example.com" className="flex items-center gap-3 group">
                                    <Mail size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400 break-all">chandanidev@example.com</span>
                                </Link>
                                <div className="flex items-center gap-3 group">
                                    <Phone size={16} className="text-blue-600 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400">+91 98765 43210</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent mb-12" />
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] text-center">
                    <p>© 2026 Chandani Kumari. All Rights Reserved.</p>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-2 hover:text-blue-600 transition-colors group"
                    >
                        Back to Top
                        <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <p>Designed with <span className="text-blue-600">♥</span></p>
                </div>
            </div>
        </footer>
    );
};
