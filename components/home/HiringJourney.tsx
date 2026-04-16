"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function HiringJourney() {
  const steps = [
    { 
      image: "/images/home/step-1.png", 
      step: "Step 1", 
      title: "Create Your Profile", 
      subtitle: "UPLOAD YOUR RESUME SKILLS. JUST 60 SECONDS.", 
      glow: "group-hover:shadow-blue-500/20"
    },
    { 
      image: "/images/home/step-2.jpg", 
      step: "Step 2", 
      title: "Get Discovered by Employers", 
      subtitle: "VERIFIED WELLNESS COMPANIES VIEW YOUR PROFILE.", 
      glow: "group-hover:shadow-cyan-500/20"
    },
    { 
      image: "/images/home/step-3.png", 
      step: "Step 3", 
      title: "Get Hired", 
      subtitle: "CONNECT WITH EMPLOYERS READY TO HIRE.", 
      glow: "group-hover:shadow-emerald-500/20"
    }
  ];

  return (
    <div className="w-full text-center" id="journey">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-4 text-[2rem] sm:text-[2.5rem] md:text-[55px] font-black font-display text-foreground">How it Works</h2>
        <p className="mx-auto mb-16 max-w-3xl text-base leading-relaxed text-muted-foreground sm:mb-20 sm:text-lg md:mb-24">
          Create your profile once and get discovered by verified wellness employers — no endless applications required.
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 mt-12 md:mt-20">
        {/* Connection Lines (Desktop) */}
        <div className="hidden lg:flex absolute top-[100px] left-[15%] w-[70%] z-0 h-px items-center pointer-events-none">
          <div className="w-full h-[1px] bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center h-full"
            >
              {/* Vertical Card Container */}
              <div className="w-full max-w-[280px] h-[520px] bg-gradient-to-b from-blue-50/80 via-white to-white rounded-[2rem] p-8 flex flex-col items-center border border-blue-100 shadow-sm group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                {/* Square Image Container */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-12 shadow-md group-hover:-translate-y-1 transition-transform duration-500">
                  <Image 
                    src={step.image} 
                    alt={step.title}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>

                {/* Text Content */}
                <div className="text-center space-y-4">
                  <span className="text-primary font-black uppercase tracking-widest text-[10px]">
                    {step.step}
                  </span>
                  <h4 className="font-display font-black text-xl text-foreground leading-tight px-2">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-[0.15em] leading-relaxed max-w-[200px] mx-auto">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
