"use client";

import { BadgeCheck, FileText, MousePointerClick, PartyPopper, SlidersHorizontal } from "lucide-react";

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
      <h2 className="text-[42px] md:text-[55px] font-black font-display mb-6 text-foreground">Your candidate journey, simplified</h2>
      <p className="mx-auto mb-24 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        Move from confused job hunting to a more guided, modern process built around how wellness professionals actually discover and win opportunities.
      </p>
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="hidden lg:block absolute top-14 left-0 w-full h-[3px] bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 z-0"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-16 gap-x-8 relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center gap-6 group">
              <div className={`size-24 rounded-full bg-card shadow-xl flex items-center justify-center border-4 transition-all duration-500 group-hover:scale-110 ${step.color}`}>
                {step.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-lg font-display text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground font-black uppercase tracking-widest text-[10px]">{step.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
