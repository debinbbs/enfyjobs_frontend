"use client";

import Image from "next/image";
import Link from "next/link";
import { AuthModal } from "@/components/auth/AuthModal";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TrustStrip } from "./TrustStrip";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-Width Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/all/spa-wellness.jpg"
          alt="Serene Wellness Atmosphere"
          fill
          className="object-cover"
          priority
        />
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-20"></div>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-10 w-full pt-48 pb-32">
        <div className="max-w-3xl space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge className="w-fit rounded-md bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
              🔍 India&apos;s discovery platform for wellness talent.
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[42px] md:text-[65px] font-black leading-[1.1] font-display text-white"
          >
            Get discovered for wellness jobs &mdash; not{" "}
            <span className="text-primary-container">just apply.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
          >
            Create your profile in 60 seconds and get matched with verified wellness employers actively hiring.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <AuthModal>
              <button className="inline-flex h-14 items-center gap-2 rounded-lg bg-white px-8 text-lg font-black text-primary shadow-2xl transition-all hover:scale-105 active:scale-95 hover:bg-primary-container hover:text-white">
                Create Profile
                <ArrowRight className="size-5" />
              </button>
            </AuthModal>
            <Link
              href="/jobs"
              className="inline-flex h-14 items-center gap-2 rounded-lg bg-white/10 backdrop-blur-md text-white font-black text-lg border-2 border-white/30 hover:bg-white/20 transition-all px-8 active:scale-95"
            >
              Get Discovered
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Decorative Blur Element */}

      <div className="absolute bottom-0 left-0 w-full z-40">
        <TrustStrip />
      </div>
    </section>
  );
}
