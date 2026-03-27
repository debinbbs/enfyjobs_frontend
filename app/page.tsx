"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background selection:bg-primary/20">
      {/* Header */}
      <header className={`
        fixed z-50 flex items-center justify-between whitespace-nowrap
        transition-[top,inset,border-radius,padding,background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-in-out
        will-change-[top,inset,border-radius,padding,background-color,border-color,box-shadow,backdrop-filter]
        ${scrolled 
          ? "top-0 inset-x-0 rounded-none py-4 px-6 md:px-20 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 shadow-sm" 
          : "top-6 inset-x-6 rounded-[2.5rem] py-4 px-8 md:px-12 bg-surface/40 backdrop-blur-2xl border border-outline-variant/20 shadow-2xl md:mx-10"
        }
      `}>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="size-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight font-display">Wellness Jobs India</h2>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Jobs</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">AI Resume</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Interview Prep</a>
            <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Upskill</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center relative group">
            <span className="material-symbols-outlined absolute left-4 text-outline group-focus-within:text-primary transition-colors">search</span>
            <input 
              className="bg-surface-container-high rounded-full py-2.5 pl-11 pr-6 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none"
              placeholder="Search Careers"
            />
          </div>
          <button className="h-10 px-6 rounded-full signature-gradient text-on-primary text-sm font-bold ambient-glow hover:opacity-90 transition-opacity">
            Get Started
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-10 pt-32">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 overflow-visible">
          <div className="kinetic-blob w-96 h-96 bg-primary-container -top-20 -left-20"></div>
          <div className="kinetic-blob w-80 h-80 bg-secondary-container bottom-0 -right-10"></div>
          
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8 z-10">
              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight font-display">
                Build Your Wellness Career — <span className="text-primary">Smarter, Faster, Better 🌿</span>
              </h1>
              <p className="text-on-surface-variant text-lg md:text-xl max-w-lg leading-relaxed">
                AI resumes, swipe jobs, and crack interviews — all in one sanctuary designed for the next generation of wellness professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="h-14 px-10 rounded-full signature-gradient text-on-primary font-bold text-lg ambient-glow transition-transform hover:scale-105">
                  Get Started
                </button>
                <button className="h-14 px-10 rounded-full bg-surface-container-lowest text-on-surface font-bold text-lg border border-outline-variant/20 hover:bg-surface-container-low transition-all">
                  Try Resume AI ⚡
                </button>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-[500px]">
              <div className="bg-surface-container-low rounded-[2rem] p-5 rotate-3 ambient-glow relative z-20 overflow-hidden border border-white/20">
                <div className="bg-surface-container-lowest rounded-2xl h-[520px] shadow-sm relative overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-surface-container flex items-center justify-between bg-white/50 backdrop-blur-sm">
                    <span className="font-bold text-primary">Discover Jobs</span>
                    <span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">tune</span>
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-center items-center gap-8">
                    <div className="w-full aspect-[3/4] rounded-2xl relative overflow-hidden shadow-2xl group transition-transform hover:scale-[1.02]">
                      <Image 
                        src="/images/home/yoga-instructor.jpg"
                        alt="Yoga Instructor"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                        <h3 className="text-2xl font-bold font-display">Yoga Instructor</h3>
                        <p className="text-sm opacity-90">Ananda Wellness • Mumbai</p>
                      </div>
                      <div className="absolute top-5 left-5">
                        <span className="bg-secondary-container text-on-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">Yoga</span>
                      </div>
                    </div>
                    <div className="flex gap-10">
                      <div className="size-16 rounded-full bg-error-container/20 text-error flex items-center justify-center shadow-lg cursor-pointer hover:bg-error-container/30 transition-all border border-error/10">
                        <span className="material-symbols-outlined text-4xl">close</span>
                      </div>
                      <div className="size-16 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center shadow-lg cursor-pointer hover:bg-secondary-container/30 transition-all border border-secondary/10">
                        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating AI Match label */}
                <div className="absolute -top-4 -right-4 bg-tertiary-container p-3.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce border border-white/40">
                  <span className="material-symbols-outlined text-on-tertiary">auto_awesome</span>
                  <span className="text-on-tertiary font-bold text-xs uppercase tracking-tighter">AI Match 98%</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-primary opacity-5 blur-[100px] -z-10 rounded-full scale-125"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black font-display mb-6">The Toolkit for Your Growth</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">Everything you need to navigate the wellness industry landscape with confidence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: "description", 
                title: "Resume in Seconds ⚡", 
                desc: "Answer a few simple questions and let our AI craft a job-ready resume that highlights your wellness credentials instantly.",
                color: "bg-primary-container text-on-primary-container"
              },
              { 
                icon: "smart_toy", 
                title: "Ace Interviews 🎯", 
                desc: "Practice with our AI-powered interview coach. Get real-time feedback on your responses and boost your hireability.",
                color: "bg-secondary-container text-on-secondary"
              },
              { 
                icon: "swipe", 
                title: "Swipe. Match. Get Hired 🔥", 
                desc: "Forget boring job boards. Swipe right on jobs you love and get direct matches with top wellness centers in India.",
                color: "bg-tertiary-container text-on-tertiary"
              }
            ].map((f, i) => (
              <div key={i} className="group p-10 rounded-3xl bg-surface-container-low hover:bg-surface-container-lowest transition-all duration-500 ambient-glow flex flex-col gap-8 border border-transparent hover:border-primary/10">
                <div className={`size-16 rounded-2xl flex items-center justify-center ${f.color}`}>
                  <span className="material-symbols-outlined text-4xl">{f.icon}</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-display">{f.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-surface-container-high/30 rounded-[3rem] px-10 md:px-16">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-xl space-y-4">
              <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight">Vibe-Based Categories</h2>
              <p className="text-on-surface-variant text-lg">Explore niches that match your passion and lifestyle.</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 group transition-all">
              View all roles <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: "self_improvement", label: "Yoga Trainer", color: "text-primary" },
              { icon: "fitness_center", label: "Fitness Coach", color: "text-secondary" },
              { icon: "nutrition", label: "Nutritionist", color: "text-tertiary" },
              { icon: "psychology", label: "Therapist", color: "text-primary" },
              { icon: "spa", label: "Spa & Wellness", color: "text-secondary" },
              { icon: "mindfulness", label: "Mental Health", color: "text-tertiary" },
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-surface-container-lowest ambient-glow border border-outline-variant/5 hover:-translate-y-2 transition-all cursor-pointer">
                <span className={`material-symbols-outlined text-5xl ${cat.color}`}>{cat.icon}</span>
                <span className="font-bold text-center font-display">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Swipe Experience Showcase */}
        <section className="py-32 flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 order-2 lg:order-1 relative">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute -inset-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 blur-[80px] rounded-full"></div>
              <div className="relative bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-2xl border border-surface-container overflow-hidden">
                <div className="mb-6 flex items-center gap-4">
                  <div className="size-12 rounded-full relative overflow-hidden bg-surface-container-high shadow-inner">
                    <Image 
                      src="/images/home/cultfit-logo.png"
                      alt="Cultfit Logo"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Cult.fit</h4>
                    <p className="text-xs text-on-surface-variant font-medium tracking-wide uppercase">Bangalore, IN</p>
                  </div>
                </div>
                <div className="aspect-square rounded-3xl mb-8 overflow-hidden shadow-lg">
                  <Image 
                    src="/images/home/fitness-class.jpg"
                    alt="Fitness Class"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mb-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black font-display leading-tight">Senior Fitness Lead</h3>
                    <span className="text-secondary font-bold text-lg">₹8L - 12L</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 bg-secondary-container/10 text-secondary text-[10px] font-black rounded-lg uppercase tracking-widest border border-secondary/10">FULL-TIME</span>
                    <span className="px-4 py-1.5 bg-primary-container/10 text-primary text-[10px] font-black rounded-lg uppercase tracking-widest border border-primary/10">ONSITE</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 h-14 rounded-full border-2 border-error/20 text-error font-bold flex items-center justify-center gap-2 hover:bg-error/5 transition-all">
                    <span className="material-symbols-outlined">close</span> Pass
                  </button>
                  <button className="flex-1 h-14 rounded-full signature-gradient text-on-primary font-bold flex items-center justify-center gap-2 ambient-glow hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span> Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2 space-y-10">
            <h2 className="text-5xl md:text-7xl font-black font-display leading-[1.05]">Swipe. Match. <span className="text-secondary">Hired.</span></h2>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              We&apos;ve transformed the job hunt into an experience you actually enjoy. Browse through India&apos;s top wellness startups and premium centers with a simple swipe.
            </p>
            <ul className="space-y-6">
              {[
                "Direct connection to HRs",
                "Vetted high-paying wellness roles",
                "Instant matching notification"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-5">
                  <span className="material-symbols-outlined text-secondary text-3xl">check_circle</span>
                  <span className="font-bold text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Upskilling Section */}
        <section className="py-24">
          <div className="bg-foreground rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-3xl">
            <div className="kinetic-blob w-[500px] h-[500px] bg-primary/20 top-0 right-0 blur-[120px]"></div>
            <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 space-y-10">
                <h2 className="text-on-primary text-5xl md:text-6xl font-black font-display leading-tight">Not ready yet? <br/>We&apos;ve got you 💪</h2>
                <p className="text-zinc-400 text-xl leading-relaxed max-w-xl">
                  Bridge the skill gap with our curated certification programs and development courses designed by industry veterans.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    { icon: "verified", text: "Certified Certifications" },
                    { icon: "trending_up", text: "Skill Growth Modules" },
                    { icon: "work_history", text: "Placement Support" },
                    { icon: "groups", text: "Community Access" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-white">
                      <span className="material-symbols-outlined text-tertiary-container text-3xl">{item.icon}</span>
                      <span className="font-bold">{item.text}</span>
                    </div>
                  ))}
                </div>
                <button className="h-16 px-12 rounded-full signature-gradient text-on-primary font-bold text-xl ambient-glow transition-transform hover:scale-105">
                  Start Learning 🚀
                </button>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-6 w-full lg:w-auto">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-surface-container relative shadow-2xl">
                  <Image 
                    src="/images/home/wellness-student.jpg"
                    alt="Wellness Student"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-surface-container relative mt-16 shadow-2xl">
                  <Image 
                    src="/images/home/professionals.jpg"
                    alt="Professionals"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hiring Journey Flow */}
        <section className="py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-black font-display mb-24">Your Path to Wellness Pro</h2>
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="hidden lg:block absolute top-14 left-0 w-full h-[3px] bg-gradient-to-r from-primary/20 via-secondary/20 to-tertiary/20 z-0"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-16 gap-x-8 relative z-10">
              {[
                { icon: "edit_document", title: "1. Build Resume", subtitle: "AI-Optimized", color: "text-primary border-primary/20" },
                { icon: "school", title: "2. Learn Skills", subtitle: "Certifications", color: "text-secondary border-secondary/20" },
                { icon: "touch_app", title: "3. Swipe & Apply", subtitle: "Instant Match", color: "text-tertiary border-tertiary/20" },
                { icon: "forum", title: "4. Interview Prep", subtitle: "AI Feedback", color: "text-primary border-primary/20" },
                { icon: "celebration", title: "5. Get Hired 🎉", subtitle: "Career Start", color: "text-on-secondary-container bg-secondary-container scale-125 shadow-xl border-none" }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-6 group">
                  <div className={`size-24 rounded-full bg-surface-container-lowest ambient-glow flex items-center justify-center border-4 transition-all duration-500 group-hover:scale-110 ${step.color}`}>
                    <span className="material-symbols-outlined text-4xl">{step.icon}</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg font-display">{step.title}</h4>
                    <p className="text-sm text-on-surface-variant font-medium">{step.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center">
            <div className="lg:col-span-1 space-y-10">
              <h2 className="text-5xl font-black font-display leading-[1.05]">Young India&apos;s Wellness Voice</h2>
              <p className="text-xl text-on-surface-variant leading-relaxed">
                Join 50,000+ professionals who found their dream careers through our platform.
              </p>
              <div className="flex gap-12">
                <div>
                  <span className="text-5xl font-black text-primary">50k+</span>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mt-2">Active Users</p>
                </div>
                <div>
                  <span className="text-5xl font-black text-secondary">1.2k+</span>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant mt-2">Hired Locally</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  role: "Yoga Trainer, Mumbai",
                  img: "/images/home/priya-sharma.jpg",
                  quote: "The AI Resume builder is a game-changer. I got 3 interviews within a week of signing up!"
                },
                {
                  name: "Arjun Verma",
                  role: "Fitness Coach, Delhi",
                  img: "/images/home/arjun-verma.jpg",
                  quote: "Finally a job board that doesn't feel like 2005. The swiping experience is addictive and efficient."
                }
              ].map((t, i) => (
                <div key={i} className="p-10 rounded-[2.5rem] bg-surface-container-lowest ambient-glow border border-surface-container space-y-8 flex flex-col justify-between hover:shadow-2xl transition-all">
                  <div className="space-y-6">
                    <div className="flex gap-1 text-tertiary">
                      {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined scale-110" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                    </div>
                    <p className="text-xl font-medium leading-relaxed italic text-on-surface">&quot;{t.quote}&quot;</p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-surface-container">
                    <div className="size-14 rounded-full relative overflow-hidden bg-surface-container shadow-md">
                      <Image 
                        src={t.img}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-lg">{t.name}</h5>
                      <p className="text-sm text-on-surface-variant font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-outline-variant/10 mt-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-8 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
                </svg>
              </div>
              <h3 className="font-black font-display text-2xl">Wellness Jobs India</h3>
            </div>
            <p className="text-on-surface-variant max-w-xs text-lg font-medium">Empowering India&apos;s wellness generation to build meaningful careers with AI-driven tools.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            {[
              { title: "Platform", links: ["Swipe Jobs", "AI Resume", "Interview Prep"] },
              { title: "Company", links: ["About Us", "Success Stories", "Contact"] },
              { title: "Social", links: ["Instagram", "LinkedIn", "Twitter"] }
            ].map((col, i) => (
              <div key={i} className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.25em] text-outline">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a className="text-on-surface-variant font-bold hover:text-primary transition-colors cursor-pointer" href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-10 mt-20 pt-10 border-t border-outline-variant/5 flex flex-col sm:flex-row justify-between gap-6 text-sm text-outline font-bold">
          <p>© 2024 Wellness Jobs India. All Rights Reserved.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
