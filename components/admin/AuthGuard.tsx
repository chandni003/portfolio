"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../../lib/AuthContext";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      const isLoginPage = pathname === "/admin" || pathname === "/admin/";
      
      if (!user || role !== "admin") {
        // Not logged in or not an admin
        if (!isLoginPage) {
          router.push("/admin/") ;
        }
      } else {
        // Logged in as admin
        if (isLoginPage) {
          router.push("/admin/dashboard");
        }
      }
    }
  }, [user, role, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm font-medium text-neutral-500">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If we are not loading, we can show children IF:
  // 1. It's the login page and we're NOT logged in as admin
  // 2. It's NOT the login page and we ARE logged in as admin
  
  const isLoginPage = pathname === "/admin" || pathname === "/admin/";
  const isAuthorized = user && role === "admin";

  if (isLoginPage && !isAuthorized) return <>{children}</>;
  if (!isLoginPage && isAuthorized) return <>{children}</>;

  // While redirecting, show nothing or a loader
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-black">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
};
