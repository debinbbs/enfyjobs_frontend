"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { ArrowRight, Sparkles } from "lucide-react";
import { TrustStrip } from "@/components/home/TrustStrip";

export function AboutHero() {
  const tags = ["Beauty & Salon", "Spa & Therapy", "Yoga & Wellness", "Hotel & Hospitality"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Vibrant Background Photo — lighter overlays to let color shine */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about/main-hero-bg.png"
          alt="Happy Wellness Professionals"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Lighter overlay so the vibrant photo shows through */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B4533]/85 via-[#0B4533]/50 to-transparent z-10" />
        {/* Subtle top-to-bottom for header clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 z-10" />
        {/* Colorful vibrant tint on the right side */}
        <div className="absolute inset-0 bg-gradient-to-tl from-violet-600/20 via-pink-500/10 to-transparent z-10" />
      </div>

      {/* CONTENT */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-10 w-full pt-40 pb-36">
        <div className="max-w-3xl space-y-8">

          {/* Vibrant badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500/30 to-pink-500/30 backdrop-blur-md text-white border border-white/30 px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em]">
              <Sparkles className="size-3.5 text-pink-300" />
              About WellnessJobsIndia
            </span>
          </motion.div>

          {/* Bold headline with colorful accent */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[46px] md:text-[72px] font-black leading-[1.0] text-white tracking-tight"
          >
            Your Skills,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
              Your Future.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-violet-300 to-purple-300 italic">
              No Degree Required.
            </span>
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-white/90 text-xl max-w-2xl leading-relaxed font-medium"
          >
            India's first wellness job portal dedicated to vocational talent. We prioritize your skills over your diploma — connecting you with verified, premium wellness brands.
          </motion.p>

          {/* Industry tags */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs font-bold text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link
              href="/jobs"
              className="inline-flex h-14 items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 px-8 text-lg font-black text-white shadow-2xl shadow-purple-500/30 transition-all hover:scale-105 active:scale-95 hover:shadow-pink-500/40"
            >
              Explore Roles
              <ArrowRight className="size-5" />
            </Link>
            <AuthModal>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl bg-white/10 backdrop-blur-md text-white font-black text-lg border-2 border-white/30 hover:bg-white/20 transition-all px-8 h-14 active:scale-95"
              >
                Join our Community
              </Button>
            </AuthModal>
          </motion.div>
        </div>
      </div>

      {/* TrustStrip */}
      <div className="absolute bottom-0 left-0 w-full z-40">
        <TrustStrip />
      </div>
    </section>
  );
}
