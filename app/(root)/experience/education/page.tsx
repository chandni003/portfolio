"use client";

import React from "react";
import { PageWrapper } from "../../../../../portfolio/components/PageWrapper";
import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen, Calendar, MapPin, Trophy, Award, HeartHandshake } from "lucide-react";
import { LICENSE_DATA, EXTRACURRICULAR_DATA } from "../../../../../portfolio/data/mockData";

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
            <section className="pt-40 pb-10 px-4 text-center z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold mb-4 dark:text-white"
                    >
                        Academic <span className="text-purple-500">Journey</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-500 dark:text-neutral-400 font-medium"
                    >
                        The Foundation Of Knowledge.
                    </motion.p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-16 h-1 bg-purple-500 mx-auto mt-6 rounded-full"
                    />
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

            {/* Certifications & Licenses */}
            <section className="py-24 px-4 bg-black/5 dark:bg-white/5 border-t border-neutral-200 dark:border-neutral-800">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold dark:text-white mb-4">
                            Licenses & <span className="text-purple-500">Certifications</span>
                        </h2>
                        <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {LICENSE_DATA.map((license, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 rounded-[32px] bg-white dark:bg-[#0f111a] border border-neutral-200 dark:border-white/5 shadow-lg hover:shadow-2xl transition-all"
                            >
                                <div className="flex flex-col sm:flex-row items-start gap-6">
                                    <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform flex-shrink-0">
                                        <Award size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold dark:text-white mb-2">{license.name}</h3>
                                        <p className="text-purple-500 font-semibold mb-2">{license.issuer}</p>
                                        <div className="flex items-center gap-2 mb-4 text-xs font-bold text-neutral-400">
                                            <Calendar size={12} /> {license.date}
                                        </div>
                                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                                            {license.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Extracurricular Activities */}
            <section className="py-24 px-4 max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold dark:text-white mb-4">
                        Extracurriculars & <span className="text-pink-500">Volunteering</span>
                    </h2>
                    <div className="w-16 h-1 bg-pink-500 mx-auto rounded-full" />
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {EXTRACURRICULAR_DATA.map((activity, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group relative p-8 md:p-10 rounded-[40px] bg-white/60 dark:bg-[#0f111a]/80 backdrop-blur-3xl border border-pink-500/10 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                                {/* Icon Wrapper */}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="p-6 rounded-[28px] bg-gradient-to-br from-pink-500/20 to-rose-500/5 text-pink-500 shadow-inner shrink-0"
                                >
                                    <HeartHandshake size={40} className="drop-shadow-md" />
                                </motion.div>

                                {/* Content */}
                                <div className="w-full text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                        <h3 className="text-2xl md:text-3xl font-black dark:text-white tracking-tight">
                                            {activity.title}
                                        </h3>
                                        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-pink-500/10 text-pink-500 rounded-full font-black text-[10px] uppercase tracking-widest whitespace-nowrap self-center md:self-auto">
                                            <Calendar size={14} /> {activity.period}
                                        </div>
                                    </div>
                                    <p className="text-pink-600 dark:text-pink-400 font-bold tracking-[0.15em] uppercase text-xs mb-6">
                                        {activity.role}
                                    </p>
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium text-lg">
                                        {activity.description}
                                    </p>
                                </div>
                            </div>

                            {/* Interactive Background Glow */}
                            <div className="absolute top-0 right-0 -z-0 w-64 h-64 bg-pink-600/5 blur-[100px] rounded-full group-hover:scale-150 group-hover:bg-pink-500/10 transition-all duration-1000" />
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageWrapper>
    );
}
