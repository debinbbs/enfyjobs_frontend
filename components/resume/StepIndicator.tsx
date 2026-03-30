"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="bg-surface-container-low/50 border-t border-slate-100 px-8 py-3 w-full">
      <div className="max-w-4xl mx-auto flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-slate-200 -translate-y-1/2 z-0">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isPending = currentStep < step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-1.5 group">
              <div
                className={cn(
                  "rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500",
                  isCompleted ? "w-8 h-8 bg-primary text-white shadow-lg shadow-primary/20" :
                  isActive ? "w-10 h-10 bg-primary text-white ring-4 ring-white shadow-xl shadow-primary/30 scale-110" :
                  "w-8 h-8 bg-white border-2 border-slate-200 text-slate-400"
                )}
              >
                {isCompleted ? (
                  <Check className="size-4" strokeWidth={3} />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-black uppercase tracking-wider transition-colors duration-500",
                  isActive || isCompleted ? "text-primary" : "text-slate-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
