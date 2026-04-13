"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Mail, MessageSquare, CheckCircle2, XCircle, Search } from "lucide-react";
import { getAllDocuments, COLLECTIONS, updateDocument } from "../../../../lib/firestore";

export default function SchedulesManager() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await getAllDocuments(COLLECTIONS.SCHEDULES);
      setSchedules(data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateDocument(COLLECTIONS.SCHEDULES, id, { status: newStatus });
      fetchSchedules();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter">
            Meeting <span className="text-blue-600">Schedules</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mt-1">
            Manage your appointments and project consultations.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                12 Upcoming
            </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 rounded-[32px] bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
          ))
        ) : schedules.length === 0 ? (
          <div className="p-20 text-center bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[48px]">
             <Calendar size={48} className="mx-auto text-neutral-300 mb-4" />
             <p className="text-neutral-500 font-bold">No meetings scheduled yet.</p>
          </div>
        ) : (
          schedules.map((meeting, idx) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-8 group"
            >
              <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl min-w-[100px]">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">{meeting.date?.split(' ')[0]}</p>
                <p className="text-2xl font-black dark:text-white leading-none">{meeting.date?.split(' ')[1]}</p>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter truncate">{meeting.clientName}</h3>
                    <span className={`px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${meeting.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                        {meeting.status}
                    </span>
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
                        <Clock size={14} className="text-blue-500" />
                        {meeting.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
                        <Mail size={14} className="text-blue-500" />
                        {meeting.clientEmail}
                    </div>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleStatusUpdate(meeting.id, 'confirmed')}
                  className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl hover:bg-emerald-500/20 transition-all"
                  title="Confirm Meeting"
                >
                  <CheckCircle2 size={20} />
                </button>
                <button 
                  onClick={() => handleStatusUpdate(meeting.id, 'cancelled')}
                  className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20 transition-all"
                  title="Cancel Meeting"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
