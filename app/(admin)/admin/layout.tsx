"use client";

import React, { useState } from "react";
import { Sidebar } from "../../../components/admin/Sidebar";
import { TopBar } from "../../../components/admin/TopBar";
import { usePathname } from "next/navigation";
import { AuthProvider } from "../../../lib/AuthContext";
import { AuthGuard } from "../../../components/admin/AuthGuard";
import { Menu, X } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin" || pathname === "/admin/";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <AuthGuard>
        {isLoginPage ? (
          <>{children}</>
        ) : (
          <div className="flex h-screen bg-neutral-50 dark:bg-zinc-950 overflow-hidden relative">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <div className={`
              fixed inset-y-0 left-0 z-[50] w-72 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen">
              <header className="h-20 flex items-center justify-between px-4 md:px-8 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shrink-0 z-30">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 -ml-2 text-neutral-500 md:hidden hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-colors"
                >
                  <Menu size={24} />
                </button>
                <div className="flex-1 flex justify-end">
                  <TopBar />
                </div>
              </header>

              <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                {children}
              </main>
            </div>
          </div>
        )}
      </AuthGuard>
    </AuthProvider>
  );
}
