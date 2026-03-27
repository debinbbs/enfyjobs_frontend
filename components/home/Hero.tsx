"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, Sparkles, X, Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative py-12 md:py-24 overflow-visible">
      <div className="kinetic-blob w-96 h-96 bg-primary-container -top-20 -left-20"></div>
      <div className="kinetic-blob w-80 h-80 bg-secondary-container bottom-0 -right-10"></div>
      
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8 z-10">
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight font-display text-foreground">
            Build Your Wellness Career — <span className="text-primary">Smarter, Faster, Better 🌿</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed">
            AI resumes, swipe jobs, and crack interviews — all in one sanctuary designed for the next generation of wellness professionals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full signature-gradient text-on-primary font-black text-lg shadow-xl hover:scale-105 transition-transform px-10 h-14 border-none">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-card text-foreground font-black text-lg border-2 border-border/50 hover:bg-muted transition-all px-10 h-14">
              Try Resume AI ⚡
            </Button>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-[500px]">
          <Card className="bg-muted rounded-[2rem] p-5 rotate-3 shadow-2xl relative z-20 overflow-hidden border-border/20">
            <CardContent className="p-0">
              <div className="bg-card rounded-2xl h-[520px] shadow-sm relative overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-sm">
                  <span className="font-bold text-primary">Discover Jobs</span>
                  <SlidersHorizontal className="text-muted-foreground cursor-pointer hover:text-primary transition-colors size-5" />
                </div>
                <div className="flex-1 p-5 flex flex-col justify-center items-center gap-8">
                  <div className="w-full aspect-[3/4] rounded-2xl relative overflow-hidden shadow-2xl group transition-transform hover:scale-[1.02]">
                    <Image 
                      src="/images/home/yoga-instructor.jpg"
                      alt="Yoga Instructor"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                      <h3 className="text-2xl font-bold font-display">Yoga Instructor</h3>
                      <p className="text-sm opacity-90">Ananda Wellness • Mumbai</p>
                    </div>
                    <div className="absolute top-5 left-5">
                      <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border-none">Yoga</Badge>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <Button variant="outline" size="icon" className="size-16 rounded-full border-destructive/20 text-destructive shadow-lg hover:bg-destructive/10 transition-all bg-card">
                      <X className="size-8" />
                    </Button>
                    <Button variant="outline" size="icon" className="size-16 rounded-full border-secondary/20 text-secondary shadow-lg hover:bg-secondary/10 transition-all bg-card">
                      <Heart className="size-8 fill-current" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            {/* Floating AI Match label */}
            <div className="absolute -top-4 -right-4 bg-tertiary-container p-3.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border border-white/40">
              <Sparkles className="size-4 text-on-tertiary" />
              <span className="text-on-tertiary font-black text-xs uppercase tracking-tighter">AI Match 98%</span>
            </div>
          </Card>
          <div className="absolute inset-0 bg-primary opacity-5 blur-[100px] -z-10 rounded-full scale-125"></div>
        </div>
      </div>
    </section>
  );
}
