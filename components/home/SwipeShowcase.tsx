"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, X, Heart } from "lucide-react";

export function SwipeShowcase() {
  return (
    <section className="py-32 flex flex-col lg:flex-row items-center gap-24">
      <div className="flex-1 order-2 lg:order-1 relative">
        <div className="relative w-full max-w-sm mx-auto">
          <div className="absolute -inset-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 blur-[80px] rounded-full"></div>
          <Card className="relative bg-card rounded-[2.5rem] p-8 shadow-2xl border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="mb-6 flex items-center gap-4">
                <Avatar className="size-12 shadow-inner border border-border/50 bg-muted p-1">
                  <AvatarImage src="/images/home/showcase/cultfit-logo.png" className="object-contain" />
                  <AvatarFallback>CF</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-black text-lg text-foreground">Cult.fit</h4>
                  <p className="text-[10px] text-muted-foreground font-black tracking-[0.2em] uppercase">Bangalore, IN</p>
                </div>
              </div>
              <div className="aspect-square rounded-3xl mb-8 overflow-hidden shadow-xl relative border border-border/20">
                <Image 
                  src="/images/home/showcase/fitness-class.jpg"
                  alt="Fitness Class"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mb-8 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-black font-display leading-tight text-foreground">Senior Fitness Lead</h3>
                  <span className="text-secondary font-black text-lg">₹8L - 12L</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black rounded-lg uppercase tracking-widest border-secondary/20">FULL-TIME</Badge>
                  <Badge variant="outline" className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border-primary/20">ONSITE</Badge>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 h-14 rounded-full border-2 border-destructive/20 text-destructive font-bold flex items-center justify-center gap-2 hover:bg-destructive/5 transition-all">
                  <X className="size-5" /> Pass
                </Button>
                <Button className="flex-1 h-14 rounded-full signature-gradient text-on-primary font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform border-none">
                  <Heart className="size-5 fill-current" /> Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex-1 order-1 lg:order-2 space-y-10">
        <h2 className="text-5xl md:text-7xl font-black font-display leading-[1.05] text-foreground">Swipe. Save. <span className="text-secondary">Stand out.</span></h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          WJ India turns job discovery into something faster and more intuitive. Explore wellness roles with a swipe-first experience that feels built for how candidates already browse and choose.
        </p>
        <ul className="space-y-6">
          {[
            "Discover curated wellness opportunities quickly",
            "Save promising roles without losing momentum",
            "Apply with a cleaner, more candidate-friendly flow"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-5">
              <CheckCircle2 className="text-secondary size-8" />
              <span className="font-bold text-lg text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
