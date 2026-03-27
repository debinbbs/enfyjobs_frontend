"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 32 }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center rounded-xl bg-primary/5 p-1.5", className)} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Soft Background Shape */}
        <circle cx="50" cy="50" r="45" fill="var(--primary)" className="opacity-[0.03]" />
        
        {/* Modern Lotus / Petal Shape */}
        <path
          d="M50 85C25 85 10 65 10 45C10 25 35 15 50 15C65 15 90 25 90 45C90 65 75 85 50 85Z"
          stroke="url(#logo-gradient)"
          strokeWidth="2"
          strokeDasharray="4 4"
          className="opacity-30"
        />
        
        {/* Central Wellness Petal */}
        <path
          d="M50 75C35 75 25 60 25 45C25 30 40 20 50 20C60 20 75 30 75 45C75 60 65 75 50 75Z"
          fill="url(#logo-gradient)"
          className="opacity-10"
        />
        
        {/* Elegant Pulse Line */}
        <path
          d="M25 55L35 55L42 35L50 65L58 45L65 55L75 55"
          stroke="url(#logo-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_12px_rgba(160,120,255,0.4)]"
        />
        
        {/* Vitality Core */}
        <circle cx="50" cy="50" r="4" fill="var(--secondary)" className="animate-pulse" />
        
        <defs>
          <linearGradient id="logo-gradient" x1="25" y1="50" x2="75" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
