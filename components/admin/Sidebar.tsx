"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Cpu,
  Mail,
  CalendarDays,
  Settings,
  LogOut,
  X,
  FileText
} from "lucide-react";
import { cn } from "../../../portfolio/lib/utils";
import { auth } from "../../../portfolio/lib/firebase";
import { useRouter } from "next/navigation";

import { Logo } from "../../../portfolio/components/Logo";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Cpu },
  { name: "Resume", href: "/admin/resume", icon: FileText },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Schedules", href: "/admin/schedules", icon: CalendarDays },
];

export const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/admin/");
  };

  return (
    <div className="h-full w-full bg-white dark:bg-zinc-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col shadow-2xl md:shadow-none">
      <div className="p-8 pb-4 flex items-center justify-between">
        <Logo className="scale-90" />
        <button 
          onClick={onClose}
          className="p-2 md:hidden text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 py-12 px-4 space-y-2">
        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Operations</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all font-bold text-sm",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-blue-600"
              )}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
        <Link
          href="/admin/settings"
          className="flex items-center gap-4 px-4 py-3 rounded-2xl text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-blue-600 transition-all font-bold text-sm"
        >
          <Settings size={20} />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};
