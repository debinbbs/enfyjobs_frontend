"use client";

import { useState, useCallback } from "react";
import { Check, ChevronLeft, Loader2, ChevronRight, LocateFixed } from "lucide-react";
import { getCandidateAuthHeaders } from "@/lib/auth/candidate-session";
import { IndianCitySelect, findNearestIndianCity } from "@/components/ui/IndianCitySelect";

// ─── Constants ──────────────────────────────────────────────────────────────

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
).replace(/\/$/, "");

const JOB_GROUPS = [
  {
    id: "salon-spa-services",
    label: "Salon & Spa Services",
    description: "Create confidence through care.",
    emoji: "💇",
    roles: ["Hair Stylist", "Barber", "Beautician", "Nail Technician", "Massage Therapist", "Spa Manager"],
  },
  {
    id: "wellness-hospitality",
    label: "Wellness Hospitality",
    description: "Deliver comfort & experiences.",
    emoji: "🛎️",
    roles: [
      "Spa Receptionist",
      "Front Desk Executive",
      "Guest Relations Executive",
      "Resort Activity Coordinator",
      "Wellness Center Staff",
      "Housekeeping (Wellness/Resort)",
    ],
  },
  {
    id: "beauty",
    label: "Beauty & Skin",
    description: "Enhance beauty with expertise.",
    emoji: "✨",
    roles: ["Skincare Specialist", "Cosmetologist", "Aesthetician", "Laser Technician", "Dermatology Assistant", "Makeup Artist"],
  },
  {
    id: "movement",
    label: "Yoga & Fitness",
    description: "Train bodies. Build discipline.",
    emoji: "🧘",
    roles: [
      "Yoga Instructor",
      "Personal Trainer",
      "Gym Trainer",
      "Pilates Instructor",
      "Zumba / Dance Fitness Coach",
      "Sports Coach",
    ],
  },
  {
    id: "therapy-rehabilitation",
    label: "Therapy & Rehabilitation",
    description: "Restore movement. Improve lives.",
    emoji: "🩺",
    roles: [
      "Physiotherapist",
      "Occupational Therapist",
      "Speech Therapist",
      "Chiropractor",
      "Ayurveda Therapist",
      "Home Care Therapist",
    ],
  },
  {
    id: "mental-health-coaching",
    label: "Mental Health & Coaching",
    description: "Support minds. Change lives.",
    emoji: "🧠",
    roles: ["Psychologist", "Counselor", "Therapist", "Life Coach", "Relationship Coach", "Rehab Specialist"],
  },
];

const TRUSTED_COMPANIES = ["Paytm", "Uber", "Grab", "Licious", "TATA AIA", "Zomato", "DUNZO"];

const TOTAL_STEPS = 4;

// ─── Types ───────────────────────────────────────────────────────────────────

type OnboardingStep = "name" | "job-role" | "experience" | "location" | "success";

interface OnboardingData {
  firstName: string;
  lastName: string;
  jobCategories: string[];
  hasExperience: boolean | null;
  yearsOfExperience: string;
  city: string;
  state: string;
  willingToRelocate: boolean | null;
}

export interface CandidateOnboardingWizardProps {
  phoneNumber: string;
  onComplete: () => void;
  /** Use on a dedicated full-page — no fixed overlay. */
  inline?: boolean;
  onSkip?: () => void;
}

const STEP_ORDER: OnboardingStep[] = ["name", "job-role", "experience", "location", "success"];

function getStepIndex(step: OnboardingStep) {
  return STEP_ORDER.indexOf(step);
}

// ─── Shared tokens ───────────────────────────────────────────────────────────

const BTN =
  "w-full h-14 rounded-2xl font-black text-base tracking-wide transition-all active:scale-95 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:active:scale-100";

// Use these as classes on the button conditionally:
const BTN_ENABLED = "signature-gradient text-on-primary shadow-lg shadow-primary/25 hover:opacity-90";
const BTN_DISABLED = "bg-surface-container-high text-muted-foreground shadow-none";

const INPUT =
  "w-full h-14 px-4 rounded-2xl border-2 text-base font-semibold transition-all outline-none focus:ring-0 bg-surface-container-low border-outline-variant/40 text-foreground placeholder:text-outline/40 focus:border-primary";

const TOGGLE =
  "flex-1 h-14 rounded-2xl border-2 font-black text-base transition-all duration-200";

// ─── Progress bar ────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full h-1 bg-surface-container-high overflow-hidden">
      <div
        className="h-full transition-all duration-500 ease-out signature-gradient"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Desktop left panel ───────────────────────────────────────────────────────

function LeftPanel() {
  return (
    <div className="hidden md:flex w-[38%] flex-col justify-between p-10 relative overflow-hidden signature-gradient flex-shrink-0">
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 bg-white blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-10 w-64 h-64 rounded-full opacity-10 bg-white blur-3xl pointer-events-none" />

      <div className="z-10 space-y-8">
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 space-y-4 border border-white/20">
          <h2 className="text-2xl font-black text-on-primary leading-tight">
            Complete<br />your profile!
          </h2>
          <ul className="space-y-3">
            {["Personalised job matches", "Direct connect with HRs", "Latest updates on the job"].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/30 flex items-center justify-center">
                  <Check className="w-3 h-3 text-on-primary stroke-[3]" />
                </span>
                <span className="text-on-primary/90 text-sm font-medium">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-white/30" style={{ transform: `scale(${1 - i * 0.1})` }} />
          ))}
        </div>
      </div>

      <div className="z-10 space-y-3">
        <p className="text-on-primary/50 text-xs font-bold uppercase tracking-widest">
          Trusted by over 2 lakhs+ companies
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {TRUSTED_COMPANIES.map((c) => (
            <span key={c} className="text-on-primary/70 text-xs font-bold tracking-wide">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step content components ──────────────────────────────────────────────────

function StepName({ data, onChange }: { data: OnboardingData; onChange: (u: Partial<OnboardingData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-2xl font-black text-foreground">What&apos;s your name?</h3>
        <p className="text-sm text-muted-foreground mt-1">So employers can contact you directly.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2 ml-1">
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            placeholder="e.g. Priya"
            className={INPUT}
            autoFocus
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2 ml-1">
            Last Name
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            placeholder="e.g. Sharma"
            className={INPUT}
          />
        </div>
      </div>
    </div>
  );
}

function StepJobRole({ data, onChange }: { data: OnboardingData; onChange: (u: Partial<OnboardingData>) => void }) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const selectedGroup = JOB_GROUPS.find((g) => g.id === selectedGroupId) ?? null;

  const toggle = (role: string) => {
    const updated = data.jobCategories.includes(role)
      ? data.jobCategories.filter((c) => c !== role)
      : [...data.jobCategories, role];
    onChange({ jobCategories: updated });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-2xl font-black text-foreground">What job are you looking for?</h3>
        <p className="text-sm text-muted-foreground mt-1">Pick a category, then select your role.</p>
      </div>

      {/* Selected summary */}
      {data.jobCategories.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {data.jobCategories.map((role) => (
            <span
              key={role}
              onClick={() => toggle(role)}
              className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/30 active:bg-red-50 active:text-red-600 transition-colors"
            >
              {role} <span className="font-black text-sm">×</span>
            </span>
          ))}
        </div>
      )}

      {/* Group cards */}
      {!selectedGroupId && (
        <div className="grid grid-cols-2 gap-3">
          {JOB_GROUPS.map((group) => {
            const count = group.roles.filter((r) => data.jobCategories.includes(r)).length;
            const hasSelected = count > 0;
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className={`relative flex flex-col items-start gap-1.5 px-4 py-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-[0.97] ${
                  hasSelected
                    ? "border-primary bg-primary/8 shadow-sm"
                    : "border-outline-variant/30 bg-surface-container-low active:border-primary/40"
                }`}
              >
                <span className="text-3xl">{group.emoji}</span>
                <p className={`text-sm font-black leading-tight ${hasSelected ? "text-primary" : "text-foreground"}`}>
                  {group.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {group.description}
                </p>
                <p className="text-[11px] font-semibold text-muted-foreground/80">
                  {count > 0 ? `${count} selected` : `${group.roles.length} roles`}
                </p>
                <ChevronRight className="absolute top-3 right-3 w-4 h-4 text-outline" />
                {hasSelected && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-black flex items-center justify-center shadow">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Roles drill-down */}
      {selectedGroupId && selectedGroup && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedGroupId(null)}
            className="flex items-center gap-1.5 text-sm font-bold text-primary"
          >
            <ChevronLeft className="w-4 h-4" />
            All categories
          </button>

          <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
            <span className="text-2xl">{selectedGroup.emoji}</span>
            <div>
              <p className="text-base font-black text-foreground">{selectedGroup.label}</p>
              <p className="text-xs text-muted-foreground">{selectedGroup.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {selectedGroup.roles.map((role) => {
              const selected = data.jobCategories.includes(role);
              return (
                <button
                  key={role}
                  onClick={() => toggle(role)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-150 active:scale-95 ${
                    selected
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant/30 bg-surface-container-low text-foreground"
                  }`}
                >
                  {selected && <Check className="inline w-3.5 h-3.5 mr-1.5 stroke-[3]" />}
                  {role}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StepExperience({ data, onChange }: { data: OnboardingData; onChange: (u: Partial<OnboardingData>) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-black text-foreground">Work experience?</h3>
        <p className="text-sm text-muted-foreground mt-1">This helps us show the most relevant listings.</p>
      </div>

      <div className="flex gap-3">
        {(["Yes", "No"] as const).map((option) => {
          const val = option === "Yes";
          const selected = data.hasExperience === val;
          return (
            <button
              key={option}
              onClick={() => onChange({ hasExperience: val, yearsOfExperience: val ? data.yearsOfExperience : "0" })}
              className={`${TOGGLE} ${selected ? "border-primary bg-primary/10 text-primary" : "border-outline-variant/40 bg-transparent text-muted-foreground"}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {data.hasExperience === true && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2 ml-1">
            Years of Experience
          </label>
          <input
            type="number"
            min="0"
            max="60"
            value={data.yearsOfExperience}
            onChange={(e) => onChange({ yearsOfExperience: e.target.value })}
            placeholder="e.g. 3"
            className={INPUT}
          />
        </div>
      )}
    </div>
  );
}

function StepLocation({ data, onChange }: { data: OnboardingData; onChange: (u: Partial<OnboardingData>) => void }) {
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location access is not supported in this browser.");
      return;
    }

    setIsDetectingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearestCity = findNearestIndianCity(
          position.coords.latitude,
          position.coords.longitude,
        );

        if (!nearestCity) {
          setLocationError("We couldn't map your current location to a city yet.");
          setIsDetectingLocation(false);
          return;
        }

        onChange({
          city: nearestCity.city,
          state: nearestCity.state,
        });
        setIsDetectingLocation(false);
      },
      (error) => {
        const nextError =
          error.code === error.PERMISSION_DENIED
            ? "Location permission was denied. You can still search your city manually."
            : error.code === error.TIMEOUT
              ? "Location lookup timed out. Please try again."
              : "We couldn't detect your location. Please search your city manually.";

        setLocationError(nextError);
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-black text-foreground">Where are you based?</h3>
        <p className="text-sm text-muted-foreground mt-1">Your city helps us find nearby jobs.</p>
      </div>

      <div>
        <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Current City *</label>
        <IndianCitySelect
          value={data.city}
          stateValue={data.state}
          placeholder="e.g. Mumbai"
          inputClassName={INPUT}
          onChange={({ city, state }) => onChange({ city, state })}
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={detectCurrentLocation}
            disabled={isDetectingLocation}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 text-sm font-bold text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDetectingLocation ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Detecting city...
              </>
            ) : (
              <>
                <LocateFixed className="h-4 w-4" />
                Use current location
              </>
            )}
          </button>
          <p className="text-[11px] text-muted-foreground">
            Uses your browser location permission to auto-select the nearest city.
          </p>
        </div>
        <p className="mt-2 ml-1 text-[11px] text-muted-foreground">
          Start typing and pick your city from the list. We&apos;ll fill the state automatically.
        </p>
        {locationError && (
          <p className="mt-2 ml-1 text-[11px] font-semibold text-destructive">
            {locationError}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-black uppercase tracking-widest text-on-surface-variant mb-2 ml-1">State</label>
        <input
          type="text"
          value={data.state}
          readOnly
          placeholder="Auto-filled from your city"
          className={`${INPUT} cursor-not-allowed bg-surface-container text-muted-foreground`}
        />
      </div>

      <div>
        <p className="text-sm font-bold text-foreground mb-3">
          Open to jobs outside{" "}
          <span className="text-primary">{data.city || "your city"}</span>?
        </p>
        <div className="flex gap-3">
          {(["Yes", "No"] as const).map((option) => {
            const val = option === "Yes";
            const selected = data.willingToRelocate === val;
            return (
              <button
                key={option}
                onClick={() => onChange({ willingToRelocate: val })}
                className={`${TOGGLE} ${selected ? "border-primary bg-primary/10 text-primary" : "border-outline-variant/40 bg-transparent text-muted-foreground"}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StepSuccess({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full signature-gradient flex items-center justify-center shadow-xl shadow-primary/30">
          <Check className="w-12 h-12 text-on-primary stroke-[3]" />
        </div>
        {[
          { icon: "💼", cls: "-top-2 -left-7" },
          { icon: "🎓", cls: "-top-4 -right-7" },
          { icon: "📞", cls: "top-1 -right-11" },
          { icon: "⭐", cls: "bottom-0 -left-9" },
          { icon: "📋", cls: "-bottom-2 -right-7" },
        ].map(({ icon, cls }, i) => (
          <span key={i} className={`absolute text-xl ${cls} animate-bounce`} style={{ animationDelay: `${i * 150}ms` }}>{icon}</span>
        ))}
      </div>

      <div className="space-y-1.5">
        <p className="text-sm font-bold text-tertiary">✨ Congratulations ✨</p>
        <h3 className="text-xl font-black text-foreground">Profile successfully created!</h3>
      </div>

      <div className="bg-surface-container-low rounded-2xl px-5 py-3 border border-outline-variant/20 max-w-xs">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">Pro-tip:</span>{" "}
          <span className="text-primary font-semibold">Keep updating your profile</span> to get more calls from HRs
        </p>
      </div>

      <button onClick={onComplete} className={`${BTN} ${BTN_ENABLED} max-w-xs`}>
        Proceed to Dashboard
      </button>
    </div>
  );
}

// ─── Main Wizard ─────────────────────────────────────────────────────────────

export function CandidateOnboardingWizard({
  phoneNumber,
  onComplete,
  inline = false,
  onSkip,
}: CandidateOnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("name");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [data, setData] = useState<OnboardingData>({
    firstName: "",
    lastName: "",
    jobCategories: [],
    hasExperience: null,
    yearsOfExperience: "",
    city: "",
    state: "",
    willingToRelocate: null,
  });

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
    setSubmitError("");
  }, []);

  const stepIndex = getStepIndex(currentStep);
  const isSuccess = currentStep === "success";
  const isFinalInputStep = currentStep === "location";

  const goBack = () => {
    if (stepIndex > 0) setCurrentStep(STEP_ORDER[stepIndex - 1]);
  };

  const goNext = () => {
    if (stepIndex < STEP_ORDER.length - 1) setCurrentStep(STEP_ORDER[stepIndex + 1]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const headers = await getCandidateAuthHeaders();
      const res = await fetch(
        `${API_BASE_URL}/users/candidate-profile/${encodeURIComponent(phoneNumber)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...headers },
          body: JSON.stringify({
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim() || undefined,
            jobCategory: data.jobCategories[0] ?? undefined,
            specializations: data.jobCategories,
            yearsOfExperience: data.hasExperience ? parseInt(data.yearsOfExperience || "0", 10) : 0,
            city: data.city.trim() || undefined,
            state: data.state.trim() || undefined,
          }),
        }
      );
      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as { message?: string } | null;
        const msg = err?.message ?? "Failed to save profile.";
        throw new Error(Array.isArray(msg) ? msg.join(", ") : msg);
      }
      setCurrentStep("success");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Can proceed? (per-step validation) ─────────────────────────────────────
  const canNext = () => {
    if (currentStep === "name") return data.firstName.trim().length >= 2;
    if (currentStep === "job-role") return data.jobCategories.length > 0;
    if (currentStep === "experience") return data.hasExperience !== null;
    if (currentStep === "location") {
      return (
        data.city.trim().length >= 2 &&
        data.state.trim().length >= 2 &&
        data.willingToRelocate !== null
      );
    }
    return true;
  };

  const stepTitle: Record<OnboardingStep, string> = {
    name: "Your Name",
    "job-role": "Job Role",
    experience: "Experience",
    location: "Location",
    success: "",
  };

  const progressStep = Math.min(stepIndex + 1, TOTAL_STEPS);

  // ────────────────────────────────────────────────────────────────────────────
  // LAYOUT
  //
  // Mobile  : page-native flow below the global header
  // Desktop : centered two-panel card section inside the page body
  // ────────────────────────────────────────────────────────────────────────────

  const formContent = (
    <>
      {/* Step body */}
      {currentStep === "name" && <StepName data={data} onChange={updateData} />}
      {currentStep === "job-role" && <StepJobRole data={data} onChange={updateData} />}
      {currentStep === "experience" && <StepExperience data={data} onChange={updateData} />}
      {currentStep === "location" && <StepLocation data={data} onChange={updateData} />}
      {currentStep === "success" && <StepSuccess onComplete={onComplete} />}

      {submitError && (
        <p className="mt-4 text-sm text-destructive font-semibold text-center">{submitError}</p>
      )}
    </>
  );

  // ── Mobile layout ───────────────────────────────────────────────────────────
  const mobileLayout = (
    <section className="relative md:hidden kinetic-mesh">
      <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-3xl flex-col overflow-hidden bg-background pt-24 pb-6">

        {/* Decorative background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden -z-0">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute top-1/2 -left-24 h-56 w-56 rounded-full bg-secondary/5 blur-2xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-primary/4 blur-3xl" />
        </div>

        {/* Step strip */}
        {!isSuccess && (
          <div className="relative z-10 mx-4 flex-shrink-0 rounded-2xl border border-outline-variant/20 bg-background/85 backdrop-blur-sm sm:mx-6">
            <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-3 sm:px-5">
              <div className="flex items-center gap-2">
                {stepIndex > 0 && (
                  <button onClick={goBack} className="rounded-lg border border-outline-variant/20 bg-surface-container-low p-1.5">
                    <ChevronLeft className="h-4 w-4 text-on-surface-variant" />
                  </button>
                )}
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  {stepTitle[currentStep]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-primary">{progressStep}/{TOTAL_STEPS}</span>
                {onSkip && (
                  <button onClick={onSkip} className="text-xs font-bold text-outline">Skip</button>
                )}
              </div>
            </div>
            <div className="overflow-hidden rounded-b-2xl">
              <ProgressBar current={progressStep} total={TOTAL_STEPS} />
            </div>
          </div>
        )}

        {/* Form content */}
        <div className="relative z-10 flex flex-1 flex-col px-5 pt-5 sm:px-6">
          <div className="space-y-5">
            {formContent}
          </div>

          {!isSuccess && (
            <div className="mt-5">
              <button
                onClick={isFinalInputStep ? handleSubmit : goNext}
                disabled={!canNext() || isSubmitting}
                className={`${BTN} ${canNext() && !isSubmitting ? BTN_ENABLED : BTN_DISABLED}`}
              >
                {isFinalInputStep ? (
                  isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Saving…</>
                  ) : (
                    "Complete Profile"
                  )
                ) : (
                  "Next ->"
                )}
              </button>
            </div>
          )}

          {/* Tip card */}
          {!isSuccess && (
            <div className="mt-auto pt-5">
              <div className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3.5">
                <span className="mt-0.5 text-xl">💡</span>
                <div>
                  <p className="mb-0.5 text-xs font-black text-foreground">
                    {currentStep === "name" && "Your name is shared with employers when they call you."}
                    {currentStep === "job-role" && "Choose roles that match your passion. You can select multiple."}
                    {currentStep === "experience" && "Freshers are welcome. Many wellness studios prefer freshers."}
                    {currentStep === "location" && "Jobs near you get matched first. You can update this anytime."}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    60 seconds to unlock personalised job matches ✨
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  // ── Desktop layout ──────────────────────────────────────────────────────────
  const desktopCard = (
    <div className="hidden md:flex w-full max-w-3xl bg-card rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden min-h-[560px] max-h-[90vh] border border-outline-variant/20">
      <LeftPanel />

      <div className="flex-1 flex flex-col overflow-hidden bg-card">
        {!isSuccess && (
          <div className="flex-shrink-0 px-8 pt-6 pb-0 space-y-3">
            <div className="flex items-center gap-3">
              {stepIndex > 0 && (
                <button onClick={goBack} className="p-1.5 rounded-xl hover:bg-surface-container transition-colors">
                  <ChevronLeft className="w-5 h-5 text-on-surface-variant" />
                </button>
              )}
              <span className="text-sm font-bold text-on-surface-variant">
                {stepTitle[currentStep]}
              </span>
              {onSkip && (
                <button onClick={onSkip} className="ml-auto text-xs font-bold text-outline hover:text-primary transition-colors">
                  Skip for now
                </button>
              )}
            </div>
            <ProgressBar current={progressStep} total={TOTAL_STEPS} />
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {formContent}

          {!isSuccess && (
            <button
              onClick={isFinalInputStep ? handleSubmit : goNext}
              disabled={!canNext() || isSubmitting}
              className={`${BTN} ${canNext() && !isSubmitting ? BTN_ENABLED : BTN_DISABLED}`}
            >
              {isFinalInputStep ? (
                isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Saving…</>
                ) : (
                  "Complete Profile"
                )
              ) : (
                "Next ->"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (inline) {
    return (
      <section className="w-full bg-background">
        {mobileLayout}
        {/* Desktop: centered card within the page body, below the global header */}
        <div className="hidden bg-surface-container-low/70 py-16 md:block lg:py-20">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 md:px-10">
            {desktopCard}
          </div>
        </div>
      </section>
    );
  }

  // Overlay mode (used when wizard is embedded inside AuthModal context)
  return (
    <>
      {mobileLayout}
      <div className="hidden md:flex fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm items-center justify-center p-4">
        {desktopCard}
      </div>
    </>
  );
}
