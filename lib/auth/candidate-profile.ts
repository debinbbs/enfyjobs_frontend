"use client";

import type { CandidateSession } from "@/lib/auth/candidate-session";

export type CandidateProfileDraft = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  headline: string;
  city: string;
  state: string;
  yearsOfExperience: string;
  bio: string;
  specializations: string[];
};

export const CANDIDATE_PROFILE_STORAGE_KEY = "enfyjobs:candidate-profile";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function buildCandidateProfileSeed(
  session: CandidateSession | null
): CandidateProfileDraft {
  return {
    firstName: session?.user?.candidate?.firstName?.trim() || "",
    lastName: session?.user?.candidate?.lastName?.trim() || "",
    email: session?.user?.email?.trim() || "",
    phoneNumber: session?.phoneNumber?.trim() || session?.user?.phoneNumber?.trim() || "",
    headline: "",
    city: "",
    state: "",
    yearsOfExperience: "",
    bio: "",
    specializations: [],
  };
}

function sanitizeSpecializations(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function readCandidateProfileDraft(
  session: CandidateSession | null
): CandidateProfileDraft {
  const seed = buildCandidateProfileSeed(session);

  if (typeof window === "undefined") {
    return seed;
  }

  const rawValue = window.localStorage.getItem(CANDIDATE_PROFILE_STORAGE_KEY);
  if (!rawValue) {
    return seed;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown;
    if (!isRecord(parsedValue)) {
      return seed;
    }

    return {
      firstName:
        typeof parsedValue.firstName === "string" && parsedValue.firstName.trim()
          ? parsedValue.firstName
          : seed.firstName,
      lastName:
        typeof parsedValue.lastName === "string" && parsedValue.lastName.trim()
          ? parsedValue.lastName
          : seed.lastName,
      email:
        typeof parsedValue.email === "string" && parsedValue.email.trim()
          ? parsedValue.email
          : seed.email,
      phoneNumber:
        typeof parsedValue.phoneNumber === "string" && parsedValue.phoneNumber.trim()
          ? parsedValue.phoneNumber
          : seed.phoneNumber,
      headline: typeof parsedValue.headline === "string" ? parsedValue.headline : "",
      city: typeof parsedValue.city === "string" ? parsedValue.city : "",
      state: typeof parsedValue.state === "string" ? parsedValue.state : "",
      yearsOfExperience:
        typeof parsedValue.yearsOfExperience === "string"
          ? parsedValue.yearsOfExperience
          : "",
      bio: typeof parsedValue.bio === "string" ? parsedValue.bio : "",
      specializations: sanitizeSpecializations(parsedValue.specializations),
    };
  } catch {
    return seed;
  }
}

export function saveCandidateProfileDraft(profile: CandidateProfileDraft) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    CANDIDATE_PROFILE_STORAGE_KEY,
    JSON.stringify(profile)
  );
}

type CandidateProfileApiResponse = {
  email?: string | null;
  phoneNumber?: string;
  candidate?: {
    firstName?: string | null;
    lastName?: string | null;
    headline?: string | null;
    city?: string | null;
    state?: string | null;
    yearsOfExperience?: number | null;
    bio?: string | null;
    specializations?: string[] | null;
  } | null;
};

export function buildCandidateProfileFromApi(
  payload: CandidateProfileApiResponse,
  session: CandidateSession | null
): CandidateProfileDraft {
  const seed = buildCandidateProfileSeed(session);

  return {
    firstName: payload.candidate?.firstName?.trim() || seed.firstName,
    lastName: payload.candidate?.lastName?.trim() || seed.lastName,
    email: payload.email?.trim() || seed.email,
    phoneNumber: payload.phoneNumber?.trim() || seed.phoneNumber,
    headline: payload.candidate?.headline?.trim() || "",
    city: payload.candidate?.city?.trim() || "",
    state: payload.candidate?.state?.trim() || "",
    yearsOfExperience:
      typeof payload.candidate?.yearsOfExperience === "number"
        ? String(payload.candidate.yearsOfExperience)
        : "",
    bio: payload.candidate?.bio || "",
    specializations: Array.isArray(payload.candidate?.specializations)
      ? payload.candidate?.specializations.filter(Boolean)
      : [],
  };
}
