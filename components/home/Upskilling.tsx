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
    <div className="relative w-full" id="growth">
      <div className="kinetic-blob w-[500px] h-[500px] bg-primary/10 top-0 right-0 blur-[120px]"></div>
      <div className="relative z-10 flex flex-col items-center gap-12 sm:gap-14 lg:flex-row lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1 space-y-10"
        >
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[55px] font-black font-display leading-tight text-foreground">Still building your edge? <br />Keep growing 💪</h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
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
          <Button size="lg" className="h-14 w-full rounded-full border-none px-8 text-lg font-black text-on-primary shadow-2xl signature-gradient transition-all hover:scale-105 active:scale-95 sm:h-16 sm:w-auto sm:px-12 sm:text-xl">
            Keep Improving
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex-1 grid w-full grid-cols-2 gap-4 sm:gap-6 lg:w-auto"
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
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative mt-8 aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-muted shadow-2xl sm:mt-16 sm:rounded-[2.5rem]"
          >
            <Image
              src="/images/home/upskilling/professionals.jpg"
              alt="Professionals"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
