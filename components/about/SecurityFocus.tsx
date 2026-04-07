"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, Coins, UserCheck, AlertTriangle, ArrowRight } from "lucide-react";

export function SecurityFocus() {
  const badges = [
    { emoji: "✅", label: "100% Verified Employers", color: "bg-white" },
    { emoji: "🆓", label: "Zero Candidate Fees", color: "bg-white" },
    { emoji: "🔒", label: "Private & Secure", color: "bg-white" },
    { emoji: "🚫", label: "No Fake Listings", color: "bg-white" },
  ];

  return (
    <section className="w-full relative overflow-hidden">
      {/* Colorful Vibrant Gradient Background - Yellow to Pink/Purple */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0ffd4] via-[#fce4ff] to-[#ffe0f7]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-8"
          >
            <div className="space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-purple-500">
                Candidate Security
              </p>
              <h2 className="text-[40px] md:text-[58px] font-black leading-[1.05] text-gray-900 tracking-tight">
                Your job search,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  protected
                </span>{" "}
                at every step
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                We built EnfyJobs to eliminate the fake listings and "placement fee" scams targeting wellness professionals. Every employer goes through a strict verification process before discovering your profile.
              </p>
            </div>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-sm border border-white/60"
                >
                  <span className="text-2xl">{b.emoji}</span>
                  <span className="font-bold text-gray-800 text-sm">{b.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Warning box */}
            <div className="flex gap-4 p-5 rounded-2xl bg-pink-50 border border-pink-200 max-w-lg">
              <AlertTriangle className="size-6 text-pink-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 font-semibold leading-snug">
                If anyone asks for money to get discovered on EnfyJobs — <span className="text-pink-600 font-black">report them immediately.</span> We are always 100% free for candidates.
              </p>
            </div>

            <motion.a
              href="/jobs"
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-pink-200 transition-all text-base"
            >
              Create Secure Profile <ArrowRight className="size-5" />
            </motion.a>
          </motion.div>

          {/* RIGHT: Photo + Floating Badges */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative flex items-center justify-center min-h-[520px]"
          >
            {/* Main Photo Card */}
            <div className="relative w-full max-w-[420px]">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[3/4]">
                <Image
                  src="/images/about/security-person.jpg"
                  alt="Wellness professional feeling safe"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating badge: Verified */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3 min-w-[180px] border border-gray-100"
              >
                <div className="size-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <ShieldCheck className="size-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold">Employer Status</p>
                  <p className="text-sm font-black text-gray-900">✅ Verified</p>
                </div>
              </motion.div>

              {/* Floating badge: Zero Fees */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 min-w-[160px]"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Coins className="size-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold">Placement Fee</p>
                    <p className="text-sm font-black text-gray-900">₹0 Always</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge: Hired stat */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/2 -left-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 shadow-xl text-white min-w-[140px]"
              >
                <p className="text-3xl font-black">100%</p>
                <p className="text-xs font-bold opacity-80">Privacy Assured</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
