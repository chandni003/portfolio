"use client";

import React from "react";
import { PageWrapper } from "../../../portfolio/components/PageWrapper";
import { EXPERIENCE_DATA } from "../../../portfolio/data/mockData";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, GraduationCap } from "lucide-react";

export default function ExperiencePage() {
  return (
    <PageWrapper>
      {/* Experience Hero */}
      <section className="pt-32 pb-16 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8 inline-block"
          >
            Professional History
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
            The Timeline Of <br />
            <span className="text-blue-600 italic">Growth.</span>
          </h1>
        </div>
      </section>

      {/* Experience Timeline Grid */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[48px] bg-white/40 dark:bg-black/20 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                {/* Icon & Meta */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-blue-600 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Briefcase size={32} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                      <Calendar size={12} />
                      {exp.period}
                    </div>
                  </div>
                </div>

                {/* Role Details */}
                <div className="flex-1">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-tight mb-2">
                      {exp.role}
                    </h3>
                    <p className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm">
                      {exp.company}
                    </p>
                  </div>

                  <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-8 max-w-3xl">
                    {exp.description}
                  </p>

                  {/* Visual Achievement Bullets */}
                  <div className="flex flex-wrap gap-4">
                    {["Architecture", "Leadership", "Scalability"].map(tag => (
                      <div key={tag} className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest bg-neutral-50 dark:bg-neutral-950/50 px-4 py-2 rounded-xl border border-neutral-100 dark:border-neutral-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow Background Effect */}
              <div className="absolute top-0 right-0 -z-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
