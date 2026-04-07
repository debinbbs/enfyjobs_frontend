"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Zap, Users, Star } from "lucide-react";

export function MissionVision() {
  const values = [
    {
      icon: <Users className="size-6" />,
      title: "Inclusive Hiring",
      desc: "We open doors for talented candidates regardless of traditional educational backgrounds.",
      color: "bg-violet-100 text-violet-600",
    },
    {
      icon: <Heart className="size-6" />,
      title: "End-to-End Support",
      desc: "We don't just find you a job — we support you through every step of the hiring journey.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: <Zap className="size-6" />,
      title: "Speed-First Design",
      desc: "Build a resume in 60 seconds. Apply with a swipe. No forms, no complexity, no stress.",
      color: "bg-amber-100 text-amber-600",
    },
    {
      icon: <Star className="size-6" />,
      title: "Verified Quality",
      desc: "Every employer on our platform is rigorously verified by our team before going live. You only see real, safe opportunities.",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section className="w-full relative overflow-hidden">
      {/* Warm gradient — green-lime to purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0fff8] via-[#f5f0ff] to-[#fff0fb]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 space-y-24">

        {/* ── Mission & Vision cards ── */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* MISSION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 relative overflow-hidden rounded-[2.5rem] p-10 md:p-14 bg-gradient-to-br from-[#0B4533] to-[#1a7a5a] text-white shadow-2xl"
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-3 w-fit">
                <Target className="size-5 text-green-300" />
                <span className="text-green-200 font-black text-sm uppercase tracking-widest">Our Mission</span>
              </div>

              <h3 className="text-[32px] md:text-[42px] font-black leading-[1.1] tracking-tight">
                Empowering vocational talent to find a home in India's leading{" "}
                <span className="text-green-300 italic">wellness brands.</span>
              </h3>

              <p className="text-white/70 text-lg leading-relaxed">
                We are building a wellness job portal specifically designed for candidates from lower education groups — bridging the gap between skilled individuals and high-quality employers in wellness, hospitality, and healthcare.
              </p>

              <div className="pt-4 border-t border-white/10 flex gap-8">
                <div>
                  <p className="text-3xl font-black text-green-300">5K+</p>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Candidates Placed</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-green-300">200+</p>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Verified Brands</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-green-300">6</p>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Wellness Sectors</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* VISION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 relative overflow-hidden rounded-[2.5rem] p-10 md:p-14 bg-gradient-to-br from-[#6d28d9] to-[#db2777] text-white shadow-2xl"
          >
            {/* Decorative circles */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-3 w-fit">
                <Eye className="size-5 text-pink-200" />
                <span className="text-pink-200 font-black text-sm uppercase tracking-widest">Our Vision</span>
              </div>

              <h3 className="text-[32px] md:text-[42px] font-black leading-[1.1] tracking-tight">
                To be India's most trusted platform for{" "}
                <span className="text-pink-200 italic">wellness careers.</span>
              </h3>

              <p className="text-white/80 text-lg leading-relaxed">
                We envision a future where every skilled wellness professional in India — regardless of their background — has equal access to dignified, well-paying work at India's finest wellness brands, with zero exploitation and full transparency.
              </p>

              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm font-bold italic leading-relaxed">
                  "A job search that feels safer, clearer, and fair — for every candidate, every time."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Core Values ── */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3"
          >
            <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-500">
              What drives us
            </p>
            <h2 className="text-[36px] md:text-[52px] font-black text-gray-900 tracking-tight">
              Our Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">
                Values
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 space-y-5 cursor-default group transition-all duration-300"
              >
                <div className={`size-14 rounded-2xl flex items-center justify-center ${v.color} group-hover:scale-110 transition-transform duration-300`}>
                  {v.icon}
                </div>
                <h4 className="text-lg font-black text-gray-900">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
