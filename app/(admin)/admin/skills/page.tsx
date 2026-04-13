"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Cpu, Sparkles, Cloud, Database } from "lucide-react";
import { getAllDocuments, COLLECTIONS, addDocument, updateDocument, deleteDocument } from "../../../../lib/firestore";

export default function SkillsManager() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<any>(null);
  const [iconPreview, setIconPreview] = useState<string>("Cpu");

  const LOCAL_LOGOS = [
    { name: "React", icon: "react.svg" },
    { name: "Node.js", icon: "nodejs.svg" },
    { name: "Python", icon: "python.svg" },
    { name: "Next.js", icon: "nextjs.svg" },
    { name: "MongoDB", icon: "mongodb.svg" },
    { name: "JavaScript", icon: "javascript.svg" },
    { name: "TypeScript", icon: "typescript.svg" },
    { name: "Tailwind", icon: "tailwind.svg" },
  ];

  const LUCIDE_ICONS = ["Cpu", "Code", "Zap", "Database", "Globe", "Layout", "Server", "Activity"];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await getAllDocuments(COLLECTIONS.SKILLS);
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const skillData = {
      name: formData.get("name"),
      category: formData.get("category"),
      level: Number(formData.get("level")),
      icon: iconPreview,
    };

    try {
      if (currentSkill) {
        await updateDocument(COLLECTIONS.SKILLS, currentSkill.id, skillData);
      } else {
        await addDocument(COLLECTIONS.SKILLS, skillData);
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this skill?")) {
      try {
        await deleteDocument(COLLECTIONS.SKILLS, id);
        fetchSkills();
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
  };

  const renderIcon = (icon: string, size = 24) => {
    if (icon?.includes(".") || icon?.startsWith("http")) {
      const src = icon.includes(".") && !icon.startsWith("http") ? `/logos/skills/${icon}` : icon;
      return <img src={src} className={`w-${size/4} h-${size/4} object-contain`} alt="icon" />;
    }
    return <Cpu size={size} />;
  };

  return (
    <div className="space-y-8 p-4 md:p-0 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black dark:text-white uppercase tracking-tighter">
            Skills <span className="text-blue-600">Inventory</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-xs md:text-sm mt-1">
            Manage your technical stack and proficiency levels.
          </p>
        </div>
        <button
          onClick={() => { setCurrentSkill(null); setIconPreview("Cpu"); setIsModalOpen(true); }}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 md:py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 rounded-[32px] bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
          ))
        ) : (
          skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform">
                  {renderIcon(skill.icon)}
                </div>
                <div className="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setCurrentSkill(skill); setIconPreview(skill.icon); setIsModalOpen(true); }} className="p-2 hover:text-blue-600 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="p-2 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-black dark:text-white uppercase tracking-tighter mb-4">{skill.name}</h3>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-400">
                  <span>Proficiency</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    className="h-full bg-blue-600"
                  />
                </div>
              </div>

              <div className="mt-4 text-[8px] font-black uppercase tracking-[0.2em] text-neutral-400">
                {skill.category || "General"}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0a0a0a] border-t md:border border-neutral-200 dark:border-neutral-800 rounded-t-[40px] md:rounded-[40px] shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-black dark:text-white uppercase tracking-tighter mb-6">
                {currentSkill ? "Edit Skill" : "Add New Skill"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 pb-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Skill Name</label>
                  <input name="name" defaultValue={currentSkill?.name} required className="w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Category</label>
                  <select name="category" defaultValue={currentSkill?.category} className="w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="DevOps">DevOps</option>
                    <option value="AI/ML">AI/ML</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                    <span>Select Icon / Logo</span>
                    <span className="text-blue-600">{iconPreview}</span>
                  </label>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {/* Local Logos */}
                    {LOCAL_LOGOS.map((logo) => (
                      <button
                        key={logo.icon}
                        type="button"
                        onClick={() => setIconPreview(logo.icon)}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-center ${iconPreview === logo.icon ? 'bg-blue-600 border-blue-600 scale-110 shadow-lg' : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 hover:border-blue-500'}`}
                      >
                        <img src={`/logos/skills/${logo.icon}`} className="w-6 h-6 object-contain" alt={logo.name} />
                      </button>
                    ))}
                    {/* Lucide Icons */}
                    {LUCIDE_ICONS.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setIconPreview(icon)}
                        className={`p-3 rounded-2xl border transition-all flex items-center justify-center ${iconPreview === icon ? 'bg-blue-600 border-blue-500 text-white scale-110 shadow-lg' : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-400'}`}
                      >
                        <Cpu size={20} />
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <p className="text-[9px] font-bold text-neutral-500 mb-2 ml-1">OR ENTER CUSTOM URL</p>
                    <input 
                      placeholder="https://example.com/logo.svg"
                      value={iconPreview.startsWith('http') ? iconPreview : ''}
                      onChange={(e) => setIconPreview(e.target.value)}
                      className="w-full px-5 py-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-[11px] font-bold dark:text-white" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                    <span>Proficiency Level</span>
                    <span className="text-blue-600">{currentSkill?.level || 50}%</span>
                  </label>
                  <input type="range" name="level" min="0" max="100" defaultValue={currentSkill?.level || 50} className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full appearance-none cursor-pointer accent-blue-600" />
                </div>

                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  {currentSkill ? "Update Skill" : "Save Skill"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
