"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  buildCandidateProfileFromApi,
  buildCandidateProfileSeed,
  readCandidateProfileDraft,
  saveCandidateProfileDraft,
  type CandidateProfileDraft,
} from "@/lib/auth/candidate-profile";
import {
  getCandidateAuthHeaders,
  updateCandidateSessionProfile,
  useCandidateSession,
} from "@/lib/auth/candidate-session";
import {
  candidateProfileSchema,
  getFirstZodErrorMessage,
} from "@/lib/validation/forms";

const SUGGESTED_SPECIALIZATIONS = [
  "Yoga",
  "Nutrition",
  "Therapy",
  "Fitness",
  "Meditation",
  "Ayurveda",
  "Spa & Wellness",
  "Corporate Wellness",
];

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

function getProfileCompletion(profile: CandidateProfileDraft) {
  const fields = [
    profile.firstName,
    profile.lastName,
    profile.email,
    profile.phoneNumber,
    profile.headline,
    profile.city,
    profile.state,
    profile.yearsOfExperience,
    profile.bio,
    profile.specializations.length > 0 ? "yes" : "",
  ];

  const completedFields = fields.filter((field) => field.trim().length > 0).length;

  return Math.round((completedFields / fields.length) * 100);
}

export default function CandidateProfilePage() {
  const router = useRouter();
  const session = useCandidateSession();
  const [profile, setProfile] = useState<CandidateProfileDraft | null>(null);
  const [specializationInput, setSpecializationInput] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    const loadProfile = async () => {
      setIsLoadingProfile(true);
      setErrorMessage("");

      try {
        const headers = await getCandidateAuthHeaders();
        const response = await fetch(
          `${API_BASE_URL}/users/candidate-profile/${encodeURIComponent(phoneNumber)}`,
          {
            headers,
          }
        );
        const payload = (await response.json().catch(() => null)) as unknown;

        if (!response.ok) {
          throw new Error(getApiErrorMessage(payload, "Failed to load candidate profile."));
        }

        if (!isCancelled) {
          const nextProfile = buildCandidateProfileFromApi(
            payload as Parameters<typeof buildCandidateProfileFromApi>[0],
            session
          );
          setProfile(nextProfile);
          saveCandidateProfileDraft(nextProfile);
        }
      } catch (error) {
        if (!isCancelled) {
          setProfile(readCandidateProfileDraft(session));
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Failed to load candidate profile."
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingProfile(false);
        }
      }
    };

    void loadProfile();

    return () => {
      isCancelled = true;
    };
  }, [session]);

  const resolvedProfile = useMemo(() => {
    if (profile) {
      return profile;
    }

    return readCandidateProfileDraft(session);
  }, [profile, session]);

  const profileCompletion = useMemo(() => {
    return getProfileCompletion(resolvedProfile);
  }, [resolvedProfile]);

  if (!session) {
    return (
      <main className="flex-1 px-6 py-24 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <section className="w-full rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-primary/10 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">
              Candidate Profile
            </p>
            <h1 className="mt-4 text-3xl font-black text-foreground md:text-4xl">
              Preparing your profile
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              You need to be logged in to manage your profile. Redirecting you now.
            </p>
          </section>
        </div>
      </main>
    );
  }

  const setField = <K extends keyof CandidateProfileDraft>(
    field: K,
    value: CandidateProfileDraft[K]
  ) => {
    setProfile((currentProfile) => {
      const baseProfile = currentProfile || resolvedProfile;

      return {
        ...baseProfile,
        [field]: value,
      };
    });
  };

  const addSpecialization = (value: string) => {
    const normalizedValue = value.trim();
    if (!normalizedValue) {
      return;
    }

    setProfile((currentProfile) => {
      const baseProfile = currentProfile || resolvedProfile;

      if (
        baseProfile.specializations.some(
          (entry) => entry.toLowerCase() === normalizedValue.toLowerCase()
        )
      ) {
        return baseProfile;
      }

      return {
        ...baseProfile,
        specializations: [...baseProfile.specializations, normalizedValue],
      };
    });
    setSpecializationInput("");
  };

  const removeSpecialization = (value: string) => {
    setProfile((currentProfile) => {
      const baseProfile = currentProfile || resolvedProfile;

      return {
        ...baseProfile,
        specializations: baseProfile.specializations.filter((entry) => entry !== value),
      };
    });
  };

  const handleSave = () => {
    const saveProfile = async () => {
      setIsSavingProfile(true);
      setStatusMessage("");
      setErrorMessage("");

      try {
        const parsedProfile = candidateProfileSchema.safeParse(resolvedProfile);
        if (!parsedProfile.success) {
          throw new Error(getFirstZodErrorMessage(parsedProfile.error));
        }

        const headers = await getCandidateAuthHeaders({
          "Content-Type": "application/json",
        });
        const response = await fetch(
          `${API_BASE_URL}/users/candidate-profile/${encodeURIComponent(resolvedProfile.phoneNumber)}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({
              firstName: resolvedProfile.firstName.trim(),
              lastName: resolvedProfile.lastName.trim(),
              email: resolvedProfile.email.trim(),
              headline: resolvedProfile.headline.trim(),
              city: resolvedProfile.city.trim(),
              state: resolvedProfile.state.trim(),
              bio: resolvedProfile.bio.trim(),
              yearsOfExperience: resolvedProfile.yearsOfExperience
                ? Number(resolvedProfile.yearsOfExperience)
                : 0,
              specializations: resolvedProfile.specializations,
            }),
          }
        );

        const payload = (await response.json().catch(() => null)) as unknown;
        if (!response.ok) {
          throw new Error(getApiErrorMessage(payload, "Failed to save candidate profile."));
        }

        const nextProfile = buildCandidateProfileFromApi(
          payload as Parameters<typeof buildCandidateProfileFromApi>[0],
          session
        );

        setProfile(nextProfile);
        saveCandidateProfileDraft(nextProfile);
        updateCandidateSessionProfile({
          firstName: nextProfile.firstName.trim(),
          lastName: nextProfile.lastName.trim(),
          email: nextProfile.email.trim(),
          phoneNumber: nextProfile.phoneNumber.trim(),
        });
        setStatusMessage("Profile saved to your account.");
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to save candidate profile."
        );
      } finally {
        setIsSavingProfile(false);
      }
    };

    void saveProfile();
  };

  const handleReset = () => {
    const nextProfile = buildCandidateProfileSeed(session);
    setProfile(nextProfile);
    setSpecializationInput("");
    setStatusMessage("Profile reset to your signed-in details.");
  };

  return (
    <main className="flex-1 px-6 py-24 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl shadow-primary/10 md:p-12">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-secondary-container/50 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-primary-container/40 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">
                Candidate Profile
              </p>
              <h1 className="max-w-2xl text-4xl font-black text-foreground md:text-5xl">
                Shape how wellness employers discover you.
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                Build your candidate story with a strong headline, location, experience,
                and the wellness specialties you want to be known for.
              </p>
            </div>
            <Card className="w-full max-w-sm rounded-[1.75rem] bg-surface-container-lowest shadow-lg shadow-primary/5">
              <CardHeader>
                <CardDescription className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                  Profile Strength
                </CardDescription>
                <CardTitle className="text-3xl font-black text-foreground">
                  {profileCompletion}%
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-3 overflow-hidden rounded-full bg-primary/10">
                  <div
                    className="h-full rounded-full signature-gradient transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete more fields to improve matching once applications and employer discovery go live.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <Card className="rounded-[2rem] bg-surface-container-lowest shadow-lg shadow-primary/5">
            <CardHeader>
              <CardDescription className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                Core Details
              </CardDescription>
              <CardTitle className="text-2xl font-black text-foreground">
                Tell your story clearly
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <section className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                    First Name
                  </span>
                  <Input
                    value={resolvedProfile.firstName}
                    onChange={(event) => setField("firstName", event.target.value)}
                    className="h-12 rounded-2xl border-outline-variant/20 bg-white px-4"
                    placeholder="Aarav"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                    Last Name
                  </span>
                  <Input
                    value={resolvedProfile.lastName}
                    onChange={(event) => setField("lastName", event.target.value)}
                    className="h-12 rounded-2xl border-outline-variant/20 bg-white px-4"
                    placeholder="Sharma"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                    Email
                  </span>
                  <Input
                    value={resolvedProfile.email}
                    onChange={(event) => setField("email", event.target.value)}
                    className="h-12 rounded-2xl border-outline-variant/20 bg-white px-4"
                    placeholder="you@wellness.jobs"
                    type="email"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                    Mobile
                  </span>
                  <Input
                    value={resolvedProfile.phoneNumber}
                    className="h-12 rounded-2xl border-outline-variant/20 bg-white px-4"
                    placeholder="+91 98765 43210"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Mobile number is your primary identifier for this account.
                  </p>
                </label>
              </section>

              <section className="grid gap-5 md:grid-cols-[1.1fr_0.9fr_0.8fr]">
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                    Headline
                  </span>
                  <Input
                    value={resolvedProfile.headline}
                    onChange={(event) => setField("headline", event.target.value)}
                    className="h-12 rounded-2xl border-outline-variant/20 bg-white px-4"
                    placeholder="Holistic yoga instructor focused on breath-led recovery"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                    City
                  </span>
                  <Input
                    value={resolvedProfile.city}
                    onChange={(event) => setField("city", event.target.value)}
                    className="h-12 rounded-2xl border-outline-variant/20 bg-white px-4"
                    placeholder="Bengaluru"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                    State
                  </span>
                  <Input
                    value={resolvedProfile.state}
                    onChange={(event) => setField("state", event.target.value)}
                    className="h-12 rounded-2xl border-outline-variant/20 bg-white px-4"
                    placeholder="Karnataka"
                  />
                </label>
              </section>

              <section className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
                <label className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                    Years Of Experience
                  </span>
                  <Input
                    value={resolvedProfile.yearsOfExperience}
                    onChange={(event) =>
                      setField("yearsOfExperience", event.target.value.replace(/[^\d]/g, "").slice(0, 2))
                    }
                    className="h-12 rounded-2xl border-outline-variant/20 bg-white px-4"
                    placeholder="5"
                    inputMode="numeric"
                  />
                </label>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                    Wellness Specializations
                  </span>
                  <div className="flex flex-wrap gap-2 rounded-[1.5rem] border border-outline-variant/20 bg-white p-4">
                    {resolvedProfile.specializations.length > 0 ? (
                      resolvedProfile.specializations.map((specialization) => (
                        <button
                          key={specialization}
                          type="button"
                          onClick={() => removeSpecialization(specialization)}
                          className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/20"
                        >
                          {specialization}
                        </button>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Add the practices or domains you want employers to associate with you.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_SPECIALIZATIONS.map((specialization) => (
                      <Badge
                        key={specialization}
                        render={
                          <button type="button" />
                        }
                        variant="outline"
                        className="cursor-pointer rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] hover:bg-primary/5"
                        onClick={() => addSpecialization(specialization)}
                      >
                        {specialization}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Input
                      value={specializationInput}
                      onChange={(event) => setSpecializationInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addSpecialization(specializationInput);
                        }
                      }}
                      className="h-12 rounded-2xl border-outline-variant/20 bg-white px-4"
                      placeholder="Add a custom specialization"
                    />
                    <Button
                      type="button"
                      className="h-12 rounded-full px-6 font-black uppercase tracking-[0.18em]"
                      onClick={() => addSpecialization(specializationInput)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </section>

              <label className="block space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                  Bio
                </span>
                <textarea
                  value={resolvedProfile.bio}
                  onChange={(event) => setField("bio", event.target.value)}
                  rows={6}
                  className="w-full rounded-[1.5rem] border border-outline-variant/20 bg-white px-4 py-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50"
                  placeholder="Share the kind of wellness work you do best, the clients you serve, and the environments where you thrive."
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  className="h-12 rounded-full px-6 font-black uppercase tracking-[0.18em]"
                  onClick={handleSave}
                  disabled={isSavingProfile || isLoadingProfile}
                >
                  {isSavingProfile ? "Saving..." : "Save Profile"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-full px-6 font-black uppercase tracking-[0.18em]"
                  onClick={handleReset}
                  disabled={isSavingProfile}
                >
                  Reset
                </Button>
                <Link
                  href="/dashboard/candidate"
                  className="inline-flex h-12 items-center rounded-full border border-outline-variant/20 bg-white px-6 text-sm font-black uppercase tracking-[0.18em] text-foreground"
                >
                  Back To Dashboard
                </Link>
              </div>

              {statusMessage ? (
                <p className="text-sm font-bold text-emerald-700">{statusMessage}</p>
              ) : null}
              {errorMessage ? (
                <p className="text-sm font-bold text-red-600">{errorMessage}</p>
              ) : null}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[2rem] bg-surface-container-lowest shadow-lg shadow-primary/5">
              <CardHeader>
                <CardDescription className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                  Live Snapshot
                </CardDescription>
                <CardTitle className="text-2xl font-black text-foreground">
                  How your profile reads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-black text-foreground">
                    {[resolvedProfile.firstName, resolvedProfile.lastName].filter(Boolean).join(" ") || "Your Name"}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-primary/70">
                    {resolvedProfile.headline || "Add a headline to sharpen your positioning"}
                  </p>
                </div>
                <div className="grid gap-3 rounded-[1.5rem] bg-white p-4 ring-1 ring-primary/5">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-black text-foreground">Location:</span>{" "}
                    {[resolvedProfile.city, resolvedProfile.state].filter(Boolean).join(", ") || "Not added yet"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-black text-foreground">Experience:</span>{" "}
                    {resolvedProfile.yearsOfExperience
                      ? `${resolvedProfile.yearsOfExperience} years`
                      : "Not added yet"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-black text-foreground">Contact:</span>{" "}
                    {resolvedProfile.email || resolvedProfile.phoneNumber || "Not added yet"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resolvedProfile.specializations.length > 0 ? (
                    resolvedProfile.specializations.map((specialization) => (
                      <Badge key={specialization} className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em]">
                        {specialization}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Add at least one specialization so your profile feels focused.
                    </p>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {resolvedProfile.bio || "Your bio will appear here once you add a short professional summary."}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] bg-surface-container-lowest shadow-lg shadow-primary/5">
              <CardHeader>
                <CardDescription className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                  Next Moves
                </CardDescription>
                <CardTitle className="text-2xl font-black text-foreground">
                  Suggested improvements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="rounded-[1.25rem] bg-white p-4 text-sm text-muted-foreground ring-1 ring-primary/5">
                  Add a crisp headline that names your niche and the outcome you help clients achieve.
                </p>
                <p className="rounded-[1.25rem] bg-white p-4 text-sm text-muted-foreground ring-1 ring-primary/5">
                  Include your city and state so location-based roles can surface more confidently.
                </p>
                <p className="rounded-[1.25rem] bg-white p-4 text-sm text-muted-foreground ring-1 ring-primary/5">
                  Choose 3 to 5 specializations to make your profile feel intentional rather than broad.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] bg-surface-container-lowest shadow-lg shadow-primary/5">
              <CardHeader>
                <CardDescription className="text-[10px] font-black uppercase tracking-[0.24em] text-outline">
                  Resume Builder
                </CardDescription>
                <CardTitle className="text-2xl font-black text-foreground">
                  Build and save your resume
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Turn your profile details into a fuller resume with work history,
                  certifications, languages, references, and a live preview. Your draft
                  saves to the database, so it stays with your account.
                </p>
                <Link
                  href="/dashboard/candidate/profile/resume"
                  className="inline-flex h-12 items-center rounded-full border border-outline-variant/20 bg-white px-6 text-sm font-black uppercase tracking-[0.18em] text-foreground"
                >
                  Open Resume Builder
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
