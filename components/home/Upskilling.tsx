"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BadgeCheck, TrendingUp, History, Users } from "lucide-react";
import { motion } from "framer-motion";

export function Upskilling() {
  const benefits = [
    { icon: <BadgeCheck className="size-7" />, text: "Verified Certificates" },
    { icon: <TrendingUp className="size-7" />, text: "Skill Growth Modules" },
    { icon: <History className="size-7" />, text: "Placement Support" },
    { icon: <Users className="size-7" />, text: "Community Access" }
  ];

  return (
    <section className="py-24" id="growth">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="bg-surface-container-low rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-2xl border border-outline-variant/10"
      >
        <div className="kinetic-blob w-[500px] h-[500px] bg-primary/10 top-0 right-0 blur-[120px]"></div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-1 space-y-10"
          >
            <h2 className="text-foreground text-[42px] md:text-[55px] font-black font-display leading-tight">Still building your edge? <br/>Keep growing 💪</h2>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-xl">
              Great roles go to candidates who keep improving. Use WJ India to strengthen your skills, build credibility, and stay ready for better opportunities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-foreground">
                  <div className="text-primary">{item.icon}</div>
                  <span className="font-bold">{item.text}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="h-16 px-12 rounded-full signature-gradient text-on-primary font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 border-none">
              Keep Improving
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex-1 grid grid-cols-2 gap-6 w-full lg:w-auto"
          >
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-muted relative shadow-2xl border border-white/10"
            >
              <Image 
                src="/images/home/upskilling/wellness-student.jpg"
                alt="Wellness Student"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-muted relative mt-16 shadow-2xl border border-white/10"
            >
              <Image 
                src="/images/home/upskilling/professionals.jpg"
                alt="Professionals"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
