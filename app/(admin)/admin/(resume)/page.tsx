"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Trash2, Download, ExternalLink, CheckCircle2, AlertCircle, Loader2, Users, Clock, TrendingUp } from "lucide-react";
import { uploadResume, deleteResume, getResumeURL } from "../../../../lib/storage";
import { subscribeToCollection, updateDocument, COLLECTIONS, addDocument } from "../../../../lib/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { serverTimestamp } from "firebase/firestore";

export default function ResumeManager() {
  const [resumeURL, setResumeURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loadingDownloads, setLoadingDownloads] = useState(true);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current resume URL + download history
  useEffect(() => {
    getResumeURL().then(setResumeURL);

    const unsub = subscribeToCollection(COLLECTIONS.RESUME_DOWNLOADS, (data) => {
      setDownloads(data);
      setLoadingDownloads(false);
    });
    return () => unsub();
  }, []);

  const showToast = (type: "success" | "error", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      showToast("error", "Only PDF files are accepted.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast("error", "File must be under 10MB.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const url = await uploadResume(file, setUploadProgress);
      // Save the URL + upload timestamp to Firestore for reference
      await setDoc(doc(db, COLLECTIONS.RESUME_META, "current"), {
        url,
        filename: file.name,
        updatedAt: serverTimestamp(),
      });
      setResumeURL(url);
      showToast("success", "Resume uploaded successfully!");
    } catch (err) {
      showToast("error", "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!confirm("Remove the current resume? Users won't be able to download it until you upload a new one.")) return;
    setDeleting(true);
    try {
      await deleteResume();
      // Clear Firestore reference
      await setDoc(doc(db, COLLECTIONS.RESUME_META, "current"), { url: null, updatedAt: serverTimestamp() });
      setResumeURL(null);
      showToast("success", "Resume removed.");
    } catch {
      showToast("error", "Failed to delete resume.");
    } finally {
      setDeleting(false);
    }
  };

  const todayCount = downloads.filter(d => {
    const today = new Date();
    const dl = d.downloadedAt?.toDate?.() || new Date(d.downloadedAt);
    return dl.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter">
          Resume <span className="text-blue-600">Manager</span>
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mt-1">
          Upload your resume PDF and track who downloads it.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Downloads", value: downloads.length, icon: Download, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Today", value: todayCount, icon: Clock, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Resume Status", value: resumeURL ? "Active" : "Not Set", icon: FileText, color: resumeURL ? "text-emerald-500" : "text-red-500", bg: resumeURL ? "bg-emerald-500/10" : "bg-red-500/10" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[28px] shadow-sm"
          >
            <div className={`w-10 h-10 ${s.bg} rounded-2xl flex items-center justify-center mb-4`}>
              <s.icon size={18} className={s.color} />
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-[10px] font-black uppercase tracking-widest mb-1">{s.label}</p>
            <h3 className="text-2xl font-black dark:text-white">{s.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Upload Zone */}
      <div className="p-8 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[40px] shadow-sm space-y-6">
        <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter">Current Resume</h2>

        {resumeURL ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center shrink-0">
              <FileText size={28} className="text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black dark:text-white text-sm mb-0.5">Portfolio Resume (PDF)</p>
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle2 size={10} /> Live · Downloadable by visitors
              </p>
            </div>
            <div className="flex gap-2">
              <a href={resumeURL} target="_blank" rel="noopener noreferrer"
                className="p-3 bg-blue-500/10 text-blue-600 rounded-2xl hover:bg-blue-500/20 transition-all"
                title="Preview in browser"
              >
                <ExternalLink size={18} />
              </a>
              <button onClick={handleDelete} disabled={deleting}
                className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500/20 transition-all disabled:opacity-50"
                title="Remove resume"
              >
                {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-3xl flex items-center gap-4">
            <AlertCircle size={24} className="text-red-500 shrink-0" />
            <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
              No resume uploaded. Visitors will see a disabled download button on your portfolio.
            </p>
          </div>
        )}

        {/* Upload area */}
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all cursor-pointer
            ${uploading ? "border-blue-500 bg-blue-500/5" : "border-neutral-300 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-500/5"}`}
        >
          <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
          {uploading ? (
            <div className="space-y-4">
              <Loader2 size={40} className="mx-auto text-blue-600 animate-spin" />
              <p className="text-sm font-black text-blue-600">Uploading... {uploadProgress}%</p>
              <div className="w-full max-w-xs mx-auto h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div className="h-full bg-blue-600 rounded-full" animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} />
              </div>
            </div>
          ) : (
            <>
              <Upload size={40} className="mx-auto text-neutral-400 mb-4" />
              <p className="font-black dark:text-white mb-1">{resumeURL ? "Replace Resume" : "Upload Resume"}</p>
              <p className="text-xs text-neutral-500">Click to choose a PDF · Max 10MB</p>
            </>
          )}
        </div>
      </div>

      {/* Download Log */}
      <div className="p-8 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[40px] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={20} className="text-blue-600" />
          <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter">Download Log</h2>
          <span className="ml-auto px-3 py-1 bg-blue-500/10 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
            {downloads.length} total
          </span>
        </div>

        {loadingDownloads ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-900 animate-pulse" />)}
          </div>
        ) : downloads.length === 0 ? (
          <div className="py-16 text-center">
            <Users size={40} className="mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
            <p className="text-neutral-500 font-bold text-sm uppercase tracking-widest">No downloads yet.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {downloads.map((d, i) => {
              const dl = d.downloadedAt?.toDate?.() || new Date(d.downloadedAt);
              return (
                <motion.div key={d.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-4 px-5 py-3 bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Download size={14} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold dark:text-white truncate">{d.referrer || "Direct download"}</p>
                    <p className="text-[10px] text-neutral-400 font-bold truncate">{d.userAgent?.split(" ").slice(0, 3).join(" ") || "Unknown agent"}</p>
                  </div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest shrink-0">
                    {dl.toLocaleDateString()} {dl.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`fixed bottom-6 right-6 z-[300] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-black text-xs uppercase tracking-widest text-white
              ${toast.type === "success" ? "bg-emerald-600 shadow-emerald-500/20" : "bg-red-600 shadow-red-500/20"}`}
          >
            {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
