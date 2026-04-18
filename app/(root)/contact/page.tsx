"use client";

import React, { useState, useMemo } from "react";
import { PageWrapper } from "../../../../portfolio/components/PageWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Calendar, Clock, CheckCircle2, Sparkles, X, Mail, MapPin, MessageSquare, Linkedin, Github, Twitter, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { addDocument, COLLECTIONS, getMeetingsByEmail } from "../../../../portfolio/lib/firestore";
import { serverTimestamp } from "firebase/firestore";

const TIME_SLOTS = ["09:00 AM", "10:30 AM", "12:00 PM", "12:45 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:30"];

function MiniCalendar({
  selectedDate,
  onSelect
}: {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const monthStart = useMemo(() => new Date(viewYear, viewMonth, 1), [viewYear, viewMonth]);
  const daysInMonth = useMemo(() => new Date(viewYear, viewMonth + 1, 0).getDate(), [viewYear, viewMonth]);
  const startDay = monthStart.getDay();

  const monthLabel = monthStart.toLocaleString("default", { month: "long", year: "numeric" });

  const prev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const next = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isToday = (d: number) => {
    const t = new Date();
    return d === t.getDate() && viewMonth === t.getMonth() && viewYear === t.getFullYear();
  };
  const isSelected = (d: number) => {
    if (!selectedDate) return false;
    return d === selectedDate.getDate() && viewMonth === selectedDate.getMonth() && viewYear === selectedDate.getFullYear();
  };
  const isPast = (d: number) => new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="p-5 rounded-[28px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-5">
        <button onClick={prev} className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all">
          <ChevronLeft size={16} className="text-neutral-500" />
        </button>
        <p className="text-sm font-black uppercase tracking-widest text-blue-600">{monthLabel}</p>
        <button onClick={next} className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all">
          <ChevronRight size={16} className="text-neutral-500" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-[9px] font-black text-neutral-400 text-center py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: startDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const past = isPast(d);
          const sel = isSelected(d);
          const tod = isToday(d);
          return (
            <button
              key={d}
              disabled={past}
              onClick={() => onSelect(new Date(viewYear, viewMonth, d))}
              className={[
                "text-xs font-bold text-center p-2 rounded-lg transition-all",
                past ? "text-neutral-300 dark:text-neutral-700 cursor-not-allowed" : "cursor-pointer",
                sel ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-110" : "",
                !sel && tod ? "border border-blue-500 text-blue-600" : "",
                !sel && !past && !tod ? "hover:bg-blue-50 dark:hover:bg-blue-900/30 text-neutral-600 dark:text-neutral-400" : "",
              ].join(" ")}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ContactPage() {
  // Contact form state
  const [formData, setFormData] = useState({ name: "", email: "", project: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Meeting scheduler state
  const [meetingForm, setMeetingForm] = useState({ name: "", email: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [showMeetingSuccess, setShowMeetingSuccess] = useState(false);

  // Status check state
  const [statusEmail, setStatusEmail] = useState("");
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [checkedMeetings, setCheckedMeetings] = useState<any[]>([]);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [hasCheckedStatus, setHasCheckedStatus] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDocument(COLLECTIONS.INQUIRIES, {
        ...formData,
        read: false,
        timestamp: serverTimestamp()
      });
      setShowSuccess(true);
      setFormData({ name: "", email: "", project: "", description: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookMeeting = async () => {
    if (!selectedDate || !selectedTime || !meetingForm.name || !meetingForm.email) return;
    setIsBooking(true);
    try {
      await addDocument(COLLECTIONS.MEETINGS, {
        name: meetingForm.name,
        email: meetingForm.email,
        date: selectedDate.toLocaleDateString("en-GB"),
        time: selectedTime,
        status: "pending",
        timestamp: serverTimestamp()
      });
      setShowMeetingSuccess(true);
      setMeetingForm({ name: "", email: "" });
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error) {
      console.error("Error booking meeting:", error);
    } finally {
      setIsBooking(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!statusEmail) return;
    setIsCheckingStatus(true);
    setHasCheckedStatus(true);
    try {
      const results = await getMeetingsByEmail(statusEmail);
      setCheckedMeetings(results);
    } catch (error) {
      console.error("Error checking status:", error);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageWrapper>
        {/* Hero */}
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

        {/* Info Cards */}
        <section className="pb-16 px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="p-8 rounded-[32px] bg-white/50 dark:bg-[#0f111a]/80 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 flex flex-col items-center text-center group shadow-xl">
              <div className="w-14 h-14 bg-blue-500/10 text-blue-600 rounded-[18px] flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-black dark:text-white mb-2 uppercase tracking-tight">Email Directly</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-4">chandniofficial001@gmail.com</p>
              <div className="px-4 py-1.5 bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">Typical reply: 24 hours</div>
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
                <Link href="https://www.linkedin.com/in/chandani-kumari-c1003" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors"><Linkedin size={18} /></Link>
                <Link href="https://github.com/chandni003" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors"><Github size={18} /></Link>
                {/* <Link href="#" className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-colors"><Twitter size={18} /></Link> */}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main two-column layout */}
        <section className="pb-24 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

            {/* Column 1: Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[48px] bg-white dark:bg-black/20 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 shadow-2xl relative overflow-hidden flex flex-col"
            >
              <div className="relative z-10 flex flex-col flex-1">
                <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter mb-2">Quick Inquiry</h2>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium mb-8">
                  Drop a direct message. I usually respond within 24 hours.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Your Name</label>
                      <input required name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Your Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="you@domain.com" className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Project Kind</label>
                    <input required name="project" value={formData.project} onChange={handleInputChange} placeholder="E-commerce Build / AI Dashboard" className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white" />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Project Details</label>
                    <textarea required name="description" value={formData.description} onChange={handleInputChange} placeholder="Tell me your vision..." className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold resize-none flex-1 min-h-[120px] dark:text-white" />
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-[0_20px_50px_rgba(59,130,246,0.3)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-3 group disabled:opacity-70">
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

            {/* Column 2: Interactive Meeting Scheduler */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[48px] bg-white dark:bg-black/20 backdrop-blur-3xl border border-neutral-200 dark:border-white/5 shadow-2xl relative overflow-hidden group/card flex flex-col"
            >
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 blur-[120px]" />
              <div className="relative z-10 flex flex-col flex-1">
                <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter mb-2">Schedule A Meeting</h2>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium mb-6">
                  Pick a date and time that works for you.
                </p>

                {/* Interactive Calendar */}
                <div className="mb-5">
                  <MiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
                </div>

                {/* Time Slots */}
                <div className="mb-5">
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3 ml-1">Available Times</p>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={[
                          "px-3 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                          selectedTime === time
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30"
                            : "border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-blue-500 hover:text-blue-600"
                        ].join(" ")}
                      >
                        <Clock size={10} className="inline mr-1 -mt-0.5" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email for meeting */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Your Name</label>
                    <input value={meetingForm.name} onChange={e => setMeetingForm(p => ({ ...p, name: e.target.value }))} placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-xs font-bold dark:text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Email</label>
                    <input type="email" value={meetingForm.email} onChange={e => setMeetingForm(p => ({ ...p, email: e.target.value }))} placeholder="you@domain.com" className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-xs font-bold dark:text-white" />
                  </div>
                </div>

                {/* Selected summary */}
                {(selectedDate || selectedTime) && (
                  <div className="mb-4 px-4 py-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold text-blue-600 flex items-center gap-2">
                    <Calendar size={14} />
                    {selectedDate ? selectedDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Select a date"}
                    {selectedTime && <><span className="text-blue-400">•</span> {selectedTime}</>}
                  </div>
                )}

                <button
                  onClick={handleBookMeeting}
                  disabled={isBooking || !selectedDate || !selectedTime || !meetingForm.name || !meetingForm.email}
                  className="w-full mt-auto py-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-black text-sm shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group dark:text-white"
                >
                  <Sparkles size={20} className="text-blue-600 group-hover:text-white group-hover:rotate-12 transition-all" />
                  {isBooking ? "Booking..." : "Confirm Booking"}
                </button>

                <button
                  onClick={() => setShowStatusModal(true)}
                  className="w-full mt-4 py-3 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl font-bold text-xs uppercase tracking-widest text-neutral-500 hover:text-blue-600 hover:border-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Clock size={14} />
                  Check Meeting Status
                </button>
              </div>
            </motion.div>

          </div>
        </section>
      </PageWrapper>

      {/* ── Popups rendered OUTSIDE PageWrapper to escape overflow-hidden ── */}

      {/* Contact form success popup */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="max-w-md w-full p-12 rounded-[48px] bg-white dark:bg-[#0a0a0a] border border-blue-500/30 shadow-[0_0_100px_rgba(59,130,246,0.2)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px]" />
              <button onClick={() => setShowSuccess(false)} className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors">
                <X size={18} />
              </button>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} className="text-blue-600" />
                </div>
                <h3 className="text-3xl font-black mb-3 uppercase tracking-tighter dark:text-white">Sent!</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-8">
                  Your inquiry has been submitted. I&apos;ll get back to you within 24 hours.
                </p>
                <button onClick={() => setShowSuccess(false)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all hover:scale-[1.02]">
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meeting booked popup */}
      <AnimatePresence>
        {showMeetingSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="max-w-md w-full p-12 rounded-[48px] bg-white dark:bg-[#0a0a0a] border border-emerald-500/30 shadow-[0_0_100px_rgba(16,185,129,0.15)] text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 blur-[60px]" />
              <button onClick={() => setShowMeetingSuccess(false)} className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors">
                <X size={18} />
              </button>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-emerald-600/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Calendar size={40} className="text-emerald-600" />
                </div>
                <h3 className="text-3xl font-black mb-3 uppercase tracking-tighter dark:text-white">Booked!</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-8">
                  Your meeting has been scheduled. I&apos;ll confirm the details via email shortly.
                </p>
                <button onClick={() => setShowMeetingSuccess(false)} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all hover:scale-[1.02]">
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Check Status Modal */}
      <AnimatePresence>
        {showStatusModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="max-w-2xl w-full p-10 rounded-[48px] bg-white dark:bg-[#0a0a0a] border border-blue-500/20 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setHasCheckedStatus(false);
                  setCheckedMeetings([]);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 dark:bg-neutral-900 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="relative z-10 w-full">
                <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter dark:text-white">Track Booking</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium mb-8">Enter your email to check your meeting status.</p>

                <div className="flex gap-3 mb-10">
                  <input
                    type="email"
                    value={statusEmail}
                    onChange={e => setStatusEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="flex-1 px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white"
                  />
                  <button
                    onClick={handleCheckStatus}
                    disabled={isCheckingStatus || !statusEmail}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition-all disabled:opacity-50"
                  >
                    {isCheckingStatus ? "Checking..." : "Search"}
                  </button>
                </div>

                {hasCheckedStatus && (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {checkedMeetings.length === 0 ? (
                      <div className="text-center py-10 opacity-50">
                        <p className="font-bold uppercase tracking-widest text-xs text-neutral-500">No bookings found for this email.</p>
                      </div>
                    ) : (
                      checkedMeetings.map((m, i) => (
                        <div key={i} className="p-5 rounded-3xl bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{m.date} • {m.time}</p>
                            <div className="flex items-center gap-2">
                              <p className="font-black text-sm dark:text-white uppercase tracking-tight">{m.status}</p>
                              {m.status === "confirmed" && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                            </div>
                          </div>
                          {m.status === "confirmed" && (
                            <Link
                              href={`/meeting?id=${m.id}`}
                              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                            >
                              Join Call
                            </Link>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
