"use client";

import { Download } from "lucide-react";

export const ResumeDownloadButton = () => {
  const handleDownload = () => {
    // Replace YOUR_FILE_ID with your actual Google Drive file ID
    const googleDriveDownloadUrl = "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID";
    window.open(googleDriveDownloadUrl, "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="group px-8 py-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-bold text-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
    >
      Download CV
      <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
    </button>
  );
};