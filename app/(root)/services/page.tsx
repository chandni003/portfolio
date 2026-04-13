"use client";

import React from "react";
import { PageWrapper } from "../../../../portfolio/components/PageWrapper";
import { motion } from "framer-motion";
import { Code2, Layout, Database, Bot, CheckCircle2 } from "lucide-react";

const SERVICES = [
  {
    title: "Full Stack Development",
    designation: "Senior Software Architect",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
    description: "Building robust, scalable end-to-end applications using the MERN stack and Next.js.",
    details: "Specializing in high-performance cloud architectures, database optimization, and real-time data synchronization. I lead the technical direction to ensure long-term scalability and security.",
    icon: Code2,
    gradient: "from-blue-600 to-indigo-600"
  },
  {
    title: "UI/UX Design & Frontend",
    designation: "Lead Product Designer",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=1000",
    description: "Creating stunning, highly interactive user interfaces with a focus on performance and accessibility.",
    details: "I focus on user-centric design principles, ensuring every interaction feels natural and intuitive. From wireframing to high-fidelity prototypes and React implementation.",
    icon: Layout,
    gradient: "from-purple-600 to-pink-600"
  },
  {
    title: "Backend Architecture",
    designation: "Systems & Security Lead",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=1000",
    description: "Designing efficient database schemas and REST/GraphQL APIs for high-availability systems.",
    details: "Expertise in Node.js, Express, and distributed systems. I ensure that your backend is not just fast, but resilient against heavy loads and potential security threats.",
    icon: Database,
    gradient: "from-emerald-600 to-teal-600"
  },
  {
    title: "AI & Automation",
    designation: "AI Workflow Specialist",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
    description: "Implementing cutting-edge LLMs and AI automation workflows into your existing digital products.",
    details: "Integrating Gemini AI and other advanced models to automate business processes, generate content, and provide intelligent data insights directly within your applications.",
    icon: Bot,
    gradient: "from-orange-600 to-amber-600"
  }
];

export default function ServicesPage() {
  return (
    <PageWrapper>
      {/* Services Hero */}
      <section className="pt-32 pb-16 px-4 text-center z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 dark:text-white"
          >
              Core <span className="text-blue-500">Offerings</span>
          </motion.h1>
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500 dark:text-neutral-400 font-medium"
          >
              Solutions That Scale.
          </motion.p>
          <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-16 h-1 bg-blue-500 mx-auto mt-6 rounded-full"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[48px] bg-white/40 dark:bg-black/20 backdrop-blur-3xl border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group flex flex-col"
            >
              {/* Image & Header */}
              <div className="relative h-64 rounded-[32px] overflow-hidden mb-8 border border-neutral-200 dark:border-neutral-800">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-6 left-6 p-4 rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-md border border-white/20 text-blue-600 shadow-lg">
                  <service.icon size={24} />
                </div>
              </div>

              {/* Title & Designation */}
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-3xl font-black dark:text-white uppercase tracking-tighter leading-none mb-2">
                      {service.title}
                    </h3>
                    <p className="text-blue-600 font-black tracking-widest uppercase text-xs">
                      {service.designation}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-neutral-600 dark:text-white/80 font-bold leading-relaxed mb-6">
                  {service.description}
                </p>

                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-8">
                  {service.details}
                </p>

                {/* Capability Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Premium Execution", "Scalable Tech Stack", "Modern UI/UX", "Fast Delivery"].map((cap) => (
                    <div key={cap} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                      <CheckCircle2 size={14} className="text-blue-500" />
                      {cap}
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Decorative Element */}
              <div className="absolute top-0 right-0 -z-0 w-48 h-48 bg-blue-600/5 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
