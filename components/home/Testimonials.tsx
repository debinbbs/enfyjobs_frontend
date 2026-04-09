"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Yoga Trainer, Mumbai",
      img: "/images/home/priya-sharma.jpg",
      quote: "The resume builder helped me present my certifications and experience much better. I started getting serious callbacks instead of silence."
    },
    {
      name: "Arjun Verma",
      role: "Fitness Coach, Delhi",
      img: "/images/home/arjun-verma.jpg",
      quote: "The swiping flow is quick, but what I liked most was that the jobs actually felt relevant to my background and goals."
    }
  ];

  return (
    <div id="testimonials" className="w-full">
      <div className="grid grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-3 lg:gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1 space-y-10 text-foreground"
        >
          <h2 className="text-[2.25rem] sm:text-[2.75rem] md:text-5xl font-black font-display leading-[1.05]">Built for the next wave of wellness talent</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
            From first jobs to stronger career moves, Wellnessjobsindia is designed to help wellness candidates feel more seen, more prepared, and more in control.
          </p>
          <div className="flex flex-wrap gap-8 sm:gap-12">
            <div>
              <span className="text-4xl font-black text-primary sm:text-5xl">50k+</span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-3">Candidates Exploring</p>
            </div>
            <div>
              <span className="text-4xl font-black text-secondary sm:text-5xl">1.2k+</span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-3">Career Moves Started</p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <Card className="flex h-full flex-col justify-between space-y-8 rounded-[2rem] border-border/10 bg-card p-6 shadow-xl transition-all group hover:shadow-2xl sm:rounded-[2.5rem] sm:p-8 md:p-10">
                <CardContent className="p-0 space-y-8">
                  <div className="space-y-6">
                    <div className="flex gap-1 text-tertiary">
                      {[1,2,3,4,5].map(s => <Star key={s} className="size-5 fill-current" />)}
                    </div>
                    <p className="text-lg font-bold italic leading-relaxed text-foreground sm:text-xl">&quot;{t.quote}&quot;</p>
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
