"use client";

import React from "react";
import { 
  Download, 
  Share2, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Globe,
  Link2
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Phase04Props {
  onBack: () => void;
  onExploreMatches: () => void;
}

export function Phase04Manifested({ 
  onBack,
  onExploreMatches
}: Phase04Props) {
  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Success Hero Section */}
      <header className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-[10px] font-black uppercase tracking-widest"
        >
          <CheckCircle2 className="size-3.5" />
          Success State Achieved
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Your Prana Profile is <br />
            <span className="text-primary italic relative">
              Manifested.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-xl leading-relaxed">
            The universe (and our AI) has aligned your career story. Your high-vibe wellness resume is ready for the world.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Action Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8 group hover:shadow-2xl transition-all duration-500"
        >
          <div className="size-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
            <Download className="size-8" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-slate-900">Download PDF</h3>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              High-resolution, ATS-optimized, and aesthetically superior.
            </p>
          </div>
          <button className="w-full py-5 bg-primary rounded-full text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all hover:scale-[1.02] active:scale-95">
            Export Resume
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 space-y-8 group hover:shadow-2xl transition-all duration-500"
        >
          <div className="size-16 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
            <Share2 className="size-8" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-slate-900">Share Vibe</h3>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Sync your new profile to LinkedIn or share with your network.
            </p>
          </div>
          <button className="w-full py-5 bg-secondary/10 rounded-full text-secondary font-black uppercase tracking-[0.2em] text-xs transition-all hover:bg-secondary hover:text-white">
            Post to Feed
          </button>
        </motion.div>
      </div>

      {/* Vibe Match Jobs Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-900 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-colors duration-1000" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-4xl font-black text-white tracking-tight leading-tight">
              Apply to Vibe <br /> Match Jobs
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed max-w-md">
              We found <span className="text-primary font-bold">12 Wellness opportunities</span> in Bangalore that align with your new Prana Profile.
            </p>
            <div className="flex gap-4 pt-4">
               <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                  <Globe className="size-3 text-primary" /> Remote
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-white text-[10px] font-black uppercase tracking-widest">
                  <Zap className="size-3 text-secondary" /> High Match
               </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex justify-end">
            <button 
              onClick={onExploreMatches}
              className="group relative px-12 py-6 bg-primary rounded-[2rem] text-white font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center gap-3">
                Explore Matches
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Secondary Actions */}
      <footer className="pt-8 flex items-center justify-between border-t border-slate-100">
        <button 
          onClick={onBack}
          className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
        >
          ← Refine Vibe
        </button>
        <div className="flex gap-8">
           <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-primary transition-all">
             <Link2 className="size-4" /> Copy Magic Link
           </button>
        </div>
      </footer>
    </div>
  );
}
