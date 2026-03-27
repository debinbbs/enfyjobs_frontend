"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserCircle2, Settings2, MoveRight } from "lucide-react";

export function Categories() {
  const categories = [
    { icon: <UserCircle2 className="size-10" />, label: "Yoga Trainer", color: "text-primary" },
    { icon: <Settings2 className="size-10" />, label: "Fitness Coach", color: "text-secondary" },
    { icon: <MoveRight className="size-10 rotate-45" />, label: "Nutritionist", color: "text-tertiary" },
    { icon: <UserCircle2 className="size-10" />, label: "Therapist", color: "text-primary" },
    { icon: <Settings2 className="size-10" />, label: "Spa & Wellness", color: "text-secondary" },
    { icon: <MoveRight className="size-10 -rotate-45" />, label: "Mental Health", color: "text-tertiary" },
  ];

  return (
    <section className="py-20 bg-muted/30 rounded-[3rem] px-10 md:px-16 border border-border/5">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
        <div className="max-w-xl space-y-4">
          <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight">Vibe-Based Categories</h2>
          <p className="text-muted-foreground text-lg">Explore niches that match your passion and lifestyle.</p>
        </div>
        <Button variant="link" className="text-primary font-black text-lg gap-2 group p-0">
          View all roles <ArrowRight className="group-hover:translate-x-2 transition-transform size-6" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <Card key={i} className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-card shadow-lg border-border/5 hover:-translate-y-2 transition-all cursor-pointer group">
            <div className={`${cat.color} group-hover:scale-110 transition-transform`}>{cat.icon}</div>
            <span className="font-bold text-center font-display text-foreground">{cat.label}</span>
          </Card>
        ))}
      </div>
    </section>
  );
}
