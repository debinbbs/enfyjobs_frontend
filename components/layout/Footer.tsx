import Link from "next/link";

import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="py-20 border-t border-border/50 mt-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <Logo size={42} className="transition-transform group-hover:scale-110 duration-500" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-tight text-foreground leading-none">Wellness Jobs</span>
              <span className="text-[11px] font-black tracking-[0.25em] uppercase text-primary leading-none mt-1">India</span>
            </div>
          </Link>
          <p className="text-muted-foreground max-w-sm text-lg font-medium">
            Discover wellness roles, build a stronger profile, prepare for interviews, and keep moving toward work that fits your path.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
          {[
            {
              title: "Explore",
              links: [
                { label: "Jobs", href: "/jobs" },
                { label: "Categories", href: "/#categories" },
                { label: "How It Works", href: "/#journey" },
              ],
            },
            {
              title: "Grow",
              links: [
                { label: "AI Resume", href: "/auth/resume" },
                { label: "Interview Prep", href: "/auth/interview" },
                { label: "Upskill", href: "/auth/upskill" },
              ],
            },
            {
              title: "Connect",
              links: [
                { label: "Instagram", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Contact", href: "#" },
              ],
            }
          ].map((col, i) => (
            <div key={i} className="space-y-6">
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link className="text-foreground font-bold hover:text-primary transition-colors cursor-pointer" href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-20 pt-10 border-t border-border/30 flex flex-col sm:flex-row justify-between gap-6 text-sm text-muted-foreground font-bold">
        <p>© 2026 Wellnessjobsindia. All Rights Reserved.</p>
        <div className="flex gap-10">
          <Link href="/" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/" className="hover:text-primary transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
