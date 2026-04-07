"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutIntro } from "@/components/about/AboutIntro";
import { MissionVision } from "@/components/about/MissionVision";
import { MissionSection } from "@/components/about/MissionSection";
import { SecurityFocus } from "@/components/about/SecurityFocus";
import { TechFeatures } from "@/components/about/TechFeatures";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 kinetic-mesh min-h-screen flex flex-col bg-white"
    >
      {/* Hero Section - Full Width Photographic */}
      <AboutHero />

      {/* About Us Intro — Who we are, story, stats */}
      <AboutIntro />

      {/* Mission & Categories - Full Width Split Hero */}
      <MissionSection />

      {/* Security & Anti-Fraud - Full Width Background Hero */}
      <SecurityFocus />

      {/* Tech Features - Full Width Product Hero */}
      <div>
        <TechFeatures />
      </div>

    </motion.main>
  );
}
