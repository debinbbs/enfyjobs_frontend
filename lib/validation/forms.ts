"use client";

import { z } from "zod";

const trimmedString = z.string().trim();
const monthValueSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}$/, "Pick a valid month.");
const optionalMonthValueSchema = z.union([monthValueSchema, z.literal("")]);
const optionalUrlSchema = z.union([
  z.string().trim().url("Enter a valid URL."),
  z.literal(""),
]);
const optionalEmailSchema = z.union([
  z.string().trim().email("Enter a valid email address."),
  z.literal(""),
]);

export const candidatePhoneSchema = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "Enter a valid 10-digit mobile number.");

export const candidateOtpSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "Enter the 6-digit OTP.");

export const candidateProfileSchema = z.object({
  firstName: trimmedString.min(2, "First name must be at least 2 characters."),
  lastName: trimmedString.max(60, "Last name is too long."),
  email: optionalEmailSchema,
  phoneNumber: trimmedString.min(8, "Phone number is required."),
  headline: trimmedString.max(120, "Headline is too long."),
  city: trimmedString.max(80, "City is too long."),
  state: trimmedString.max(80, "State is too long."),
  yearsOfExperience: z.union([
    z.literal(""),
    z
      .string()
      .trim()
      .regex(/^\d{1,2}$/, "Years of experience must be a number from 0 to 60.")
      .refine((value) => Number(value) >= 0 && Number(value) <= 60, {
        message: "Years of experience must be between 0 and 60.",
      }),
  ]),
  bio: trimmedString.max(1000, "Bio is too long."),
  specializations: z.array(trimmedString.min(1)).max(20, "Too many specializations."),
});

export const resumeStep1Schema = z.object({
  fullName: trimmedString.min(2, "Enter your name."),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a valid mobile number.")
    .max(20, "Mobile number is too long."),
  email: optionalEmailSchema,
  location: trimmedString.min(2, "Enter your current city."),
  discipline: trimmedString.min(1, "Choose your work category."),
  preferredRole: trimmedString.min(2, "Choose or enter your preferred role."),
  profileImage: z.string().nullable().optional(),
});

export const resumeStep2Schema = z.object({
  experienceLevel: trimmedString.min(1, "Choose your experience level."),
  skills: z.array(trimmedString.min(1)).min(1, "Pick at least one main skill."),
  languages: z.array(
    z.object({
      language: trimmedString.min(1, "Language name is required."),
      level: trimmedString.min(1, "Language proficiency is required."),
    })
  ),
  availability: trimmedString.min(1, "Choose when you can join."),
  shiftPreference: z.array(trimmedString.min(1)),
  personalSummary: trimmedString.max(800, "Summary is too long."),
});

const journeyItemSchema = z
  .object({
    role: trimmedString,
    company: trimmedString,
    startDate: optionalMonthValueSchema,
    endDate: optionalMonthValueSchema,
    isCurrent: z.boolean(),
    duration: trimmedString,
    description: trimmedString.max(600, "Description is too long."),
  })
  .superRefine((value, ctx) => {
    const hasAnyValue = Boolean(
      value.role || value.company || value.startDate || value.endDate || value.description
    );

    if (!hasAnyValue) {
      return;
    }

    if (value.role.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["role"],
        message: "Role title is required.",
      });
    }

    if (value.company.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["company"],
        message: "Company or workplace name is required.",
      });
    }

    if (!value.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["startDate"],
        message: "Start month is required.",
      });
    }

    if (!value.isCurrent && !value.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End month is required unless this is your current role.",
      });
    }

    if (value.startDate && value.endDate && value.endDate < value.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End month cannot be before start month.",
      });
    }
  });

const educationItemSchema = z
  .object({
    school: trimmedString,
    degree: trimmedString,
    completionDate: optionalMonthValueSchema,
    year: trimmedString,
  })
  .superRefine((value, ctx) => {
    const hasAnyValue = Boolean(value.school || value.degree || value.completionDate || value.year);

    if (!hasAnyValue) {
      return;
    }

    if (value.school.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["school"],
        message: "School or institute name is required.",
      });
    }

    if (value.degree.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["degree"],
        message: "Education level is required.",
      });
    }

    if (!value.completionDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["completionDate"],
        message: "Completion month is required.",
      });
    }
  });

const certificationItemSchema = z
  .object({
    title: trimmedString,
    issuer: trimmedString.optional(),
    issueDate: optionalMonthValueSchema.optional(),
    expiryDate: optionalMonthValueSchema.optional(),
    link: optionalUrlSchema.optional(),
  })
  .superRefine((value, ctx) => {
    const hasAnyValue = Boolean(
      value.title ||
        value.issuer ||
        value.issueDate ||
        value.expiryDate ||
        value.link
    );

    if (!hasAnyValue) {
      return;
    }

    if (value.title.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["title"],
        message: "Certificate name is required.",
      });
    }

    if (value.issueDate && value.expiryDate && value.expiryDate < value.issueDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["expiryDate"],
        message: "Expiry month cannot be before issue month.",
      });
    }
  });

export const resumeStep3Schema = z.object({
  journey: z.array(journeyItemSchema),
  internships: z.array(journeyItemSchema),
  education: z.array(educationItemSchema),
  certifications: z.array(certificationItemSchema),
});

export const candidateResumeDraftSchema = z.object({
  discipline: z.string(),
  selectedEnergies: z.array(z.string()),
  fullName: z.string(),
  email: optionalEmailSchema,
  phone: z.string().max(25, "Phone number is too long."),
  location: z.string(),
  experienceLevel: z.string(),
  preferredRole: z.string(),
  personalSummary: trimmedString.max(800, "Summary is too long."),
  profileImage: z.string().nullable().optional(),
  journey: z.array(journeyItemSchema),
  internships: z.array(journeyItemSchema),
  achievements: z.array(
    z.object({
      name: z.string(),
      duration: z.string().optional(),
      description: z.string(),
      link: optionalUrlSchema.optional(),
    })
  ),
  education: z.array(educationItemSchema),
  awards: z.array(z.string()),
  certifications: z.array(certificationItemSchema),
  languages: z.array(
    z.object({
      language: z.string(),
      level: z.string(),
    })
  ),
  socialLinks: z.object({
    linkedin: optionalUrlSchema.optional(),
    portfolio: optionalUrlSchema.optional(),
    instagram: optionalUrlSchema.optional(),
    youtube: optionalUrlSchema.optional(),
    twitter: optionalUrlSchema.optional(),
  }),
  skills: z.array(z.string()),
  softSkills: z.array(z.string()),
  hobbies: z.array(z.string()),
  availability: z.string(),
  shiftPreference: z.array(z.string()),
  references: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      company: z.string(),
      phone: z.string(),
    })
  ),
  highEnergy: z.boolean(),
  profZen: z.boolean(),
});

export function getFirstZodErrorMessage(error: z.ZodError) {
  return error.issues[0]?.message || "Please check the form and try again.";
}
