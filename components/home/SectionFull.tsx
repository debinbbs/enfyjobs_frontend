"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionFullProps {
  children: React.ReactNode;
  className?: string; // Background color/classes
  innerClassName?: string; // Additional inner container classes
  id?: string;
  as?: React.ElementType;
}

/**
 * Full Width Section Wrapper
 * Full background width with a centered max-w-7xl inner container.
 */
export function SectionFull({ children, className, innerClassName, id, as: Component = "section" }: SectionFullProps) {
  return (
    <Component id={id} className={cn("w-full py-16 sm:py-20 md:py-32", className)}>
      <div className={cn("max-w-7xl mx-auto px-5 sm:px-6 md:px-10", innerClassName)}>
        {children}
      </div>
    </Component>
  );
}
