"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, IterationCcw, ArrowRight } from "lucide-react";

export function TechFeatures() {
  const floatingStats = [
    { value: "60s", label: "Resume Built", color: "from-violet-500 to-purple-600" },
    { value: "1M+", label: "Jobs Available", color: "from-pink-500 to-rose-500" },
  ];

  return (
    <section className="w-full relative overflow-hidden">
      {/* Colorful Vibrant Gradient Background - Blue/Teal to Purple/Pink */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e0f7ff] via-[#f0e4ff] to-[#ffd6f0]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
          
          {/* LEFT: Phone + Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative flex items-center justify-center min-h-[580px]"
          >
            <div className="relative">
              {/* Main Phone Mockup */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[280px] md:w-[320px] aspect-[9/18]"
              >
                <Image
                  src="/images/about/phone-transparent.png"
                  alt="WellnessJobsIndia App"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain drop-shadow-[0_30px_60px_rgba(139,92,246,0.35)]"
                  priority
                />
              </motion.div>

              {/* Floating: AI Resume badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-6 -right-10 md:-right-16 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 min-w-[160px]"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Sparkles className="size-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold">Smart Profile</p>
                    <p className="text-sm font-black text-gray-900">Created in 60s ⚡</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating: Swipe badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-10 md:-right-14 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 min-w-[150px]"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-pink-100 flex items-center justify-center">
                    <IterationCcw className="size-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold">Matching Mode</p>
                    <p className="text-sm font-black text-gray-900">Get Discovered</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating: stat pill left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/3 -left-14 md:-left-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-4 shadow-xl text-white"
              >
                <p className="text-2xl font-black">10K+</p>
                <p className="text-xs font-bold opacity-80">Active Jobs</p>
              </motion.div>

              {/* Floating: success pill */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-1/4 -left-14 md:-left-20 bg-white rounded-2xl px-4 py-3 shadow-xl border border-gray-100"
              >
                <p className="text-xs font-bold text-gray-400">Match Rate</p>
                <p className="text-lg font-black text-gray-900 bg-clip-text">94% 🎯</p>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-10"
          >
            <div className="space-y-5">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-500">
                Built for Talent
              </p>
              <h2 className="text-[40px] md:text-[58px] font-black leading-[1.05] text-gray-900 tracking-tight">
                Get discovered by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">
                  top brands
                </span>{" "}
                effortlessly
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                No lengthy forms. No confusing portals. EnfyJobs uses AI to build your professional profile and lets verified wellness employers discover your talent directly.
              </p>
            </div>

            {/* Feature rows */}
            <div className="space-y-6">
              <div className="flex items-start gap-5 group">
                <div className="size-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Sparkles className="size-7" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-1">60-Second Profile Creation</h4>
                  <p className="text-gray-500 leading-relaxed">
                    Just tell us your skills. Our AI creates a polished, job-ready profile in under a minute — optimized so wellness industry hiring managers can find you.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="size-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <IterationCcw className="size-7" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-gray-900 mb-1">Employers Find You</h4>
                  <p className="text-gray-500 leading-relaxed">
                    Instead of applying to hundreds of jobs, top wellness brands browse verified profiles and send you interview requests directly. No cover letters, no hassle.
                  </p>
                </div>
              </div>
            </div>

            <motion.a
              href="/jobs"
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-violet-500 to-pink-500 shadow-lg hover:shadow-violet-200 transition-all text-base"
            >
              Create Your Profile <ArrowRight className="size-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
