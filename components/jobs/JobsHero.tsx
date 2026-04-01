"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

export function JobsHero() {
  const categories = [
    "Hair & Beauty",
    "Spa & Therapy",
    "Fitness & Yoga",
    "Nutrition & Wellness",
  ];

  return (
    <section className="relative space-y-12">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      
      <div className="max-w-4xl mt-24">
        <Badge className="rounded-full bg-primary/10 text-primary border border-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
          Candidate-side discovery
        </Badge>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] font-display text-foreground">
          Discover wellness roles that fit your training, style, and city.
        </h1>
        <p className="text-muted-foreground text-xl mt-6 max-w-3xl leading-relaxed font-medium">
          Explore roles across salons, spas, fitness studios, clinics, and wellness brands. Express interest quickly, then WJ India takes your profile through screening and matching for the right partner opportunity.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border/40 bg-card/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-card/40 backdrop-blur-2xl p-3 rounded-full flex flex-col md:flex-row items-center gap-3 shadow-2xl border border-border/20 ring-1 ring-white/20">
        <div className="flex-1 flex items-center gap-3 px-6 w-full">
          <Search className="size-5 text-primary" />
          <Input 
            className="bg-transparent border-none focus-visible:ring-0 w-full font-bold placeholder:text-muted-foreground/40 italic text-lg" 
            placeholder="Spa therapist, yoga trainer, nutritionist..." 
          />
        </div>
        <div className="h-8 w-[1px] bg-border/30 hidden md:block"></div>
        <div className="flex-1 flex items-center gap-3 px-6 w-full">
          <MapPin className="size-5 text-secondary" />
          <Input 
            className="bg-transparent border-none focus-visible:ring-0 w-full font-bold placeholder:text-muted-foreground/40 text-lg" 
            placeholder="Mumbai, Bengaluru, Delhi..." 
          />
        </div>
        <Button className="signature-gradient text-on-primary px-10 py-7 rounded-full font-black text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95 w-full md:w-auto border-none">
          Search Roles
        </Button>
      </div>
    </section>
  );
}
