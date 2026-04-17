"use client";

import React from "react";
import { PageWrapper } from "../../../components/PageWrapper";
import { AboutSection } from "../../../components/AboutSection";
import { ContactSection } from "../../../components/ContactSection";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Intro Section with Image */}
      <section className="pt-40 pb-16 px-4 z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold mb-4 dark:text-white"
            >
              Know <span className="text-blue-500">About Me</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-neutral-500 dark:text-neutral-400 font-medium mb-8"
            >
              The Story Behind The Code.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="w-16 h-1 bg-blue-500 mx-auto lg:mx-0 mb-8 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0"
            >
              <p>
                I&apos;m Chandani Kumari, a passionate full-stack developer dedicated to building high-performance, scalable web applications. My journey in tech is driven by a deep curiosity to solve complex problems and craft elegant digital experiences that leave a lasting impact.
              </p>
              <p className="text-neutral-500 dark:text-neutral-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed mt-4">
                My development philosophy hinges on the triad of performance, scalability, and user experience.
                I engineer reliable digital solutions that empower businesses to thrive in a competitive landscape,
                combining aesthetic precision with robust architectural foundations.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 relative w-full max-w-sm aspect-[4/5] rounded-[48px] overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl group"
          >
            <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img
              src="/images/Snapchat-1676392261.jpg"
              alt="Chandani Kumari - Intro Portrait"
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </section>

      {/* Expanding the Journey - Expertise */}
      <section className="py-24 px-4 bg-white/5 dark:bg-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-black mb-8 uppercase tracking-tighter">
              A Journey of <span className="text-blue-600">Continuous Growth.</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium mb-6">
              Over the years, I&apos;ve transitioned from crafting simple, static front-ends to architecting complex, data-driven systems. My approach is holistic: I believe that writing clean code is just as important as producing an intuitive user interface.
            </p>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium mb-8">
              By embracing modern frameworks like Next.js and robust backends utilizing Node.js and MongoDB, I ensure the products I build are not only visually striking but technically sound. I constantly explore emerging technologies, particularly AI automation and advanced UI/UX patterns, to stay ahead of the curve.
            </p>
            <div className="flex flex-wrap gap-4">
              {['MERN Stack', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'REST/GraphQL'].map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black tracking-widest uppercase border border-blue-100 dark:border-blue-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="p-8 rounded-[32px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center shadow-lg">
                <h3 className="text-4xl font-black text-blue-600 mb-2">6</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">months Exp.</p>
              </div>
              <div className="p-8 rounded-[32px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center shadow-lg">
                <h3 className="text-4xl font-black text-blue-600 mb-2">15+</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Projects</p>
              </div>
            </div>
            <div className="space-y-6 mt-12">
              <div className="p-8 rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-center shadow-lg shadow-blue-500/20">
                <h3 className="text-4xl font-black mb-2">100%</h3>
                <p className="text-xs font-bold uppercase tracking-widest text-white/80">Commitment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <AboutSection />

      {/* Philosophy Section */}
      <section className="py-32 px-4 bg-neutral-50 dark:bg-black/20 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-12 uppercase tracking-tighter dark:text-white">Professional <span className="text-blue-600">Philosophy</span></h2>

          <div className="p-12 rounded-[48px] border border-blue-500/20 bg-blue-500/5 backdrop-blur-3xl relative">
            <div className="absolute -top-6 -left-6 text-6xl text-blue-600/20 font-black">&quot;</div>
            <p className="text-xl md:text-3xl text-neutral-600 dark:text-white/90 leading-relaxed font-bold italic tracking-tight">
              I believe that code is an art form. Every pixel, every function, and every database query should be crafted with the same precision as a master&apos;s painting.
            </p>
            <div className="absolute -bottom-12 -right-6 text-6xl text-blue-600/20 font-black">&quot;</div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
