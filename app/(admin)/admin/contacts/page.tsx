"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mail, User, Clock, Trash2, CheckCircle2, Search, Filter } from "lucide-react";
import { getAllDocuments, COLLECTIONS, deleteDocument, updateDocument } from "../../../../lib/firestore";

export default function ContactsManager() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const data = await getAllDocuments(COLLECTIONS.INQUIRIES);
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this inquiry permanently?")) {
      try {
        await deleteDocument(COLLECTIONS.INQUIRIES, id);
        fetchInquiries();
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
      try {
          await updateDocument(COLLECTIONS.INQUIRIES, id, { read: !currentStatus });
          fetchInquiries();
      } catch (error) {
          console.error("Error updating status:", error);
      }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter">
            Inquiry <span className="text-blue-600">Inbox</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mt-1">
            Manage your project requests and direct messages.
          </p>
        </div>
        <div className="flex gap-2">
            <div className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">
                {inquiries.filter(i => !i.read).length} Unread
            </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search inquiries..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
          />
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 rounded-[32px] bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
          ))
        ) : inquiries.filter(i => i.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((inquiry, idx) => (
          <motion.div
            key={inquiry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-8 rounded-[40px] border transition-all duration-300 group ${inquiry.read ? 'bg-white/40 dark:bg-black/10 border-neutral-200 dark:border-neutral-800 opacity-60' : 'bg-white dark:bg-black/30 border-blue-500/30 shadow-xl shadow-blue-500/5'}`}
          >
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 ${inquiry.read ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-blue-500/10'}`}>
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter truncate">{inquiry.name}</h3>
                    <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">{inquiry.email}</p>
                  </div>
                </div>
                
                <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 mb-6">
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-2">Project: {inquiry.project}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium capitalize">
                        {inquiry.description}
                    </p>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Clock size={12} />
                    {inquiry.timestamp?.toDate ? inquiry.timestamp.toDate().toLocaleString() : "Recently"}
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2">
                <button 
                  onClick={() => handleToggleRead(inquiry.id, inquiry.read)}
                  className={`p-3 rounded-2xl transition-all ${inquiry.read ? 'text-neutral-400 hover:text-blue-600' : 'text-blue-600 bg-blue-500/10 hover:bg-blue-500/20'}`}
                  title={inquiry.read ? "Mark as unread" : "Mark as read"}
                >
                  <CheckCircle2 size={24} />
                </button>
                <button 
                  onClick={() => handleDelete(inquiry.id)}
                  className="p-3 text-neutral-400 hover:text-red-500 transition-all"
                  title="Delete inquiry"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
