"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, ExternalLink, Eye, Globe, Github } from "lucide-react";
import { getAllDocuments, COLLECTIONS, addDocument, updateDocument, deleteDocument } from "../../../../lib/firestore";

export default function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getAllDocuments(COLLECTIONS.PROJECTS);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      status: formData.get("status"),
      image: formData.get("image") || "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      liveLink: formData.get("liveLink"),
      githubLink: formData.get("githubLink"),
      tags: (formData.get("tags") as string).split(",").map(t => t.trim()),
    };

    try {
      if (currentProject) {
        await updateDocument(COLLECTIONS.PROJECTS, currentProject.id, projectData);
      } else {
        await addDocument(COLLECTIONS.PROJECTS, projectData);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteDocument(COLLECTIONS.PROJECTS, id);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black dark:text-white uppercase tracking-tighter">
            Project <span className="text-blue-600">Manager</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mt-1">
            Build, edit and feature your technical work.
          </p>
        </div>
        <button 
          onClick={() => { setCurrentProject(null); setIsModalOpen(true); }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={18} />
          Add New Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-3xl">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
          />
        </div>
        <div className="flex gap-2">
            <button className="p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl text-neutral-500 hover:text-blue-600 transition-all">
                <Filter size={18} />
            </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-96 rounded-[40px] bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
          ))
        ) : (
          projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-6 bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[40px] shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <div className="relative aspect-video rounded-[28px] overflow-hidden mb-6 border border-neutral-100 dark:border-neutral-800">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => { setCurrentProject(project); setIsModalOpen(true); }} className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white hover:bg-white/20 transition-all">
                        <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-3 bg-red-500/10 backdrop-blur-md rounded-2xl text-red-500 hover:bg-red-500/20 transition-all">
                        <Trash2 size={18} />
                    </button>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-500/10 px-3 py-1 rounded-full">{project.category || "Fullstack"}</span>
                    <div className="flex gap-2">
                        {project.liveLink && <Globe size={14} className="text-neutral-400" />}
                        {project.githubLink && <Github size={14} className="text-neutral-400" />}
                    </div>
                </div>
                <h3 className="text-xl font-black dark:text-white uppercase tracking-tighter mb-2">{project.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs font-medium leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex -space-x-2">
                    {project.tags?.slice(0, 3).map((tag: string, i: number) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-white dark:border-black flex items-center justify-center text-[8px] font-black uppercase">
                            {tag[0]}
                        </div>
                    ))}
                    {(project.tags?.length || 0) > 3 && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white dark:border-black flex items-center justify-center text-[8px] font-black text-white">
                            +{(project.tags?.length || 0) - 3}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400">
                    <div className={`w-1.5 h-1.5 rounded-full ${project.status === "live" ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    {project.status || "In Review"}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-[48px] shadow-2xl p-10 overflow-hidden"
            >
              <h2 className="text-3xl font-black dark:text-white uppercase tracking-tighter mb-2">
                {currentProject ? "Edit Project" : "New Project"}
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mb-10">
                Specify the technical details of your work.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Title</label>
                    <input name="title" defaultValue={currentProject?.title} required className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Category</label>
                    <input name="category" defaultValue={currentProject?.category} placeholder="Full Stack, AI, UI/UX" className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea name="description" defaultValue={currentProject?.description} required rows={3} className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Live URL</label>
                      <input name="liveLink" defaultValue={currentProject?.liveLink} className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">GitHub URL</label>
                      <input name="githubLink" defaultValue={currentProject?.githubLink} className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white" />
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Tags (Comma separated)</label>
                  <input name="tags" defaultValue={currentProject?.tags?.join(", ")} placeholder="React, Next.js, Firebase" className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:border-blue-500 outline-none transition-all text-sm font-bold dark:text-white" />
                </div>

                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  {currentProject ? "Save Changes" : "Create Project"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
