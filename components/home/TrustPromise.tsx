"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  BadgeCheck,
  Check,
  CircleDollarSign,
  ShieldCheck,
} from "lucide-react";

const trustPoints = [
  {
    title: "Verified companies",
    description:
      "We focus on opportunities from trusted wellness employers and screened hiring partners.",
    icon: <ShieldCheck className="size-7 text-primary" />,
    tone: "from-primary/12 to-primary-container/10",
    border: "border-primary/15",
  },
  {
    title: "Zero candidate fees",
    description:
      "Candidates should not pay to access jobs, apply, interview, or move forward in the hiring process.",
    icon: <CircleDollarSign className="size-7 text-secondary" />,
    tone: "from-secondary/12 to-secondary-container/10",
    border: "border-secondary/15",
  },
  {
    title: "Safer applications",
    description:
      "A more guided application flow helps reduce random outreach, confusion, and scammy middlemen.",
    icon: <BadgeCheck className="size-7 text-tertiary" />,
    tone: "from-tertiary/10 to-tertiary-container/14",
    border: "border-tertiary/15",
  },
];

const safetySignals = [
  "Trusted wellness employers",
  "Clear candidate flow",
  "No job access fees",
  "Support-first experience",
];

export function TrustPromise() {
  return (
    <section className="py-24" id="trust">
      <div className="relative px-2 py-6 md:px-4">
        <div className="kinetic-blob -left-8 top-8 h-72 w-72 bg-primary/12 blur-[110px]" />
        <div className="kinetic-blob right-0 top-1/3 h-80 w-80 bg-secondary/12 blur-[110px]" />
        <div className="kinetic-blob bottom-0 left-1/3 h-64 w-64 bg-tertiary/10 blur-[110px]" />

        <div className="relative z-10 space-y-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-7">
              <Badge className="w-fit rounded-full border-none bg-secondary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-secondary">
                Trust & Safety
              </Badge>

              <div className="space-y-5">
                <h2 className="max-w-3xl text-4xl font-black leading-[1.02] text-foreground md:text-6xl">
                  A job search that feels safer, clearer, and fair to candidates.
                </h2>
                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  Wellnessjobsindia is built to help candidates avoid the messy side of job hunting. We want opportunity discovery to feel more trustworthy from the first click to the final interview.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {safetySignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-border/35 bg-white/75 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/12 via-transparent to-secondary/12 blur-2xl" />
              <Card className="relative overflow-hidden rounded-[2.5rem] border border-border/15 bg-card/85 p-7 shadow-[0_20px_60px_rgba(39,46,66,0.08)] backdrop-blur">
                <div className="absolute -right-10 -top-10 size-36 rounded-full bg-primary/10 blur-2xl" />
                <div className="absolute -bottom-12 left-10 size-32 rounded-full bg-secondary/10 blur-2xl" />

                <div className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
                      <ShieldCheck className="size-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.22em] text-primary">
                        Candidate promise
                      </p>
                      <p className="mt-1 text-2xl font-black text-foreground">
                        Trusted roles, no pressure tactics
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {[
                      "We want candidates applying with confidence, not anxiety.",
                      "You should not be pushed toward unclear or paid shortcuts.",
                      "The platform experience should feel guided, not risky.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-border/20 bg-white/70 px-4 py-3"
                      >
                        <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary/12">
                          <Check className="size-3.5 text-secondary" />
                        </div>
                        <p className="text-sm leading-relaxed text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {trustPoints.map((point) => (
              <Card
                key={point.title}
                className={`group relative overflow-hidden rounded-[2rem] border ${point.border} bg-card/80 p-6 shadow-[0_18px_40px_rgba(39,46,66,0.06)] transition-transform duration-500 hover:-translate-y-1`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${point.tone} opacity-80`} />
                <div className="absolute right-4 top-4 size-16 rounded-full bg-white/35 blur-2xl" />
                <div className="relative space-y-5">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/75 shadow-sm">
                    {point.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-foreground">{point.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{point.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
