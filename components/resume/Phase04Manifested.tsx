"use client";

import React from "react";
import { ArrowLeft, CheckCircle2, Download, Search, Save } from "lucide-react";

interface Phase04Props {
  onBack: () => void;
  onExploreMatches: () => void;
  onDownloadResume: () => void;
  isDownloadingResume?: boolean;
  downloadFeedback?: string;
  downloadFeedbackTone?: "default" | "success" | "error";
}

export function Phase04Manifested({
  onBack,
  onExploreMatches,
  onDownloadResume,
  isDownloadingResume = false,
  downloadFeedback,
  downloadFeedbackTone = "default",
}: Phase04Props) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-700">
          <CheckCircle2 className="size-4" />
          Step 4
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Your profile is ready
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-500">
          Save your profile, download a clean resume PDF, and start exploring matching jobs.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <Save className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Save to account</h2>
              <p className="text-sm text-slate-500">
                Your data stays searchable for employers and ready for ATS export.
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Use the save button on the right preview panel any time. You can come back later and edit this profile.
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-secondary/10 p-3 text-secondary">
              <Download className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Download resume</h2>
              <p className="text-sm text-slate-500">
                Get a simple PDF resume you can share with employers.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onDownloadResume}
            disabled={isDownloadingResume}
            className="inline-flex items-center gap-3 rounded-full bg-secondary px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-50"
          >
            <Download className="size-4" />
            {isDownloadingResume ? "Downloading..." : "Download PDF"}
          </button>

          {downloadFeedback ? (
            <p
              className={[
                "mt-4 text-sm font-semibold",
                downloadFeedbackTone === "error"
                  ? "text-red-600"
                  : downloadFeedbackTone === "success"
                    ? "text-emerald-700"
                    : "text-slate-500",
              ].join(" ")}
            >
              {downloadFeedback}
            </p>
          ) : null}
        </section>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-black">See matching jobs</h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/75">
              Your category, role, skills, city, and availability are now structured for better search and matching.
            </p>
          </div>
          <button
            type="button"
            onClick={onExploreMatches}
            className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg transition hover:scale-[1.02]"
          >
            <Search className="size-4" />
            Explore Jobs
          </button>
        </div>
      </section>

      <footer className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      </footer>
    </div>
  );
}
