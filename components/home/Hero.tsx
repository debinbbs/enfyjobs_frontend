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
    <section className="relative overflow-hidden">
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

      <div className="relative z-30 min-h-[100svh]">
        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-5 pt-28 pb-8 sm:px-6 sm:pt-32 md:px-10 md:pt-44 md:pb-10">
          <div className="max-w-3xl space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="w-fit rounded-md border border-white/30 bg-white/20 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs">
                India&apos;s discovery platform for wellness talent.
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[2.25rem] sm:text-[2.75rem] md:text-[4.0625rem] font-black leading-[1.05] font-display text-white"
            >
              Get discovered for wellness jobs &mdash; not{" "}
              <span className="text-primary-container">just apply.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="max-w-2xl text-base leading-relaxed font-medium text-white/90 sm:text-lg md:text-xl"
            >
              Create your profile in 60 seconds and get matched with verified wellness employers actively hiring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <AuthModal>
                <button className="inline-flex h-12 sm:h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 sm:px-8 text-base sm:text-lg font-black text-primary shadow-2xl transition-all hover:scale-105 active:scale-95 hover:bg-primary-container hover:text-white">
                  Create Profile
                  <ArrowRight className="size-5" />
                </button>
              </AuthModal>
              <Link
                href="/jobs"
                className="inline-flex h-12 sm:h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 sm:px-8 text-base sm:text-lg font-black text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
              >
                Browse Jobs
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 sm:mt-12">
            <TrustStrip />
          </div>
        </div>
      </div>
    </section>
  );
}
