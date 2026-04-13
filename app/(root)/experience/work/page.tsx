"use client";

import React from "react";
import { PageWrapper } from "../../../../../portfolio/components/PageWrapper";
import { motion } from "framer-motion";
import { Briefcase, Trophy, Users } from "lucide-react";

// Dummy Data that will eventually come from Admin Panel
const WORK_EXPERIENCE_DATA = [
    {
        id: 1,
        role: "Frontend Developer",
        company: "Tech Innovations Inc.",
        location: "Remote",
        period: "Jan 2023 - Present",
        description: "Led the development of scalable UI components using Next.js and Tailwind CSS. Improved overall application performance and optimized rendering times by 30%.",
        achievements: ["React", "Next.js", "TailwindCSS"]
    },
    {
        id: 2,
        role: "Freelance Web Developer",
        company: "Self-Employed",
        location: "Global",
        period: "Jun 2022 - Dec 2022",
        description: "Designed and developed custom portfolio websites and landing pages for various clients. Focused on responsive design, modern aesthetics, and seamless user experiences.",
        achievements: ["UI/UX Design", "Framer Motion", "Client Relations"]
    }
];

const AWARDS_DATA = [
    {
        id: 1,
        title: "Best Innovation Award",
        year: "2023",
        description: "Awarded for the most innovative software solution at the annual tech symposium."
    },
    {
        id: 2,
        title: "Top Performer Q3",
        year: "2023",
        description: "Recognized for exceptional contribution and delivering high impact features."
    }
];

const ACTIVITIES_DATA = [
    {
        id: 1,
        title: "Open Source Contributor",
        description: "Active contributor to various Next.js and React focused open source libraries."
    },
    {
        id: 2,
        title: "Tech Community Mentor",
        description: "Mentoring junior developers and conducting weekly workshops on modern web development."
    }
];

export default function WorkPage() {
    return (
        <PageWrapper>
            {/* Header */}
            <section className="pt-32 pb-16 px-4 text-center z-10 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold mb-4 dark:text-white"
                    >
                        My <span className="text-blue-500">Journey</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-neutral-500 dark:text-neutral-400 font-medium"
                    >
                        Professional milestones and achievements
                    </motion.p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-16 h-1 bg-blue-500 mx-auto mt-6 rounded-full"
                    />
                </div>
            </section>

            {/* Timeline */}
            <section className="py-12 px-4 max-w-7xl mx-auto relative z-10">
                {/* Vertical Line */}
                <div className="absolute left-[2.5rem] md:left-[50%] top-12 bottom-12 w-1 bg-gradient-to-b from-blue-600 via-blue-500 to-purple-600 transform -translate-x-1/2 hidden md:block rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

                {/* Mobile vertical line */}
                <div className="absolute left-[39px] top-12 bottom-12 w-1 bg-gradient-to-b from-blue-600 via-blue-500 to-purple-600 md:hidden rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

                <div className="space-y-24">
                    {WORK_EXPERIENCE_DATA.map((exp, idx) => (
                        <div key={exp.id} className={`relative flex items-start md:w-[calc(50%+24px)] ${idx % 2 === 0 ? "md:justify-end pr-0 md:pr-14 md:mr-auto pl-20 md:pl-0" : "md:justify-start pl-20 md:pl-14 md:ml-auto"}`}>
                            {/* Dot visual marker */}
                            <div className={`absolute top-6 transform -translate-x-1/2 flex items-center justify-center z-10 w-10 h-10 rounded-full bg-[#0a0a0a] border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] ${idx % 2 === 0 ? "left-[24px] md:right-0 md:left-auto md:translate-x-1/2" : "left-[24px] md:left-0 md:-translate-x-1/2"}`}>
                                <Briefcase className="w-4 h-4 text-blue-400" />
                            </div>

                            {/* Card */}
                            <motion.div
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                className="bg-[#11131a] dark:bg-[#0f111a] border border-white/5 rounded-2xl p-6 md:p-8 w-full shadow-2xl hover:border-blue-500/30 transition-all duration-300"
                            >
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{exp.role}</h3>
                                    <span className="px-3 py-1 bg-[#1e293b] text-[#60a5fa] text-xs font-bold rounded-full border border-blue-500/20">{exp.period}</span>
                                </div>
                                <p className="text-blue-500 font-semibold mb-6 text-sm">{exp.company} • {exp.location}</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                        <span className="text-gray-300 text-sm font-medium leading-relaxed">{exp.description}</span>
                                    </li>
                                    {exp.achievements.length > 0 && (
                                        <li className="flex items-start gap-3 mt-4">
                                            <div className="flex gap-2 flex-wrap text-xs text-blue-300">
                                                {exp.achievements.map((ach, i) => (
                                                    <span key={i} className="bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-md">{ach}</span>
                                                ))}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Achievements & Participation */}
            <section className="py-24 px-4 max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Achievements */}
                    <div>
                        <h3 className="text-2xl font-extrabold text-white mb-8 tracking-tight">
                            <span className="text-[#eab308]">Achievements</span> & Awards
                        </h3>
                        <div className="space-y-4">
                            {AWARDS_DATA.map((award, idx) => (
                                <motion.div
                                    key={award.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-[#11131a] dark:bg-[#0f111a] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-5 hover:bg-[#151824] transition-colors shadow-lg"
                                >
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 sm:mt-1">
                                        <Trophy className="w-4 h-4 text-yellow-500" />
                                    </div>
                                    <div>
                                        <p className="text-gray-200 font-semibold text-sm leading-relaxed">
                                            {award.description}
                                        </p>
                                        <p className="text-yellow-500 text-xs font-bold mt-2">{award.year} • {award.title}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Participation */}
                    <div>
                        <h3 className="text-2xl font-extrabold text-white mb-8 tracking-tight">
                            <span className="text-[#10b981]">Participation</span> & Activities
                        </h3>
                        <div className="space-y-4">
                            {ACTIVITIES_DATA.map((activity, idx) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-[#11131a] dark:bg-[#0f111a] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-5 hover:bg-[#151824] transition-colors shadow-lg"
                                >
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 sm:mt-1">
                                        <Users className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-gray-200 font-semibold text-sm leading-relaxed">
                                            {activity.description}
                                        </p>
                                        <p className="text-emerald-500 text-xs font-bold mt-2">{activity.title}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
