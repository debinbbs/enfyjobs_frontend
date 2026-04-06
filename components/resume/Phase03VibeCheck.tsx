"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Plus,
  Sparkles,
  Trash2,
} from "lucide-react";
import { getCandidateAuthHeaders } from "@/lib/auth/candidate-session";
import {
  buildEducationYearLabel,
  buildJourneyDurationLabel,
  type CertificationItem,
  type EducationItem,
  type JourneyItem,
} from "@/lib/resume/candidate-resume";
import { getFirstZodErrorMessage, resumeStep3Schema } from "@/lib/validation/forms";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
).replace(/\/$/, "");

const EDUCATION_OPTIONS = [
  "10th Pass",
  "12th Pass",
  "Diploma",
  "ITI / Vocational Course",
  "Certification Course",
  "Bachelor's Degree",
  "Master's Degree",
];

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

function createEmptyJourneyItem(): JourneyItem {
  return {
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    duration: "",
    description: "",
  };
}

function createEmptyEducationItem(): EducationItem {
  return {
    school: "",
    degree: "",
    completionDate: "",
    year: "",
  };
}

function createEmptyCertificationItem(): CertificationItem {
  return {
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    link: "",
  };
}

function withJourneyDuration(item: JourneyItem): JourneyItem {
  return {
    ...item,
    duration: buildJourneyDurationLabel(
      item.startDate,
      item.endDate,
      item.isCurrent,
      item.duration
    ),
  };
}

function withEducationLabel(item: EducationItem): EducationItem {
  return {
    ...item,
    year: buildEducationYearLabel(item.completionDate, item.year),
  };
}

function hasJourneyValue(item: JourneyItem) {
  return (
    item.role.trim().length > 0 ||
    item.company.trim().length > 0 ||
    item.startDate.trim().length > 0 ||
    item.endDate.trim().length > 0 ||
    item.description.trim().length > 0
  );
}

function hasEducationValue(item: EducationItem) {
  return (
    item.school.trim().length > 0 ||
    item.degree.trim().length > 0 ||
    item.completionDate.trim().length > 0 ||
    item.year.trim().length > 0
  );
}

function hasCertificationValue(item: CertificationItem) {
  return (
    item.title.trim().length > 0 ||
    (item.issuer ?? "").trim().length > 0 ||
    (item.issueDate ?? "").trim().length > 0 ||
    (item.expiryDate ?? "").trim().length > 0 ||
    (item.link ?? "").trim().length > 0
  );
}

interface Phase03Props {
  journey: JourneyItem[];
  setJourney: (value: JourneyItem[]) => void;
  internships: JourneyItem[];
  setInternships: (value: JourneyItem[]) => void;
  certifications: CertificationItem[];
  setCertifications: (value: CertificationItem[]) => void;
  education: EducationItem[];
  setEducation: (value: EducationItem[]) => void;
  skills: string[];
  onNext: () => void;
  onBack: () => void;
}

export function Phase03VibeCheck({
  journey,
  setJourney,
  internships,
  setInternships,
  certifications,
  setCertifications,
  education,
  setEducation,
  skills,
  onNext,
  onBack,
}: Phase03Props) {
  const [aiLoadingKey, setAiLoadingKey] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const updateJourneyCollection = (
    items: JourneyItem[],
    setItems: (value: JourneyItem[]) => void,
    index: number,
    updater: (currentItem: JourneyItem) => JourneyItem
  ) => {
    const nextItems = [...items];
    const currentItem = nextItems[index] ?? createEmptyJourneyItem();
    const nextItem = withJourneyDuration(updater(currentItem));
    nextItems[index] = nextItem;
    setItems(nextItems.filter(hasJourneyValue));
  };

  const updateEducationCollection = (
    index: number,
    updater: (currentItem: EducationItem) => EducationItem
  ) => {
    const nextItems = [...education];
    const currentItem = nextItems[index] ?? createEmptyEducationItem();
    const nextItem = withEducationLabel(updater(currentItem));
    nextItems[index] = nextItem;
    setEducation(nextItems.filter(hasEducationValue));
  };

  const updateCertificationCollection = (
    index: number,
    updater: (currentItem: CertificationItem) => CertificationItem
  ) => {
    const nextItems = [...certifications];
    const currentItem = nextItems[index] ?? createEmptyCertificationItem();
    const nextItem = updater(currentItem);
    nextItems[index] = nextItem;
    setCertifications(nextItems.filter(hasCertificationValue));
  };

  const addJourneyItem = (
    items: JourneyItem[],
    setItems: (value: JourneyItem[]) => void
  ) => {
    setItems([...items, createEmptyJourneyItem()]);
  };

  const removeJourneyItem = (
    items: JourneyItem[],
    setItems: (value: JourneyItem[]) => void,
    index: number
  ) => {
    setItems(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const addEducationItem = () => {
    setEducation([...education, createEmptyEducationItem()]);
  };

  const removeEducationItem = (index: number) => {
    setEducation(education.filter((_, itemIndex) => itemIndex !== index));
  };

  const addCertificationItem = () => {
    setCertifications([...certifications, createEmptyCertificationItem()]);
  };

  const removeCertificationItem = (index: number) => {
    setCertifications(certifications.filter((_, itemIndex) => itemIndex !== index));
  };

  const generateExperienceDescription = async (
    type: "work_experience" | "internship",
    items: JourneyItem[],
    setItems: (value: JourneyItem[]) => void,
    index: number
  ) => {
    const item = items[index];
    if (!item) {
      return;
    }

    const bio = [
      `Role: ${item.role || "Not provided"}`,
      `Company: ${item.company || "Not provided"}`,
      `Duration: ${buildJourneyDurationLabel(item.startDate, item.endDate, item.isCurrent, item.duration) || "Not provided"}`,
      `Relevant skills: ${skills.length > 0 ? skills.join(", ") : "Not provided"}`,
      `User-written description to improve and rewrite: ${item.description.trim() || "skip"}`,
    ].join(". ");

    if (bio.trim().length < 10) {
      setAiFeedback("Add role or company first so AI can draft a realistic description.");
      return;
    }

    const loadingKey = `${type}-${index}`;
    setAiLoadingKey(loadingKey);
    setAiFeedback("");

    try {
      const headers = await getCandidateAuthHeaders({
        "Content-Type": "application/json",
      });
      const response = await fetch(`${API_BASE_URL}/ai/generate-summary`, {
        method: "POST",
        headers,
        body: JSON.stringify({ bio, mode: type }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(payload, "Could not generate the experience description.")
        );
      }

      const summary =
        typeof (payload as { summary?: unknown })?.summary === "string"
          ? (payload as { summary: string }).summary.trim()
          : "";

      if (!summary) {
        throw new Error("AI did not return any text.");
      }

      updateJourneyCollection(items, setItems, index, (currentItem) => ({
        ...currentItem,
        description: summary,
      }));
      setAiFeedback("AI description added. Edit it if needed.");
    } catch (error) {
      setAiFeedback(
        error instanceof Error
          ? error.message
          : "Could not generate the experience description."
      );
    } finally {
      setAiLoadingKey("");
    }
  };

  const workItems = journey.length > 0 ? journey : [];
  const internshipItems = internships.length > 0 ? internships : [];
  const educationItems = education.length > 0 ? education : [];
  const certificationItems = certifications.length > 0 ? certifications : [];

  const handleContinue = () => {
    const result = resumeStep3Schema.safeParse({
      journey,
      internships,
      education,
      certifications,
    });

    if (!result.success) {
      setValidationMessage(getFirstZodErrorMessage(result.error));
      return;
    }

    setValidationMessage("");
    onNext();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
      <header className="space-y-3">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/70">
          Step 3
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Experience and proof
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-500">
          Add work history, internships, education, and certificates in a search-friendly
          format. Month pickers and repeatable entries make this easier to filter later.
        </p>
      </header>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <BriefcaseBusiness className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Work experience</h2>
              <p className="text-sm text-slate-500">
                Add one or more jobs. Start and end month stay structured for search.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => addJourneyItem(journey, setJourney)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary transition hover:bg-primary/10"
          >
            <Plus className="size-4" />
            Add Job
          </button>
        </div>

        <div className="space-y-5">
          {workItems.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
              No work experience added yet. Tap <span className="font-bold text-slate-700">Add Job</span> to start.
            </p>
          ) : null}

          {workItems.map((item, index) => (
            <div key={`work-${index}`} className="rounded-[1.75rem] border border-slate-200 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                  Job {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeJourneyItem(journey, setJourney, index)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.15em] text-rose-600 transition hover:bg-rose-50"
                >
                  <Trash2 className="size-4" />
                  Remove
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={item.role}
                  onChange={(event) =>
                    updateJourneyCollection(journey, setJourney, index, (currentItem) => ({
                      ...currentItem,
                      role: event.target.value,
                    }))
                  }
                  placeholder="Job title"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                />
                <input
                  value={item.company}
                  onChange={(event) =>
                    updateJourneyCollection(journey, setJourney, index, (currentItem) => ({
                      ...currentItem,
                      company: event.target.value,
                    }))
                  }
                  placeholder="Company / spa / studio name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                />
                <label className="space-y-2 text-sm font-bold text-slate-700">
                  <span>Start month</span>
                  <input
                    type="month"
                    value={item.startDate}
                    onChange={(event) =>
                      updateJourneyCollection(journey, setJourney, index, (currentItem) => ({
                        ...currentItem,
                        startDate: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                  />
                </label>
                <label className="space-y-2 text-sm font-bold text-slate-700">
                  <span>End month</span>
                  <input
                    type="month"
                    value={item.endDate}
                    disabled={item.isCurrent}
                    onChange={(event) =>
                      updateJourneyCollection(journey, setJourney, index, (currentItem) => ({
                        ...currentItem,
                        endDate: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </label>
                <label className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 md:col-span-2">
                  <input
                    type="checkbox"
                    checked={item.isCurrent}
                    onChange={(event) =>
                      updateJourneyCollection(journey, setJourney, index, (currentItem) => ({
                        ...currentItem,
                        isCurrent: event.target.checked,
                        endDate: event.target.checked ? "" : currentItem.endDate,
                      }))
                    }
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  I currently work here
                </label>
                <textarea
                  value={item.description}
                  onChange={(event) =>
                    updateJourneyCollection(journey, setJourney, index, (currentItem) => ({
                      ...currentItem,
                      description: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Describe your daily work, service, and responsibilities."
                  className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary md:col-span-2"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    {item.duration ? `Date label: ${item.duration}` : "Add dates for a cleaner timeline"}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      void generateExperienceDescription(
                        "work_experience",
                        journey,
                        setJourney,
                        index
                      )
                    }
                    disabled={aiLoadingKey === `work_experience-${index}`}
                    className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Sparkles className="size-4" />
                    {aiLoadingKey === `work_experience-${index}` ? "Generating..." : "Generate With AI"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-fuchsia-100 p-3 text-fuchsia-700">
              <BriefcaseBusiness className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Internships</h2>
              <p className="text-sm text-slate-500">
                Add internships separately so employers can tell training from full-time work.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => addJourneyItem(internships, setInternships)}
            className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-fuchsia-700 transition hover:bg-fuchsia-100"
          >
            <Plus className="size-4" />
            Add Internship
          </button>
        </div>

        <div className="space-y-5">
          {internshipItems.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
              No internships added yet. Add one if you learned on the job before your first full role.
            </p>
          ) : null}

          {internshipItems.map((item, index) => (
            <div key={`internship-${index}`} className="rounded-[1.75rem] border border-slate-200 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                  Internship {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeJourneyItem(internships, setInternships, index)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.15em] text-rose-600 transition hover:bg-rose-50"
                >
                  <Trash2 className="size-4" />
                  Remove
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={item.role}
                  onChange={(event) =>
                    updateJourneyCollection(internships, setInternships, index, (currentItem) => ({
                      ...currentItem,
                      role: event.target.value,
                    }))
                  }
                  placeholder="Internship role"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                />
                <input
                  value={item.company}
                  onChange={(event) =>
                    updateJourneyCollection(internships, setInternships, index, (currentItem) => ({
                      ...currentItem,
                      company: event.target.value,
                    }))
                  }
                  placeholder="Company / clinic / studio name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                />
                <label className="space-y-2 text-sm font-bold text-slate-700">
                  <span>Start month</span>
                  <input
                    type="month"
                    value={item.startDate}
                    onChange={(event) =>
                      updateJourneyCollection(internships, setInternships, index, (currentItem) => ({
                        ...currentItem,
                        startDate: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                  />
                </label>
                <label className="space-y-2 text-sm font-bold text-slate-700">
                  <span>End month</span>
                  <input
                    type="month"
                    value={item.endDate}
                    disabled={item.isCurrent}
                    onChange={(event) =>
                      updateJourneyCollection(internships, setInternships, index, (currentItem) => ({
                        ...currentItem,
                        endDate: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary disabled:bg-slate-100 disabled:text-slate-400"
                  />
                </label>
                <label className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 md:col-span-2">
                  <input
                    type="checkbox"
                    checked={item.isCurrent}
                    onChange={(event) =>
                      updateJourneyCollection(internships, setInternships, index, (currentItem) => ({
                        ...currentItem,
                        isCurrent: event.target.checked,
                        endDate: event.target.checked ? "" : currentItem.endDate,
                      }))
                    }
                    className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  I currently do this internship
                </label>
                <textarea
                  value={item.description}
                  onChange={(event) =>
                    updateJourneyCollection(internships, setInternships, index, (currentItem) => ({
                      ...currentItem,
                      description: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Describe what you learned, supported, or handled."
                  className="w-full rounded-[1.5rem] border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary md:col-span-2"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    {item.duration ? `Date label: ${item.duration}` : "Add dates for a cleaner timeline"}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      void generateExperienceDescription(
                        "internship",
                        internships,
                        setInternships,
                        index
                      )
                    }
                    disabled={aiLoadingKey === `internship-${index}`}
                    className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Sparkles className="size-4" />
                    {aiLoadingKey === `internship-${index}` ? "Generating..." : "Generate With AI"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
              <GraduationCap className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Education details</h2>
              <p className="text-sm text-slate-500">
                Add one or more courses, classes, diplomas, or degrees.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addEducationItem}
            className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-700 transition hover:bg-amber-100"
          >
            <Plus className="size-4" />
            Add Education
          </button>
        </div>

        <div className="space-y-5">
          {educationItems.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
              No education added yet. Add your highest class, diploma, or course.
            </p>
          ) : null}

          {educationItems.map((item, index) => (
            <div key={`education-${index}`} className="rounded-[1.75rem] border border-slate-200 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                  Education {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeEducationItem(index)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.15em] text-rose-600 transition hover:bg-rose-50"
                >
                  <Trash2 className="size-4" />
                  Remove
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={item.school}
                  onChange={(event) =>
                    updateEducationCollection(index, (currentItem) => ({
                      ...currentItem,
                      school: event.target.value,
                    }))
                  }
                  placeholder="School / institute name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary md:col-span-2"
                />
                <select
                  value={item.degree}
                  onChange={(event) =>
                    updateEducationCollection(index, (currentItem) => ({
                      ...currentItem,
                      degree: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                >
                  <option value="">Select education level</option>
                  {EDUCATION_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <label className="space-y-2 text-sm font-bold text-slate-700">
                  <span>Completion month</span>
                  <input
                    type="month"
                    value={item.completionDate}
                    onChange={(event) =>
                      updateEducationCollection(index, (currentItem) => ({
                        ...currentItem,
                        completionDate: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-secondary/10 p-3 text-secondary">
              <Award className="size-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Certificates</h2>
              <p className="text-sm text-slate-500">
                Add training or certificates separately so recruiters can filter them.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addCertificationItem}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-secondary transition hover:bg-secondary/10"
          >
            <Plus className="size-4" />
            Add Certificate
          </button>
        </div>

        <div className="space-y-5">
          {certificationItems.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
              No certificates added yet. Add one if you have wellness, therapy, or training proof.
            </p>
          ) : null}

          {certificationItems.map((item, index) => (
            <div key={`certificate-${index}`} className="rounded-[1.75rem] border border-slate-200 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                  Certificate {index + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeCertificationItem(index)}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.15em] text-rose-600 transition hover:bg-rose-50"
                >
                  <Trash2 className="size-4" />
                  Remove
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  value={item.title}
                  onChange={(event) =>
                    updateCertificationCollection(index, (currentItem) => ({
                      ...currentItem,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Certificate name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                />
                <input
                  value={item.issuer || ""}
                  onChange={(event) =>
                    updateCertificationCollection(index, (currentItem) => ({
                      ...currentItem,
                      issuer: event.target.value,
                    }))
                  }
                  placeholder="Issuing organization"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                />
                <label className="space-y-2 text-sm font-bold text-slate-700">
                  <span>Issue month</span>
                  <input
                    type="month"
                    value={item.issueDate || ""}
                    onChange={(event) =>
                      updateCertificationCollection(index, (currentItem) => ({
                        ...currentItem,
                        issueDate: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                  />
                </label>
                <input
                  value={item.link || ""}
                  onChange={(event) =>
                    updateCertificationCollection(index, (currentItem) => ({
                      ...currentItem,
                      link: event.target.value,
                    }))
                  }
                  placeholder="Certificate link (optional)"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {aiFeedback ? (
        <section className="rounded-[2rem] border border-indigo-200 bg-indigo-50 p-5 shadow-sm">
          <p className="text-sm font-bold text-indigo-800">{aiFeedback}</p>
        </section>
      ) : null}

      <section className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 text-emerald-600" />
          <div>
            <p className="text-sm font-black text-emerald-900">
              This step is now structured for search.
            </p>
            <p className="mt-1 text-sm text-emerald-700">
              Multiple entries, month-based dates, and separate internships help recruiters
              filter candidates more accurately.
            </p>
          </div>
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
            className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:scale-[1.02]"
          >
            Continue
            <ArrowRight className="size-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
