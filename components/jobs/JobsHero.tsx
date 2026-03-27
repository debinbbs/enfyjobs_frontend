"use client";

import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function JobsHero() {
  return (
    <section className="relative space-y-12">
      {/* Background Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      
      <div className="max-w-3xl mt-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.05] font-display text-foreground">
          Find your <span className="text-primary italic">Prana.</span><br />Land the dream.
        </h1>
        <p className="text-muted-foreground text-xl mt-6 max-w-lg leading-relaxed font-medium">
          Discover the highest-vibe wellness roles across India&apos;s premier retreats, studios, and health tech firms.
        </p>
      </div>

      {/* Kinetic Search Bar */}
      <div className="bg-card/40 backdrop-blur-2xl p-3 rounded-full flex flex-col md:flex-row items-center gap-3 shadow-2xl border border-border/20 ring-1 ring-white/20">
        <div className="flex-1 flex items-center gap-3 px-6 w-full">
          <Search className="size-5 text-primary" />
          <Input 
            className="bg-transparent border-none focus-visible:ring-0 w-full font-bold placeholder:text-muted-foreground/40 italic text-lg" 
            placeholder="Yoga, Fitness, Nutritionist..." 
          />
        </div>
        <div className="h-8 w-[1px] bg-border/30 hidden md:block"></div>
        <div className="flex-1 flex items-center gap-3 px-6 w-full">
          <MapPin className="size-5 text-secondary" />
          <Input 
            className="bg-transparent border-none focus-visible:ring-0 w-full font-bold placeholder:text-muted-foreground/40 text-lg" 
            placeholder="Mumbai, Bangalore, Remote" 
          />
        </div>
        <Button className="signature-gradient text-on-primary px-10 py-7 rounded-full font-black text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all active:scale-95 w-full md:w-auto border-none">
          Pulse Search
        </Button>
      </div>
    </section>
  );
}
