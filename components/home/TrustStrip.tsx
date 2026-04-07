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
      className="py-8 border-t border-white/5 bg-black/20 backdrop-blur-2xl relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-wrap justify-between items-center gap-8 lg:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-center gap-4 group/item min-w-[180px]"
          >
            <div className="size-12 rounded-2xl bg-white/10 border border-white/10 shadow-2xl flex items-center justify-center group-hover/item:scale-110 transition-transform duration-500">
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white leading-none">{stat.label}</span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mt-1.5">{stat.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
