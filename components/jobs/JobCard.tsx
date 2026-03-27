"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export function JobCard({ 
  title, 
  company, 
  location, 
  salary, 
  type, 
  icon: Icon, 
  iconBg, 
  iconColor 
}: JobCardProps) {
  return (
    <Card className="bg-card/40 backdrop-blur-xl p-6 rounded-[2rem] hover:shadow-2xl transition-all border border-border/10 hover:border-primary/20 flex flex-col justify-between h-full group ring-1 ring-white/10">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", iconBg)}>
            <Icon className={cn("size-7", iconColor)} />
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive transition-colors rounded-full">
            <Heart className="size-5" />
          </Button>
        </div>
        <h3 className="text-xl font-black font-display mb-1 group-hover:text-primary transition-colors tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest mb-4 opacity-80">
          {company} • {location}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge className="bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest border-none">
            {type}
          </Badge>
          <Badge className="bg-muted text-muted-foreground px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest border-none italic">
            {salary}
          </Badge>
        </div>
      </div>
      <Button className="w-full py-6 bg-surface-container-low text-primary font-black rounded-full hover:bg-primary hover:text-on-primary transition-all border-none text-sm tracking-wide">
        Quick Apply
      </Button>
    </Card>
  );
}
