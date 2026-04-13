"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Mail, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { subscribeToCollection, COLLECTIONS, updateDocument, deleteDocument } from "../../../../lib/firestore";

export default function SchedulesManager() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  useEffect(() => {
    const unsub = subscribeToCollection(COLLECTIONS.MEETINGS, (data) => {
      setMeetings(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateDocument(COLLECTIONS.MEETINGS, id, { status: newStatus });
    } catch (error) {
      console.error("Error updating meeting status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this meeting permanently?")) {
      try {
        await deleteDocument(COLLECTIONS.MEETINGS, id);
      } catch (error) {
        console.error("Error deleting meeting:", error);
      }
    }
  };

  const filtered = meetings.filter(m => filter === "all" || m.status === filter);
  const pendingCount = meetings.filter(m => m.status === "pending").length;
  const confirmedCount = meetings.filter(m => m.status === "confirmed").length;

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      confirmed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return map[status] || "bg-neutral-100 text-neutral-500";
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter">
            Meeting <span className="text-blue-600">Schedules</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mt-1">
            Manage your appointments and consultation requests.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-amber-500/10 text-amber-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
            {pendingCount} Pending
          </div>
          <div className="px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
            {confirmedCount} Confirmed
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 p-4 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl">
        {(["all", "pending", "confirmed", "cancelled"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all
              ${filter === f
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-neutral-50 dark:bg-neutral-900 text-neutral-500 border border-neutral-200 dark:border-neutral-800 hover:border-blue-500 hover:text-blue-600"
              }`}
          >
            {f === "all" ? `All (${meetings.length})` : `${f} (${meetings.filter(m => m.status === f).length})`}
          </button>
        ))}
      </div>

      {/* Meetings List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-[32px] bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
          ))
        ) : filtered.length === 0 ? (
          <div className="p-20 text-center bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[48px]">
            <Calendar size={48} className="mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
            <p className="text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-widest text-sm">
              {filter === "all" ? "No meetings scheduled yet." : `No ${filter} meetings.`}
            </p>
          </div>
        ) : (
          filtered.map((meeting, idx) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-6 group"
            >
              {/* Date block */}
              <div className="flex flex-col items-center justify-center px-6 py-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl min-w-[90px] text-center shrink-0">
                <Calendar size={16} className="text-blue-600 mb-1" />
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 leading-none">
                  {meeting.date || "—"}
                </p>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-lg font-black dark:text-white uppercase tracking-tighter truncate">
                    {meeting.name || "Unknown"}
                  </h3>
                  <span className={`px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${statusBadge(meeting.status)}`}>
                    {meeting.status || "pending"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
                    <Clock size={13} className="text-blue-500" />
                    {meeting.time || "—"}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-500">
                    <Mail size={13} className="text-blue-500" />
                    {meeting.email || "—"}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                {meeting.status !== "confirmed" && (
                  <button
                    onClick={() => handleStatusUpdate(meeting.id, "confirmed")}
                    className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl hover:bg-emerald-500/20 transition-all"
                    title="Confirm Meeting"
                  >
                    <CheckCircle2 size={18} />
                  </button>
                )}
                {meeting.status !== "cancelled" && (
                  <button
                    onClick={() => handleStatusUpdate(meeting.id, "cancelled")}
                    className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20 transition-all"
                    title="Cancel Meeting"
                  >
                    <XCircle size={18} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(meeting.id)}
                  className="p-3 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
