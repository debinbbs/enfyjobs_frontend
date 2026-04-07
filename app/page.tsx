"use client";

import { Hero } from "@/components/home/Hero";
import { InfiniteMarquee } from "@/components/home/InfiniteMarquee";
import { Categories } from "@/components/home/Categories";
import { SwipeShowcase } from "@/components/home/SwipeShowcase";
import { Upskilling } from "@/components/home/Upskilling";
import { HiringJourney } from "@/components/home/HiringJourney";
import { TrustPromise } from "@/components/home/TrustPromise";
import { Testimonials } from "@/components/home/Testimonials";

import { motion } from "framer-motion";
import { Section } from "@/components/home/Section";
import { SectionFull } from "@/components/home/SectionFull";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 kinetic-mesh min-h-screen flex flex-col"
    >
      <Hero />

      {/* Categories - Clean Light */}
      <SectionFull className="bg-white" id="categories">
        <Categories />
      </SectionFull>

      {/* Marquee Break - Full Width Divider */}
      <div className="w-full bg-white">
        <InfiniteMarquee />
      </div>

      {/* Swipe Showcase - Dark Forest Premium - Full Width */}
      <SectionFull className="bg-[#0B4533] relative overflow-hidden group dark" id="showcase">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10">
          <SwipeShowcase />
        </div>
      </SectionFull>

      {/* Hiring Journey - Soft Muted */}
      <SectionFull className="bg-slate-50/50" id="journey">
        <HiringJourney />
      </SectionFull>

      {/* Upskilling & Trust Promise - Clean White */}
      <SectionFull className="bg-white space-y-32" innerClassName="space-y-32">
        <Upskilling />
        <TrustPromise />
      </SectionFull>

      {/* Testimonials - Soft Background */}
      <SectionFull className="bg-slate-50">
        <Testimonials />
      </SectionFull>
    </motion.main>
  );
}
