"use client";

import React from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <main className={`relative w-full overflow-hidden min-h-screen ${className}`}>
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-white dark:bg-[#0a0a0a]" />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.98 }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
        transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1], // Weightier, more deliberate easing
            staggerChildren: 0.2 
        }}
        className="w-full h-full relative"
      >
        {children}
      </motion.div>
    </main>
  );
};
