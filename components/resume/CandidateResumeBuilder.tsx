"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, FileText, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopSpace } from "@/components/utils/TopSpace";
import { Phase01Foundation } from "@/components/resume/Phase01Foundation";
import { Phase02Journey } from "@/components/resume/Phase02Journey";
import { Phase03VibeCheck } from "@/components/resume/Phase03VibeCheck";
import { Phase04Manifested } from "@/components/resume/Phase04Manifested";
import { ResumePreview } from "@/components/resume/ResumePreview";
import type { ResumePrintDocumentProps } from "@/components/resume/ResumePrintDocument";
import { StepIndicator } from "@/components/resume/StepIndicator";
import {
  buildCandidateProfileFromApi,
  buildCandidateProfileSeed,
  type CandidateProfileDraft,
} from "@/lib/auth/candidate-profile";
import { useCandidateSession } from "@/lib/auth/candidate-session";
import {
  buildCandidateResumeFromApi,
  buildCandidateResumeRequest,
  buildCandidateResumeSeed,
  type CandidateResumeDraft,
} from "@/lib/resume/candidate-resume";

const steps = [
  { id: 1, label: "Set Your Vibe" },
  { id: 2, label: "Your Journey" },
  { id: 3, label: "Vibe Check" },
  { id: 4, label: "Manifested" },
];

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
).replace(/\/$/, "");

type CandidateResumeBuilderProps = {
  heading: string;
  description: string;
  backHref: string;
  backLabel: string;
};

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

function formatSavedAt(value: string | null) {
  if (!value) {
    return null;
  }

  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    return null;
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
}

export function CandidateResumeBuilder({
  heading,
  description,
  backHref,
  backLabel,
}: CandidateResumeBuilderProps) {
  const router = useRouter();
  const session = useCandidateSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [resume, setResume] = useState<CandidateResumeDraft | null>(null);
  const [profileSnapshot, setProfileSnapshot] = useState<CandidateProfileDraft | null>(null);
  const [initialResume, setInitialResume] = useState<CandidateResumeDraft | null>(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [isSavingResume, setIsSavingResume] = useState(false);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState("");
  const [downloadFeedbackTone, setDownloadFeedbackTone] = useState<"default" | "success" | "error">("default");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [router, session]);

  useEffect(() => {
    const phoneNumber = session?.phoneNumber;
    if (!phoneNumber) {
      return;
    }

    let isCancelled = false;

    const loadResume = async () => {
      setIsLoadingResume(true);
      setErrorMessage("");
      setStatusMessage("");

      const fallbackProfile = buildCandidateProfileSeed(session);

      try {
        const [profileResponse, resumeResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/users/candidate-profile/${encodeURIComponent(phoneNumber)}`),
          fetch(`${API_BASE_URL}/users/candidate-resume/${encodeURIComponent(phoneNumber)}`),
        ]);

        const [profilePayload, resumePayload] = await Promise.all([
          profileResponse.json().catch(() => null),
          resumeResponse.json().catch(() => null),
        ]);

        const nextProfile = profileResponse.ok
          ? buildCandidateProfileFromApi(
              profilePayload as Parameters<typeof buildCandidateProfileFromApi>[0],
              session
            )
          : fallbackProfile;

        const nextResume =
          resumeResponse.ok &&
          (resumePayload as { resume?: { content?: unknown; updatedAt?: string | null } | null })
            ?.resume?.content
            ? buildCandidateResumeFromApi(
                (resumePayload as { resume?: { content?: unknown } | null }).resume?.content,
                session,
                nextProfile
              )
            : buildCandidateResumeSeed(session, nextProfile);

        if (isCancelled) {
          return;
        }

        setProfileSnapshot(nextProfile);
        setResume(nextResume);
        setInitialResume(nextResume);
        setLastSavedAt(
          resumeResponse.ok
            ? (resumePayload as { resume?: { updatedAt?: string | null } | null }).resume
                ?.updatedAt ?? null
            : null
        );

        if (!profileResponse.ok) {
          setErrorMessage(
            getApiErrorMessage(profilePayload, "Profile details could not be loaded. Using session defaults.")
          );
        } else if (!resumeResponse.ok) {
          setStatusMessage("Start building your resume. It will save to your account.");
        }
      } catch (error) {
        if (isCancelled) {
          return;
        }

        const nextProfile = buildCandidateProfileSeed(session);
        const nextResume = buildCandidateResumeSeed(session, nextProfile);
        setProfileSnapshot(nextProfile);
        setResume(nextResume);
        setInitialResume(nextResume);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load your resume builder."
        );
      } finally {
        if (!isCancelled) {
          setIsLoadingResume(false);
        }
      }
    };

    void loadResume();

    return () => {
      isCancelled = true;
    };
  }, [session]);

  if (!session) {
    return (
      <main className="flex-1 px-6 py-24 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <section className="w-full rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-primary/10 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">
              Resume Builder
            </p>
            <h1 className="mt-4 text-3xl font-black text-foreground md:text-4xl">
              Checking your sign-in status
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              You need to be logged in to open this page. Redirecting you now.
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (!resume) {
    return (
      <main className="bg-surface dark:bg-background min-h-screen font-body">
        <TopSpace />
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-primary/10">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">
              Resume Builder
            </p>
            <h1 className="mt-4 text-3xl font-black text-foreground md:text-4xl">
              {isLoadingResume ? "Loading your resume workspace" : "Preparing your resume workspace"}
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              {isLoadingResume
                ? "We are pulling your profile and saved resume from the database."
                : "Your resume builder will appear here in a moment."}
            </p>
          </section>
        </div>
      </main>
    );
  }

  const setField = <K extends keyof CandidateResumeDraft>(
    field: K,
    value: CandidateResumeDraft[K]
  ) => {
    setResume((currentResume) =>
      currentResume
        ? {
            ...currentResume,
            [field]: value,
          }
        : currentResume
    );
  };

  const toggleEnergy = (energy: string) => {
    setResume((currentResume) => {
      if (!currentResume) {
        return currentResume;
      }

      return {
        ...currentResume,
        selectedEnergies: currentResume.selectedEnergies.includes(energy)
          ? currentResume.selectedEnergies.filter((entry) => entry !== energy)
          : [...currentResume.selectedEnergies, energy],
      };
    });
  };

  const getAuraFromEnergies = () => {
    return resume.selectedEnergies.map((energy) => ({
      label: `${energy.charAt(0)}${energy.slice(1).toLowerCase()} aura`,
      color: energy === "EMPATHETIC" ? "bg-primary" : "bg-secondary",
    }));
  };

  const handleSave = async () => {
    if (!session.phoneNumber) {
      return;
    }

    setIsSavingResume(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/users/candidate-resume/${encodeURIComponent(session.phoneNumber)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildCandidateResumeRequest(resume)),
        }
      );

      const payload = (await response.json().catch(() => null)) as
        | {
            resume?: {
              content?: unknown;
              updatedAt?: string | null;
            } | null;
          }
        | null;

      if (!response.ok) {
        throw new Error(getApiErrorMessage(payload, "Failed to save candidate resume."));
      }

      const nextResume = buildCandidateResumeFromApi(
        payload?.resume?.content,
        session,
        profileSnapshot
      );

      setResume(nextResume);
      setInitialResume(nextResume);
      setLastSavedAt(payload?.resume?.updatedAt ?? new Date().toISOString());
      setStatusMessage("Resume saved to your account.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to save candidate resume."
      );
    } finally {
      setIsSavingResume(false);
    }
  };

  const handleReset = () => {
    const nextResume = initialResume || buildCandidateResumeSeed(session, profileSnapshot);
    setResume(nextResume);
    setStatusMessage("Resume reset to your last loaded version.");
    setErrorMessage("");
  };

  const handleDownloadResume = () => {
    if (typeof window === "undefined") {
      return;
    }

    setIsDownloadingResume(true);
    setErrorMessage("");
    setStatusMessage("");
    setDownloadFeedback("Opening print-ready resume...");
    setDownloadFeedbackTone("default");

    try {
      const exportPayload: ResumePrintDocumentProps = {
        name: resume.fullName,
        title: resume.preferredRole,
        location: resume.location,
        email: resume.email,
        phone: resume.phone,
        personalSummary: resume.personalSummary,
        profileImage: resume.profileImage || undefined,
        aura: getAuraFromEnergies(),
        vibe: resume.skills,
        journey: resume.journey,
        internships: resume.internships,
        achievements: resume.achievements,
        education: resume.education,
        awards: resume.awards,
        certifications: resume.certifications,
        languages: resume.languages,
        socialLinks: resume.socialLinks,
        modalities: resume.skills,
        softSkills: resume.softSkills,
        hobbies: resume.hobbies,
        availability: resume.availability,
        shiftPreference: resume.shiftPreference,
        references: resume.references,
      };

      const exportKey = `resume-export-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem(exportKey, JSON.stringify(exportPayload));

      const exportUrl = new URL("/dashboard/candidate/profile/resume/export", window.location.origin);
      exportUrl.searchParams.set("key", exportKey);

      const exportWindow = window.open(exportUrl.toString(), "_blank");

      if (!exportWindow) {
        window.localStorage.removeItem(exportKey);
        throw new Error("Allow pop-ups in your browser to open the print-ready resume.");
      }

      setStatusMessage("Print-ready resume opened. Choose Save as PDF for selectable text.");
      setDownloadFeedback("Print-ready resume opened in a new tab with selectable text.");
      setDownloadFeedbackTone("success");

      window.setTimeout(() => {
        window.localStorage.removeItem(exportKey);
      }, 10 * 60 * 1000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to export resume PDF."
      );
      setDownloadFeedback(
        error instanceof Error ? error.message : "Failed to export resume PDF."
      );
      setDownloadFeedbackTone("error");
    } finally {
      setIsDownloadingResume(false);
    }
  };

  const savedAtLabel = formatSavedAt(lastSavedAt);
  const actionButtonClassName =
    "inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-black uppercase tracking-[0.18em] transition";

  return (
    <main className="bg-surface dark:bg-background min-h-screen font-body selection:bg-primary-container selection:text-on-primary-container">
      <TopSpace />

      <div className="max-w-[1600px] mx-auto w-full px-6 pb-20">
        <section className="relative mb-10 overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl shadow-primary/10 md:p-12">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-secondary-container/50 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-primary-container/40 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-primary/70">
                <FileText className="size-4" />
                Resume Builder
              </p>
              <h1 className="max-w-3xl text-4xl font-black text-foreground md:text-5xl">
                {heading}
              </h1>
              <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
                {description}
              </p>
              {savedAtLabel ? (
                <p className="text-sm font-bold text-primary/70">
                  Last saved {savedAtLabel}
                </p>
              ) : null}
            </div>

          </div>

          {statusMessage ? (
            <p className="relative mt-6 text-sm font-bold text-emerald-700">{statusMessage}</p>
          ) : null}
          {errorMessage ? (
            <p className="relative mt-3 text-sm font-bold text-red-600">{errorMessage}</p>
          ) : null}
        </section>

        <header className="mb-12">
          <StepIndicator currentStep={currentStep} steps={steps} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 pb-20">
            {currentStep === 1 && (
              <Phase01Foundation
                discipline={resume.discipline}
                setDiscipline={(value) => setField("discipline", value)}
                selectedEnergies={resume.selectedEnergies}
                toggleEnergy={toggleEnergy}
                onNext={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 2 && (
              <Phase02Journey
                fullName={resume.fullName}
                setFullName={(value) => setField("fullName", value)}
                email={resume.email}
                setEmail={(value) => setField("email", value)}
                phone={resume.phone}
                setPhone={(value) => setField("phone", value)}
                location={resume.location}
                setLocation={(value) => setField("location", value)}
                experienceLevel={resume.experienceLevel}
                setExperienceLevel={(value) => setField("experienceLevel", value)}
                preferredRole={resume.preferredRole}
                setPreferredRole={(value) => setField("preferredRole", value)}
                personalSummary={resume.personalSummary}
                setPersonalSummary={(value) => setField("personalSummary", value)}
                profileImage={resume.profileImage}
                setProfileImage={(value) => setField("profileImage", value)}
                journey={resume.journey}
                setJourney={(value) => setField("journey", value)}
                internships={resume.internships}
                setInternships={(value) => setField("internships", value)}
                achievements={resume.achievements}
                setAchievements={(value) => setField("achievements", value)}
                education={resume.education}
                setEducation={(value) => setField("education", value)}
                awards={resume.awards}
                setAwards={(value) => setField("awards", value)}
                certifications={resume.certifications}
                setCertifications={(value) => setField("certifications", value)}
                languages={resume.languages}
                setLanguages={(value) => setField("languages", value)}
                socialLinks={resume.socialLinks}
                setSocialLinks={(value) => setField("socialLinks", value)}
                skills={resume.skills}
                setSkills={(value) => setField("skills", value)}
                softSkills={resume.softSkills}
                setSoftSkills={(value) => setField("softSkills", value)}
                hobbies={resume.hobbies}
                setHobbies={(value) => setField("hobbies", value)}
                availability={resume.availability}
                setAvailability={(value) => setField("availability", value)}
                shiftPreference={resume.shiftPreference}
                setShiftPreference={(value) => setField("shiftPreference", value)}
                references={resume.references}
                setReferences={(value) => setField("references", value)}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <Phase03VibeCheck
                highEnergy={resume.highEnergy}
                setHighEnergy={(value) => setField("highEnergy", value)}
                profZen={resume.profZen}
                setProfZen={(value) => setField("profZen", value)}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 4 && (
              <Phase04Manifested
                onBack={() => setCurrentStep(3)}
                onExploreMatches={() => {
                  router.push("/dashboard/candidate");
                }}
                onDownloadResume={handleDownloadResume}
                isDownloadingResume={isDownloadingResume}
                downloadFeedback={downloadFeedback}
                downloadFeedbackTone={downloadFeedbackTone}
              />
            )}
          </div>

          <div className="lg:col-span-7">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              <Link
                href={backHref}
                className={`${actionButtonClassName} border border-slate-200 bg-white text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:bg-slate-50`}
              >
                <ArrowLeft className="size-4" />
                {backLabel}
              </Link>
              <Button
                type="button"
                variant="outline"
                className={`${actionButtonClassName} border border-indigo-200 bg-indigo-50/60 text-slate-900 hover:border-indigo-300 hover:bg-indigo-50`}
                onClick={handleReset}
                disabled={isSavingResume}
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
              <Button
                type="button"
                variant="outline"
                className={`${actionButtonClassName} border border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50`}
                onClick={() => {
                  void handleDownloadResume();
                }}
                disabled={isDownloadingResume}
              >
                <Download className="size-4" />
                {isDownloadingResume ? "Downloading..." : "Download PDF"}
              </Button>
              <Button
                type="button"
                className={`${actionButtonClassName} bg-primary text-primary-foreground shadow-[0_16px_34px_rgba(109,60,225,0.28)] hover:bg-primary/90`}
                onClick={() => {
                  void handleSave();
                }}
                disabled={isSavingResume || isLoadingResume}
              >
                <Save className="size-4" />
                {isSavingResume ? "Saving..." : "Save Resume"}
              </Button>
            </div>
            <ResumePreview
              name={resume.fullName}
              title={resume.preferredRole}
              location={resume.location}
              email={resume.email}
              phone={resume.phone}
              personalSummary={resume.personalSummary}
              profileImage={resume.profileImage || undefined}
              aura={getAuraFromEnergies()}
              vibe={resume.skills}
              journey={resume.journey}
              internships={resume.internships}
              achievements={resume.achievements}
              education={resume.education}
              awards={resume.awards}
              certifications={resume.certifications}
              languages={resume.languages}
              socialLinks={resume.socialLinks}
              modalities={resume.skills}
              softSkills={resume.softSkills}
              hobbies={resume.hobbies}
              availability={resume.availability}
              shiftPreference={resume.shiftPreference}
              references={resume.references}
              highEnergy={resume.highEnergy}
              profZen={resume.profZen}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
