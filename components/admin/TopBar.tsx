"use client";

import React, { useState } from "react";
import { Bell, Search, User } from "lucide-react";
import { Logo } from "../../../portfolio/components/Logo";

export const TopBar = () => {
    const [notifications] = useState([
        { id: 1, text: "New project inquiry from Alice", time: "2m ago" },
        { id: 2, text: "System update completed", time: "1h ago" },
    ]);
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="h-20 w-full bg-white/50 dark:bg-black/20 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-8 relative z-50">
            <div className="flex items-center gap-12">
                <Logo className="scale-75" />
                <div className="relative group hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder="Quick search..." 
                        className="pl-12 pr-6 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64 dark:text-white"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <div className="relative">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-blue-600 hover:border-blue-500 shadow-sm transition-all relative overflow-hidden group"
                    >
                        <Bell size={20} />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-blue-600 rounded-full border-2 border-white dark:border-black animate-pulse" />
                    </button>

                    {showNotifications && (
                        <div className="absolute top-16 right-0 w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-4 overflow-hidden animate-in fade-in zoom-in duration-200">
                            <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 px-2">Recent Notifications</h4>
                            <div className="space-y-2">
                                {notifications.map(notif => (
                                    <div key={notif.id} className="p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-neutral-100 dark:hover:border-neutral-700">
                                        <p className="text-sm font-bold dark:text-white mb-1">{notif.text}</p>
                                        <p className="text-[10px] text-neutral-400 font-medium">{notif.time}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-500 transition-colors border-t border-neutral-100 dark:border-neutral-800 pt-3">
                                View All Activity
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 pl-4 border-l border-neutral-200 dark:border-neutral-800">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black dark:text-white leading-none">Admin</p>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Superuser</p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px]">
                        <div className="w-full h-full rounded-[15px] bg-white dark:bg-black flex items-center justify-center text-blue-600">
                            <User size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
