"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeToCollection, COLLECTIONS } from "../lib/firestore";
import {
  Code, Cpu, Bug, Zap, ShieldCheck,
  Layout, Globe, Palette, FileCode, Brush,
  Server, Activity, Database, Bot,
  Sparkles, Workflow
} from "lucide-react";

const iconMap: Record<string, any> = {
  Code, Cpu, Bug, Zap, ShieldCheck,
  Layout, Globe, Palette, FileCode, Brush,
  Server, Activity, Database, Bot,
  Sparkles, Workflow
};

const CATEGORIES = [
  "All Skills",
  "Languages",
  "Frontend",
  "Backend & DB",
  "AI & Automation"
];

export const KnowledgeSection = () => {
  const [activeCategory, setActiveCategory] = useState("All Skills");
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(COLLECTIONS.SKILLS, (data) => {
      setSkills(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredSkills = skills.filter(skill =>
    activeCategory === "All Skills" || skill.category === activeCategory
  );

  return (
    <section id="knowledge" className="py-24 px-4 w-full max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">
          My <span className="text-blue-600">Skills</span> & Expertise
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl mx-auto text-lg">
          I&apos;ve developed a diverse skill set across multiple domains of software development.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-[6px] bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full blur-[1px]" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border-2 ${activeCategory === cat
                ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105"
                : "bg-neutral-50 dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 hover:border-blue-500/50"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-1"
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-40 rounded-[32px] bg-neutral-100 dark:bg-neutral-900/50 animate-pulse border border-neutral-200 dark:border-neutral-800" />
            ))
          ) : (
            filteredSkills.map((skill) => {
              const isImage = skill.icon?.includes(".") || skill.icon?.startsWith("http") || skill.icon?.startsWith("/");
              const Icon = iconMap[skill.icon] || Code;
              
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  layout
                  className="group relative h-40 p-8 rounded-[32px] bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0">
                      {isImage ? (
                        <img 
                          src={skill.icon.startsWith("/") ? skill.icon : `/logos/skills/${skill.icon}`} 
                          alt={skill.name} 
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            // Fallback to Lucide if image fails
                            (e.target as any).style.display = 'none';
                            (e.target as any).nextSibling.style.display = 'block';
                          }}
                        />
                      ) : null}
                      {(!isImage || !skill.icon) && <Icon size={24} className="text-blue-600" />}
                    </div>
                    <div>
                      <h3 className="font-black text-xl dark:text-white uppercase tracking-tight leading-none mb-2">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase">
                        {skill.level || skill.proficiency}% proficiency
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-1.5 w-full bg-neutral-100 dark:bg-white/5 rounded-full overflow-hidden mt-6">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level || skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full relative"
                    >
                      <div className="absolute top-0 right-0 h-full w-4 bg-white/40 blur-[2px]" />
                    </motion.div>
                  </div>

                  {/* Glow Background Effect */}
                  <div className="absolute top-0 right-0 -z-10 w-24 h-24 bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
