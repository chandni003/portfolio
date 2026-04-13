"use client";

import React, { useState, useEffect } from "react";
import { PageWrapper } from "../../../../portfolio/components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe, Hourglass } from "lucide-react";
import Link from "next/link";
import { subscribeToCollection, COLLECTIONS } from "../../../../portfolio/lib/firestore";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToCollection(COLLECTIONS.PROJECTS, (data) => {
      setProjects(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <PageWrapper>
      {/* Projects Hero */}
      <section className="pt-32 pb-16 px-4 text-center z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 dark:text-white"
          >
            Digital <span className="text-blue-500">Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 dark:text-neutral-400 font-medium"
          >
            Case Studies & Work.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-16 h-1 bg-blue-500 mx-auto mt-6 rounded-full"
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-[500px] rounded-[48px] bg-neutral-100 dark:bg-neutral-900/50 animate-pulse border border-neutral-200 dark:border-neutral-800" />
              ))
            ) : (
              projects.map((project, idx) => (
                <motion.div
                  key={project.id || project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative p-8 rounded-[48px] bg-white/40 dark:bg-black/20 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col"
                >
                  {/* Coming Soon Ribbon */}
                  {project.status === "coming_soon" && (
                    <div className="absolute top-6 right-6 z-10 px-3 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-blue-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Coming Soon
                    </div>
                  )}

                  {/* Image (Top) */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] border border-neutral-200 dark:border-neutral-800 shadow-lg mb-8">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${project.status === "coming_soon" ? "grayscale-[0.6] group-hover:grayscale-[0.3]" : "grayscale-[0.2] group-hover:grayscale-0"} group-hover:scale-105`}
                    />
                    {project.status === "coming_soon" && (
                      <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px]" />
                    )}
                  </div>

                  {/* Description */}
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-black tracking-widest text-blue-600 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-black mb-4 dark:text-white uppercase tracking-tighter">
                      {project.title}
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-10">
                      {project.description}
                    </p>
                  </div>

                  {/* Action Buttons (Bottom) */}
                  <div className="flex gap-3">
                    {project.status === "coming_soon" ? (
                      <div className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-2xl font-bold text-sm cursor-not-allowed">
                        <Hourglass size={18} />
                        <span>Coming Soon</span>
                      </div>
                    ) : project.liveLink ? (
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95 group/btn"
                      >
                        <span>View Live</span>
                        <Globe size={18} className="group-hover/btn:rotate-12 transition-transform" />
                      </Link>
                    ) : (
                      <div className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-neutral-100 dark:bg-[#151824] border border-neutral-200 dark:border-white/5 text-neutral-400 dark:text-neutral-500 rounded-2xl font-bold text-sm cursor-not-allowed">
                        <span>No Live URL</span>
                      </div>
                    )}
                    {project.githubLink && (
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        className="p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-blue-600 hover:border-blue-500/50 rounded-2xl transition-all hover:scale-[1.02]"
                        title="View Source"
                      >
                        <ExternalLink size={18} />
                      </Link>
                    )}
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute top-0 right-0 -z-0 w-32 h-32 bg-blue-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageWrapper>
  );
}
