"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { 
  Briefcase, 
  Users, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquare
} from "lucide-react";
import { useTheme } from "next-themes";

const visitorData = [
  { name: "Mon", visitors: 400 },
  { name: "Tue", visitors: 300 },
  { name: "Wed", visitors: 900 },
  { name: "Thu", visitors: 500 },
  { name: "Fri", visitors: 700 },
  { name: "Sat", visitors: 1100 },
  { name: "Sun", visitors: 800 },
];

const projectStats = [
  { label: "Total Projects", value: "15", icon: Briefcase, color: "text-blue-500", trend: "+12%", up: true },
  { label: "In Progress", value: "3", icon: Clock, color: "text-amber-500", trend: "+1", up: true },
  { label: "Live Apps", value: "12", icon: CheckCircle2, color: "text-emerald-500", trend: "0%", up: null },
  { label: "Total Visitors", value: "4.2k", icon: Users, color: "text-purple-500", trend: "+18%", up: true },
];

export default function DashboardPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter">
            Dashboard <span className="text-blue-600">Overview</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mt-1">
            Real-time analytics and portfolio performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs font-bold shadow-sm">
                Date Range: <span className="text-blue-600">Last 7 Days</span>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                Export Report
            </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projectStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={20} />
              </div>
              {stat.trend && (
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${stat.up === true ? 'text-emerald-500' : stat.up === false ? 'text-red-500' : 'text-neutral-400'}`}>
                    {stat.up === true ? <ArrowUpRight size={12} /> : stat.up === false ? <ArrowDownRight size={12} /> : null}
                    {stat.trend}
                </div>
              )}
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black dark:text-white leading-none">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visitors Chart */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 p-8 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[40px] shadow-sm"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Visitor Traffic</h3>
              <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mt-1">Daily engagement metrics</p>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Visitors</span>
                </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#262626" : "#f0f0f0"} />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: isDark ? "#737373" : "#a3a3a3", fontWeight: 700 }}
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: isDark ? "#737373" : "#a3a3a3", fontWeight: 700 }}
                />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: isDark ? "#171717" : "#ffffff", 
                        borderColor: isDark ? "#262626" : "#e5e5e5",
                        borderRadius: "16px",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: isDark ? "#ffffff" : "#000000"
                    }}
                    cursor={{ stroke: '#2563eb', strokeWidth: 2 }}
                />
                <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#2563eb" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorVis)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Short Overview / Recent activity */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[40px] shadow-sm flex flex-col"
        >
             <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-8">Recent Queries</h3>
             <div className="space-y-6 flex-1">
                {[
                    { name: "John Doe", email: "john@example.com", status: "Unprocessed", color: "bg-blue-500" },
                    { name: "Sarah Smith", email: "sarah@design.co", status: "Scheduled", color: "bg-purple-500" },
                    { name: "Mike Ross", email: "mike@law.com", status: "Urgent", color: "bg-red-500" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 group hover:border-blue-500/50 transition-all">
                        <div className={`w-10 h-10 rounded-2xl ${item.color}/10 flex items-center justify-center text-[10px] font-black text-neutral-400 group-hover:scale-110 transition-transform`}>
                            {item.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black dark:text-white truncate uppercase tracking-tight">{item.name}</p>
                            <p className="text-[10px] text-neutral-500 font-bold truncate">{item.email}</p>
                        </div>
                        <div className={`px-3 py-1 ${item.color}/10 rounded-full text-[8px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-300`}>
                            {item.status}
                        </div>
                    </div>
                ))}
             </div>
             <button className="w-full mt-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:bg-blue-600/5 rounded-2xl border border-blue-600/20 transition-all">
                View All Messages
             </button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Progress Overview */}
        <div className="p-8 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[40px] shadow-sm">
             <div className="flex items-center gap-3 mb-8">
                 <TrendingUp className="text-blue-600" />
                 <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter">Project Success Rate</h3>
             </div>
             <div className="space-y-6">
                {[
                    { label: "Frontend Completion", value: 85, color: "bg-blue-600" },
                    { label: "Backend Scalability", value: 72, color: "bg-indigo-600" },
                    { label: "Deployment Stability", value: 98, color: "bg-emerald-600" },
                ].map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{item.label}</span>
                            <span className="text-xs font-black dark:text-white">{item.value}%</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                className={`h-full ${item.color} rounded-full`} 
                            />
                        </div>
                    </div>
                ))}
             </div>
        </div>

        {/* Live Status */}
        <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Briefcase size={120} className="text-white" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">System Status</h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest backdrop-blur-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        All Systems Operational
                    </div>
                </div>
                <div className="pt-10">
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4 leading-relaxed">
                        Currently processing 12 active modules <br /> with 99.9% uptime index.
                    </p>
                    <button className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
                        Check Infrastructure
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
