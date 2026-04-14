"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";

export function Categories() {
  const categories = [
    {
      image: "/images/all/steptodown.com575388.jpg",
      label: "Salon & Spa Services",
      detail: "Create confidence through care.",
      color: "from-blue-500/20",
    },
    {
      image: "/images/all/steptodown.com239490.jpg",
      label: "Wellness Hospitality",
      detail: "Deliver comfort & experiences.",
      color: "from-purple-500/20",
    },
    {
      image: "/images/all/steptodown.com222353.jpg",
      label: "Beauty & Skin",
      detail: "Enhance beauty with expertise.",
      color: "from-emerald-500/20",
    },
    {
      image: "/images/all/steptodown.com750516.jpg",
      label: "Yoga & Fitness",
      detail: "Train bodies. Build discipline.",
      color: "from-teal-500/20",
    },
    {
      image: "/images/all/steptodown.com195727.jpg",
      label: "Therapy & Rehabilitation",
      detail: "Restore movement. Improve lives.",
      color: "from-pink-500/20",
    },
    {
      image: "/images/all/steptodown.com968256.jpg",
      label: "Mental Health & Coaching",
      detail: "Support minds. Change lives.",
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <div id="categories" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end md:gap-8"
      >
        <div className="max-w-2xl space-y-4">
          <div className="h-1 w-20 bg-primary rounded-full mb-6" />
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[55px] font-black font-display text-foreground leading-[1.05]">
            Explore wellness career paths.
          </h2>
          <p className="max-w-lg text-base font-medium text-muted-foreground sm:text-lg md:text-xl">
            Salon, spa, beauty, fitness, therapy, and coaching roles &mdash; or get matched based on <span className="text-primary font-bold">your</span> profile.
          </p>
        </div>
        <Link href="/jobs" className="group inline-flex items-center gap-3 text-base sm:text-lg font-bold text-primary hover:text-foreground transition-all duration-300">
          Explore all roles <ArrowRight className="group-hover:translate-x-2 transition-transform size-6" />
        </Link>
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
            className="group"
          >
            <Link
              href="/jobs"
              className="relative flex h-[360px] overflow-hidden rounded-[2rem] border border-border/10 bg-card shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:h-[420px] md:rounded-[2.5rem] lg:h-[450px]"
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
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 md:p-10">
                <div className="space-y-4">
                  <div className="h-1 w-10 origin-left bg-primary transition-transform duration-500 delay-100 md:scale-x-0 md:group-hover:scale-x-100" />
                  <h3 className="text-2xl font-black font-display uppercase leading-none tracking-tighter sm:text-3xl">{cat.label}</h3>

                  <div className="overflow-hidden">
                    <p className="translate-y-0 text-sm font-medium leading-relaxed text-white/80 transition-transform duration-500 delay-75 md:translate-y-[100%] md:group-hover:translate-y-0 sm:text-base">
                      {cat.detail}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2 opacity-100 transition-opacity duration-500 delay-150 md:pt-4 md:opacity-0 md:group-hover:opacity-100">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary sm:text-sm">View Roles</span>
                    <div className="h-[2px] flex-1 bg-white/20" />
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors duration-300 group-hover:bg-primary">
                      <ArrowRight className="size-5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Border glow effect on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] border-2 border-primary/10 transition-all duration-500 group-hover:border-primary/20 md:rounded-[2.5rem]" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
