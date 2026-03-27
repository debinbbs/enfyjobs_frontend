"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wand2, Mic, Video } from "lucide-react";

export function JobsSidebar() {
  return (
    <aside className="space-y-8 h-full">
      {/* AI Resume Builder Promo */}
      <Card className="signature-gradient p-8 rounded-[2rem] text-on-primary relative overflow-hidden group shadow-2xl border-none">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <Wand2 className="size-10 mb-6 text-white" />
        <h3 className="text-2xl font-black font-display mb-2 text-white">AI Resume Optimizer</h3>
        <p className="text-white/80 font-bold text-sm mb-6 leading-relaxed italic uppercase tracking-wider">
          Tailor your CV for high-paying wellness roles in seconds.
        </p>
        <Button className="w-full py-6 bg-white text-primary font-black rounded-full hover:shadow-2xl transition-all active:scale-95 border-none text-sm uppercase tracking-widest">
          Upgrade My CV
        </Button>
      </Card>

      {/* Mock Interview Lab */}
      <Card className="bg-muted p-8 rounded-[2rem] space-y-6 shadow-sm border-border/10">
        <h3 className="text-xl font-black font-display tracking-tight text-foreground">Mock Interview Lab</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm p-4 rounded-2xl ring-1 ring-border/5">
            <div className="size-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg">
              <Mic className="size-5" />
            </div>
            <div>
              <p className="text-sm font-black text-foreground">Voice Session</p>
              <p className="text-xs text-muted-foreground font-medium italic">Practice with Wellness Bot</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm p-4 rounded-2xl ring-1 ring-border/5">
            <div className="size-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
              <Video className="size-5" />
            </div>
            <div>
              <p className="text-sm font-black text-foreground">Video Analytics</p>
              <p className="text-xs text-muted-foreground font-medium italic">Posture & Tone Analysis</p>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full py-6 border-2 border-primary/20 text-primary font-black rounded-full hover:bg-primary/5 transition-all text-sm tracking-wide">
          Start Prep Session
        </Button>
      </Card>

      {/* Profile Strength */}
      <Card className="bg-card p-8 rounded-[2.5rem] border border-border/10 shadow-xl ring-1 ring-white/10">
        <h3 className="text-xl font-black font-display mb-6 tracking-tight">Profile Vibe Score</h3>
        <div className="flex items-center gap-6 mb-6">
          <div className="relative size-16">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted" strokeWidth="3" />
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-black text-lg text-primary">75%</div>
          </div>
          <div className="flex flex-col">
            <p className="font-black text-primary uppercase text-xs tracking-widest">Looking good!</p>
            <p className="text-[10px] text-muted-foreground font-bold italic">Add a video intro to reach 90%</p>
          </div>
        </div>
        <Button className="w-full py-3 text-[10px] font-black bg-muted text-muted-foreground rounded-full border-none uppercase tracking-widest hover:bg-muted/80">
          Boost My Score
        </Button>
      </Card>

      {/* Trending Categories */}
      <div className="p-4 space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Trending Vibes</h4>
        <div className="flex flex-wrap gap-2">
          {["Sound Healing", "Reiki Masters", "Sleep Tech", "Holistic Chef"].map((tag) => (
            <Badge key={tag} className="px-4 py-2 bg-muted text-foreground rounded-full text-[10px] font-black transition-colors cursor-pointer border-none shadow-sm hover:bg-secondary-container hover:text-on-secondary-container tracking-widest uppercase">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </aside>
  );
}
