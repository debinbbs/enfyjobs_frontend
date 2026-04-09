import type { Metadata } from "next";
import { PageHeaderOffset } from "@/components/layout/PageHeaderOffset";

export const metadata: Metadata = {
  title: "Complete Your Profile | Wellness Jobs India",
  description: "Set up your wellness professional profile to get matched with the best employers.",
};

/**
 * Onboarding route metadata wrapper.
 * Global Header and Footer are provided by the root app layout.
 */
export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageHeaderOffset desktopOnly>{children}</PageHeaderOffset>;
}
