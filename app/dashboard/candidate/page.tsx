"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CandidateSession = {
  phoneNumber?: string;
  user?: {
    candidate?: {
      firstName?: string | null;
    } | null;
  } | null;
};

const CANDIDATE_SESSION_STORAGE_KEY = "enfyjobs:candidate-session";

function readCandidateSession(): CandidateSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(CANDIDATE_SESSION_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as CandidateSession;
  } catch {
    return null;
  }
}

export default function CandidateDashboardPage() {
  const [session, setSession] = useState<CandidateSession | null>(null);

  useEffect(() => {
    setSession(readCandidateSession());
  }, []);

  const firstName = session?.user?.candidate?.firstName?.trim();
  const greetingName = firstName || "there";

  return (
    <main className="flex-1 px-6 py-24 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl shadow-primary/10 md:p-12">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-secondary-container/50 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-primary-container/40 blur-3xl" />
          <div className="relative space-y-4">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">
              Candidate Dashboard
            </p>
            <h1 className="max-w-2xl text-4xl font-black text-foreground md:text-5xl">
              Welcome, {greetingName}. Your wellness career journey starts here.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              You are signed in with {session?.phoneNumber || "your verified mobile number"}.
              We can build out jobs, profile completion, and application tracking here next.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded-[1.75rem] bg-surface-container-lowest p-6 shadow-lg shadow-primary/5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-outline">
              Profile
            </p>
            <h2 className="mt-3 text-2xl font-black text-foreground">
              Complete your candidate card
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Add headline, city, experience, and wellness specializations to get stronger matches.
            </p>
          </article>

          <article className="rounded-[1.75rem] bg-surface-container-lowest p-6 shadow-lg shadow-primary/5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-outline">
              Jobs
            </p>
            <h2 className="mt-3 text-2xl font-black text-foreground">
              Explore curated openings
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Browse roles built for yoga, therapy, nutrition, and holistic wellness professionals.
            </p>
          </article>

          <article className="rounded-[1.75rem] bg-surface-container-lowest p-6 shadow-lg shadow-primary/5">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-outline">
              Resume
            </p>
            <h2 className="mt-3 text-2xl font-black text-foreground">
              Power up your application
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Use the AI resume tools to sharpen your story before you start applying.
            </p>
          </article>
        </section>

        <section className="flex flex-wrap gap-4">
          <Link
            href="/jobs"
            className="inline-flex h-12 items-center rounded-full signature-gradient px-6 text-sm font-black uppercase tracking-[0.2em] text-on-primary"
          >
            Browse Jobs
          </Link>
          <Link
            href="/resume"
            className="inline-flex h-12 items-center rounded-full border border-outline-variant/20 bg-white px-6 text-sm font-black uppercase tracking-[0.2em] text-foreground"
          >
            Open AI Resume
          </Link>
        </section>
      </div>
    </main>
  );
}
