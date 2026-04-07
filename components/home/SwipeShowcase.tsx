"use client";

import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { CheckCircle2, X, Heart, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function SwipeShowcase() {
  return (
    <section className="py-32 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
      {/* LEFT COLUMN: Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-8"
      >
        <h2 className="text-[40px] md:text-[50px] font-bold leading-[1.1] text-white">
          India’s <span className="text-[#A78BFA]">discovery</span> platform for wellness talent.
        </h2>
        <p className="text-[17px] text-white/80 leading-relaxed max-w-lg">
          Instead of applying to hundreds of jobs, create your profile once and let verified wellness employers find you.
        </p>
        
        <div className="space-y-3 pt-2">
          <p className="text-xl font-bold text-white">
            Stop searching. Start getting discovered.
          </p>
          <p className="text-[15px] text-white/60">
            (Always 100% free for candidates)
          </p>
        </div>

        <div className="pt-4">
          <AuthModal>
            <Button size="lg" className="rounded-full bg-[#9333EA] text-white font-bold text-base hover:bg-[#7e22ce] transition-all px-8 h-14 active:scale-95 flex items-center gap-2 shadow-2xl">
              Create Profile
              <ChevronDown className="size-5" />
            </Button>
          </AuthModal>
        </div>
      </motion.div>

      {/* RIGHT COLUMN: Phone Mockup */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 relative w-full lg:min-h-[600px] flex justify-center lg:justify-end"
      >
        <div className="relative w-full max-w-[340px] lg:max-w-[380px] mt-10 md:mt-0">
          {/* Mobile Frame Mockup (Dark Mode) */}
          <div className="relative aspect-[9/19] bg-[#111625] rounded-[3rem] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[8px] border-[#2A2A2A] overflow-hidden flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-4 pt-2 pb-2">
              <span className="text-[11px] font-bold text-white/60">9:41</span>
              <div className="flex gap-1.5">
                <div className="size-1.5 rounded-full bg-white/40"></div>
                <div className="size-1.5 rounded-full bg-white/40"></div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="flex-1 flex flex-col relative px-3 pt-2 pb-6">
              <div className="flex justify-center mb-4">
                <ChevronDown className="text-white/20 size-8 stroke-[3]" />
              </div>

              {/* Main Image */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-sm mb-4">
                <Image 
                  src="/images/home/priya-sharma.jpg"
                  alt="Lara Sharma"
                  fill
                  className="object-cover"
                />
                {/* Subtle dark gradient overlay so text below pops if needed, or just keep it clean */}
              </div>

              {/* Profile Detail */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-[22px] font-bold text-white border-transparent tracking-tight">Lara Sharma</h3>
                  <span className="font-bold text-white/70 text-lg">29</span>
                </div>
                <p className="text-[13px] font-semibold text-white/60 mb-2">Lotus Meditator</p>
                <p className="text-[11px] font-medium text-white/40 leading-relaxed border-transparent line-clamp-3">
                  A nice meditation and yoga practitioner. I love mindful flows and deep stretching.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center items-center gap-6 mt-auto">
                <button className="size-16 rounded-full bg-[#1F2937] shadow-xl flex items-center justify-center text-rose-500 hover:scale-105 transition-transform border border-white/5">
                  <X className="size-8 stroke-[2.5]" />
                </button>
                <button className="size-16 rounded-full bg-[#1F2937] shadow-xl flex items-center justify-center text-emerald-500 hover:scale-105 transition-transform border border-white/5">
                  <Heart className="size-8 fill-emerald-500 text-emerald-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Floating 'Spa Bliss' Overlay - Floating OUTSIDE right edge */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute top-16 -right-16 md:-right-24 bg-[#0F1523]/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex items-center gap-3 border border-white/10 w-[240px] z-30"
          >
            <div className="size-8 shrink-0 flex items-center justify-center">
              <Sparkles className="size-6 text-[#A78BFA]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-white leading-[1.3]">Spa Bliss is interested<br/><span className="text-white/60">in your profile!</span></p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
