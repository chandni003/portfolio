"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Trash2, Download, ExternalLink, CheckCircle2, AlertCircle, Loader2, Users, Clock, TrendingUp, Cloud, HardDrive, Star } from "lucide-react";
import { getResumeURL } from "../../../../lib/storage";
import { subscribeToCollection, COLLECTIONS } from "../../../../lib/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { serverTimestamp } from "firebase/firestore";

export default function ResumeManager() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [driveUrl, setDriveUrl] = useState<string>("");
  const [activeSource, setActiveSource] = useState<"imagekit" | "drive" | null>(null);
  
  const [savingDrive, setSavingDrive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletingUploaded, setDeletingUploaded] = useState(false);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loadingDownloads, setLoadingDownloads] = useState(true);
  const [toast, setToast] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch current resume metadata + download history
  useEffect(() => {
    getDoc(doc(db, COLLECTIONS.RESUME_META, "current")).then(snap => {
      if (snap.exists()) {
        const data = snap.data();
        setUploadedUrl(data.url || null);
        setDriveUrl(data.driveURL || "");
        setActiveSource(data.activeSource || null);
      }
    });

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

  const handleSetActive = async (source: "imagekit" | "drive") => {
    try {
      await setDoc(doc(db, COLLECTIONS.RESUME_META, "current"), {
        activeSource: source,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      setActiveSource(source);
      showToast("success", `Active resume updated to ${source === 'drive' ? 'Google Drive' : 'Uploaded File'}!`);
    } catch (err) {
      showToast("error", "Failed to update active resume.");
    }
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
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => (prev < 90 ? prev + 10 : prev));
      }, 500);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/imagekit/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const url = data.url;
      const fileId = data.fileId;
      
      const newActiveSource = activeSource || "imagekit";

      await setDoc(doc(db, COLLECTIONS.RESUME_META, "current"), {
        url,
        fileId,
        filename: file.name,
        activeSource: newActiveSource,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      
      setUploadedUrl(url);
      setActiveSource(newActiveSource);
      showToast("success", "Resume uploaded successfully!");
    } catch (err) {
      showToast("error", "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSaveDriveLink = async () => {
    setSavingDrive(true);
    try {
      const newActiveSource = activeSource || "drive";
      await setDoc(doc(db, COLLECTIONS.RESUME_META, "current"), {
        driveURL: driveUrl.trim(),
        activeSource: newActiveSource,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      
      setActiveSource(newActiveSource);
      showToast("success", "Google Drive link saved!");
    } catch {
      showToast("error", "Failed to save link.");
    } finally {
      setSavingDrive(false);
    }
  };

  const handleDeleteUploaded = async () => {
    if (!confirm("Delete the uploaded resume?")) return;
    setDeletingUploaded(true);
    try {
      const snap = await getDoc(doc(db, COLLECTIONS.RESUME_META, "current"));
      const fileId = snap.exists() ? snap.data().fileId : null;
      if (fileId) {
        await fetch("/api/imagekit/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId })
        });
      }

      const newActiveSource = activeSource === "imagekit" ? (driveUrl ? "drive" : null) : activeSource;

      await setDoc(doc(db, COLLECTIONS.RESUME_META, "current"), { 
        url: null, 
        fileId: null, 
        activeSource: newActiveSource,
        updatedAt: serverTimestamp() 
      }, { merge: true });
      
      setUploadedUrl(null);
      setActiveSource(newActiveSource);
      showToast("success", "Uploaded resume deleted.");
    } catch {
      showToast("error", "Failed to delete uploaded resume.");
    } finally {
      setDeletingUploaded(false);
    }
  };

  const handleClearDrive = async () => {
    if (!confirm("Clear the Google Drive link?")) return;
    try {
      const newActiveSource = activeSource === "drive" ? (uploadedUrl ? "imagekit" : null) : activeSource;

      await setDoc(doc(db, COLLECTIONS.RESUME_META, "current"), { 
        driveURL: null, 
        activeSource: newActiveSource,
        updatedAt: serverTimestamp() 
      }, { merge: true });
      
      setDriveUrl("");
      setActiveSource(newActiveSource);
      showToast("success", "Drive link cleared.");
    } catch {
      showToast("error", "Failed to clear drive link.");
    }
  };

  const todayCount = downloads.filter(d => {
    const today = new Date();
    const dl = d.downloadedAt?.toDate?.() || new Date(d.downloadedAt);
    return dl.toDateString() === today.toDateString();
  }).length;

  let drivePreviewUrl: string | null = null;
  if (driveUrl) {
    if (driveUrl.includes("drive.google.com/file/d/")) {
      const match = driveUrl.match(/\/d\/([^/]+)/);
      if (match && match[1]) {
        drivePreviewUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    } else if (driveUrl.includes("docs.google.com/document/d/")) {
      const match = driveUrl.match(/\/d\/([^/]+)/);
      if (match && match[1]) {
        drivePreviewUrl = `https://docs.google.com/document/d/${match[1]}/preview`;
      }
    } else {
      drivePreviewUrl = driveUrl; // fallback
    }
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter">
          Resume <span className="text-blue-600">Manager</span>
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mt-1">
          Manage multiple resume sources and track downloads.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Downloads", value: downloads.length, icon: Download, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Today", value: todayCount, icon: Clock, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Active Source", value: activeSource === "imagekit" ? "Uploaded" : (activeSource === "drive" ? "Google Drive" : "None"), icon: Star, color: activeSource ? "text-amber-500" : "text-red-500", bg: activeSource ? "bg-amber-500/10" : "bg-red-500/10" },
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

      {/* Dual Upload Zones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Source 1: Direct Upload */}
        <div className={`p-8 backdrop-blur-xl border-2 rounded-[40px] shadow-sm space-y-6 transition-all ${activeSource === 'imagekit' ? 'bg-blue-500/5 border-blue-500/30' : 'bg-white dark:bg-black/20 border-neutral-200 dark:border-neutral-800'}`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cloud size={20} className={activeSource === 'imagekit' ? 'text-blue-500' : 'text-neutral-400'} />
                <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter">Direct Upload</h2>
              </div>
              <p className="text-xs text-neutral-500">Upload a PDF directly to ImageKit.</p>
            </div>
            {uploadedUrl && (
              <button 
                onClick={() => handleSetActive('imagekit')}
                disabled={activeSource === 'imagekit'}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSource === 'imagekit' ? 'bg-blue-600 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
              >
                {activeSource === 'imagekit' ? 'Active Source' : 'Set Active'}
              </button>
            )}
          </div>

          {uploadedUrl ? (
            <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <FileText size={24} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black dark:text-white text-sm truncate">Uploaded Resume (PDF)</p>
              </div>
              <div className="flex gap-2">
                <a href={uploadedUrl} target="_blank" rel="noopener noreferrer"
                  className="p-3 bg-neutral-200/50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all"
                  title="Preview in browser"
                >
                  <ExternalLink size={16} />
                </a>
                <button onClick={handleDeleteUploaded} disabled={deletingUploaded}
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all disabled:opacity-50"
                  title="Remove uploaded resume"
                >
                  {deletingUploaded ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-3xl flex items-center gap-3">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400">No direct upload available.</p>
            </div>
          )}

          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all cursor-pointer
              ${uploading ? "border-blue-500 bg-blue-500/5" : "border-neutral-300 dark:border-neutral-700 hover:border-blue-500 hover:bg-blue-500/5"}`}
          >
            <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
            {uploading ? (
              <div className="space-y-3">
                <Loader2 size={32} className="mx-auto text-blue-600 animate-spin" />
                <p className="text-xs font-black text-blue-600">Uploading... {uploadProgress}%</p>
                <div className="w-full max-w-[200px] mx-auto h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-blue-600 rounded-full" animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} />
                </div>
              </div>
            ) : (
              <>
                <Upload size={32} className="mx-auto text-neutral-400 mb-3" />
                <p className="text-sm font-black dark:text-white mb-1">{uploadedUrl ? "Replace File" : "Upload New PDF"}</p>
              </>
            )}
          </div>

          {uploadedUrl && (
            <div className="w-full h-[400px] mt-6 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
              <iframe src={uploadedUrl} className="w-full h-full" title="ImageKit Preview" />
            </div>
          )}
        </div>

        {/* Source 2: Google Drive */}
        <div className={`p-8 backdrop-blur-xl border-2 rounded-[40px] shadow-sm space-y-6 transition-all ${activeSource === 'drive' ? 'bg-amber-500/5 border-amber-500/30' : 'bg-white dark:bg-black/20 border-neutral-200 dark:border-neutral-800'}`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <HardDrive size={20} className={activeSource === 'drive' ? 'text-amber-500' : 'text-neutral-400'} />
                <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter">Google Drive</h2>
              </div>
              <p className="text-xs text-neutral-500">Link a Google Drive or Docs file.</p>
            </div>
            {driveUrl && (
              <button 
                onClick={() => handleSetActive('drive')}
                disabled={activeSource === 'drive'}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSource === 'drive' ? 'bg-amber-500 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700'}`}
              >
                {activeSource === 'drive' ? 'Active Source' : 'Set Active'}
              </button>
            )}
          </div>

          {driveUrl ? (
            <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <FileText size={24} className="text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black dark:text-white text-sm truncate">Drive Resume Link</p>
              </div>
              <div className="flex gap-2">
                <a href={driveUrl} target="_blank" rel="noopener noreferrer"
                  className="p-3 bg-neutral-200/50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-xl hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-all"
                  title="Preview in browser"
                >
                  <ExternalLink size={16} />
                </a>
                <button onClick={handleClearDrive}
                  className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all"
                  title="Clear Drive link"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-3xl flex items-center gap-3">
              <AlertCircle size={18} className="text-red-500 shrink-0" />
              <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400">No Drive link saved.</p>
            </div>
          )}
               <div className="flex gap-2">
            <input 
              value={driveUrl}
              onChange={(e) => setDriveUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="flex-1 px-5 py-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-amber-500 outline-none transition-all text-xs font-bold dark:text-white"
            />
            <button 
              onClick={handleSaveDriveLink}
              disabled={savingDrive || !driveUrl}
              className="px-6 py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {savingDrive ? <Loader2 size={16} className="animate-spin" /> : "Save"}
            </button>
          </div>

          {drivePreviewUrl && (
            <div className="w-full h-[400px] mt-6 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
              <iframe src={drivePreviewUrl} className="w-full h-full" title="Drive Preview" />
            </div>
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
