"use client";

import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Users, BadgeCheck, PhoneOff } from "lucide-react";
import { motion } from "framer-motion";

export function TrustPromise() {
  const points = [
    {
      icon: <Users className="size-8 text-secondary" />,
      title: "70%+ Wellness pros not on LinkedIn",
      description: "Many wellness professionals lack an active online presence. We help them get discovered by the right employers.",
      color: "bg-secondary/10"
    },
    {
      icon: <ShieldCheck className="size-8 text-primary" />,
      title: "You Control Visibility",
      description: "Vibe scores and curate your profile. Choose who sees your work and when.",
      color: "bg-primary/10"
    },
    {
      icon: <BadgeCheck className="size-8 text-tertiary" />,
      title: "Verified Employers Only",
      description: "Verified means only real, responsible wellness employers hire through our platform.",
      color: "bg-tertiary/10"
    },
    {
      icon: <PhoneOff className="size-8 text-secondary" />,
      title: "No Spam Calls",
      description: "Verified employer profiles ensure no unsolicited contacts reach your profile.",
      color: "bg-secondary/10"
    }
  ];

  return (
    <div className="w-full" id="trust">
      <div className="flex flex-col items-start gap-12 sm:gap-14 lg:flex-row lg:items-center lg:gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-8"
        >
          <Badge className="w-fit rounded-full bg-secondary/10 text-secondary border border-secondary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
            Solving the Wellness Skill Gap
          </Badge>

          <div className="space-y-5">
            <h2 className="max-w-3xl text-[2rem] sm:text-[2.5rem] font-black leading-[1.02] text-foreground md:text-[55px]">
              Solving the Wellness Skill Gap in India.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              Built for the next generation of wellness professionals to dominate their career — without the noise.
            </p>
          </div>
        </motion.div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-[2rem] border border-border/10 bg-card p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 sm:rounded-[2.5rem] sm:p-8"
            >
              <div className={`size-16 rounded-2xl ${point.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {point.icon}
              </div>
              <h4 className="text-xl font-black text-foreground mb-3">{point.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
