"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { 
  User, 
  Dumbbell, 
  Utensils, 
  Brain, 
  ArrowRight 
} from "lucide-react";

const energies = [
  { name: "CREATIVE", bg: "bg-secondary-container", text: "text-on-secondary-container" },
  { name: "STRATEGIC", bg: "bg-surface-container", text: "text-on-surface-variant" },
  { name: "EMPATHETIC", bg: "bg-primary-container/20", text: "text-primary", border: "border-primary/10" },
  { name: "SCIENTIFIC", bg: "bg-surface-container", text: "text-on-surface-variant" },
  { name: "DRIVEN", bg: "bg-surface-container", text: "text-on-surface-variant" },
];

interface Phase01Props {
  discipline: string;
  setDiscipline: (val: string) => void;
  selectedEnergies: string[];
  toggleEnergy: (energy: string) => void;
  onNext: () => void;
}

export function Phase01Foundation({
  discipline,
  setDiscipline,
  selectedEnergies,
  toggleEnergy,
  onNext,
}: Phase01Props) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
      <div className="space-y-6">
        <h1 className="text-5xl font-black tracking-tight leading-normal text-on-surface">
          Define your <span className="inline-block bg-gradient-to-r from-[#6a37d4] to-[#00675d] bg-clip-text text-transparent italic pr-10 -mr-10">professional aura.</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-md">
          Let's set the foundation. Your discipline and energies shape how recruiters perceive your wellness practice.
        </p>
      </div>

      {/* Discipline Selection */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-1 bg-primary rounded-full" />
          <h3 className="text-xl font-bold text-on-surface">Select Discipline</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'yoga', title: 'Yoga & Mind', desc: 'Spiritual guidance and physical alignment expertise.', icon: <User className="size-6" />, bg: 'bg-primary-container/20', text: 'text-primary' },
            { id: 'fitness', title: 'Holistic Fitness', desc: 'Functional movement and athletic wellness coaching.', icon: <Dumbbell className="size-6" />, bg: 'bg-secondary-container/20', text: 'text-secondary' },
            { id: 'nutrition', title: 'Nutrition & Gut', desc: 'Metabolic health and dietary bio-hacking strategies.', icon: <Utensils className="size-6" />, bg: 'bg-tertiary-container/20', text: 'text-tertiary' },
            { id: 'mental', title: 'Mental Health', desc: 'Counseling, mindfulness, and emotional intelligence.', icon: <Brain className="size-6" />, bg: 'bg-destructive/10', text: 'text-destructive' }
          ].map((card) => (
            <button
              key={card.id}
              onClick={() => setDiscipline(card.id)}
              className={cn(
                "p-6 rounded-xl border-2 text-left transition-all duration-300 group hover:scale-[1.02]",
                discipline === card.id 
                  ? "bg-white border-primary shadow-xl" 
                  : "bg-surface-container-lowest border-transparent hover:border-surface-container shadow-sm"
              )}
            >
              <div className={cn("size-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110", card.bg, card.text)}>
                {card.icon}
              </div>
              <h4 className="font-bold text-lg mb-1">{card.title}</h4>
              <p className="text-sm text-on-surface-variant leading-snug">{card.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Professional Energies */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-1 bg-secondary rounded-full" />
          <h3 className="text-xl font-bold text-on-surface">Professional Energies</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {energies.map((energy) => (
            <button
              key={energy.name}
              onClick={() => toggleEnergy(energy.name)}
              className={cn(
                "px-8 py-4 rounded-full text-xs font-black tracking-widest transition-all duration-300 border",
                selectedEnergies.includes(energy.name)
                  ? `${energy.bg} border-transparent ${energy.text} shadow-xl scale-105`
                  : `${energy.bg} border-transparent ${energy.text} opacity-60 hover:opacity-100`
              )}
            >
              {energy.name}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <button 
          onClick={onNext}
          className="w-full md:w-auto px-12 py-5 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold text-lg flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Next: Your Journey
          <ArrowRight className="size-6" />
        </button>
      </div>
    </div>
  );
}
