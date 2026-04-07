"use client";

import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Coins, Search, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export function TrustPromise() {
  const points = [
    {
      icon: <ShieldCheck className="size-8 text-secondary" />,
      title: "100% Verified Employers",
      description: "Every brand on EnfyJobs is manually vetted by our team to ensure they are legitimate wellness businesses.",
      color: "bg-secondary/10"
    },
    {
      icon: <Coins className="size-8 text-primary" />,
      title: "Zero Candidate Fees",
      description: "We never charge candidates for placements. Our platform is and will always be free for wellness talent.",
      color: "bg-primary/10"
    },
    {
      icon: <Search className="size-8 text-tertiary" />,
      title: "No Hidden Rounds",
      description: "Get clear visibility into the hiring process, from first swipe to final offer, with no black holes.",
      color: "bg-tertiary/10"
    },
    {
      icon: <UserCheck className="size-8 text-secondary" />,
      title: "Private & Secure",
      description: "Your profile is only visible to employers you swipe right on. No public resumes, no unsolicited calls.",
      color: "bg-secondary/10"
    }
  ];

  return (
    <div className="w-full" id="trust">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-8"
        >
          <Badge className="w-fit rounded-full bg-secondary/10 text-secondary border border-secondary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
            The EnfyJobs Promise
          </Badge>

          <div className="space-y-5">
            <h2 className="max-w-3xl text-[42px] font-black leading-[1.02] text-foreground md:text-[55px]">
              A job search that feels safer, clearer, and fair to candidates.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              We built EnfyJobs to fix the broken wellness hiring market. No more fake listings, no more placement fees, and no more ghosting.
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
              className="p-8 rounded-[2.5rem] bg-card border border-border/10 shadow-xl group hover:-translate-y-2 transition-all duration-500"
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
