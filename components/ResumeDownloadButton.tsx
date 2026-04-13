// "use client";

// import React, { useState, useEffect } from "react";
// import { Download, FileText, Loader2 } from "lucide-react";
// import { getResumeURL } from "../lib/storage";
// import { trackResumeDownload } from "../lib/firestore";

// interface ResumeDownloadButtonProps {
//   variant?: "primary" | "outline";
//   className?: string;
// }

// export const ResumeDownloadButton = ({ variant = "outline", className = "" }: ResumeDownloadButtonProps) => {
//   const [resumeURL, setResumeURL] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     getResumeURL().then(url => {
//       setResumeURL(url);
//       setLoading(false);
//     });
//   }, []);

//   const handleDownload = async () => {
//     if (!resumeURL || downloading) return;
//     setDownloading(true);

//     // Track the download in Firestore (fire & forget)
//     trackResumeDownload({
//       userAgent: navigator.userAgent,
//       referrer: document.referrer || "direct",
//     }).catch(() => {}); // Silent fail — don't block download

//     // Trigger download
//     const link = document.createElement("a");
//     link.href = resumeURL;
//     link.target = "_blank";
//     link.rel = "noopener noreferrer";
//     link.download = "Chandani_Kumari_Resume.pdf";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     setTimeout(() => setDownloading(false), 2000);
//   };

//   if (loading) {
//     return (
//       <div className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-neutral-400 text-sm font-bold ${className}`}>
//         <Loader2 size={18} className="animate-spin" />
//         Loading...
//       </div>
//     );
//   }

//   if (!resumeURL) return null; // No resume uploaded — hide the button entirely

//   const baseStyles = "group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 select-none cursor-pointer";

//   if (variant === "primary") {
//     return (
//       <button onClick={handleDownload} disabled={downloading}
//         className={`${baseStyles} bg-blue-600 text-white shadow-[0_8px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.5)] hover:bg-blue-700 disabled:opacity-70 ${className}`}
//       >
//         {downloading ? (
//           <><Loader2 size={18} className="animate-spin" /> Downloading...</>
//         ) : (
//           <><FileText size={18} className="group-hover:rotate-6 transition-transform" /> Download Resume</>
//         )}
//       </button>
//     );
//   }

//   return (
//     <button onClick={handleDownload} disabled={downloading}
//       className={`${baseStyles} border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-blue-400 dark:hover:border-blue-500/70 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md disabled:opacity-70 ${className}`}
//     >
//       {downloading ? (
//         <><Loader2 size={18} className="animate-spin" /> Downloading...</>
//       ) : (
//         <><Download size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /> Resume</>
//       )}
//     </button>
//   );
// };
