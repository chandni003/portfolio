"use client";

import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { LogIn, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { Logo } from "../../../components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Admin check
      if (user.email === "chandniofficial001@gmail.com") {
        router.push("/admin/dashboard");
      } else {
        await auth.signOut();
        setError("Access denied. Authorized personnel only.");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || "An error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-[#030303] p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-black/5">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="mb-6 scale-110">
              <Logo />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
              <ShieldCheck size={14} />
              Admin Access
            </div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">
              Control Center
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
              Sign in with your authorized Google account to manage your portfolio and assets.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3 animate-keyframe-shake">
              <div className="h-2 w-2 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          {/* Social Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="group relative w-full flex items-center justify-center gap-4 bg-zinc-900 dark:bg-white text-white dark:text-black py-4 px-6 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-xl shadow-zinc-900/10 dark:shadow-white/5"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </div>
                <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={18} />
              </>
            )}
          </button>

          {/* Footer Info */}
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <div className="h-px w-12 bg-zinc-200 dark:bg-zinc-800" />
            <p className="text-[10px] uppercase tracking-widest font-black text-zinc-400 dark:text-zinc-500">
              Secured by Firebase
            </p>
          </div>
        </div>
        
        {/* Help Link */}
        <p className="mt-8 text-center text-zinc-400 dark:text-zinc-600 text-xs">
          Forgot password or lost access? <a href="mailto:chandniofficial001@gmail.com" className="text-zinc-900 dark:text-white font-bold hover:underline">Contact Support</a>
        </p>
      </div>
    </div>
  );
}
