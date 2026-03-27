"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { AuthModal } from "@/components/auth/AuthModal";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`
      fixed z-50 flex items-center justify-between whitespace-nowrap
      transition-[top,inset,border-radius,padding,background-color,border-color,box-shadow,backdrop-filter] duration-700 ease-in-out
      will-change-[top,inset,border-radius,padding,background-color,border-color,box-shadow,backdrop-filter]
      ${scrolled
        ? "top-0 inset-x-0 rounded-none py-4 px-6 md:px-20 bg-surface/80 dark:bg-background/80 backdrop-blur-md border-b border-outline-variant/10 shadow-sm"
        : "top-6 inset-x-6 rounded-[2.5rem] py-4 px-8 md:px-12 bg-surface/40 dark:bg-background/40 backdrop-blur-2xl border border-outline-variant/20 shadow-2xl md:mx-10"
      }
    `}>
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <Logo size={42} className="transition-transform group-hover:scale-110 duration-500" />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-foreground leading-none">Wellness Jobs</span>
            <span className="text-[11px] font-black tracking-[0.25em] uppercase text-primary leading-none mt-1">India</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          <Link className="text-sm font-semibold hover:text-primary transition-colors" href="/jobs">Jobs</Link>
          <Link className="text-sm font-semibold hover:text-primary transition-colors" href="/auth/resume">AI Resume</Link>
          <Link className="text-sm font-semibold hover:text-primary transition-colors" href="/auth/interview">Interview Prep</Link>
          <Link className="text-sm font-semibold hover:text-primary transition-colors" href="/auth/upskill">Upskill</Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center relative group">
          <Search className="absolute left-4 text-outline group-focus-within:text-primary transition-colors size-4" />
          <Input
            className="bg-surface-container-high rounded-full py-2.5 pl-11 pr-6 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none ring-offset-background"
            placeholder="Search Careers"
          />
        </div>
        <ThemeToggle />
        <AuthModal />
      </div>
    </header>
  );
}
