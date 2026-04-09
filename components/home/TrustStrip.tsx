"use client";

import { ShieldCheck, Users, Zap, Coins, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function TrustStrip() {
  const stats = [
    {
      icon: <ShieldCheck className="size-5 text-secondary" />,
      label: "500+",
      sub: "Verified Employers",
    },
    {
      icon: <Users className="size-5 text-primary" />,
      label: "12k+",
      sub: "Wellness Pros",
    },
    {
      icon: <Coins className="size-5 text-tertiary" />,
      label: "₹0",
      sub: "Candidate Fees",
    },
    {
      icon: <FileText className="size-5 text-primary" />,
      label: "60 sec",
      sub: "Profile Creation",
    },
    {
      icon: <Zap className="size-5 text-secondary" />,
      label: "5 min",
      sub: "Avg. Response",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 py-5 backdrop-blur-2xl sm:py-6 md:py-8"
    >
      <div className="relative z-10 grid grid-cols-2 gap-3 px-4 sm:grid-cols-3 sm:gap-4 sm:px-5 lg:grid-cols-5 lg:px-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 group/item sm:px-4 sm:py-4"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-2xl transition-transform duration-500 group-hover/item:scale-110 sm:size-12">
              {stat.icon}
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="text-lg leading-none font-black text-white sm:text-2xl">{stat.label}</span>
              <span className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/60 sm:text-[10px] sm:tracking-[0.2em]">{stat.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
