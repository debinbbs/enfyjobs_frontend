"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  ChevronRight,
  FileText,
  Mic,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import { TopSpace } from "@/components/utils/TopSpace";

type ResumeBuilderModeSelectorProps = {
  heading: string;
  description: string;
  manualHref: string;
  aiHref: string;
  backHref: string;
  backLabel: string;
};

export function ResumeBuilderModeSelector({
  heading,
  description,
  manualHref,
  aiHref,
  backHref,
  backLabel,
}: ResumeBuilderModeSelectorProps) {
  return (
    <main className="bg-surface min-h-screen font-body selection:bg-primary-container selection:text-on-primary-container">
      <TopSpace />

      <div className="mx-auto max-w-7xl px-6 pb-20">
        <section className="relative overflow-hidden rounded-[2.5rem] bg-white px-8 py-10 shadow-xl shadow-primary/10 md:px-12 md:py-14">
          <div className="absolute -right-12 top-0 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-52 w-52 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative space-y-6">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <ArrowLeft className="size-4" />
              {backLabel}
            </Link>

            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-primary/70">
                <FileText className="size-4" />
                Resume Builder
              </p>
              <h1 className="max-w-4xl text-4xl font-black text-foreground md:text-5xl">
                {heading}
              </h1>
              <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
                {description}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <Link
            href={manualHref}
            className="group relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_30px_80px_rgba(109,60,225,0.16)]"
          >
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-slate-100 blur-2xl transition group-hover:bg-primary/10" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <FileText className="size-7" />
                </div>
                <ChevronRight className="size-5 text-slate-300 transition group-hover:text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-foreground">Manual Resume Creation</h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Open the current step-by-step builder, edit every section yourself, and
                  save the resume exactly the way you want.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                <span className="rounded-full bg-slate-100 px-4 py-2">Full Control</span>
                <span className="rounded-full bg-slate-100 px-4 py-2">Current Builder</span>
                <span className="rounded-full bg-slate-100 px-4 py-2">Manual Editing</span>
              </div>
            </div>
          </Link>

          <Link
            href={aiHref}
            className="group relative overflow-hidden rounded-[2.25rem] border border-primary/20 bg-[linear-gradient(145deg,rgba(109,60,225,0.08),rgba(255,255,255,1))] p-8 shadow-[0_24px_60px_rgba(109,60,225,0.12)] transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_30px_80px_rgba(109,60,225,0.18)]"
          >
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/15 blur-2xl" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <Bot className="size-7" />
                </div>
                <Sparkles className="size-5 text-primary" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-foreground">Build With AI Co-Pilot</h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Talk to the assistant in chat or use voice mode on the left while your live
                  resume updates on the right in real time.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] font-black uppercase tracking-[0.18em] text-primary/80">
                <span className="rounded-full bg-white/80 px-4 py-2">
                  <span className="inline-flex items-center gap-2">
                    <MessagesSquare className="size-3.5" />
                    Chat Guided
                  </span>
                </span>
                <span className="rounded-full bg-white/80 px-4 py-2">
                  <span className="inline-flex items-center gap-2">
                    <Mic className="size-3.5" />
                    Voice Mode
                  </span>
                </span>
                <span className="rounded-full bg-white/80 px-4 py-2">Live Preview</span>
              </div>
            </div>
          </Link>
        </section>
      </div>
    </main>
  );
}
