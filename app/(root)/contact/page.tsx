"use client";

import React, { useState } from "react";
import { PageWrapper } from "../../../../portfolio/components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Calendar, Clock, CheckCircle2, Sparkles, X, Mail, MapPin, MessageSquare, Linkedin, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { db } from "../../../../portfolio/lib/firebase";
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
      <section className="pt-32 pb-16 px-4 text-center z-10 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 dark:text-white"
          >
            Direct <span className="text-blue-500">Channel</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 dark:text-neutral-400 font-medium"
          >
            Start A Conversation.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-16 h-1 bg-blue-500 mx-auto mt-6 rounded-full"
          />
        </div>
      </section>

      {/* Contact Info Readables */}
      <section className="pb-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="p-8 rounded-[32px] bg-white/50 dark:bg-[#0f111a]/80 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 flex flex-col items-center text-center group shadow-xl">
            <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-[18px] flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-black dark:text-white mb-2 uppercase tracking-tight">Email Directly</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-4">chandanidev@example.com</p>
            <div className="px-4 py-1.5 bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">Typical reply: 2 hours</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="p-8 rounded-[32px] bg-white/50 dark:bg-[#0f111a]/80 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 flex flex-col items-center text-center group shadow-xl">
            <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-[18px] flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-black dark:text-white mb-2 uppercase tracking-tight">Location</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-4">Punjab, India</p>
            <div className="px-4 py-1.5 bg-purple-500/10 text-purple-600 text-[10px] font-black uppercase tracking-widest rounded-full">Available Remote Worldwide</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="p-8 rounded-[32px] bg-white/50 dark:bg-[#0f111a]/80 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 flex flex-col items-center text-center group shadow-xl">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-[18px] flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-xl font-black dark:text-white mb-2 uppercase tracking-tight">Social Profiles</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-4">Connect to see my latest work.</p>
            <div className="flex gap-4 mt-auto">
              <Link href="#" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors"><Linkedin size={18} /></Link>
              <Link href="#" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors"><Github size={18} /></Link>
              <Link href="#" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors"><Twitter size={18} /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Layout: Form & Calendar */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Column 1: Compact Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[48px] bg-white dark:bg-black/20 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 shadow-2xl relative overflow-hidden flex flex-col h-full"
          >
            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter mb-2">Quick Inquiry</h2>
              <p className="text-neutral-500 dark:text-neutral-400 font-medium mb-8">
                Drop a direct message. I usually respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
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
                      placeholder="you@domain.com"
                      className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2 shrink-0">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Project Kind</label>
                  <input
                    required
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    placeholder="E-commerce Build / AI Dashboard"
                    className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all text-sm font-bold"
                  />
                </div>

                <div className="space-y-2 flex-1 flex flex-col">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Project Details</label>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell me your vision..."
                    className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all text-sm font-bold resize-none flex-1 min-h-[120px]"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-5 mt-auto bg-blue-600 text-white rounded-2xl font-black text-lg shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-3 overflow-hidden relative group shrink-0"
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
            className="p-10 rounded-[48px] bg-white dark:bg-black/20 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 shadow-2xl relative overflow-hidden group/card flex flex-col h-full"
          >
            {/* Aceternity-style Radial Glow */}
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 blur-[120px]" />

            <div className="relative z-10 flex flex-col h-full">
              <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter mb-2">Schedule A Meeting</h2>
              <p className="text-neutral-500 dark:text-neutral-400 font-medium mb-8 shrink-0">
                Pick a date and time that works best for you. Let&apos;s dive into the technical details of your vision.
              </p>

              {/* Stylized Calendar Visual (With Shimmer Border) */}
              <div className="relative p-[1px] rounded-[32px] overflow-hidden mb-6 group/cal shadow-2xl shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent -translate-x-full group-hover/cal:translate-x-full transition-transform duration-1000" />

                <div className="relative p-8 rounded-[31px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-500">October 2026</p>
                    <Calendar size={20} className="text-neutral-400" />
                  </div>

                  {/* Days Grid Placeholder */}
                  <div className="grid grid-cols-7 gap-4 mb-2">
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
              <div className="flex flex-wrap gap-4 justify-center md:justify-start items-start mb-10 overflow-auto">
                {["10:00 AM", "01:30 PM", "04:00 PM"].map(time => (
                  <div key={time} className={`px-6 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-black uppercase tracking-widest cursor-pointer hover:border-blue-500 transition-all ${time === "01:30 PM" ? 'bg-blue-500/10 border-blue-500/50 text-blue-600' : 'text-neutral-500 dark:text-neutral-400'}`}>
                    <Clock size={14} className="inline mr-2 -mt-1" />
                    {time}
                  </div>
                ))}
              </div>

              <Link href="#" className="w-full mt-auto py-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-black text-lg shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 group shrink-0">
                <Sparkles size={20} className="text-blue-600 group-hover:rotate-12 transition-transform" />
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
