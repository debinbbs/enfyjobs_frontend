"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ResumePrintDocumentProps } from "@/components/resume/ResumePrintDocument";
import {
  buildCandidateProfileFromApi,
  buildCandidateProfileSeed,
  type CandidateProfileDraft,
} from "@/lib/auth/candidate-profile";
import {
  getCandidateAuthHeaders,
  useCandidateSession,
} from "@/lib/auth/candidate-session";
import {
  buildCandidateResumeFromApi,
  buildCandidateResumeRequest,
  buildCandidateResumeSeed,
  type CandidateResumeDraft,
} from "@/lib/resume/candidate-resume";
import {
  candidateResumeDraftSchema,
  getFirstZodErrorMessage,
} from "@/lib/validation/forms";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
).replace(/\/$/, "");

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

export function useResumeBuilderWorkspace() {
  const router = useRouter();
  const session = useCandidateSession();
  const [resume, setResume] = useState<CandidateResumeDraft | null>(null);
  const [profileSnapshot, setProfileSnapshot] = useState<CandidateProfileDraft | null>(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [isSavingResume, setIsSavingResume] = useState(false);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState("");
  const [downloadFeedbackTone, setDownloadFeedbackTone] = useState<
    "default" | "success" | "error"
  >("default");
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
        const headers = await getCandidateAuthHeaders();
        const [profileResponse, resumeResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/users/candidate-profile/${encodeURIComponent(phoneNumber)}`, {
            headers,
          }),
          fetch(`${API_BASE_URL}/users/candidate-resume/${encodeURIComponent(phoneNumber)}`, {
            headers,
          }),
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
          resumeResponse.ok
            ? buildCandidateResumeFromApi(
                resumePayload,
                session,
                nextProfile
              )
            : buildCandidateResumeSeed(session, nextProfile);

        if (isCancelled) {
          return;
        }

        setProfileSnapshot(nextProfile);
        setResume(nextResume);
        setLastSavedAt(
          resumeResponse.ok
            ? (resumePayload as { resume?: { updatedAt?: string | null } | null }).resume
                ?.updatedAt ?? null
            : null
        );

        if (!profileResponse.ok) {
          setErrorMessage(
            getApiErrorMessage(
              profilePayload,
              "Profile details could not be loaded. Using session defaults."
            )
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

  const aura = useMemo(
    () =>
      resume?.selectedEnergies.map((energy) => ({
        label: `${energy.charAt(0)}${energy.slice(1).toLowerCase()} aura`,
        color: energy === "EMPATHETIC" ? "bg-primary" : "bg-secondary",
      })) || [],
    [resume]
  );

  const handleSave = async () => {
    if (!session?.phoneNumber || !resume) {
      return;
    }

    setIsSavingResume(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      const parsedResume = candidateResumeDraftSchema.safeParse(resume);
      if (!parsedResume.success) {
        throw new Error(getFirstZodErrorMessage(parsedResume.error));
      }

      const headers = await getCandidateAuthHeaders({
        "Content-Type": "application/json",
      });
      const response = await fetch(
        `${API_BASE_URL}/users/candidate-resume/${encodeURIComponent(session.phoneNumber)}`,
        {
          method: "PUT",
          headers,
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
        payload,
        session,
        profileSnapshot
      );

      setResume(nextResume);
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
    const nextResume = buildCandidateResumeSeed(session, profileSnapshot);
    setResume(nextResume);
    setStatusMessage("Resume cleared back to a fresh starter draft.");
    setErrorMessage("");
  };

  const handleDownloadResume = async () => {
    if (typeof window === "undefined" || !resume) {
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
        aura,
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

      const response = await fetch("/api/resume/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exportPayload),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(payload?.message || "Failed to generate resume PDF.");
      }

      const pdfBlob = await response.blob();
      const fileName = `${(resume.fullName || "candidate-resume")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "candidate-resume"}.pdf`;
      const downloadUrl = URL.createObjectURL(pdfBlob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = fileName;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 60_000);

      setStatusMessage("Resume PDF downloaded successfully.");
      setDownloadFeedback("Resume PDF downloaded as a real file with selectable text.");
      setDownloadFeedbackTone("success");
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

  return {
    session,
    resume,
    isLoadingResume,
    isSavingResume,
    isDownloadingResume,
    downloadFeedback,
    downloadFeedbackTone,
    statusMessage,
    errorMessage,
    savedAtLabel: formatSavedAt(lastSavedAt),
    aura,
    setField,
    setProfileImage: (value: string | null) => setField("profileImage", value),
    toggleEnergy,
    setResume,
    handleSave,
    handleReset,
    handleDownloadResume,
  };
}
