"use client";

import { BadgeCheck, FileText, MousePointerClick, PartyPopper, SlidersHorizontal, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function HiringJourney() {
  const steps = [
    { icon: <FileText className="size-9" />, title: "1. Build your profile", subtitle: "Build resume in 60 sec", color: "text-primary border-primary/20" },
    { icon: <BadgeCheck className="size-9" />, title: "2. Show your strengths", subtitle: "Skills + certifications", color: "text-secondary border-secondary/20" },
    { icon: <MousePointerClick className="size-9" />, title: "3. Swipe and apply", subtitle: "Discover better-fit roles", color: "text-tertiary border-tertiary/20" },
    { icon: <SlidersHorizontal className="size-9" />, title: "4. Prepare with confidence", subtitle: "Interview practice", color: "text-primary border-primary/20" },
    { icon: <PartyPopper className="size-9" />, title: "5. Start your next chapter", subtitle: "Get hired", color: "text-on-secondary bg-secondary scale-125 shadow-2xl border-none" }
  ];

  return (
    <section className="py-32 text-center" id="journey">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-[42px] md:text-[55px] font-black font-display mb-6 text-foreground">Your candidate journey, simplified</h2>
        <p className="mx-auto mb-24 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Move from confused job hunting to a more guided, modern process built around how wellness professionals actually discover and win opportunities.
        </p>
      </motion.div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Connection Segments with Arrows */}
        <div className="hidden lg:grid grid-cols-4 absolute top-12 left-[10%] w-[80%] z-0 h-0.5 items-center">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative flex items-center justify-center">
              <div className="w-full h-[2px] bg-gradient-to-r from-muted-foreground/10 to-muted-foreground/20" />
              <ChevronRight className="absolute text-secondary size-5 opacity-40" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-16 gap-x-8 relative z-10">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5, type: "spring", stiffness: 100 }}
              className="flex flex-col items-center gap-6 group"
            >
              <div className={`size-24 rounded-full bg-card shadow-xl flex items-center justify-center border-4 transition-all duration-500 group-hover:scale-110 ${step.color}`}>
                {step.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-lg font-display text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground font-black uppercase tracking-widest text-[10px]">{step.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
