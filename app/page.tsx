"use client";

import { Hero } from "@/components/home/Hero";
import { TrustPromise } from "@/components/home/TrustPromise";
import { Features } from "@/components/home/Features";
import { Categories } from "@/components/home/Categories";
import { SwipeShowcase } from "@/components/home/SwipeShowcase";
import { Upskilling } from "@/components/home/Upskilling";
import { HiringJourney } from "@/components/home/HiringJourney";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 md:px-10 pt-24">
      <Hero />
      <TrustPromise />
      <Features />
      <Categories />
      <SwipeShowcase />
      <HiringJourney />
      <Upskilling />
      <Testimonials />
    </main>
  );
}
