"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Yoga Trainer, Mumbai",
      img: "/images/home/priya-sharma.jpg",
      quote: "The AI Resume builder is a game-changer. I got 3 interviews within a week of signing up!"
    },
    {
      name: "Arjun Verma",
      role: "Fitness Coach, Delhi",
      img: "/images/home/arjun-verma.jpg",
      quote: "Finally a job board that doesn't feel like 2005. The swiping experience is addictive and efficient."
    }
  ];

  return (
    <section className="py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center">
        <div className="lg:col-span-1 space-y-10 text-foreground">
          <h2 className="text-5xl font-black font-display leading-[1.05]">Young India&apos;s Wellness Voice</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Join 50,000+ professionals who found their dream careers through our platform.
          </p>
          <div className="flex gap-12">
            <div>
              <span className="text-5xl font-black text-primary">50k+</span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-3">Active Users</p>
            </div>
            <div>
              <span className="text-5xl font-black text-secondary">1.2k+</span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-3">Hired Locally</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-10 rounded-[2.5rem] bg-card shadow-xl border-border/10 space-y-8 flex flex-col justify-between hover:shadow-2xl transition-all group">
              <CardContent className="p-0 space-y-8">
                <div className="space-y-6">
                  <div className="flex gap-1 text-tertiary">
                    {[1,2,3,4,5].map(s => <Star key={s} className="size-5 fill-current" />)}
                  </div>
                  <p className="text-xl font-bold leading-relaxed italic text-foreground">&quot;{t.quote}&quot;</p>
                </div>
                <Separator className="bg-border/50" />
                <div className="flex items-center gap-4">
                  <Avatar className="size-14 shadow-lg border-2 border-primary/10">
                    <AvatarImage src={t.img} className="object-cover" />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h5 className="font-black text-lg text-foreground">{t.name}</h5>
                    <p className="text-xs text-muted-foreground font-black uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
