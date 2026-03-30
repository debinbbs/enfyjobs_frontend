"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Search, 
  X, 
  ArrowRight,
  Briefcase,
  Sparkles,
  ChevronDown
} from "lucide-react";

interface JourneyItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface Phase02Props {
  journey: JourneyItem[];
  setJourney: (val: JourneyItem[]) => void;
  modalities: string[];
  setModalities: (val: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Phase02Journey({
  journey,
  setJourney,
  modalities,
  setModalities,
  onNext,
  onBack,
}: Phase02Props) {
  const [newModality, setNewModality] = useState("");

  const addModality = (m: string) => {
    if (m && !modalities.includes(m)) {
      setModalities([...modalities, m]);
    }
    setNewModality("");
  };

  const removeModality = (m: string) => {
    setModalities(modalities.filter((item) => item !== m));
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
      <div className="space-y-6">
        <h1 className="text-5xl font-black tracking-tight leading-[1.1] text-on-surface">
          Your <span className="bg-gradient-to-r from-[#6a37d4] to-[#00675d] bg-clip-text text-transparent italic">Journey.</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-md">
          Let's map out your professional frequency and wellness lineage.
        </p>
      </div>

      {/* Section 1: Job History */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-sm">01</div>
          <h2 className="text-2xl font-black text-on-surface">Job History</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Role Title</label>
            <input 
              className="w-full px-6 py-4 bg-surface-container-highest rounded-full border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400" 
              placeholder="e.g. Wellness Director" 
              type="text"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Company</label>
            <input 
              className="w-full px-6 py-4 bg-surface-container-highest rounded-full border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400" 
              placeholder="e.g. ZenFlow Studios" 
              type="text"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Location</label>
            <div className="relative">
              <select className="w-full px-6 py-4 bg-surface-container-highest rounded-full border-2 border-transparent focus:border-primary/20 focus:bg-white transition-all outline-none appearance-none font-medium cursor-pointer">
                <option>Bengaluru, Karnataka</option>
                <option>Mumbai, Maharashtra</option>
                <option>Rishikesh, Uttarakhand</option>
                <option>Pune, Maharashtra</option>
                <option>Goa, India</option>
              </select>
              <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 size-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-4">Impact Description</label>
            <div className="bg-surface-container-highest rounded-3xl p-4 focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white transition-all border-2 border-transparent focus-within:border-primary/10">
              <textarea 
                className="w-full px-4 bg-transparent border-none focus:ring-0 resize-none font-medium placeholder:text-slate-400 min-h-[120px]" 
                placeholder="Describe your energetic impact and measurable outcomes..."
              />
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 text-primary font-black px-8 py-3 rounded-full bg-primary/5 hover:bg-primary/10 transition-all active:scale-95 group">
          <Plus className="size-5 group-hover:rotate-90 transition-transform" />
          Add Position
        </button>
      </div>

      {/* Section 2: Wellness Skills */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-black text-sm">02</div>
          <h2 className="text-2xl font-black text-on-surface">Wellness Skills</h2>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
            <input 
              className="w-full px-14 py-5 bg-surface-container-highest rounded-full border-2 border-transparent focus:border-secondary/20 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400" 
              placeholder="Search modalities (e.g. Yoga, Reiki...)" 
              type="text"
              value={newModality}
              onChange={(e) => setNewModality(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addModality(newModality)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {modalities.map((item) => (
              <div key={item} className="bg-secondary-container text-on-secondary-fixed-variant px-5 py-2.5 rounded-sm flex items-center gap-2 text-xs font-black uppercase tracking-wider animate-in zoom-in-50 duration-300">
                {item}
                <X 
                  className="size-3 cursor-pointer hover:scale-125 transition-transform" 
                  onClick={() => removeModality(item)}
                />
              </div>
            ))}
          </div>

          <div className="bg-surface-container-low/50 rounded-3xl p-8 border border-white/40">
            <p className="text-[10px] font-black uppercase text-on-surface-variant mb-6 tracking-widest flex items-center gap-2">
              <Sparkles className="size-3 text-secondary" />
              Suggested for Wellness Director
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                "+ Reiki Level II", 
                "+ Gut Health Nutrition", 
                "+ Chakra Alignment", 
                "+ Sound Healing"
              ].map((suggestion) => (
                <button 
                  key={suggestion}
                  onClick={() => addModality(suggestion.replace('+ ', ''))}
                  className="px-5 py-2.5 border-2 border-slate-200/50 rounded-full text-xs font-bold text-slate-500 hover:border-primary hover:text-primary hover:bg-white transition-all active:scale-95"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 flex gap-4">
        <button 
          onClick={onBack}
          className="px-10 py-5 bg-surface-container text-on-surface-variant rounded-full font-bold text-lg hover:bg-slate-200 transition-all active:scale-95"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          className="flex-1 py-5 bg-gradient-to-r from-primary to-primary-container text-white font-black text-xl rounded-full shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-4"
        >
          Continue to Vibe Check
          <ArrowRight className="size-6" />
        </button>
      </div>
    </div>
  );
}
