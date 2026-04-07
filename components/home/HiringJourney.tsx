"use client";

import { BadgeCheck, FileText, Search, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function HiringJourney() {
  const steps = [
    { icon: <FileText className="size-9" />, title: "Create Your Profile", subtitle: "Upload your resume skills. Just 60 Seconds.", color: "text-primary border-primary/20" },
    { icon: <Search className="size-9" />, title: "Get Discovered by Employers", subtitle: "Verified wellness companies view your profile.", color: "text-secondary border-secondary/20" },
    { icon: <BadgeCheck className="size-9" />, title: "Get Hired", subtitle: "Connect with employers ready to hire.", color: "text-on-secondary bg-secondary scale-125 shadow-2xl border-none" }
  ];

  return (
    <div className="w-full text-center" id="journey">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-[42px] md:text-[55px] font-black font-display mb-6 text-foreground">How it Works</h2>
        <p className="mx-auto mb-24 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Create your profile once and get discovered by verified wellness employers — no endless applications required.
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Connection Segments with Arrows */}
        <div className="hidden lg:grid grid-cols-2 absolute top-12 left-[10%] w-[80%] z-0 h-0.5 items-center">
          {[0, 1].map((i) => (
            <div key={i} className="relative flex items-center justify-center">
              <div className="w-full h-[2px] bg-gradient-to-r from-muted-foreground/10 to-muted-foreground/20" />
              <ChevronRight className="absolute text-secondary size-5 opacity-40" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8 relative z-10">
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
    </div>
  );
}
