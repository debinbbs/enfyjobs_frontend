"use client";

import type { CandidateProfileDraft } from "@/lib/auth/candidate-profile";
import type { CandidateSession } from "@/lib/auth/candidate-session";

export type JourneyItem = {
  role: string;
  company: string;
  duration: string;
  description: string;
};

export type CertificationItem = {
  title: string;
  link?: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  year: string;
};

export type AchievementItem = {
  name: string;
  duration?: string;
  description: string;
  link?: string;
};

export type LanguageItem = {
  language: string;
  level: string;
};

export type SocialLinks = {
  linkedin?: string;
  portfolio?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
};

export type ReferenceItem = {
  name: string;
  role: string;
  company: string;
  phone: string;
};

export type CandidateResumeDraft = {
  discipline: string;
  selectedEnergies: string[];
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experienceLevel: string;
  preferredRole: string;
  personalSummary: string;
  profileImage: string | null;
  journey: JourneyItem[];
  internships: JourneyItem[];
  achievements: AchievementItem[];
  education: EducationItem[];
  awards: string[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  socialLinks: SocialLinks;
  skills: string[];
  softSkills: string[];
  hobbies: string[];
  availability: string;
  shiftPreference: string[];
  references: ReferenceItem[];
  highEnergy: boolean;
  profZen: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function readNullableString(value: unknown) {
  return typeof value === "string" ? value : null;
}

function readBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function readStringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((entry): entry is string => typeof entry === "string");
}

function readJourneyItems(value: unknown): JourneyItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((entry) => ({
      role: readString(entry.role),
      company: readString(entry.company),
      duration: readString(entry.duration),
      description: readString(entry.description),
    }));
}

function readAchievementItems(value: unknown): AchievementItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((entry) => ({
      name: readString(entry.name),
      duration: readString(entry.duration),
      description: readString(entry.description),
      link: readString(entry.link),
    }));
}

function readEducationItems(value: unknown): EducationItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((entry) => ({
      school: readString(entry.school),
      degree: readString(entry.degree),
      year: readString(entry.year),
    }));
}

function readCertificationItems(value: unknown): CertificationItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((entry) => ({
      title: readString(entry.title),
      link: readString(entry.link),
    }));
}

function readLanguageItems(value: unknown): LanguageItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((entry) => ({
      language: readString(entry.language),
      level: readString(entry.level),
    }));
}

function readReferenceItems(value: unknown): ReferenceItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((entry) => ({
      name: readString(entry.name),
      role: readString(entry.role),
      company: readString(entry.company),
      phone: readString(entry.phone),
    }));
}

function readSocialLinks(value: unknown): SocialLinks {
  if (!isRecord(value)) {
    return {};
  }

  return {
    linkedin: readString(value.linkedin),
    portfolio: readString(value.portfolio),
    instagram: readString(value.instagram),
    youtube: readString(value.youtube),
    twitter: readString(value.twitter),
  };
}

function buildFullName(firstName?: string, lastName?: string) {
  return [firstName?.trim(), lastName?.trim()].filter(Boolean).join(" ");
}

function buildLocation(profile?: CandidateProfileDraft | null) {
  if (!profile) {
    return "";
  }

  return [profile.city.trim(), profile.state.trim()].filter(Boolean).join(", ");
}

export function buildCandidateResumeSeed(
  session: CandidateSession | null,
  profile?: CandidateProfileDraft | null
): CandidateResumeDraft {
  const fallbackName =
    buildFullName(
      session?.user?.candidate?.firstName ?? undefined,
      session?.user?.candidate?.lastName ?? undefined
    ) || "";
  const yearsOfExperience = Number(profile?.yearsOfExperience || "0");

  return {
    discipline: "",
    selectedEnergies: [],
    fullName: buildFullName(profile?.firstName, profile?.lastName) || fallbackName,
    email: profile?.email?.trim() || session?.user?.email?.trim() || "",
    phone: profile?.phoneNumber?.trim() || session?.phoneNumber?.trim() || "",
    location: buildLocation(profile),
    experienceLevel: yearsOfExperience > 0 ? "Experience" : "Fresher",
    preferredRole: profile?.headline?.trim() || "",
    personalSummary: profile?.bio?.trim() || "",
    profileImage: null,
    journey: [],
    internships: [],
    achievements: [],
    education: [],
    awards: [],
    certifications: [],
    languages: [],
    socialLinks: {},
    skills: profile?.specializations ?? [],
    softSkills: [],
    hobbies: [],
    availability: "",
    shiftPreference: [],
    references: [],
    highEnergy: false,
    profZen: false,
  };
}

export function buildCandidateResumeFromApi(
  payload: unknown,
  session: CandidateSession | null,
  profile?: CandidateProfileDraft | null
): CandidateResumeDraft {
  const seed = buildCandidateResumeSeed(session, profile);

  if (!isRecord(payload)) {
    return seed;
  }

  return {
    discipline: readString(payload.discipline, seed.discipline),
    selectedEnergies: readStringArray(payload.selectedEnergies, seed.selectedEnergies),
    fullName: readString(payload.fullName, seed.fullName),
    email: readString(payload.email, seed.email),
    phone: readString(payload.phone, seed.phone),
    location: readString(payload.location, seed.location),
    experienceLevel: readString(payload.experienceLevel, seed.experienceLevel),
    preferredRole: readString(payload.preferredRole, seed.preferredRole),
    personalSummary: readString(payload.personalSummary, seed.personalSummary),
    profileImage: readNullableString(payload.profileImage),
    journey: readJourneyItems(payload.journey),
    internships: readJourneyItems(payload.internships),
    achievements: readAchievementItems(payload.achievements),
    education: readEducationItems(payload.education),
    awards: readStringArray(payload.awards),
    certifications: readCertificationItems(payload.certifications),
    languages: readLanguageItems(payload.languages),
    socialLinks: readSocialLinks(payload.socialLinks),
    skills: readStringArray(payload.skills, seed.skills),
    softSkills: readStringArray(payload.softSkills),
    hobbies: readStringArray(payload.hobbies),
    availability: readString(payload.availability),
    shiftPreference: readStringArray(payload.shiftPreference),
    references: readReferenceItems(payload.references),
    highEnergy: readBoolean(payload.highEnergy),
    profZen: readBoolean(payload.profZen),
  };
}

export function buildCandidateResumeRequest(resume: CandidateResumeDraft) {
  return {
    content: {
      discipline: resume.discipline,
      selectedEnergies: resume.selectedEnergies,
      fullName: resume.fullName,
      email: resume.email,
      phone: resume.phone,
      location: resume.location,
      experienceLevel: resume.experienceLevel,
      preferredRole: resume.preferredRole,
      personalSummary: resume.personalSummary,
      profileImage: resume.profileImage,
      journey: resume.journey,
      internships: resume.internships,
      achievements: resume.achievements,
      education: resume.education,
      awards: resume.awards,
      certifications: resume.certifications,
      languages: resume.languages,
      socialLinks: resume.socialLinks,
      skills: resume.skills,
      softSkills: resume.softSkills,
      hobbies: resume.hobbies,
      availability: resume.availability,
      shiftPreference: resume.shiftPreference,
      references: resume.references,
      highEnergy: resume.highEnergy,
      profZen: resume.profZen,
    },
  };
}
