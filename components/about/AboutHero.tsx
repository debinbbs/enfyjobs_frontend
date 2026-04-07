"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { TrustStrip } from "@/components/home/TrustStrip";

export function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── BACKGROUND: vibrant gradient base + photo ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/hero.jpg"
          alt="Wellness Professionals"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Warm, vibrant gradient overlay — NOT dark/black */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B4533]/80 via-[#1a6b4a]/60 to-[#7C3AED]/40 z-10" />
        {/* Colorful glow spots */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F59E0B]/30 via-[#EC4899]/20 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent z-10" />
      </div>

      {/* ── Decorative floating orbs ── */}
      <div className="absolute top-32 right-20 size-64 rounded-full bg-amber-400/20 blur-3xl z-20 pointer-events-none" />
      <div className="absolute bottom-40 right-40 size-48 rounded-full bg-pink-500/25 blur-3xl z-20 pointer-events-none" />
      <div className="absolute top-1/2 left-10 size-40 rounded-full bg-emerald-400/20 blur-3xl z-20 pointer-events-none" />

      {/* ── CONTENT ── */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-10 w-full pt-44 pb-36">
        <div className="max-w-3xl space-y-8">

          {/* Label pill removed per user request */}

          {/* Main Headline — ONE color story */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[48px] md:text-[76px] font-black leading-[1.0] text-white tracking-tight"
          >
            We built this for your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-pink-300">
                talent.
              </span>
              {/* Underline decoration */}
              <span className="absolute bottom-1 left-0 w-full h-2 bg-gradient-to-r from-amber-400/60 to-pink-400/40 blur-sm rounded-full" />
            </span>
            <br />
            <span className="text-[#6EE7B7]">Not your resume.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-white/80 text-xl max-w-xl leading-relaxed"
          >
            Instead of applying to hundreds of jobs, create your profile once and let verified wellness employers actively hiring find you.
          </motion.p>

          {/* Removed redundant stats block */}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <AuthModal>
              <Button
                size="lg"
                className="inline-flex h-14 items-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-8 text-lg font-black text-white shadow-2xl shadow-orange-500/40 transition-all hover:scale-105 active:scale-95 hover:shadow-orange-500/60"
              >
                Create Profile
                <ArrowRight className="size-5" />
              </Button>
            </AuthModal>
            <Link
              href="/jobs"
              className="inline-flex h-14 items-center rounded-2xl bg-white/15 backdrop-blur-xl text-white font-black text-lg border-2 border-white/30 hover:bg-white/25 transition-all px-8 active:scale-95"
            >
              Explore Jobs
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating badge removed per user request */}

      {/* TrustStrip */}
      <div className="absolute bottom-0 left-0 w-full z-40">
        <TrustStrip />
      </div>
    </section>
  );
}
