"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const disciplines = [
  {
    title: "Yoga & Pilates",
    description: "Focus on mindfulness, flow, and spiritual connection. 🧘‍♂️",
    icon: "self_improvement",
    color: "bg-primary-container text-on-primary-container",
    className: "md:col-span-1",
  },
  {
    title: "Personal Training",
    description: "Strength, endurance, and high-performance coaching. ⚡",
    icon: "fitness_center",
    color: "bg-secondary-container text-on-secondary-container",
    className: "md:col-span-1",
  },
  {
    title: "Nutrition & Dietetics",
    description: "Holistic fueling, meal planning, and metabolic wellness for vibrant lifestyles. 🥗",
    icon: "restaurant_menu",
    color: "bg-tertiary-container text-on-tertiary-container",
    featured: true,
    image: "/images/resume/nutrition.webp",
    className: "md:col-span-2 bg-tertiary-container/10 border-tertiary-container/30",
  },
  {
    title: "Mindset & Soul",
    description: "Coaching, therapy, and emotional resilience practices. ✨",
    icon: "psychology",
    color: "bg-primary-container text-on-primary-container",
    className: "md:col-span-1",
  },
  {
    title: "Bodywork",
    description: "Therapeutic touch, recovery, and kinesthetic healing. 👐",
    icon: "spa",
    color: "bg-secondary-container text-on-secondary-container",
    className: "md:col-span-1",
  },
  {
    title: "Sleep & Breath",
    description: "Restoration, circadian rhythm optimization, and breathwork. 🌬️",
    icon: "dark_mode",
    color: "bg-primary-fixed text-on-primary-fixed",
    image: "/images/resume/sleep_and_breath.png",
    className: "md:col-span-2 bg-surface-container-low",
  },
];

export function Phase01Foundation() {
  return (
    <div className="relative min-h-screen pt-32 pb-40 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] bg-secondary/10 blur-[100px] rounded-full -z-10 animate-pulse" />
      <div className="fixed top-[40%] right-[10%] w-[20vw] h-[20vw] bg-tertiary/5 blur-[80px] rounded-full -z-10 animate-pulse" />

      {/* Hero Header Section */}
      <header className="mb-16 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-[12px] font-bold uppercase tracking-widest mb-6">
          Step 01 of 04
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.9]">
          Phase 01: <br />
          <span className="text-primary italic">Set Your Vibe</span>
        </h1>
        <p className="font-body text-xl text-on-surface-variant max-w-2xl mx-auto">
          Your journey starts here. Select the wellness discipline that fuels your passion so our AI can curate the perfect professional tone.
        </p>
      </header>

      {/* Discipline Grid (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {disciplines.map((item, index) => (
          <div
            key={index}
            className={cn(
              "group relative bg-surface-container-lowest rounded-[2rem] p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer prana-glow border border-white/20 overflow-hidden animate-in fade-in slide-in-from-bottom-4",
              item.className
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative z-10 flex flex-col h-full">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                  item.color
                )}
              >
                <span className="material-symbols-outlined text-3xl" data-icon={item.icon}>
                  {item.icon}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className={cn(
                "font-body text-on-surface-variant text-sm leading-relaxed mb-6",
                item.featured ? "max-w-xs" : ""
              )}>
                {item.description}
              </p>

              {item.image && (
                <div className={cn(
                  "mt-auto rounded-2xl overflow-hidden relative",
                  item.featured ? "absolute right-0 bottom-0 w-1/2 h-full opacity-20 group-hover:opacity-40 transition-opacity" : "h-32 bg-surface-container-high"
                )}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              <span className="material-symbols-outlined text-primary text-3xl" data-icon="check_circle">
                check_circle
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Next Action */}
      <div className="mt-20 flex flex-col items-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <button className="group relative bg-primary kinetic-gradient text-on-primary px-12 py-6 rounded-full text-xl font-extrabold flex items-center gap-4 transition-all duration-500 prana-glow hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
          Next Step: Personal Info
          <span className="material-symbols-outlined transition-transform duration-500 group-hover:translate-x-2" data-icon="arrow_forward">
            arrow_forward
          </span>
        </button>
        <p className="mt-6 font-label text-on-surface-variant/60 font-bold uppercase tracking-widest text-xs">
          Don&apos;t worry, you can change this later.
        </p>
      </div>
    </div>
  );
}
