"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FileText, LayoutDashboard, LogOut, Menu, UserRound } from "lucide-react";
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
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useCandidateSession();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isPhotoHero = isHome || isAbout;
  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Resources", href: "/resources" },
    { name: "About Us", href: "/about" },
  ];


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
        ? "top-0 inset-x-0 rounded-none py-2.5 px-4 sm:px-5 md:px-10 bg-surface/90 dark:bg-background/90 backdrop-blur-md border-b border-outline-variant/10 shadow-sm"
        : isPhotoHero
          ? "top-0 inset-x-0 rounded-none py-2 px-4 sm:px-5 md:top-6 md:inset-x-6 md:rounded-[2.5rem] md:px-10 bg-black/20 md:bg-black/30 backdrop-blur-2xl border-b md:border border-white/10 shadow-md md:shadow-2xl md:mx-10"
          : "top-0 inset-x-0 rounded-none py-2 px-4 sm:px-5 md:top-6 md:inset-x-6 md:rounded-[2.5rem] md:px-10 bg-surface/90 md:bg-surface/40 dark:bg-background/90 md:dark:bg-background/40 backdrop-blur-2xl border-b md:border border-outline-variant/20 shadow-sm md:shadow-2xl md:mx-10"
      }
    `}>
      <div className="flex items-center gap-3 sm:gap-4 md:gap-12 min-w-0">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer min-w-0">
          <Logo size={32} className={`transition-transform group-hover:scale-110 duration-500 ${isPhotoHero && !scrolled ? 'invert brightness-0' : ''}`} />
          <div className="flex min-w-0 flex-col">
            <span className={`truncate text-base sm:text-lg md:text-xl font-black tracking-tight leading-none transition-colors duration-500 ${isPhotoHero && !scrolled ? 'text-white' : 'text-foreground'}`}>Wellness Jobs</span>
            <span className={`text-[10px] sm:text-[11px] font-black tracking-[0.22em] uppercase leading-none mt-1 transition-colors duration-500 ${isPhotoHero && !scrolled ? 'text-white/70' : 'text-primary'}`}>India</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {navigationItems.slice(1).map((item) => (
            <Link
              key={item.name}
              className={`text-sm font-black uppercase tracking-widest transition-colors duration-500 ${isPhotoHero && !scrolled ? 'text-white/70 hover:text-white' : 'text-foreground/70 hover:text-primary'}`}
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger className={`flex items-center justify-center rounded-lg border-2 overflow-hidden transition-all size-12 ${isPhotoHero && !scrolled ? 'bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20' : 'border-outline-variant/10 bg-surface-container-low hover:bg-surface-container-high shadow-sm'}`}>
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
        ) : null}

        <div className={session ? "hidden" : "hidden sm:block"}>
          <AuthModal>
            <Button
              size="lg"
              className={`rounded-lg font-black shadow-xl transition-all hover:scale-105 px-5 sm:px-8 h-11 sm:h-12 border-2 ${isPhotoHero && !scrolled ? 'bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20' : 'signature-gradient border-transparent text-on-primary'}`}
            >
              Get Started
            </Button>
          </AuthModal>
        </div>

        <Dialog open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <DialogTrigger
            render={
              <button
                className={`flex size-11 items-center justify-center rounded-xl border transition-all lg:hidden ${isPhotoHero && !scrolled ? 'border-white/20 bg-white/10 text-white' : 'border-outline-variant/20 bg-surface text-foreground'}`}
                aria-label="Open navigation menu"
              />
            }
          >
            <Menu className="size-5" />
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="top-24 w-[calc(100%-2rem)] max-w-none -translate-y-0 rounded-[2rem] border border-border/20 bg-surface/95 p-0 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="p-6">
              <DialogTitle className="text-[10px] font-black uppercase tracking-[0.28em] text-muted-foreground">
                Navigation
              </DialogTitle>
              <div className="mt-6 flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-2xl border border-border/10 bg-card px-4 py-4 text-base font-black text-foreground transition-colors hover:bg-surface-container-low"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {!session ? (
                  <AuthModal>
                    <button className="flex h-12 w-full items-center justify-center rounded-xl signature-gradient px-4 text-sm font-black text-on-primary shadow-lg">
                      Get Started
                    </button>
                  </AuthModal>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/dashboard/candidate");
                    }}
                    className="flex h-12 w-full items-center justify-center rounded-xl signature-gradient px-4 text-sm font-black text-on-primary shadow-lg"
                  >
                    Open Dashboard
                  </button>
                )}
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-11 w-full items-center justify-center rounded-xl border border-border/20 px-4 text-sm font-bold text-muted-foreground"
                >
                  Close
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
}
