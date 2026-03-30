"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Zap, 
  Leaf, 
  CheckCircle2, 
  ChevronRight,
  Info,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Phase03Props {
  onNext: () => void;
  onBack: () => void;
  highEnergy: boolean;
  setHighEnergy: (val: boolean) => void;
  profZen: boolean;
  setProfZen: (val: boolean) => void;
}

export function Phase03VibeCheck({ 
  onNext, 
  onBack,
  highEnergy,
  setHighEnergy,
  profZen,
  setProfZen
}: Phase03Props) {
  const [addedKeywords, setAddedKeywords] = useState<string[]>(["Mindful Leadership", "Holistic Coaching"]);
  const recommendedKeywords = [
    "Vibrational Wellness", 
    "Somatic Healing", 
    "Prana Flow", 
    "Energy Alignment",
    "Conscious Marketing"
  ];

  return (
    <div className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header Section */}
      <header className="space-y-3">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-primary/60">
           <div className="h-[2px] w-8 bg-primary/30" />
           <span>Phase 03</span>
        </div>
        <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-tight">
          Vibe <span className="text-primary italic">Check.</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
          Aligning your professional aura with cosmic industry standards.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {/* Top Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vibe Score Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 flex items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
            
            <div className="relative shrink-0">
              <svg className="size-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-100"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="50"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="314"
                  initial={{ strokeDashoffset: 314 }}
                  animate={{ strokeDashoffset: 314 * (1 - 0.85) }}
                  transition={{ duration: 2, ease: "circOut" }}
                  className="text-primary stroke-round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">85</span>
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Score</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">Manifesting Strong</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed pr-4">
                Your resume frequency is high. Minor shifts will maximize cosmic resonance.
              </p>
            </div>
          </motion.div>

          {/* AI Cosmic Insights */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-slate-900 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 text-primary/20">
               <Sparkles className="size-20" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-xl">
                   <Zap className="size-4 text-primary" />
                </div>
                <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">AI Cosmic Insights</h3>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-all">
                <div className="size-10 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0 border border-white/5">
                  <Leaf className="size-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-xs mb-0.5">
                    "Add more impact verbs"
                  </p>
                  <p className="text-slate-400 text-[10px] leading-tight">
                    Replace 'handled' with 'orchestrated' or 'catalyzed'.
                  </p>
                </div>
                <ChevronRight className="size-4 text-slate-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Toggles & Keywords */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6">
            <div className="flex items-center justify-between group cursor-pointer" onClick={() => setHighEnergy(!highEnergy)}>
              <div className="space-y-0.5">
                <h3 className="text-base font-black text-slate-900">High-Energy Keywords</h3>
                <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">Boost action-oriented language</p>
              </div>
              <div className={cn(
                "w-12 h-7 rounded-full transition-all relative p-1 flex items-center shadow-inner",
                highEnergy ? "bg-primary" : "bg-slate-200"
              )}>
                <motion.div 
                  layout
                  className="size-5 rounded-full bg-white shadow-lg"
                  animate={{ x: highEnergy ? 20 : 0 }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between group cursor-pointer" onClick={() => setProfZen(!profZen)}>
              <div className="space-y-0.5">
                <h3 className="text-base font-black text-slate-900">Professional Zen</h3>
                <p className="text-[10px] font-medium text-slate-400 tracking-wide uppercase">Balance vibrance with authority</p>
              </div>
              <div className={cn(
                "w-12 h-7 rounded-full transition-all relative p-1 flex items-center shadow-inner",
                profZen ? "bg-secondary" : "bg-slate-200"
              )}>
                <motion.div 
                  layout
                  className="size-5 rounded-full bg-white shadow-lg"
                  animate={{ x: profZen ? 20 : 0 }}
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6">
             <div className="flex items-center justify-between">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Prana Keywords</h3>
               <Info className="size-3 text-slate-300" />
             </div>
             
             <div className="flex flex-wrap gap-2">
                {recommendedKeywords.map((kw) => (
                  <button 
                    key={kw}
                    onClick={() => {
                      if (!addedKeywords.includes(kw)) setAddedKeywords([...addedKeywords, kw]);
                    }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all flex items-center gap-2 border",
                      addedKeywords.includes(kw) 
                        ? "bg-secondary/10 border-secondary/20 text-secondary" 
                        : "bg-slate-50 border-slate-100 text-slate-500 hover:border-primary/30 hover:bg-white hover:text-primary"
                    )}
                  >
                    {addedKeywords.includes(kw) ? <CheckCircle2 className="size-3" /> : <ArrowRight className="size-3 opacity-30" />}
                    {kw}
                  </button>
                ))}
             </div>
          </section>
        </div>
      </div>

      {/* Navigation Footer */}
      <footer className="pt-8 flex items-center justify-between border-t border-slate-100">
        <button 
          onClick={onBack}
          className="px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
        >
          ← Your Journey
        </button>
        <button 
          onClick={onNext}
          className="group relative px-10 py-4 bg-slate-900 rounded-full text-white font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl transition-all hover:scale-105 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <span className="relative flex items-center gap-3">
            Manifest Resume
            <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </footer>
    </div>
  );
}
