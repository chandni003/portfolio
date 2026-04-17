"use client";

import React, { useState, useEffect } from "react";
import { Download, Loader2 } from "lucide-react";
import { getResumeURL } from "../lib/storage";
import { trackResumeDownload } from "../lib/firestore";

export const ResumeDownloadButton = () => {
  const [resumeURL, setResumeURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    getResumeURL().then(url => {
      setResumeURL(url);
      setLoading(false);
    });
  }, []);

  const handleDownload = async () => {
    if (!resumeURL || downloading) return;
    setDownloading(true);

    // Track the download in Firestore (fire & forget)
    trackResumeDownload({
      userAgent: navigator.userAgent,
      referrer: document.referrer || "direct",
    }).catch(() => {});

    // Open/Download the URL
    window.open(resumeURL, "_blank");

    setTimeout(() => setDownloading(false), 2000);
  };

  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-400 text-sm font-bold">
        <Loader2 size={18} className="animate-spin" />
        Loading...
      </div>
    );
  }

  if (!resumeURL) return null;

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="group px-8 py-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-bold text-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {downloading ? (
        <><Loader2 size={18} className="animate-spin" /> Processing...</>
      ) : (
        <>
          Download CV
          <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
        </>
      )}
    </button>
  );
};