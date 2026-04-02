"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight, Dumbbell, Leaf, Scissors, Sparkles, HeartHandshake, Brain } from "lucide-react";

export function Categories() {
  const categories = [
    {
      icon: <Sparkles className="size-10" />,
      label: "Beauty & Skin",
      detail: "Makeup artists, beauticians, skin therapists, beauty advisors",
      color: "text-primary",
    },
    {
      icon: <Scissors className="size-10" />,
      label: "Hair & Salon",
      detail: "Hair stylists, colorists, salon managers, floor leads",
      color: "text-secondary",
    },
    {
      icon: <HeartHandshake className="size-10" />,
      label: "Spa & Therapy",
      detail: "Spa therapists, massage experts, wellness attendants",
      color: "text-tertiary",
    },
    {
      icon: <Dumbbell className="size-10" />,
      label: "Fitness & Yoga",
      detail: "Fitness coaches, yoga instructors, studio trainers",
      color: "text-primary",
    },
    {
      icon: <Leaf className="size-10" />,
      label: "Nutrition & Wellness",
      detail: "Nutritionists, wellness coaches, lifestyle consultants",
      color: "text-secondary",
    },
    {
      icon: <Brain className="size-10" />,
      label: "Mental Wellness",
      detail: "Counselors, therapists, support professionals",
      color: "text-tertiary",
    },
  ];

  return (
    <section className="py-20 px-2 md:px-4" id="categories">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div className="max-w-xl space-y-4">
          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight">Explore the paths wellness talent actually grows into</h2>
          <p className="text-muted-foreground text-lg">Browse roles by skill area and discover where your training and interests fit best.</p>
        </div>
        <a href="/jobs" className="inline-flex items-center gap-2 p-0 text-lg font-black text-primary transition-colors hover:text-primary/80">
          View all roles <ArrowRight className="group-hover:translate-x-2 transition-transform size-6" />
        </a>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
        {categories.map((cat, i) => (
          <Card key={i} className="flex h-full flex-col items-center gap-5 p-8 rounded-3xl bg-card shadow-lg border-border/5 hover:-translate-y-2 transition-all cursor-pointer group text-center">
            <div className={`${cat.color} group-hover:scale-110 transition-transform`}>{cat.icon}</div>
            <span className="font-bold text-center font-display text-foreground">{cat.label}</span>
            <p className="text-sm leading-relaxed text-muted-foreground">{cat.detail}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
