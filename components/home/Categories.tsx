"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Categories() {
  const categories = [
    {
      image: "/images/all/steptodown.com575388.jpg",
      label: "Yoga Instructor",
      detail: "Fitness coaches, yoga instructors, studio trainers",
      color: "from-blue-500/20",
    },
    {
      image: "/images/all/steptodown.com239490.jpg",
      label: "Therapist",
      detail: "Counselors, therapists, support professionals",
      color: "from-purple-500/20",
    },
    {
      image: "/images/all/steptodown.com222353.jpg",
      label: "Nutritionist",
      detail: "Nutritionists, wellness coaches, lifestyle consultants",
      color: "from-emerald-500/20",
    },
    {
      image: "/images/all/steptodown.com750516.jpg",
      label: "Spa & Salon",
      detail: "Spa therapists, massage experts, wellness attendants",
      color: "from-teal-500/20",
    },
    {
      image: "/images/all/steptodown.com195727.jpg",
      label: "Beauty & Skin",
      detail: "Makeup artists, beauticians, skin therapists, beauty advisors",
      color: "from-pink-500/20",
    },
    {
      image: "/images/all/steptodown.com968256.jpg",
      label: "Mental Wellness",
      detail: "Counselors, therapists, support professionals",
      color: "from-purple-500/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  } as any;

  return (
    <div id="categories" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8"
      >
        <div className="max-w-2xl space-y-4">
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <h2 className="text-[42px] md:text-[55px] font-black font-display text-foreground leading-[1.1]">
            Explore wellness career paths.
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-lg">
            Yoga, therapy, nutrition &amp; more &mdash; or get matched based on <span className="text-primary font-bold">your</span> profile.
          </p>
        </div>
        <a href="/jobs" className="group inline-flex items-center gap-3 text-lg font-bold text-primary hover:text-foreground transition-all duration-300">
          Explore all roles <ArrowRight className="group-hover:translate-x-2 transition-transform size-6" />
        </a>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group relative h-[450px] overflow-hidden rounded-[2.5rem] bg-card border border-border/10 shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
          >
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover brightness-[0.7] group-hover:brightness-[0.8] transition-all"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Gradient Overlays */}
              <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} via-transparent to-black/90`} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-10 text-white">
              <div className="space-y-4">
                <div className="w-10 h-1 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                <h3 className="text-3xl font-black font-display tracking-tighter uppercase leading-none">{cat.label}</h3>

                <div className="overflow-hidden">
                  <p className="text-white/70 font-medium leading-relaxed translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {cat.detail}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">View Roles</span>
                  <div className="h-[2px] flex-1 bg-white/20" />
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-primary transition-colors duration-300">
                    <ArrowRight className="size-5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Border glow effect on hover */}
            <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
