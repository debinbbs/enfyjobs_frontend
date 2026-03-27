"use client";

import { JobCard } from "./JobCard";
import { Button } from "@/components/ui/button";
import { Dumbbell, Apple, Flower2, Brain } from "lucide-react";

const RECOMMENDED_JOBS = [
  {
    title: "Elite Cross-Fit Coach",
    company: "Cult.fit",
    location: "South Bangalore",
    salary: "₹60k - 85k / Mo",
    type: "On-Site",
    icon: Dumbbell,
    iconBg: "bg-tertiary-container/30",
    iconColor: "text-on-tertiary"
  },
  {
    title: "Clinical Nutritionist",
    company: "HealthifyMe",
    location: "Remote (India)",
    salary: "₹10L - 15L PA",
    type: "Remote",
    icon: Apple,
    iconBg: "bg-primary-container/30",
    iconColor: "text-primary"
  },
  {
    title: "Ayurvedic Consultant",
    company: "Forest Essentials",
    location: "New Delhi",
    salary: "₹12L - 18L PA",
    type: "Hybrid",
    icon: Flower2,
    iconBg: "bg-secondary-container/30",
    iconColor: "text-secondary"
  },
  {
    title: "Mindfulness Coach",
    company: "Wysa",
    location: "Remote",
    salary: "₹9L - 14L PA",
    type: "Full-Time",
    icon: Brain,
    iconBg: "bg-surface-container-highest/30",
    iconColor: "text-primary"
  }
];

export function JobGrid() {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black font-display tracking-tight text-foreground">Recommended for You</h2>
        <Button variant="link" className="text-primary font-black text-sm uppercase tracking-widest">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        {RECOMMENDED_JOBS.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </section>
  );
}
