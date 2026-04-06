"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, FileText, RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopSpace } from "@/components/utils/TopSpace";
import { Phase01Foundation } from "@/components/resume/Phase01Foundation";
import { Phase02Journey } from "@/components/resume/Phase02Journey";
import { Phase03VibeCheck } from "@/components/resume/Phase03VibeCheck";
import { Phase04Manifested } from "@/components/resume/Phase04Manifested";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { StepIndicator } from "@/components/resume/StepIndicator";
import { useResumeBuilderWorkspace } from "@/components/resume/useResumeBuilderWorkspace";

const steps = [
  { id: 1, label: "Basic Details" },
  { id: 2, label: "Skills" },
  { id: 3, label: "Proof" },
  { id: 4, label: "Ready" },
];

type CandidateResumeBuilderProps = {
  heading: string;
  description: string;
  backHref: string;
  backLabel: string;
};

export function CandidateResumeBuilder({
  heading,
  description,
  backHref,
  backLabel,
}: CandidateResumeBuilderProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    session,
    resume,
    isLoadingResume,
    isSavingResume,
    isDownloadingResume,
    downloadFeedback,
    downloadFeedbackTone,
    statusMessage,
    errorMessage,
    savedAtLabel,
    aura,
    setField,
    setProfileImage,
    toggleEnergy,
    handleSave,
    handleReset,
    handleDownloadResume,
  } = useResumeBuilderWorkspace();

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
                fullName={resume.fullName}
                setFullName={(value) => setField("fullName", value)}
                phone={resume.phone}
                setPhone={(value) => setField("phone", value)}
                email={resume.email}
                setEmail={(value) => setField("email", value)}
                location={resume.location}
                setLocation={(value) => setField("location", value)}
                discipline={resume.discipline}
                setDiscipline={(value) => setField("discipline", value)}
                preferredRole={resume.preferredRole}
                setPreferredRole={(value) => setField("preferredRole", value)}
                profileImage={resume.profileImage}
                setProfileImage={setProfileImage}
                onNext={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 2 && (
              <Phase02Journey
                discipline={resume.discipline}
                preferredRole={resume.preferredRole}
                location={resume.location}
                experienceLevel={resume.experienceLevel}
                setExperienceLevel={(value) => setField("experienceLevel", value)}
                personalSummary={resume.personalSummary}
                setPersonalSummary={(value) => setField("personalSummary", value)}
                languages={resume.languages}
                setLanguages={(value) => setField("languages", value)}
                skills={resume.skills}
                setSkills={(value) => setField("skills", value)}
                availability={resume.availability}
                setAvailability={(value) => setField("availability", value)}
                shiftPreference={resume.shiftPreference}
                setShiftPreference={(value) => setField("shiftPreference", value)}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <Phase03VibeCheck
                journey={resume.journey}
                setJourney={(value) => setField("journey", value)}
                internships={resume.internships}
                setInternships={(value) => setField("internships", value)}
                certifications={resume.certifications}
                setCertifications={(value) => setField("certifications", value)}
                education={resume.education}
                setEducation={(value) => setField("education", value)}
                skills={resume.skills}
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
              aura={aura}
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
