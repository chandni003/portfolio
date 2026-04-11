"use client";

import React from "react";
import { PageWrapper } from "../../../components/PageWrapper";
import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen, Calendar, MapPin, Trophy } from "lucide-react";

// Dummy Data that will eventually come from Admin Panel
const EDUCATION_DATA = [
    {
        id: 1,
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Punjabi University",
        location: "Patiala, Punjab",
        period: "Graduated",
        description: "Focused on software engineering, web development, data structures, and database management. Honored with the prestigious College Colour title for overall academic and co-curricular excellence.",
        icon: GraduationCap,
        achievements: ["Web Development", "Data Structures"],
        awards: ["College Colour Award", "2x Merit Holder"]
    },
    {
        id: 2,
        degree: "10+2 (Senior Secondary)",
        institution: "Punjab School Education Board",
        location: "Punjab, India",
        period: "Completed",
        description: "Completed higher secondary education with a focus on core subjects, laying a strong academic foundation for further studies in technology.",
        icon: School,
        achievements: ["Academics", "Core Subjects"],
        awards: ["Merit Holder"]
    },
    {
        id: 3,
        degree: "10th (Matriculation)",
        institution: "Punjab School Education Board",
        location: "Punjab, India",
        period: "Completed",
        description: "Completed foundational education with dedication, highlighting a consistent academic track record.",
        icon: BookOpen,
        achievements: ["Foundation", "Excellence"],
        awards: ["Merit Holder"]
    }
];

export default function EducationPage() {
    return (
        <PageWrapper>
            {/* Education Hero */}
            <section className="pt-32 pb-16 px-4 text-center">
                <div className="max-w-7xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-black tracking-widest uppercase mb-8 inline-block"
                    >
                        Academic Journey
                    </motion.span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
                        The Foundation Of <br />
                        <span className="text-purple-600 italic">Knowledge.</span>
                    </h1>
                </div>
            </section>

            {/* Education Timeline Grid */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto space-y-12">
                    {EDUCATION_DATA.map((edu, idx) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-10 rounded-[48px] bg-white/40 dark:bg-black/20 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                                <div className="flex flex-col items-center md:items-start gap-4">
                                    <div className="p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-purple-600 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <edu.icon size={32} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/20 text-purple-600 font-black text-[10px] uppercase tracking-widest whitespace-nowrap">
                                            <Calendar size={12} />
                                            {edu.period}
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-1.5 bg-neutral-500/10 rounded-full border border-neutral-500/20 text-neutral-600 font-black text-[10px] uppercase tracking-widest whitespace-nowrap">
                                            <MapPin size={12} />
                                            {edu.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-tight mb-2">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-purple-600 font-bold tracking-[0.2em] uppercase text-sm">
                                            {edu.institution}
                                        </p>
                                    </div>

                                    <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-8 max-w-3xl">
                                        {edu.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {edu.awards && edu.awards.map((award, i) => (
                                            <div key={i} className="flex items-center gap-2 text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                                <Trophy size={14} className="text-amber-500 drop-shadow-md" />
                                                {award}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        {edu.achievements.map((tag, i) => (
                                            <div key={i} className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest bg-neutral-50 dark:bg-neutral-950/50 px-4 py-2 rounded-xl border border-neutral-100 dark:border-neutral-800">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-0 right-0 -z-0 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageWrapper>
    );
}
