"use client";

import { AboutHero } from "@/components/about/AboutHero";
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

      {/* Mission & Vision - Brand purpose, stats, and values */}
      <MissionVision />

      {/* Mission & Categories - Full Width Split Hero */}
      <MissionSection />

      {/* Security & Anti-Fraud - Full Width Background Hero */}
      <SecurityFocus />

      {/* Tech Features - Full Width Product Hero */}
      <div className="mb-32">
        <TechFeatures />
      </div>

    </motion.main>
  );
}
