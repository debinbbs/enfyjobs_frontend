"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Scissors, Sparkles, Sprout, HeartPulse, Hotel, Flower2 } from "lucide-react";

export function MissionSection() {
  const values = [
    { title: "Quality Over Quantity", icon: <Sparkles className="size-5" /> },
    { title: "Radical Transparency", icon: <Scissors className="size-5" /> },
    { title: "Empowering Growth", icon: <Sprout className="size-5" /> },
    { title: "Inclusive Community", icon: <HeartPulse className="size-5" /> },
    { title: "Global Standards", icon: <Hotel className="size-5" /> },
    { title: "Inner Balance", icon: <Flower2 className="size-5" /> }
  ];

  return (
    <section className="w-full py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration for more airy feel */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-20 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-12 z-10"
        >
          <div className="space-y-6">
            <h2 className="text-[44px] md:text-[65px] font-black leading-[1] text-foreground tracking-tight">
              Elevating India's <br />
              <span className="text-primary italic">Vocational Elite</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
              We aren't just another job board. We are systematically organizing the unorganized sector, giving wellness professionals the dignity and visibility they deserve. 
            </p>
          </div>

          <div className="space-y-8">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground/60 border-l-4 border-primary pl-4">
              Our Guiding Principles
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {values.map((val, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-foreground group"
                >
                  <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    {val.icon}
                  </div>
                  <span className="font-bold text-base tracking-tight">{val.title}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
             <div className="flex gap-4 items-center">
                <div className="size-1 rounded-full bg-primary" />
                <p className="text-lg text-foreground font-black italic">
                   "Stop searching. Start getting discovered."
                </p>
             </div>
          </div>
        </motion.div>

        {/* Floating Transparent Image - Character cut-out */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex-1 relative flex items-center justify-center w-full min-h-[500px]"
        >
          <div className="relative w-full aspect-square max-w-[600px]">
            {/* Subtle shadow underneath character */}
            <div className="absolute bottom-[5%] left-1/4 right-1/4 h-[15px] bg-black/5 blur-2xl rounded-full" />
            
            <motion.div
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full h-full"
            >
              <Image 
                src="/images/about/mission-floating-t.png"
                alt="Zen Yoga Instructor"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Overlapping Floating Stat */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute top-1/3 left-0 p-5 rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-2xl z-20 max-w-[160px] hidden md:block"
            >
               <p className="text-primary font-black text-2xl leading-none">10k+</p>
               <p className="text-foreground/60 text-[10px] font-bold uppercase tracking-widest mt-1">Community Members</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
