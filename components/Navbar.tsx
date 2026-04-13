"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, Home, User, Briefcase,
  Settings, Layout, FileText, Send, ChevronDown, GraduationCap
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../lib/utils";
import { Logo } from "./Logo";

type NavItem = {
  name: string;
  href?: string;
  icon: any;
  subItems?: { name: string; href: string; icon: any }[];
};

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  {
    name: "Experience",
    icon: Briefcase,
    subItems: [
      { name: "Work History", href: "/experience/work", icon: Briefcase },
      { name: "Education History", href: "/experience/education", icon: GraduationCap }
    ]
  },
  { name: "Services", href: "/services", icon: Settings },
  { name: "Projects", href: "/projects", icon: Layout },
];

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  if (pathname.startsWith("/admin")) return null;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 px-4">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center gap-8 px-8 py-3 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full shadow-2xl transition-all duration-300">
        {navItems.map((item) => (
          <div key={item.name} className="relative group/navItem">
            {item.href ? (
              <Link
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all group cursor-pointer"
              >
                <item.icon size={16} className="group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
                {item.subItems && <ChevronDown size={14} className="opacity-50 group-hover/navItem:rotate-180 transition-transform" />}
              </Link>
            ) : (
              <div
                className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all group cursor-pointer"
              >
                <item.icon size={16} className="group-hover:scale-110 transition-transform" />
                <span>{item.name}</span>
                {item.subItems && <ChevronDown size={14} className="opacity-50 group-hover/navItem:rotate-180 transition-transform" />}
              </div>
            )}

            {/* Desktop Dropdown */}
            {item.subItems && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover/navItem:opacity-100 group-hover/navItem:pointer-events-auto transition-all duration-300 z-50">
                <div className="flex flex-col min-w-[200px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden p-2">
                  {item.subItems.map(subItem => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                    >
                      <subItem.icon size={16} className="text-blue-600" />
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="h-4 w-px bg-white/20" />

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
        </button>

        {/* Let's Talk Button */}
        <Link
          href="/contact"
          className="flex items-center gap-2 px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-all"
        >
          Let's Talk
          <Send size={14} />
        </Link>
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between w-full max-w-sm px-4 py-3 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full shadow-xl">
        <Logo className="scale-75 origin-left" />
        <div className="flex items-center gap-1">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full"
          >
            {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
          </button>
          <button onClick={toggleMenu} className="p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Pop-up Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-4 right-4 md:hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between mb-2">
                <Logo className="scale-90 origin-left" />
                <button onClick={() => setIsOpen(false)} className="p-2">
                   <X size={24} className="text-neutral-400" />
                </button>
              </div>
              {navItems.map((item) => (
                <div key={item.name} className="flex flex-col gap-4">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 text-xl font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <item.icon size={24} />
                      {item.name}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-4 text-xl font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
                      <item.icon size={24} />
                      {item.name}
                    </div>
                  )}
                  {item.subItems && (
                    <div className="flex flex-col gap-3 pl-10 border-l border-neutral-200 dark:border-neutral-800 ml-3">
                      {item.subItems.map(subItem => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 text-lg text-neutral-500 hover:text-blue-600 transition-colors"
                        >
                          <subItem.icon size={20} className="text-blue-600" />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 w-full" />
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg"
              >
                Let's Talk
                <Send size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
