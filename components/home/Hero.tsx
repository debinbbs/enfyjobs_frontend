"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swapper } from "@/components/ui/Swapper";
import { motion } from "framer-motion";
import { Heart, FileText, Target, ArrowRight, Sparkles, X } from "lucide-react";
import type { Swiper as SwiperType } from 'swiper';

const JOBS = [
  {
    id: 1,
    title: "Makeup Artist",
    company: "Glow Theory Studio",
    location: "Mumbai",
    badge: "Beauty",
    image: "/images/home/hero/makeup-artist.svg",
    match: 97
  },
  {
    id: 2,
    title: "Hair Stylist",
    company: "Muse Salon",
    location: "Bangalore",
    badge: "Hair",
    image: "/images/home/hero/hair-stylist.svg",
    match: 95
  },
  {
    id: 3,
    title: "Salon Manager",
    company: "Studio Mane",
    location: "Delhi",
    badge: "Salon Ops",
    image: "/images/home/hero/salon-manager.svg",
    match: 94
  },
  {
    id: 4,
    title: "Yoga Instructor",
    company: "Ananda Wellness",
    location: "Mumbai",
    badge: "Yoga",
    image: "/images/home/hero/yoga-instructor.jpg",
    match: 98
  },
  {
    id: 5,
    title: "Wellness Coach",
    company: "Serenity Stays",
    location: "Bangalore",
    badge: "Coaching",
    image: "/images/home/hero/wellness-coach.png",
    match: 95
  },
  {
    id: 6,
    title: "Nutritionist",
    company: "Vitality Pro",
    location: "Delhi",
    badge: "Nutrition",
    image: "/images/home/hero/nutritionist.png",
    match: 92
  },
  {
    id: 7,
    title: "Therapist",
    company: "Mind Sanctuary",
    location: "Pune",
    badge: "Mental Health",
    image: "/images/home/hero/mental-health-therapist.png",
    match: 89
  }
];

export function Hero() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const proofPoints = [
    {
      icon: <Heart className="size-4 text-primary fill-current" />,
      label: "Swipe",
      detail: "Discover roles fast and save the ones that feel right.",
    },
    {
      icon: <FileText className="size-4 text-secondary" />,
      label: "Resume",
      detail: "Build a cleaner profile with tools made for wellness talent.",
    },
    {
      icon: <Target className="size-4 text-tertiary" />,
      label: "Prepare",
      detail: "Practice, apply, and walk into interviews with more confidence.",
    },
  ];


  const handleNext = () => {
    if (swiper) swiper.slideNext();
  };

  const handlePrev = () => {
    if (swiper) swiper.slidePrev();
  };

  return (
    <section className="relative py-12 md:py-16 overflow-visible">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="kinetic-blob w-96 h-96 bg-primary-container -top-20 -left-20"
      ></motion.div>
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="kinetic-blob w-80 h-80 bg-secondary-container bottom-0 -right-10"
      ></motion.div>

      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 space-y-8 z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge className="w-fit rounded-full bg-secondary/10 text-secondary border border-secondary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em]">
              Built for wellness candidates
            </Badge>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[42px] md:text-[55px] font-black leading-[1.1] font-display text-foreground"
          >
            Find wellness roles that actually fit your energy, skills, and city.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Wellnessjobsindia helps wellness professionals discover opportunities, build stronger applications, and move through the hiring journey with less confusion. Swipe roles, sharpen your resume, and get ready for the next step.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/jobs"
              className="inline-flex h-14 items-center gap-2 rounded-full signature-gradient px-8 text-lg font-black text-on-primary shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Explore Roles
              <ArrowRight className="size-5" />
            </Link>
            <AuthModal>
              <Button size="lg" variant="outline" className="rounded-full bg-card text-foreground font-black text-lg border-2 border-border/50 hover:bg-muted transition-all px-8 h-14 active:scale-95">
                Get Started
              </Button>
            </AuthModal>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl"
          >
            {proofPoints.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + (idx * 0.1), duration: 0.5 }}
                className="rounded-[1.5rem] border border-border/30 bg-card/80 px-5 py-4 shadow-lg hover:shadow-xl transition-shadow cursor-default"
              >
                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-foreground">
                  {item.icon}
                  {item.label}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="flex-1 relative w-full max-w-[480px] h-[580px] flex items-center justify-center">
          <Swapper
            items={JOBS}
            onSwiper={setSwiper}
            effect="cards"
            renderItem={(job) => (
              <Card className="bg-card rounded-[2.5rem] p-4 shadow-2xl relative overflow-hidden border-none h-full w-full ring-1 ring-border/10">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="flex-1 relative rounded-[2rem] overflow-hidden shadow-lg group">
                    <Image
                      src={job.image}
                      alt={job.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                      <div className="flex flex-col gap-1">
                        <Badge className="w-fit mb-2 bg-white/20 backdrop-blur-md text-white border-none text-[10px] font-black uppercase tracking-[0.2em]">
                          {job.badge}
                        </Badge>
                        <h3 className="text-3xl font-black font-display tracking-tight leading-none mb-1">
                          {job.title}
                        </h3>
                        <p className="text-sm font-medium opacity-80 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                          {job.company} • {job.location}
                        </p>
                      </div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
                      <Sparkles className="size-3 text-secondary" />
                      <span className="text-white font-black text-[10px] uppercase tracking-widest">{job.match}% Match</span>
                    </div>

                    <div className="absolute top-6 left-6 bg-black/30 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl flex items-center gap-2">
                      <Heart className="size-3 text-white fill-current" />
                      <span className="text-white font-black text-[10px] uppercase tracking-widest">Swipe to shortlist</span>
                    </div>
                  </div>

                  <div className="p-6 flex justify-center items-center gap-8 bg-card">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrev}
                      className="size-14 rounded-full border-border/10 text-muted-foreground shadow-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all bg-surface-container-low"
                    >
                      <X className="size-6" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNext}
                      className="size-14 rounded-full border-border/10 text-secondary shadow-sm hover:bg-secondary/10 hover:border-secondary/20 transition-all bg-surface-container-low"
                    >
                      <Heart className="size-6 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          />
          <div className="absolute inset-0 bg-primary opacity-5 blur-[100px] -z-10 rounded-full scale-125"></div>
        </div>
      </div>
    </section>
  );
}
