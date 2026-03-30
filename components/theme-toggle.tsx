"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: "light" as const, label: "Light Mode", icon: Sun },
    { name: "dark" as const, label: "Dark Mode", icon: Moon },
    { name: "system" as const, label: "System", icon: Monitor },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative rounded-full size-10 flex items-center justify-center hover:bg-surface-container-high transition-all group border border-outline-variant/10">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[150px] rounded-2xl border-border/20 bg-surface/90 dark:bg-background/90 backdrop-blur-xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="px-2 py-1.5 mb-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/70">Appearance</p>
        </div>
        {themes.map((t) => (
          <DropdownMenuItem 
            key={t.name}
            onClick={() => setTheme(t.name)} 
            className={cn(
              "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors group mb-0.5",
              theme === t.name ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
            )}
          >
            <div className="flex items-center gap-3">
              <t.icon className={cn("size-4", theme === t.name ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors")} />
              <span className="text-sm font-bold tracking-tight">{t.label}</span>
            </div>
            {theme === t.name && <Check className="size-4 text-primary animate-in zoom-in-50 duration-300" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
