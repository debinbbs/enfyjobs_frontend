"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  Sparkles,
  Maximize2,
  Palette
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JourneyItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface ResumePreviewProps {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  aura: { label: string; color: string }[];
  vibe: string[];
  journey: JourneyItem[];
  modalities: string[];
  profileImage?: string;
  compact?: boolean;
  highEnergy?: boolean;
  profZen?: boolean;
}

export function ResumePreview({
  name,
  title,
  aura,
  vibe,
  journey,
  profileImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBVvRy3u-bhDcsu4p2oJnZvxkTwdydLuPTcYu7MDfmur94p_JpCezib5sjRLKnwIq3UnLlVXRdBNJGSPOiLPfgv2J0WZaPSgRHuXhzrsHlFC2IrFOQ9kvuSf72_wWj5CntnbVkmh_Bic4sv3ARyM_vrBQ-gaxIOBZvK-WbbxUhT_Py49u0u7YgUFAYJ3UzlxCfwMMUKOkco8uUVBdtnpJvUFLmxeRLcoh7ORECmL5YibrvtOkcc94pVSLIguWZMprg49IyAr06Hrj5m",
  highEnergy = false,
  profZen = false,
}: ResumePreviewProps) {

  const highlightText = (text: string) => {
    if (!highEnergy) return text;
    const powerWords = ["orchestrated", "transformed", "catalyzed", "led", "developed", "increased", "maximized", "vibrant", "harmonize", "high-frequency", "Zen", "Pulse", "Corporate"];
    const regex = new RegExp(`(${powerWords.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) => 
      powerWords.some(pw => pw.toLowerCase() === part.toLowerCase()) ? (
        <span key={i} className="bg-secondary/20 text-secondary px-1 rounded-sm font-bold border-b border-secondary/30 transition-all duration-500 animate-pulse">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div className="flex flex-col bg-slate-100/50 p-6 sticky top-[130px] h-fit rounded-[3rem] border border-white/40 shadow-2xl animate-in fade-in slide-in-from-right-8 duration-1000 group/preview">
      {/* Header Info */}
      <div className="mb-4 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        <div className="flex items-center gap-2">
           <div className={cn("size-2 rounded-full animate-pulse", highEnergy ? "bg-primary" : "bg-secondary-container")} />
           <span className={cn(highEnergy && "text-primary font-black")}>
             {highEnergy ? "Cosmic Live Preview" : "Live Preview"}
           </span>
        </div>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
        </div>
      </div>

      {/* Resume Canvas */}
      <div className={cn(
        "bg-white rounded-[2.5rem] shadow-xl flex flex-col overflow-hidden relative transition-all duration-700",
        profZen && "ring-8 ring-secondary/5"
      )}>
        {/* Editorial Header */}
        <header className="bg-gradient-to-br from-primary to-primary-container p-10 relative overflow-hidden shrink-0">
           {/* Abstract Decoration */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
           
           <div className="relative z-10 flex items-center gap-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur-md" />
                <img 
                  className="w-32 h-32 rounded-full object-cover relative border-4 border-white shadow-2xl" 
                  src={profileImage}
                  alt={name}
                />
                <div className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-lg text-primary">
                  <Sparkles className="size-4 fill-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-black text-white tracking-tight leading-none mb-2">
                  {name}
                </h2>
                <p className="text-[12px] font-black uppercase tracking-[0.3em] text-white/80">{title}</p>
              </div>
           </div>
        </header>

        {/* Card Body */}
        <div className="flex-1 grid grid-cols-12">
          {/* Left Column: Aura & Vibe */}
          <aside className="col-span-4 p-10 border-r border-slate-50 space-y-12 bg-slate-50/20">
            <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Aura</h3>
              <ul className="space-y-4">
                {aura.map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <div className={cn("size-2 rounded-full shadow-sm", item.color)} />
                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Core Vibe</h3>
              <div className="flex flex-wrap gap-2">
                {vibe.map((item) => (
                  <span key={item} className="px-3 py-1.5 bg-white border border-slate-100 rounded-sm text-[9px] font-black uppercase text-slate-500 shadow-sm transition-all hover:border-primary/30 hover:text-primary">
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </aside>

          {/* Right Column: Vision & Journey */}
          <main className="col-span-8 p-10 space-y-12">
            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">Vision</h3>
              <p className="text-[13px] font-medium text-slate-600 leading-relaxed italic pr-4">
                {highlightText(`"To harmonize modern corporate performance with ancient spiritual grounding, creating high-frequency workspaces where employees thrive through conscious movement and breath."`)}
              </p>
            </section>

            <section className="space-y-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-primary">The Journey</h3>
              <div className="space-y-10 border-l-2 border-slate-100 ml-1 pl-8">
                <AnimatePresence mode="popLayout">
                  {journey.map((item, idx) => (
                    <motion.div 
                      key={item.role + item.company}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: idx === 0 ? 1 : 0.4, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative"
                    >
                      <div className={cn(
                        "absolute -left-[2.15rem] top-1 size-3.5 rounded-full ring-4 ring-white shadow-md",
                        idx === 0 ? "bg-primary ring-primary/10" : "bg-slate-300 ring-slate-50"
                      )} />
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-[13px] text-slate-900">{item.company}</h4>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{item.duration}</span>
                      </div>
                      <p className="text-[10px] font-black text-secondary mb-3 uppercase tracking-[0.1em]">{item.role}</p>
                      {item.description && (
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-3">
                          {highlightText(item.description)}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </main>
        </div>

        {/* Floating Preview Actions */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-2xl scale-90 group-hover/preview:scale-100 transition-all duration-500 opacity-0 group-hover/preview:opacity-100">
           <button className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors pr-4 border-r border-white/10">
              <Maximize2 className="size-3.5" />
              Enlarge
           </button>
           <button className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest hover:text-secondary transition-colors">
              <Palette className="size-3.5" />
              Style
           </button>
        </div>
      </div>

      {/* Subtle Footer Attribution */}
      <div className="mt-4 flex justify-between items-center px-4">
        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">EnfyJobs AI Engine v4.2</span>
        <div className="flex gap-4">
          {["Share", "Print", "Settings"].map((action) => (
            <button key={action} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
