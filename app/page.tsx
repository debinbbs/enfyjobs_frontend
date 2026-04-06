"use client";

import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Categories } from "@/components/home/Categories";
import { SwipeShowcase } from "@/components/home/SwipeShowcase";
import { Upskilling } from "@/components/home/Upskilling";
import { HiringJourney } from "@/components/home/HiringJourney";
import { TrustPromise } from "@/components/home/TrustPromise";
import { Testimonials } from "@/components/home/Testimonials";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 kinetic-mesh min-h-screen"
    >
      <Hero />
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-32 pb-32">
        <Categories />
        <SwipeShowcase />
        <HiringJourney />
        <Upskilling />
        <TrustPromise />
        <Testimonials />
      </div>
    </motion.main>
  );
}
