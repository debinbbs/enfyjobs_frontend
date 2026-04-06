"use client";

import type { CandidateProfileDraft } from "@/lib/auth/candidate-profile";
import type { CandidateSession } from "@/lib/auth/candidate-session";

export type JourneyItem = {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  duration: string;
  description: string;
};

export type CertificationItem = {
  title: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  link?: string;
};

export type EducationItem = {
  school: string;
  degree: string;
  completionDate: string;
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

type StructuredResumeApiPayload = {
  profile?: {
    fullName?: string;
    email?: string;
    phone?: string;
    location?: string;
    summary?: string;
  } | null;
  preferences?: {
    jobCategory?: string;
    preferredRole?: string;
    experienceRange?: string;
    employmentTypePreference?: string;
    preferredLocations?: string[];
    joiningAvailability?: string;
    shiftPreference?: string[];
  } | null;
  skills?: string[];
  softSkills?: string[];
  languages?: Array<{
    language?: string;
    proficiency?: string;
  }>;
  certifications?: Array<{
    certificateName?: string;
    issuingOrganization?: string | null;
    issueDate?: string | null;
    expiryDate?: string | null;
    verificationUrl?: string | null;
  }>;
  education?: Array<{
    schoolName?: string;
    degreeName?: string;
    completionDate?: string | null;
    completionYear?: string | null;
  }>;
  experiences?: Array<{
    roleTitle?: string;
    organizationName?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    durationLabel?: string;
    description?: string;
  }>;
  internships?: Array<{
    roleTitle?: string;
    organizationName?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    durationLabel?: string;
    description?: string;
  }>;
  snapshot?: Record<string, unknown> | null;
} | null;

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

function formatMonthLabel(value: string) {
  if (!value) {
    return "";
  }

  if (value.toLowerCase() === "present") {
    return "Present";
  }

  const [year, month] = value.split("-");
  if (!year || !month) {
    return value;
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthIndex = Number.parseInt(month, 10) - 1;
  return monthIndex >= 0 && monthIndex < months.length ? `${months[monthIndex]} ${year}` : value;
}

export function buildJourneyDurationLabel(
  startDate: string,
  endDate: string,
  isCurrent: boolean,
  fallback = ""
) {
  if (startDate) {
    const endLabel = isCurrent ? "Present" : endDate;
    return endLabel
      ? `${formatMonthLabel(startDate)} - ${formatMonthLabel(endLabel)}`
      : formatMonthLabel(startDate);
  }

  return fallback;
}

export function buildEducationYearLabel(completionDate: string, fallback = "") {
  if (completionDate) {
    return formatMonthLabel(completionDate);
  }

  return fallback;
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
      startDate: readString(entry.startDate),
      endDate: readString(entry.endDate),
      isCurrent: readBoolean(entry.isCurrent),
      duration: buildJourneyDurationLabel(
        readString(entry.startDate),
        readString(entry.endDate),
        readBoolean(entry.isCurrent),
        readString(entry.duration)
      ),
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
      completionDate: readString(entry.completionDate),
      year: buildEducationYearLabel(
        readString(entry.completionDate),
        readString(entry.year)
      ),
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
      issuer: readString(entry.issuer),
      issueDate: readString(entry.issueDate),
      expiryDate: readString(entry.expiryDate),
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

  if (isRecord(payload) && isRecord(payload.structuredResume)) {
    const structuredResume = payload.structuredResume as StructuredResumeApiPayload;
    const snapshot = isRecord(structuredResume?.snapshot) ? structuredResume.snapshot : {};

    return {
      discipline: readString(
        structuredResume?.preferences?.jobCategory,
        readString(snapshot.discipline, seed.discipline)
      ),
      selectedEnergies: readStringArray(snapshot.selectedEnergies, seed.selectedEnergies),
      fullName: readString(
        structuredResume?.profile?.fullName,
        readString(snapshot.fullName, seed.fullName)
      ),
      email: readString(
        structuredResume?.profile?.email,
        readString(snapshot.email, seed.email)
      ),
      phone: readString(
        structuredResume?.profile?.phone,
        readString(snapshot.phone, seed.phone)
      ),
      location: readString(
        structuredResume?.profile?.location,
        readString(snapshot.location, seed.location)
      ),
      experienceLevel: readString(
        structuredResume?.preferences?.experienceRange,
        readString(snapshot.experienceLevel, seed.experienceLevel)
      ),
      preferredRole: readString(
        structuredResume?.preferences?.preferredRole,
        readString(snapshot.preferredRole, seed.preferredRole)
      ),
      personalSummary: readString(
        structuredResume?.profile?.summary,
        readString(snapshot.personalSummary, seed.personalSummary)
      ),
      profileImage: readNullableString(snapshot.profileImage),
      journey:
        Array.isArray(structuredResume?.experiences) && structuredResume.experiences.length > 0
          ? structuredResume.experiences.map((entry) => ({
              role: readString(entry.roleTitle),
              company: readString(entry.organizationName),
              startDate: readString(entry.startDate),
              endDate: readString(entry.endDate),
              isCurrent: readBoolean(entry.isCurrent),
              duration: buildJourneyDurationLabel(
                readString(entry.startDate),
                readString(entry.endDate),
                readBoolean(entry.isCurrent),
                readString(entry.durationLabel)
              ),
              description: readString(entry.description),
            }))
          : readJourneyItems(snapshot.journey),
      internships:
        Array.isArray(structuredResume?.internships) && structuredResume.internships.length > 0
          ? structuredResume.internships.map((entry) => ({
              role: readString(entry.roleTitle),
              company: readString(entry.organizationName),
              startDate: readString(entry.startDate),
              endDate: readString(entry.endDate),
              isCurrent: readBoolean(entry.isCurrent),
              duration: buildJourneyDurationLabel(
                readString(entry.startDate),
                readString(entry.endDate),
                readBoolean(entry.isCurrent),
                readString(entry.durationLabel)
              ),
              description: readString(entry.description),
            }))
          : readJourneyItems(snapshot.internships),
      achievements: readAchievementItems(snapshot.achievements),
      education:
        Array.isArray(structuredResume?.education) && structuredResume.education.length > 0
          ? structuredResume.education.map((entry) => ({
              school: readString(entry.schoolName),
              degree: readString(entry.degreeName),
              completionDate: readString(entry.completionDate),
              year: buildEducationYearLabel(
                readString(entry.completionDate),
                readString(entry.completionYear)
              ),
            }))
          : readEducationItems(snapshot.education),
      awards: readStringArray(snapshot.awards),
      certifications:
        Array.isArray(structuredResume?.certifications) &&
        structuredResume.certifications.length > 0
          ? structuredResume.certifications.map((entry) => ({
              title: readString(entry.certificateName),
              issuer: readString(entry.issuingOrganization),
              issueDate: readString(entry.issueDate),
              expiryDate: readString(entry.expiryDate),
              link: readString(entry.verificationUrl),
            }))
          : readCertificationItems(snapshot.certifications),
      languages:
        Array.isArray(structuredResume?.languages) && structuredResume.languages.length > 0
          ? structuredResume.languages.map((entry) => ({
              language: readString(entry.language),
              level: readString(entry.proficiency),
            }))
          : readLanguageItems(snapshot.languages),
      socialLinks: readSocialLinks(snapshot.socialLinks),
      skills: Array.isArray(structuredResume?.skills)
        ? readStringArray(structuredResume.skills, seed.skills)
        : readStringArray(snapshot.skills, seed.skills),
      softSkills: Array.isArray(structuredResume?.softSkills)
        ? readStringArray(structuredResume.softSkills)
        : readStringArray(snapshot.softSkills),
      hobbies: readStringArray(snapshot.hobbies),
      availability: readString(
        structuredResume?.preferences?.joiningAvailability,
        readString(snapshot.availability)
      ),
      shiftPreference:
        Array.isArray(structuredResume?.preferences?.shiftPreference)
          ? readStringArray(structuredResume.preferences.shiftPreference)
          : readStringArray(snapshot.shiftPreference),
      references: readReferenceItems(snapshot.references),
      highEnergy: readBoolean(snapshot.highEnergy),
      profZen: readBoolean(snapshot.profZen),
    };
  }

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
  const journey = resume.journey.filter(
    (entry) =>
      entry.role.trim() ||
      entry.company.trim() ||
      entry.startDate.trim() ||
      entry.endDate.trim() ||
      entry.description.trim()
  );
  const internships = resume.internships.filter(
    (entry) =>
      entry.role.trim() ||
      entry.company.trim() ||
      entry.startDate.trim() ||
      entry.endDate.trim() ||
      entry.description.trim()
  );
  const education = resume.education.filter(
    (entry) =>
      entry.school.trim() ||
      entry.degree.trim() ||
      entry.completionDate.trim() ||
      entry.year.trim()
  );
  const certifications = resume.certifications.filter(
    (entry) =>
      entry.title.trim() ||
      (entry.issuer ?? "").trim() ||
      (entry.issueDate ?? "").trim() ||
      (entry.expiryDate ?? "").trim() ||
      (entry.link ?? "").trim()
  );

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
      journey,
      internships,
      achievements: resume.achievements,
      education,
      awards: resume.awards,
      certifications,
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
    structured: {
      profile: {
        fullName: resume.fullName,
        email: resume.email,
        phone: resume.phone,
        location: resume.location,
        summary: resume.personalSummary,
      },
      preferences: {
        jobCategory: resume.discipline,
        preferredRole: resume.preferredRole,
        experienceRange: resume.experienceLevel,
        employmentTypePreference: "",
        preferredLocations: resume.location ? [resume.location] : [],
        joiningAvailability: resume.availability,
        shiftPreference: resume.shiftPreference,
      },
      skills: resume.skills,
      softSkills: resume.softSkills,
      languages: resume.languages.map((entry) => ({
        language: entry.language,
        proficiency: entry.level,
      })),
      certifications: certifications.map((entry) => ({
        certificateName: entry.title,
        issuingOrganization: entry.issuer || null,
        issueDate: entry.issueDate || null,
        expiryDate: entry.expiryDate || null,
        verificationUrl: entry.link || null,
      })),
      education: education.map((entry) => ({
        schoolName: entry.school,
        degreeName: entry.degree,
        completionDate: entry.completionDate,
        completionYear: entry.year,
      })),
      experiences: journey.map((entry) => ({
        roleTitle: entry.role,
        organizationName: entry.company,
        startDate: entry.startDate,
        endDate: entry.endDate,
        isCurrent: entry.isCurrent,
        durationLabel: entry.duration,
        description: entry.description,
      })),
      internships: internships.map((entry) => ({
        roleTitle: entry.role,
        organizationName: entry.company,
        startDate: entry.startDate,
        endDate: entry.endDate,
        isCurrent: entry.isCurrent,
        durationLabel: entry.duration,
        description: entry.description,
      })),
    },
  };
}
