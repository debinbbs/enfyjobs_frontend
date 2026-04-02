"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FileText, LayoutDashboard, LogOut, Search, UserRound } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";
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
  const showSearch = pathname === "/jobs";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          <Link className="text-sm font-semibold hover:text-primary transition-colors" href="/#categories">Categories</Link>
          <Link className="text-sm font-semibold hover:text-primary transition-colors" href="/#journey">How It Works</Link>
          <Link className="text-sm font-semibold hover:text-primary transition-colors" href="/#growth">Growth</Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className={`${showSearch ? "hidden md:flex" : "hidden"} items-center relative group`}>
          <Search className="absolute left-4 text-outline group-focus-within:text-primary transition-colors size-4" />
          <Input
            className="bg-surface-container-high rounded-full py-2.5 pl-11 pr-6 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none ring-offset-background"
            placeholder="Search Careers"
          />
        </div>
        <ThemeToggle />
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 rounded-full border border-outline-variant/10 bg-surface-container-low px-2 py-2 transition-all hover:bg-surface-container-high">
              <div className="flex size-9 items-center justify-center rounded-full signature-gradient text-[11px] font-black uppercase tracking-[0.2em] text-on-primary">
                {profileLabel.slice(0, 1)}
              </div>
              <div className="hidden text-left md:block">
                <p className="text-sm font-black tracking-tight text-foreground">
                  {profileLabel}
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                  {session.phoneNumber || "Signed in"}
                </p>
              </div>
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
          <AuthModal />
        )}
      </div>
    </header>
  );
}
