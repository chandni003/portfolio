"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lightbulb, BookOpen } from "lucide-react";
import { PERSONAL_VALUES } from "../data/mockData";

const iconMap: Record<string, any> = { Shield, Lightbulb, BookOpen };

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 w-full max-w-7xl mx-auto overflow-hidden relative">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -z-10 w-full h-full bg-blue-600/5 blur-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
          Positive <span className="text-blue-600">Drive.</span>
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
          My philosophy as a developer is rooted in creating value through efficiency and precision. I don&apos;t just write code; I build reliable digital foundations.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-[6px] bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-[1px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-1">
        {PERSONAL_VALUES.map((val, idx) => {
          const Icon = iconMap[val.icon] || Shield;
          return (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[48px] bg-white/40 dark:bg-black/20 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="mb-8 p-5 w-fit rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-blue-600 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-black dark:text-white uppercase tracking-tighter mb-4">
                  {val.title}
                </h3>

                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                  {val.description}
                </p>
              </div>

              {/* Glow Background Effect */}
              <div className="absolute top-0 right-0 -z-0 w-32 h-32 bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
