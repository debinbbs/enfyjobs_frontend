"use client";

import { Swapper } from "@/components/ui/Swapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperType } from 'swiper';

const VIBE_JOBS = [
  {
    id: "v1",
    title: "Lead Vinyasa Master",
    company: "Ananda Himalayas",
    location: "Rishikesh",
    badge: "TOP RETREAT",
    image: "/images/home/hero/yoga-instructor.jpg",
    salary: "₹8L - ₹12L PA",
    type: "Full-Time",
    match: 98,
    desc: "Looking for a spirited leader to guide sunrise flows and meditation circles at our award-winning Himalayan sanctuary..."
  },
  {
    id: "v2",
    title: "Senior Wellness Coach",
    company: "Cult.fit",
    location: "Bangalore",
    badge: "HIGH VIBE",
    image: "/images/home/hero/wellness-coach.png",
    salary: "₹10L - ₹15L PA",
    type: "On-Site",
    match: 95,
    desc: "Join our elite team to transform lives through integrated fitness and mindfulness programs in our flagship studios."
  },
  {
    id: "v3",
    title: "Makeup Artist",
    company: "Looks Salon",
    location: "Mumbai",
    badge: "GLAM PICK",
    image: "/images/home/hero/makeup-artist-facial.png",
    salary: "₹6L - ₹9L PA",
    type: "Studio",
    match: 93,
    desc: "Bring signature bridal and editorial looks to life for high-profile clients in a fast-moving luxury beauty studio."
  },
  {
    id: "v4",
    title: "Hair Cut and Styling",
    company: "Looks Salon",
    location: "Mumbai",
    badge: "SALON STAR",
    image: "/images/home/hero/makeup-artist-photo.png",
    salary: "₹5L - ₹8L PA",
    type: "Studio",
    match: 91,
    desc: "Create premium cuts, blow-dries, and signature styling finishes for salon clients seeking polished everyday and occasion-ready looks."
  }
];

export function VibeMatch() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleNext = () => swiper?.slideNext();
  const handlePrev = () => swiper?.slidePrev();
  const handleReset = () => swiper?.slideTo(0);

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-black font-display tracking-tight text-foreground">Vibe Match</h2>
          <Badge className="bg-secondary-container text-on-secondary-container rounded-full px-3 py-1 text-[10px] font-black tracking-widest uppercase border-none">Beta</Badge>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleReset}
          className="size-10 rounded-full border-border/10 text-muted-foreground hover:bg-white transition-all shadow-sm"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>

      <div className="relative h-[550px] w-full max-w-md mx-auto">
        <Swapper
          items={VIBE_JOBS}
          onSwiper={setSwiper}
          effect="cards"
          renderItem={(job) => (
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
                    <h3 className="text-2xl font-black font-display tracking-tight leading-none mb-1">{job.title}</h3>
                    <p className="text-xs opacity-80 font-bold">{job.company} • {job.location}</p>
                  </div>
                </div>

                <div className="flex-1 p-6 space-y-4 flex flex-col">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-muted rounded-lg text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">{job.type}</span>
                    <span className="px-3 py-1 bg-muted rounded-lg text-[10px] font-black text-muted-foreground uppercase tracking-widest italic">{job.salary}</span>
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
                    <Button variant="outline" className="flex-1 h-14 rounded-full font-black text-sm border-2 border-border/10 hover:bg-muted transition-all uppercase tracking-widest italic">View Details</Button>
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
    </section>
  );
}
