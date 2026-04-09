"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
}

/**
 * Standard Centered Section Wrapper (Not Full Width)
 * Constrains content to max-w-7xl and adds default padding.
 */
export function Section({ children, className, id, as: Component = "section" }: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        "max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-16 sm:py-20 md:py-32",
        className
      )}
    >
      {children}
    </Component>
  );
}
