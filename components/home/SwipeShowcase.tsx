"use client";

import { Swapper } from "@/components/ui/Swapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle2, X, Heart, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from 'swiper';

const JOBS = [
  {
    id: "s1",
    title: "Senior Fitness Lead",
    company: "Cult.fit",
    location: "Bangalore",
    badge: "POPULAR",
    image: "/images/home/showcase/fitness-class.jpg",
    salary: "₹8L - ₹12L PA",
    type: "Full-Time",
    desc: "Lead high-energy fitness sessions and mentor a team of trainers at India's leading health & wellness platform.",
    logo: "/images/home/showcase/cultfit-logo.png"
  },
  {
    id: "s2",
    title: "Advanced Yoga Instructor",
    company: "The Yoga House",
    location: "Mumbai",
    badge: "PREMIUM",
    image: "/images/home/showcase/yoga-class.jpg",
    salary: "₹5L - ₹8L PA",
    type: "Contract",
    desc: "Guide advanced practitioners through traditional and modern vinyasa flows in our serene sanctuary.",
    logo: "/images/home/showcase/yoga-house-logo.png"
  },
  {
    id: "s3",
    title: "Clinical Nutritionist",
    company: "VitalEat",
    location: "Delhi",
    badge: "NEW",
    image: "/images/home/showcase/nutritionist.jpg",
    salary: "₹10L - ₹15L PA",
    type: "Full-Time",
    desc: "Design science-backed nutrition plans for elite athletes and wellness enthusiasts at VitalEat.",
    logo: "/images/home/showcase/vitaleat-logo.png"
  },
  {
    id: "s4",
    title: "Therapeutic Masseur",
    company: "The Spa Sanctuary",
    location: "Udaipur",
    badge: "TOP PICK",
    image: "/images/home/showcase/fitness-class.jpg", // Using existing for now, would generate new in a real flow
    salary: "₹4L - ₹7L PA",
    type: "Full-Time",
    desc: "Join our luxury wellness retreat to deliver signature therapeutic treatments aimed at complete relaxation and recovery.",
    logo: "/images/home/showcase/yoga-house-logo.png"
  }
];

export function SwipeShowcase() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleNext = () => swiper?.slideNext();
  const handlePrev = () => swiper?.slidePrev();

  return (
    <section className="py-32 flex flex-col lg:flex-row items-center gap-24">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-2 lg:order-1 relative w-full"
      >
        <div className="relative w-full max-w-sm mx-auto h-[550px]">
          <div className="absolute -inset-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 blur-[80px] rounded-full"></div>
          <Swapper
            items={JOBS}
            onSwiper={setSwiper}
            effect="cards"
            renderItem={(job: typeof JOBS[0]) => (
              <Card className="bg-card rounded-[2.5rem] p-4 shadow-2xl relative overflow-hidden border-none h-full w-full ring-1 ring-border/10">
                <CardContent className="p-0 h-full flex flex-col">
                  <div className="h-[280px] relative rounded-[2rem] overflow-hidden shadow-lg group">
                    <Image 
                      src={job.image}
                      alt={job.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase">
                      {job.badge}
                    </div>

                    <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="size-8 border border-white/20 bg-white/10 backdrop-blur-md p-1">
                          <AvatarImage src={job.logo} className="object-contain" />
                          <AvatarFallback className="text-[10px]">{job.company.substring(0,2)}</AvatarFallback>
                        </Avatar>
                        <p className="text-xs opacity-80 font-bold">{job.company} • {job.location}</p>
                      </div>
                      <h3 className="text-2xl font-black font-display tracking-tight leading-none">{job.title}</h3>
                    </div>
                  </div>

                  <div className="flex-1 p-6 space-y-4 flex flex-col">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-muted text-muted-foreground border-none rounded-lg text-[10px] font-black uppercase tracking-widest italic">{job.type}</Badge>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground border-none rounded-lg text-[10px] font-black uppercase tracking-widest italic">{job.salary}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium line-clamp-2 italic leading-relaxed">
                      &quot;{job.desc}&quot;
                    </p>
                    <div className="mt-auto flex justify-between items-center gap-4">
                      <Button 
                        variant="outline" 
                        onClick={handlePrev}
                        className="size-14 rounded-full border-2 border-destructive/20 text-destructive flex items-center justify-center hover:bg-destructive/5 transition-all"
                      >
                        <X className="size-7" />
                      </Button>
                      <Button variant="outline" className="flex-1 h-14 rounded-full font-black text-sm border-2 border-border/10 hover:bg-muted transition-all uppercase tracking-widest italic">View Job</Button>
                      <Button 
                        variant="outline"
                        onClick={handleNext}
                        className="size-14 rounded-full border-2 border-secondary/20 text-secondary flex items-center justify-center hover:bg-secondary/5 transition-all"
                      >
                        <Heart className="size-7 fill-current" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 order-1 lg:order-2 space-y-10"
      >
        <h2 className="text-[42px] md:text-[55px] font-black font-display leading-[1.1] text-foreground">Swipe. Save. <span className="text-secondary">Stand out.</span></h2>
        <p className="text-xl text-muted-foreground leading-relaxed">
          WJ India turns job discovery into something faster and more intuitive. Explore wellness roles with a swipe-first experience that feels built for how candidates already browse and choose.
        </p>
        <ul className="space-y-6">
          {[
            "Discover curated wellness opportunities quickly",
            "Save promising roles without losing momentum",
            "Apply with a cleaner, more candidate-friendly flow"
          ].map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
              className="flex items-center gap-5"
            >
              <CheckCircle2 className="text-secondary size-8" />
              <span className="font-bold text-lg text-foreground">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
