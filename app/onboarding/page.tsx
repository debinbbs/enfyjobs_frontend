"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { readCandidateSession } from "@/lib/auth/candidate-session";
import { CandidateOnboardingWizard } from "@/components/auth/CandidateOnboardingWizard";

export default function OnboardingPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const session = readCandidateSession();

    // 1. Not logged in — redirect home
    if (!session?.access_token) {
      router.replace("/");
      return;
    }

    // 2. Already has a name — not new, send to dashboard
    if (session.user?.candidate?.firstName) {
      router.replace("/dashboard/candidate");
      return;
    }

    // 3. Get phone from session or sessionStorage
    const phone =
      session.phoneNumber ||
      sessionStorage.getItem("enfyjobs:onboarding-phone") ||
      null;

    if (!phone) {
      router.replace("/");
      return;
    }

    setPhoneNumber(phone);
    setChecking(false);
  }, [router]);

  const handleComplete = () => {
    sessionStorage.removeItem("enfyjobs:onboarding-phone");
    router.replace("/dashboard/candidate");
  };

  if (checking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-muted-foreground">Setting up your profile…</p>
        </div>
      </div>
    );
  }

  if (!phoneNumber) return null;

  return (
    <CandidateOnboardingWizard
      phoneNumber={phoneNumber}
      onComplete={handleComplete}
      inline
    />
  );
}
