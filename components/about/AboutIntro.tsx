"use client";

import { motion } from "framer-motion";
import { Users, Building2, ShieldCheck, Zap, Scissors, Flower2, Sprout, Hotel, HeartPulse, Sparkles } from "lucide-react";

export function AboutIntro() {
  const stats = [
    {
      value: "5K+",
      label: "Candidates Placed",
      icon: <Users className="size-7" />,
      bg: "from-violet-500 to-purple-600",
      glow: "shadow-violet-400/30",
      emoji: "🎉",
    },
    {
      value: "200+",
      label: "Verified Brands",
      icon: <Building2 className="size-7" />,
      bg: "from-amber-400 to-orange-500",
      glow: "shadow-orange-400/30",
      emoji: "🏆",
    },
    {
      value: "₹0",
      label: "Always Free",
      icon: <ShieldCheck className="size-7" />,
      bg: "from-emerald-500 to-teal-600",
      glow: "shadow-emerald-400/30",
      emoji: "💚",
    },
    {
      value: "60s",
      label: "Profile Creation",
      icon: <Zap className="size-7" />,
      bg: "from-pink-500 to-rose-600",
      glow: "shadow-pink-400/30",
      emoji: "⚡",
    },
  ];

  const categories = [
    { icon: <Scissors className="size-5" />, name: "Beauty & Salon", color: "bg-pink-100 text-pink-600" },
    { icon: <Flower2 className="size-5" />, name: "Spa & Therapy", color: "bg-violet-100 text-violet-600" },
    { icon: <Sprout className="size-5" />, name: "Yoga & Fitness", color: "bg-emerald-100 text-emerald-600" },
    { icon: <Hotel className="size-5" />, name: "Hotel & Hospitality", color: "bg-amber-100 text-amber-600" },
    { icon: <HeartPulse className="size-5" />, name: "Mental Wellness", color: "bg-rose-100 text-rose-600" },
    { icon: <Sparkles className="size-5" />, name: "Nutrition & Diet", color: "bg-teal-100 text-teal-600" },
  ];

  return (
    <section className="w-full relative overflow-hidden">
      {/* Joyful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0fff8] via-[#fff7ed] to-[#fdf4ff]" />
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-gradient-to-bl from-amber-200/40 via-orange-100/30 to-transparent rounded-bl-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-48 bg-gradient-to-tr from-violet-100/50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 space-y-20">

        {/* ── TOP: Headline + Intro ── */}
        <div className="flex flex-col lg:flex-row gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 space-y-5"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.3em] text-emerald-600 bg-emerald-100 px-4 py-2 rounded-full">
              🌱 Who We Are
            </span>
            <h2 className="text-[38px] md:text-[60px] font-black leading-[1.05] tracking-tight text-gray-900">
              India's most{" "}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">trusted</span>
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="#10b981" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>{" "}
              wellness
              <br />
              careers platform 🌿
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 max-w-lg"
          >
            <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-xl shadow-gray-100/80 space-y-4">
              <span className="text-2xl">✨</span>
              <p className="text-gray-600 text-lg leading-relaxed">
                We saw talented beauticians, spa therapists, and yoga trainers losing jobs to <strong className="text-gray-900">fake listings and scams</strong>. So we built a platform where{" "}
                <strong className="text-emerald-600">trust is the foundation</strong>, not an afterthought.
              </p>
              <p className="text-gray-500 leading-relaxed">
                No placement fees. No fake employers. No degree requirement. Just real jobs, real brands, and real careers.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── STATS GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className={`relative overflow-hidden rounded-[2rem] p-6 md:p-8 bg-gradient-to-br ${s.bg} text-white shadow-2xl ${s.glow} cursor-default`}
            >
              {/* Decorative circle */}
              <div className="absolute -top-6 -right-6 size-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 size-16 rounded-full bg-white/10" />

              <div className="relative z-10">
                <div className="text-3xl mb-4">{s.emoji}</div>
                <p className="text-4xl md:text-5xl font-black leading-none mb-2">{s.value}</p>
                <p className="text-white/70 text-xs font-bold uppercase tracking-[0.15em]">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CATEGORIES ── */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="text-[28px] md:text-[40px] font-black text-gray-900">
              We serve{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-pink-500 to-orange-500">
                every wellness career
              </span>
            </h3>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.08, y: -4 }}
                className={`inline-flex items-center gap-3 ${cat.color} rounded-2xl px-6 py-4 font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-default`}
              >
                {cat.icon}
                {cat.name}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
