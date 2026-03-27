import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="py-20 border-t border-border/50 mt-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="space-y-6">
          <div className="flex items-center gap-3 group cursor-pointer">
            <Logo size={42} className="transition-transform group-hover:scale-110 duration-500" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-tight text-foreground leading-none">Wellness Jobs</span>
              <span className="text-[11px] font-black tracking-[0.25em] uppercase text-primary leading-none mt-1">India</span>
            </div>
          </div>
          <p className="text-muted-foreground max-w-xs text-lg font-medium">Empowering India&apos;s wellness generation to build meaningful careers with AI-driven tools.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
          {[
            { title: "Platform", links: ["Swipe Jobs", "AI Resume", "Interview Prep"] },
            { title: "Company", links: ["About Us", "Success Stories", "Contact"] },
            { title: "Social", links: ["Instagram", "LinkedIn", "Twitter"] }
          ].map((col, i) => (
            <div key={i} className="space-y-6">
              <h4 className="font-black text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a className="text-foreground font-bold hover:text-primary transition-colors cursor-pointer" href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-20 pt-10 border-t border-border/30 flex flex-col sm:flex-row justify-between gap-6 text-sm text-muted-foreground font-bold">
        <p>© 2024 Wellness Jobs India. All Rights Reserved.</p>
        <div className="flex gap-10">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
