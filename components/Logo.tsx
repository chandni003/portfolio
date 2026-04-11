"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={`flex items-center gap-3 no-underline ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Animated Background Ring - Constant Opacity */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-black opacity-20 blur-md transition-opacity"
        />

        {/* Stylized 'C' Icon - Static Border & Glow */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-black border border-blue-500/20 dark:border-blue-800/30 shadow-2xl overflow-hidden transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-100" />
          <span className="text-3xl font-black bg-gradient-to-br from-blue-700 to-black dark:from-blue-400 dark:to-white bg-clip-text text-transparent transform transition-transform">
            C
          </span>
        </div>
      </div>

      <div className="flex flex-col pt-1">
        <span className="text-2xl font-black tracking-tight leading-none dark:text-white text-black uppercase">
          Chandani
        </span>
        <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 to-neutral-200 dark:to-neutral-800 mt-1" />
        <span className="text-[9px] font-bold tracking-[0.4em] text-neutral-400 uppercase mt-1 opacity-100 transition-all">
          Web World
        </span>
      </div>
    </Link>
  );
};
