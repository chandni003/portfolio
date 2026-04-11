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
      {/* Consistent Background Gradients Layer */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-white dark:bg-[#0a0a0a]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[130px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </main>
  );
};
