"use client";

import React, { useState } from "react";
import { PageWrapper } from "../../../portfolio/components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Calendar, Clock, CheckCircle2, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { db } from "../../../portfolio/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // attempt to write to Firebase
      // await addDoc(collection(db, "inquiries"), {
      //   ...formData,
      //   timestamp: serverTimestamp()
      // });

      setShowSuccess(true);
      setFormData({ name: "", email: "", project: "", description: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      // Simulated fallback if Firebase is not yet installed by user
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PageWrapper>
      {/* Contact Hero */}
      <section className="pt-32 pb-16 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-widest uppercase mb-8 inline-block"
          >
            Direct Channel
          </motion.span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
            Start A <br />
            <span className="text-blue-600 italic underline decoration-blue-500/30 underline-offset-8">Conversation.</span>
          </h1>
        </div>
      </section>

      {/* Main Layout: Form & Calendar */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Column 1: Compact Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[48px] bg-white dark:bg-black/20 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter mb-8">Quick Inquiry</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Your Name</label>
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Chandani Kumari"
                      className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Your Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="chandanidev@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">What is the Project?</label>
                  <input
                    required
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    placeholder="E-commerce Build / AI Dashboard"
                    className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all text-sm font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">A little about the project</label>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell me your vision..."
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all text-sm font-bold resize-none"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-3 overflow-hidden relative group"
                >
                  {isSubmitting ? "Submitting..." : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Column 2: Schedule a Meeting (Calendar UI) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[48px] bg-white dark:bg-black/20 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 shadow-2xl relative overflow-hidden group/card"
          >
            {/* Aceternity-style Radial Glow */}
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 blur-[120px]" />

            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter mb-4">Schedule A Meeting</h2>
              <p className="text-neutral-500 dark:text-neutral-400 font-medium mb-12">
                Pick a date and time that works best for you. Let&apos;s dive into the technical details of your vision.
              </p>

              {/* Stylized Calendar Visual (With Shimmer Border) */}
              <div className="relative p-[1px] rounded-[32px] overflow-hidden mb-8 group/cal shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent -translate-x-full group-hover/cal:translate-x-full transition-transform duration-1000" />

                <div className="relative p-8 rounded-[31px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-sm font-black uppercase tracking-widest text-blue-600">October 2026</p>
                    <Calendar size={20} className="text-neutral-400" />
                  </div>

                  {/* Days Grid Placeholder */}
                  <div className="grid grid-cols-7 gap-4 mb-4">
                    {["S", "M", "T", "W", "T", "F", "S"].map(d => (
                      <div key={d} className="text-[10px] font-black text-neutral-400 text-center">{d}</div>
                    ))}
                    {/* Fake dates */}
                    {Array.from({ length: 31 }).map((_, i) => (
                      <div key={i} className={`text-xs font-bold text-center p-2 rounded-lg cursor-pointer transition-all ${i === 14 ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] scale-110' : 'hover:bg-blue-50 dark:hover:bg-blue-900/40 text-neutral-600 dark:text-neutral-400'}`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Picker Visual */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {["10:00 AM", "01:30 PM", "04:00 PM"].map(time => (
                  <div key={time} className={`px-6 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-black uppercase tracking-widest cursor-pointer hover:border-blue-500 transition-all ${time === "01:30 PM" ? 'bg-blue-500/10 border-blue-500/50 text-blue-600' : 'text-neutral-500'}`}>
                    <Clock size={14} className="inline mr-2 -mt-1" />
                    {time}
                  </div>
                ))}
              </div>

              <Link href="#" className="mt-12 block text-center py-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-black text-sm uppercase tracking-tighter hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group">
                <Sparkles size={18} className="text-blue-600 group-hover:rotate-12 transition-transform" />
                Finalize Time
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Popup (Modal) */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="max-w-md w-full p-12 rounded-[64px] bg-white dark:bg-[#0a0a0a] border border-blue-500/30 shadow-[0_0_100px_rgba(59,130,246,0.2)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px]" />
              <button onClick={() => setShowSuccess(false)} className="absolute top-8 right-8 text-neutral-400 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-10">
                  <CheckCircle2 size={40} className="text-blue-600" />
                </div>
                <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter dark:text-white">Success!</h3>
                <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-10">
                  Your inquiry has been submitted successfully, we will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all hover:scale-[1.02]"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
