"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FileText, LayoutDashboard, LogOut, Search, UserRound } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/AuthModal";
import Link from "next/link";
import {
  logoutCandidateSession,
  useCandidateSession,
} from "@/lib/auth/candidate-session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useCandidateSession();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const showSearch = ["/", "/jobs"].includes(pathname);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstName = session?.user?.candidate?.firstName?.trim();
  const profileLabel = firstName || "Candidate";

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutCandidateSession();
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className={`
      fixed z-50 flex items-center justify-between whitespace-nowrap
      transition-all duration-500 ease-in-out
      will-change-[top,inset,background-color,border-color,box-shadow,backdrop-filter,padding]
      ${scrolled
        ? "top-0 inset-x-0 rounded-none py-4 px-6 md:px-20 bg-surface/80 dark:bg-background/80 backdrop-blur-md border-b border-outline-variant/10 shadow-sm"
        : isHome 
          ? "top-6 inset-x-6 rounded-[2.5rem] py-4 px-8 md:px-12 bg-black/30 backdrop-blur-2xl border border-white/10 shadow-2xl md:mx-10"
          : "top-6 inset-x-6 rounded-[2.5rem] py-4 px-8 md:px-12 bg-surface/40 dark:bg-background/40 backdrop-blur-2xl border border-outline-variant/20 shadow-2xl md:mx-10"
      }
    `}>
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <Logo size={42} className={`transition-transform group-hover:scale-110 duration-500 ${isHome && !scrolled ? 'invert brightness-0' : ''}`} />
          <div className="flex flex-col">
            <span className={`text-xl font-black tracking-tight leading-none transition-colors duration-500 ${isHome && !scrolled ? 'text-white' : 'text-foreground'}`}>Wellness Jobs</span>
            <span className={`text-[11px] font-black tracking-[0.25em] uppercase leading-none mt-1 transition-colors duration-500 ${isHome && !scrolled ? 'text-white/70' : 'text-primary'}`}>India</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { name: "Jobs", href: "/jobs" },
            { name: "Categories", href: "/#categories" },
            { name: "How It Works", href: "/#journey" },
            { name: "Growth", href: "/#growth" }
          ].map((item) => (
            <Link 
              key={item.name}
              className={`text-sm font-black uppercase tracking-widest transition-colors duration-500 ${isHome && !scrolled ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-primary'}`} 
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className={`${showSearch ? "hidden md:flex" : "hidden"} items-center relative group`}>
          <Search className={`absolute left-4 transition-colors size-4 ${isHome && !scrolled ? 'text-white/60 group-focus-within:text-white' : 'text-outline group-focus-within:text-primary'}`} />
          <Input
            className={`rounded-full py-2.5 pl-11 pr-6 text-sm w-64 focus:outline-none focus:ring-2 transition-all border-none ring-offset-background ${isHome && !scrolled ? 'bg-white/10 text-white placeholder:text-white/40 focus:ring-white/20' : 'bg-surface-container-high text-foreground placeholder:text-outline/40 focus:ring-primary/20'}`}
            placeholder="Search Careers"
          />
        </div>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center justify-center rounded-lg border-2 overflow-hidden transition-all size-12 ${isHome && !scrolled ? 'bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20' : 'border-outline-variant/10 bg-surface-container-low hover:bg-surface-container-high shadow-sm'}`}>
              {session.user?.candidate?.profileImage ? (
                <img 
                  src={session.user.candidate.profileImage} 
                  alt={profileLabel}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-9 items-center justify-center rounded-lg signature-gradient text-[11px] font-black uppercase tracking-[0.2em] text-on-primary">
                  {profileLabel.slice(0, 1)}
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[230px] rounded-2xl border-border/20 bg-surface/90 p-2 shadow-2xl backdrop-blur-xl"
            >
              <div className="px-3 py-2">
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground">
                  Signed In
                </p>
                <p className="mt-1 text-sm font-black tracking-tight text-foreground">
                  {profileLabel}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.phoneNumber || "Candidate account"}
                </p>
              </div>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/candidate")}
                className="mb-1 cursor-pointer rounded-xl px-3 py-2.5 font-bold"
              >
                <LayoutDashboard className="size-4 text-primary" />
                Candidate Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/candidate/profile")}
                className="mb-1 cursor-pointer rounded-xl px-3 py-2.5 font-bold"
              >
                <UserRound className="size-4 text-primary" />
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/candidate/profile/resume")}
                className="mb-1 cursor-pointer rounded-xl px-3 py-2.5 font-bold"
              >
                <FileText className="size-4 text-primary" />
                Resume Builder
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  void handleLogout();
                }}
                className="cursor-pointer rounded-xl px-3 py-2.5 font-bold"
                disabled={isLoggingOut}
              >
                <LogOut className="size-4 text-primary" />
                {isLoggingOut ? "Signing out..." : "Sign out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <AuthModal>
            <Button 
              size="lg" 
              className={`rounded-lg font-black shadow-xl transition-all hover:scale-105 px-8 h-12 border-2 ${isHome && !scrolled ? 'bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20' : 'signature-gradient border-transparent text-on-primary'}`}
            >
              Get Started
            </Button>
          </AuthModal>
        )}
      </div>
    </header>
  );
}
