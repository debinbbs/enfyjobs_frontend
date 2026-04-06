"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { getCandidateAuthHeaders } from "@/lib/auth/candidate-session";
import { getFirstZodErrorMessage, resumeStep2Schema } from "@/lib/validation/forms";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
).replace(/\/$/, "");

const EXPERIENCE_OPTIONS = ["Fresher", "0-1 years", "1-3 years", "3-5 years", "5+ years"];
const LANGUAGE_OPTIONS = ["Hindi", "English", "Kannada", "Tamil", "Telugu", "Malayalam"];
const AVAILABILITY_OPTIONS = ["Immediate", "7 days", "15 days", "1 month"];
const SHIFT_OPTIONS = ["Morning", "Day", "Evening", "Night", "Flexible"];

const SKILL_OPTIONS: Record<string, string[]> = {
  spa: [
    "Body Massage",
    "Deep Tissue Massage",
    "Ayurveda Therapy",
    "Foot Reflexology",
    "Guest Service",
    "Spa Hygiene",
  ],
  yoga: [
    "Yoga Practice",
    "Breathing Exercises",
    "Meditation Guidance",
    "Stretching",
    "Group Classes",
    "One-to-One Sessions",
  ],
  fitness: [
    "Workout Planning",
    "Strength Training",
    "Client Motivation",
    "Warm Up & Cool Down",
    "Group Training",
    "Gym Floor Support",
  ],
  beauty: [
    "Facials",
    "Waxing",
    "Makeup",
    "Hair Styling",
    "Skin Consultation",
    "Product Knowledge",
  ],
  nutrition: [
    "Diet Planning",
    "Weight Management",
    "Meal Guidance",
    "Lifestyle Coaching",
    "Client Counselling",
  ],
  front_desk: [
    "Reception Handling",
    "Appointment Booking",
    "Guest Support",
    "Billing Basics",
    "Phone Handling",
    "Customer Service",
  ],
};

interface LanguageItem {
  language: string;
  level: string;
}

interface Phase02Props {
  discipline: string;
  preferredRole: string;
  location: string;
  experienceLevel: string;
  setExperienceLevel: (value: string) => void;
  skills: string[];
  setSkills: (value: string[]) => void;
  languages: LanguageItem[];
  setLanguages: (value: LanguageItem[]) => void;
  availability: string;
  setAvailability: (value: string) => void;
  shiftPreference: string[];
  setShiftPreference: (value: string[]) => void;
  personalSummary: string;
  setPersonalSummary: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function getApiErrorMessage(payload: unknown, fallbackMessage: string) {
  if (!payload || typeof payload !== "object") {
    return fallbackMessage;
  }

  const message = (payload as { message?: string | string[] }).message;
  if (Array.isArray(message)) {
    return message.join(", ");
  }

  return typeof message === "string" ? message : fallbackMessage;
}

export function Phase02Journey({
  discipline,
  preferredRole,
  location,
  experienceLevel,
  setExperienceLevel,
  skills,
  setSkills,
  languages,
  setLanguages,
  availability,
  setAvailability,
  shiftPreference,
  setShiftPreference,
  personalSummary,
  setPersonalSummary,
  onNext,
  onBack,
}: Phase02Props) {
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const suggestedSkills = useMemo(
    () => SKILL_OPTIONS[discipline] ?? ["Communication", "Customer Service", "Teamwork"],
    [discipline]
  );

  const toggleSkill = (skill: string) => {
    setSkills(
      skills.includes(skill)
        ? skills.filter((entry) => entry !== skill)
        : [...skills, skill]
    );
  };

  const toggleLanguage = (language: string) => {
    const exists = languages.some((entry) => entry.language === language);
    if (exists) {
      setLanguages(languages.filter((entry) => entry.language !== language));
      return;
    }

    setLanguages([...languages, { language, level: "Basic" }]);
  };

  const toggleShift = (shift: string) => {
    setShiftPreference(
      shiftPreference.includes(shift)
        ? shiftPreference.filter((entry) => entry !== shift)
        : [...shiftPreference, shift]
    );
  };

  const generateSummary = async () => {
    const bio = [
      preferredRole && `Role: ${preferredRole}.`,
      location && `Location: ${location}.`,
      experienceLevel && `Experience: ${experienceLevel}.`,
      skills.length > 0 && `Skills: ${skills.join(", ")}.`,
      languages.length > 0 &&
        `Languages: ${languages.map((entry) => entry.language).join(", ")}.`,
      availability && `Availability: ${availability}.`,
    ]
      .filter(Boolean)
      .join(" ");

    if (bio.trim().length < 10) {
      setFeedback("Choose role, experience, skills, and availability first.");
      return;
    }

    setIsGeneratingSummary(true);
    setFeedback("");

    try {
      const headers = await getCandidateAuthHeaders({
        "Content-Type": "application/json",
      });
      const response = await fetch(`${API_BASE_URL}/ai/generate-summary`, {
        method: "POST",
        headers,
        body: JSON.stringify({ bio, mode: "summary" }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(getApiErrorMessage(payload, "Could not generate summary."));
      }

      const summary =
        typeof (payload as { summary?: unknown })?.summary === "string"
          ? (payload as { summary: string }).summary
          : "";

      if (!summary.trim()) {
        throw new Error("AI did not return a summary.");
      }

      setPersonalSummary(summary.trim());
      setFeedback("Summary generated. You can edit it if needed.");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not generate summary.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleContinue = () => {
    const result = resumeStep2Schema.safeParse({
      experienceLevel,
      skills,
      languages,
      availability,
      shiftPreference,
      personalSummary,
    });

    if (!result.success) {
      setValidationMessage(getFirstZodErrorMessage(result.error));
      return;
    }

    setValidationMessage("");
    onNext();
  };

  const canContinue =
    experienceLevel.trim().length > 0 &&
    skills.length > 0 &&
    availability.trim().length > 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
      <header className="space-y-3">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/70">
          Step 2
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Skills and availability
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-slate-500">
          Choose what you can do and when you can join. This helps employers find you fast.
        </p>
      </header>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900">Experience level</h2>
          <div className="flex flex-wrap gap-3">
            {EXPERIENCE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setExperienceLevel(option)}
                className={[
                  "rounded-full border px-4 py-3 text-sm font-bold transition",
                  experienceLevel === option
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-primary/40",
                ].join(" ")}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900">Main skills</h2>
          <p className="text-sm text-slate-500">Pick the skills you want employers to search.</p>
          <div className="flex flex-wrap gap-3">
            {suggestedSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={[
                  "rounded-full border px-4 py-3 text-sm font-bold transition",
                  skills.includes(skill)
                    ? "border-secondary bg-secondary text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-secondary/40",
                ].join(" ")}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">Languages</h2>
            <div className="flex flex-wrap gap-3">
              {LANGUAGE_OPTIONS.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => toggleLanguage(language)}
                  className={[
                    "rounded-full border px-4 py-3 text-sm font-bold transition",
                    languages.some((entry) => entry.language === language)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-slate-200 bg-slate-50 text-slate-700",
                  ].join(" ")}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-900">Joining time</h2>
            <div className="flex flex-wrap gap-3">
              {AVAILABILITY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAvailability(option)}
                  className={[
                    "rounded-full border px-4 py-3 text-sm font-bold transition",
                    availability === option
                      ? "border-primary bg-primary text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700",
                  ].join(" ")}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900">Shift preference</h2>
          <div className="flex flex-wrap gap-3">
            {SHIFT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleShift(option)}
                className={[
                  "rounded-full border px-4 py-3 text-sm font-bold transition",
                  shiftPreference.includes(option)
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-slate-200 bg-white text-slate-700",
                ].join(" ")}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Short summary</h2>
              <p className="text-sm text-slate-500">
                Optional. AI can write this for you.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void generateSummary()}
              disabled={isGeneratingSummary}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary transition hover:bg-primary hover:text-white disabled:opacity-50"
            >
              <Sparkles className="size-3.5" />
              {isGeneratingSummary ? "Writing..." : "Write with AI"}
            </button>
          </div>

          <textarea
            value={personalSummary}
            onChange={(event) => setPersonalSummary(event.target.value)}
            rows={5}
            placeholder="Example: Friendly spa therapist with guest care experience and massage skills."
            className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
          />

          {feedback ? <p className="text-sm font-semibold text-slate-500">{feedback}</p> : null}
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

        <div className="flex items-center gap-4">
          {validationMessage ? (
            <p className="text-sm font-bold text-red-600">{validationMessage}</p>
          ) : null}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
            <ArrowRight className="size-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
