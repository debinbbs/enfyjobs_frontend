"use client";

import { BadgeCheck, FileText, MousePointerClick, PartyPopper, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export function HiringJourney() {
  const steps = [
    { icon: <FileText className="size-9" />, title: "1. Build your profile", subtitle: "Resume + basics", color: "text-primary border-primary/20" },
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
        {/* Connection Line */}
        <div className="hidden lg:flex absolute top-12 left-[10%] w-[80%] items-center z-0">
          <div className="flex-1 h-[2px] bg-gradient-to-r from-primary/20 via-secondary/20 to-secondary/20" />
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 0.4, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-secondary -ml-2"
          >
            <ChevronRight className="size-5" />
          </motion.div>
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
