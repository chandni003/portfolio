"use client";

import React from "react";
import { Sidebar } from "../../../components/admin/Sidebar";
import { TopBar } from "../../../components/admin/TopBar";
import { usePathname } from "next/navigation";
import { AuthProvider } from "../../../lib/AuthContext";
import { AuthGuard } from "../../../components/admin/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";

  return (
    <AuthProvider>
      <AuthGuard>
        {isLoginPage ? (
          <>{children}</>
        ) : (
          <div className="flex h-screen bg-neutral-50 dark:bg-zinc-950 overflow-hidden">
            <div className="flex-shrink-0">
              <Sidebar />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <TopBar />
              <main className="flex-1 overflow-y-auto p-8 relative">
                {children}
              </main>
            </div>
          </div>
        )}
      </AuthGuard>
    </AuthProvider>
  );
}
