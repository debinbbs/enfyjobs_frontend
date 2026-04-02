"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  Plus,
  X,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  ChevronDown,
  Layout,
  Link as LinkIcon,
  Star,
  User,
  Sparkles,
  Camera,
  Upload,
  Trash2,
  Heart,
  Clock,
  Users,
  Smile,
  Zap,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
).replace(/\/$/, "");

interface JourneyItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface EducationItem {
  school: string;
  degree: string;
  year: string;
}

interface CertificationItem {
  title: string;
  link?: string;
}

interface AchievementItem {
  name: string;
  duration?: string;
  description: string;
  link?: string;
}

interface LanguageItem {
  language: string;
  level: string;
}

interface SocialLinks {
  linkedin?: string;
  portfolio?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}

interface ReferenceItem {
  name: string;
  role: string;
  company: string;
  phone: string;
}

interface Phase02Props {
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  experienceLevel: string;
  setExperienceLevel: (v: string) => void;
  preferredRole: string;
  setPreferredRole: (v: string) => void;
  personalSummary: string;
  setPersonalSummary: (v: string) => void;
  profileImage: string | null;
  setProfileImage: (v: string | null) => void;
  journey: JourneyItem[];
  setJourney: (val: JourneyItem[]) => void;
  internships: JourneyItem[];
  setInternships: (val: JourneyItem[]) => void;
  achievements: AchievementItem[];
  setAchievements: (val: AchievementItem[]) => void;
  education: EducationItem[];
  setEducation: (val: EducationItem[]) => void;
  awards: string[];
  setAwards: (val: string[]) => void;
  certifications: CertificationItem[];
  setCertifications: (val: CertificationItem[]) => void;
  languages: LanguageItem[];
  setLanguages: (val: LanguageItem[]) => void;
  socialLinks: SocialLinks;
  setSocialLinks: (val: SocialLinks) => void;
  skills: string[];
  setSkills: (val: string[]) => void;
  softSkills: string[];
  setSoftSkills: (val: string[]) => void;
  hobbies: string[];
  setHobbies: (val: string[]) => void;
  availability: string;
  setAvailability: (val: string) => void;
  shiftPreference: string[];
  setShiftPreference: (val: string[]) => void;
  references: ReferenceItem[];
  setReferences: (val: ReferenceItem[]) => void;
  onNext: () => void;
  onBack: () => void;
}

type AiFeedback = {
  key: string;
  tone: "error" | "success";
  message: string;
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

export function Phase02Journey({
  fullName, setFullName,
  email, setEmail,
  phone, setPhone,
  location, setLocation,
  experienceLevel, setExperienceLevel,
  preferredRole, setPreferredRole,
  personalSummary, setPersonalSummary,
  profileImage, setProfileImage,
  journey, setJourney,
  internships, setInternships,
  achievements, setAchievements,
  education, setEducation,
  certifications, setCertifications,
  languages, setLanguages,
  socialLinks, setSocialLinks,
  skills, setSkills,
  softSkills, setSoftSkills,
  hobbies, setHobbies,
  availability, setAvailability,
  shiftPreference, setShiftPreference,
  references, setReferences,
  onNext,
  onBack,
}: Phase02Props) {
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [generatingTarget, setGeneratingTarget] = useState<string | null>(null);
  const [aiFeedback, setAiFeedback] = useState<AiFeedback | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? "" : id);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const buildSummaryBio = () => {
    const completedExperience = journey
      .map((item) => [item.role, item.company, item.description].filter(Boolean).join(" at "))
      .filter(Boolean);
    const completedInternships = internships
      .map((item) => [item.role, item.company, item.description].filter(Boolean).join(" at "))
      .filter(Boolean);

    return [
      preferredRole && `Target role: ${preferredRole}.`,
      experienceLevel && `Experience level: ${experienceLevel}.`,
      location && `Location: ${location}.`,
      personalSummary && `Existing draft summary: ${personalSummary}.`,
      skills.length > 0 && `Technical skills: ${skills.join(", ")}.`,
      softSkills.length > 0 && `Soft skills: ${softSkills.join(", ")}.`,
      completedExperience.length > 0 &&
        `Work experience highlights: ${completedExperience.join("; ")}.`,
      completedInternships.length > 0 &&
        `Internship highlights: ${completedInternships.join("; ")}.`,
      education.length > 0 &&
        `Education: ${education
          .map((item) => [item.degree, item.school, item.year].filter(Boolean).join(", "))
          .filter(Boolean)
          .join("; ")}.`,
      certifications.length > 0 &&
        `Certifications: ${certifications
          .map((item) => item.title)
          .filter(Boolean)
          .join(", ")}.`,
      achievements.length > 0 &&
        `Achievements: ${achievements
          .map((item) => [item.name, item.description].filter(Boolean).join(": "))
          .filter(Boolean)
          .join("; ")}.`,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const requestAiCopy = async ({
    key,
    bio,
    mode,
    onApply,
  }: {
    key: string;
    bio: string;
    mode: "summary" | "work_experience" | "internship";
    onApply: (value: string) => void;
  }) => {
    if (generatingTarget) {
      return;
    }

    if (bio.trim().length < 10) {
      setAiFeedback({
        key,
        tone: "error",
        message: "Add a little more detail first so AI has enough context to write from.",
      });
      return;
    }

    setGeneratingTarget(key);
    setAiFeedback(null);

    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bio, mode }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          getApiErrorMessage(payload, "AI generation failed. Please try again.")
        );
      }

      const generatedText =
        typeof (payload as { summary?: unknown })?.summary === "string"
          ? (payload as { summary: string }).summary.trim()
          : "";

      if (!generatedText) {
        throw new Error("AI returned an empty response. Please try again.");
      }

      onApply(generatedText);
      setAiFeedback({
        key,
        tone: "success",
        message: "AI draft added. You can edit it further if needed.",
      });
    } catch (error) {
      setAiFeedback({
        key,
        tone: "error",
        message:
          error instanceof Error
            ? error.message
            : "AI generation failed. Please try again.",
      });
    } finally {
      setGeneratingTarget(null);
    }
  };

  const generateSummary = () => {
    void requestAiCopy({
      key: "personal-summary",
      bio: buildSummaryBio(),
      mode: "summary",
      onApply: setPersonalSummary,
    });
  };

  const generateJourneyDescription = (index: number) => {
    const item = journey[index];

    void requestAiCopy({
      key: `journey-${index}`,
      bio: [
        "Work experience section.",
        preferredRole && `Target role: ${preferredRole}.`,
        experienceLevel && `Candidate level: ${experienceLevel}.`,
        item.role && `Role: ${item.role}.`,
        item.company && `Company: ${item.company}.`,
        item.duration && `Duration: ${item.duration}.`,
        item.description
          ? `User-written description to improve and rewrite: ${item.description}.`
          : "No user-written description provided. Generate the description from the role, company, duration, and skills.",
        skills.length > 0 && `Relevant skills: ${skills.join(", ")}.`,
        softSkills.length > 0 && `Soft skills: ${softSkills.join(", ")}.`,
      ]
        .filter(Boolean)
        .join(" "),
      mode: "work_experience",
      onApply: (value) => {
        const nextJourney = [...journey];
        nextJourney[index] = { ...nextJourney[index], description: value };
        setJourney(nextJourney);
      },
    });
  };

  const generateInternshipDescription = (index: number) => {
    const item = internships[index];

    void requestAiCopy({
      key: `internship-${index}`,
      bio: [
        "Internship section.",
        preferredRole && `Target role: ${preferredRole}.`,
        experienceLevel && `Candidate level: ${experienceLevel}.`,
        item.role && `Internship role: ${item.role}.`,
        item.company && `Company: ${item.company}.`,
        item.duration && `Duration: ${item.duration}.`,
        item.description
          ? `User-written description to improve and rewrite: ${item.description}.`
          : "No user-written description provided. Generate the description from the internship role, company, duration, and skills.",
        skills.length > 0 && `Relevant skills: ${skills.join(", ")}.`,
        softSkills.length > 0 && `Soft skills: ${softSkills.join(", ")}.`,
      ]
        .filter(Boolean)
        .join(" "),
      mode: "internship",
      onApply: (value) => {
        const nextInternships = [...internships];
        nextInternships[index] = { ...nextInternships[index], description: value };
        setInternships(nextInternships);
      },
    });
  };

  const sections = [
    { id: "personal",       label: "Personal Information",           icon: User,          color: "text-blue-500 bg-blue-50" },
    { id: "experience",     label: "Work Experience",                icon: Briefcase,     color: "text-primary bg-primary/10" },
    { id: "internships",    label: "Internships",                    icon: Star,          color: "text-secondary bg-secondary/10" },
    { id: "achievements",   label: "Achievements & Training",        icon: Layout,        color: "text-emerald-600 bg-emerald-50" },
    { id: "education",      label: "Education",                      icon: GraduationCap, color: "text-slate-600 bg-slate-100" },
    { id: "credentials",    label: "Certifications",                 icon: Award,         color: "text-amber-600 bg-amber-50" },
    { id: "languages",      label: "Languages",                      icon: Globe,         color: "text-pink-600 bg-pink-50" },
    { id: "skills",         label: "Technical Skills",               icon: Zap,           color: "text-indigo-600 bg-indigo-50" },
    { id: "softskills",     label: "Soft Skills",                    icon: Heart,         color: "text-rose-500 bg-rose-50" },
    { id: "hobbies",        label: "Hobbies & Interests",            icon: Smile,         color: "text-orange-500 bg-orange-50" },
    { id: "availability",   label: "Availability & Shift Preference",icon: Clock,         color: "text-teal-600 bg-teal-50" },
    { id: "references",     label: "References",                     icon: Users,         color: "text-violet-600 bg-violet-50" },
    { id: "social",         label: "Social Links",                   icon: LinkIcon,      color: "text-slate-400 bg-slate-50" },
  ];

  const removeItem = <T,>(list: T[], setList: (v: T[]) => void, item: T) => {
    setList(list.filter((i) => i !== item));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 pb-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-on-surface">
          Customize your <span className="text-primary italic">Journey.</span>
        </h1>
        <p className="text-sm text-on-surface-variant font-medium italic">High-fidelity builder inspired by apna.co benchmarks.</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="group/section">
            <button
              onClick={() => toggleSection(section.id)}
              className={cn(
                "w-full flex items-center justify-between p-6 rounded-[2rem] transition-all border-2",
                activeSection === section.id
                  ? "bg-white border-primary/20 shadow-xl scale-[1.02]"
                  : "bg-surface-container-low border-transparent hover:border-slate-200"
              )}
            >
              <div className="flex items-center gap-6">
                <div className={cn("size-12 rounded-2xl flex items-center justify-center transition-transform group-hover/section:scale-110", section.color)}>
                  <section.icon className="size-6" />
                </div>
                <span className={cn("text-lg font-black transition-colors", activeSection === section.id ? "text-on-surface" : "text-on-surface-variant")}>
                  {section.label}
                </span>
              </div>
              <ChevronDown className={cn("size-6 text-slate-300 transition-transform duration-500", activeSection === section.id && "rotate-180 text-primary")} />
            </button>

            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-8 pt-4 space-y-8">
                    {section.id === "personal" && (
                      <div className="space-y-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start bg-white/50 p-8 rounded-[2.5rem] border border-white/40 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

                          {/* Photo Upload Area */}
                          <div className="relative group/photo shrink-0 mx-auto md:mx-0 flex flex-col items-center">
                            <div className="size-32 rounded-full border-[6px] border-white bg-slate-50 overflow-hidden relative shadow-xl">
                              {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                  <User className="size-12" />
                                </div>
                              )}
                              <div
                                className="absolute inset-0 bg-primary/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm"
                                onClick={() => fileInputRef.current?.click()}
                              >
                                <Camera className="size-6 text-white mb-1" />
                                <span className="text-[10px] font-black uppercase text-white tracking-[0.2em]">Update</span>
                              </div>
                            </div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageUpload}
                              className="hidden"
                              accept="image/*"
                            />
                            <button
                              onClick={() => fileInputRef.current?.click()}
                              className="mt-4 px-5 py-2.5 bg-white rounded-full shadow-md border border-slate-100 text-[10px] font-black uppercase text-primary hover:scale-[1.02] transition-all tracking-widest flex items-center gap-2 whitespace-nowrap z-10"
                            >
                              <Upload className="size-3" /> Upload Photo
                            </button>
                            <p className="text-[9px] text-slate-400 mt-2 font-medium">JPEG, PNG (Max 2MB)</p>
                          </div>

                          {/* Form Fields */}
                          <div className="flex-1 w-full space-y-6 pt-2 z-10">
                            <div className="space-y-2">
                              <label className="label-text">Full Name *</label>
                              <input className="input-field bg-white/80" placeholder="Sahadeb Barman" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <label className="label-text">Contact Number *</label>
                              <input className="input-field bg-white/80" placeholder="+91 8116826807" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <label className="label-text">Email Address</label>
                              <input className="input-field bg-white/80" placeholder="try@try.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                              <label className="label-text">Base Location</label>
                              <input className="input-field bg-white/80" placeholder="Mumbai, India" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                            <label className="label-text block mb-2">Experience level</label>
                            <div className="flex gap-8 pl-2">
                              <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="radio" name="exp" checked={experienceLevel === "Fresher"} onChange={() => setExperienceLevel("Fresher")} className="accent-primary size-5" />
                                <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">Fresher Graduate</span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="radio" name="exp" checked={experienceLevel === "Experience"} onChange={() => setExperienceLevel("Experience")} className="accent-primary size-5" />
                                <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">Experienced Pro</span>
                              </label>
                            </div>
                          </div>
                          <div className="space-y-3 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100">
                            <label className="label-text block mb-2">Target Role</label>
                            <input className="input-field bg-white" placeholder="Software Developer" value={preferredRole} onChange={(e) => setPreferredRole(e.target.value)} />
                          </div>
                          <div className="col-span-1 md:col-span-2 space-y-4 pt-4 bg-primary/[0.02] p-8 rounded-[2.5rem] border-2 border-dashed border-primary/10">
                            <div className="flex justify-between items-center px-2">
                              <div className="flex items-center gap-3">
                                <Sparkles className="size-4 text-primary animate-pulse" />
                                <label className="label-text !m-0 !text-primary">AI Professional Summary</label>
                              </div>
                              <button
                                onClick={generateSummary}
                                disabled={generatingTarget !== null}
                                className="px-6 py-2 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-primary-container transition-all shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-95 flex items-center gap-2"
                              >
                                {generatingTarget === "personal-summary" ? "Synthesizing..." : <><Sparkles className="size-3 fill-white" /> Write with AI</>}
                              </button>
                            </div>
                            <textarea
                              className="input-field min-h-[160px] bg-white leading-relaxed"
                              placeholder="Describe your core expertise and professional vision..."
                              value={personalSummary}
                              onChange={(e) => setPersonalSummary(e.target.value)}
                            />
                            {aiFeedback?.key === "personal-summary" ? (
                              <p
                                className={cn(
                                  "px-2 text-sm font-medium",
                                  aiFeedback.tone === "error"
                                    ? "text-rose-600"
                                    : "text-emerald-600"
                                )}
                              >
                                {aiFeedback.message}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === "experience" && (
                      <div className="space-y-6">
                        {journey.map((item, index) => {
                          const [fromStr, toStr] = (item.duration || "").split(" - ");
                          const from = fromStr || "";
                          const to = toStr || "";

                          return (
                            <div key={index} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white/50 shadow-sm transition-all focus-within:border-primary/30 focus-within:shadow-md focus-within:bg-white">
                              <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-slate-50/50">
                                <span className="font-bold text-slate-700">{item.company || "New Experience"}</span>
                                <button
                                  onClick={() => {
                                    const newJ = [...journey];
                                    newJ.splice(index, 1);
                                    setJourney(newJ);
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                              <div className="p-6 md:p-8 space-y-8">
                                <div className="space-y-2">
                                  <label className="label-text !ml-2">Company name</label>
                                  <input
                                    className="input-field border-slate-200 border bg-white focus:bg-white"
                                    placeholder="Enter Company Name"
                                    value={item.company}
                                    onChange={(e) => {
                                      const newJ = [...journey];
                                      newJ[index].company = e.target.value;
                                      setJourney(newJ);
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="label-text !ml-2">Job Title/ Designation</label>
                                  <input
                                    className="input-field border-slate-200 border bg-white focus:bg-white"
                                    placeholder="Enter Job Title/ Designation"
                                    value={item.role}
                                    onChange={(e) => {
                                      const newJ = [...journey];
                                      newJ[index].role = e.target.value;
                                      setJourney(newJ);
                                    }}
                                  />
                                </div>

                                <div className="space-y-4">
                                  <label className="label-text !ml-2 block">Are you currently working in this company:</label>
                                  <div className="flex gap-4">
                                    <button
                                      onClick={() => {
                                        const newJ = [...journey];
                                        newJ[index].duration = `${from} - PRESENT`;
                                        setJourney(newJ);
                                      }}
                                      className={cn("px-6 py-2 rounded-full border text-sm font-bold transition-all", to === "PRESENT" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500 hover:border-slate-300")}
                                    >
                                      Yes
                                    </button>
                                    <button
                                      onClick={() => {
                                        const newJ = [...journey];
                                        newJ[index].duration = `${from} - ${to === "PRESENT" ? "" : to}`;
                                        setJourney(newJ);
                                      }}
                                      className={cn("px-6 py-2 rounded-full border text-sm font-bold transition-all", to !== "PRESENT" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500 hover:border-slate-300")}
                                    >
                                      No
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2 relative">
                                    <label className="label-text !ml-2">From</label>
                                    <Calendar className="absolute right-4 top-[38px] size-4 text-slate-400 pointer-events-none" />
                                    <input
                                      type="date"
                                      className="input-field border-slate-200 border bg-white focus:bg-white text-slate-600"
                                      style={{ colorScheme: "light" }}
                                      value={from.length === 4 ? `${from}-01-01` : from}
                                      onChange={(e) => {
                                        const newJ = [...journey];
                                        newJ[index].duration = `${e.target.value} - ${to}`;
                                        setJourney(newJ);
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2 relative">
                                    <label className="label-text !ml-2">To</label>
                                    {to === "PRESENT" ? (
                                      <input
                                        className="input-field border-slate-200 border bg-slate-50 opacity-50 text-slate-500"
                                        value="Present"
                                        disabled
                                      />
                                    ) : (
                                      <>
                                        <Calendar className="absolute right-4 top-[38px] size-4 text-slate-400 pointer-events-none" />
                                        <input
                                          type="date"
                                          className="input-field border-slate-200 border bg-white focus:bg-white text-slate-600"
                                          style={{ colorScheme: "light" }}
                                          value={to.length === 4 ? `${to}-12-31` : to}
                                          onChange={(e) => {
                                            const newJ = [...journey];
                                            newJ[index].duration = `${from} - ${e.target.value}`;
                                            setJourney(newJ);
                                          }}
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-2 relative pt-2">
                                  <div className="flex justify-between items-center px-2 mb-3">
                                    <label className="label-text !m-0">Edit wherever you need to customise it accordingly:</label>
                                    <button
                                      onClick={() => generateJourneyDescription(index)}
                                      disabled={generatingTarget !== null}
                                      className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                      <Sparkles className="size-3" /> {generatingTarget === `journey-${index}` ? "Writing..." : "Write with AI"}
                                    </button>
                                  </div>
                                  <div className="border border-slate-200 rounded-[10px] bg-white overflow-hidden focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                                    <div className="flex items-center gap-4 p-3 border-b border-slate-100 bg-slate-50/50">
                                      {['B', 'I', 'U'].map(btn => (
                                        <button key={btn} className="w-6 h-6 flex items-center justify-center font-serif font-bold text-slate-600 hover:text-primary hover:bg-white rounded text-sm transition-colors">{btn}</button>
                                      ))}
                                      <div className="w-px h-4 bg-slate-200 mx-1" />
                                      {/* Dummy list icons */}
                                      <div className="flex gap-2">
                                        <div className="space-y-1 w-4 opacity-70 hover:opacity-100 cursor-pointer"><div className="w-full h-0.5 bg-slate-600" /><div className="w-full h-0.5 bg-slate-600" /><div className="w-full h-0.5 bg-slate-600" /></div>
                                      </div>
                                    </div>
                                    <textarea
                                      className="w-full p-6 min-h-[140px] resize-y outline-none text-sm font-medium leading-relaxed bg-transparent"
                                      placeholder="Describe your responsibilities and achievements..."
                                      value={item.description}
                                      onChange={(e) => {
                                        const newJ = [...journey];
                                        newJ[index].description = e.target.value;
                                        setJourney(newJ);
                                      }}
                                    />
                                  </div>
                                  {aiFeedback?.key === `journey-${index}` ? (
                                    <p
                                      className={cn(
                                        "px-2 text-sm font-medium",
                                        aiFeedback.tone === "error"
                                          ? "text-rose-600"
                                          : "text-emerald-600"
                                      )}
                                    >
                                      {aiFeedback.message}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <button
                          onClick={() => setJourney([...journey, { role: "", company: "", duration: " - ", description: "" }])}
                          className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:underline px-2 pt-2"
                        >
                          <Plus className="size-4" /> Add new experience
                        </button>
                      </div>
                    )}

                    {section.id === "internship Experience" && (
                      <div className="space-y-6">
                        {internships.map((item, index) => {
                          const [fromStr, toStr] = (item.duration || "").split(" - ");
                          const from = fromStr || "";
                          const to = toStr || "";

                          return (
                            <div key={index} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white/50 shadow-sm transition-all focus-within:border-primary/30 focus-within:shadow-md focus-within:bg-white">
                              <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-slate-50/50">
                                <span className="font-bold text-slate-700">{item.company || "New Internship"}</span>
                                <button
                                  onClick={() => {
                                    const newI = [...internships];
                                    newI.splice(index, 1);
                                    setInternships(newI);
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                              <div className="p-6 md:p-8 space-y-8">
                                <div className="space-y-2">
                                  <label className="label-text !ml-2">Company name</label>
                                  <input
                                    className="input-field border-slate-200 border bg-white focus:bg-white"
                                    placeholder="Enter Company Name"
                                    value={item.company}
                                    onChange={(e) => {
                                      const newI = [...internships];
                                      newI[index].company = e.target.value;
                                      setInternships(newI);
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="label-text !ml-2">Job Title/ Designation</label>
                                  <input
                                    className="input-field border-slate-200 border bg-white focus:bg-white"
                                    placeholder="Enter Job Title/ Designation"
                                    value={item.role}
                                    onChange={(e) => {
                                      const newI = [...internships];
                                      newI[index].role = e.target.value;
                                      setInternships(newI);
                                    }}
                                  />
                                </div>

                                <div className="space-y-4">
                                  <label className="label-text !ml-2 block">Employment type:</label>
                                  <div className="flex flex-wrap gap-3">
                                    {["Full-time", "Part-time", "Intern", "Contract"].map(type => (
                                      <div key={type} className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-[12px] font-bold hover:border-primary cursor-pointer hover:bg-primary/5 transition-all bg-white shadow-sm">
                                        {type}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2 relative">
                                    <label className="label-text !ml-2">From</label>
                                    <Calendar className="absolute right-4 top-[38px] size-4 text-slate-400 pointer-events-none" />
                                    <input
                                      type="date"
                                      className="input-field border-slate-200 border bg-white focus:bg-white text-slate-600"
                                      style={{ colorScheme: "light" }}
                                      value={from.length === 4 ? `${from}-01-01` : from}
                                      onChange={(e) => {
                                        const newI = [...internships];
                                        newI[index].duration = `${e.target.value} - ${to}`;
                                        setInternships(newI);
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2 relative">
                                    <label className="label-text !ml-2">To</label>
                                    {to === "PRESENT" ? (
                                      <input
                                        className="input-field border-slate-200 border bg-slate-50 opacity-50 text-slate-500"
                                        value="Present"
                                        disabled
                                      />
                                    ) : (
                                      <>
                                        <Calendar className="absolute right-4 top-[38px] size-4 text-slate-400 pointer-events-none" />
                                        <input
                                          type="date"
                                          className="input-field border-slate-200 border bg-white focus:bg-white text-slate-600"
                                          style={{ colorScheme: "light" }}
                                          value={to.length === 4 ? `${to}-12-31` : to}
                                          onChange={(e) => {
                                            const newI = [...internships];
                                            newI[index].duration = `${from} - ${e.target.value}`;
                                            setInternships(newI);
                                          }}
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-2 relative pt-2">
                                  <div className="flex justify-between items-center px-2 mb-3">
                                    <label className="label-text !m-0">Edit wherever you need to customise it accordingly:</label>
                                    <button
                                      onClick={() => generateInternshipDescription(index)}
                                      disabled={generatingTarget !== null}
                                      className="flex items-center gap-1.5 text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                      <Sparkles className="size-3" /> {generatingTarget === `internship-${index}` ? "Writing..." : "Write with AI"}
                                    </button>
                                  </div>
                                  <div className="border border-slate-200 rounded-[10px] bg-white overflow-hidden focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                                    <div className="flex items-center gap-4 p-3 border-b border-slate-100 bg-slate-50/50">
                                      {['B', 'I', 'U'].map(btn => (
                                        <button key={btn} className="w-6 h-6 flex items-center justify-center font-serif font-bold text-slate-600 hover:text-primary hover:bg-white rounded text-sm transition-colors">{btn}</button>
                                      ))}
                                      <div className="w-px h-4 bg-slate-200 mx-1" />
                                      {/* Dummy list icons */}
                                      <div className="flex gap-2">
                                        <div className="space-y-1 w-4 opacity-70 hover:opacity-100 cursor-pointer"><div className="w-full h-0.5 bg-slate-600" /><div className="w-full h-0.5 bg-slate-600" /><div className="w-full h-0.5 bg-slate-600" /></div>
                                      </div>
                                    </div>
                                    <textarea
                                      className="w-full p-6 min-h-[140px] resize-y outline-none text-sm font-medium leading-relaxed bg-transparent"
                                      placeholder="Describe your responsibilities and achievements..."
                                      value={item.description}
                                      onChange={(e) => {
                                        const newI = [...internships];
                                        newI[index].description = e.target.value;
                                        setInternships(newI);
                                      }}
                                    />
                                  </div>
                                  {aiFeedback?.key === `internship-${index}` ? (
                                    <p
                                      className={cn(
                                        "px-2 text-sm font-medium",
                                        aiFeedback.tone === "error"
                                          ? "text-rose-600"
                                          : "text-emerald-600"
                                      )}
                                    >
                                      {aiFeedback.message}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <button
                          onClick={() => setInternships([...internships, { role: "", company: "", duration: " - ", description: "" }])}
                          className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:underline px-2 pt-2"
                        >
                          <Plus className="size-4" /> Add new internship
                        </button>
                      </div>
                    )}

                    {section.id === "internships" && (
                      <div className="space-y-6">
                        {internships.map((item, index) => {
                          const [fromStr, toStr] = (item.duration || "").split(" - ");
                          const from = fromStr || "";
                          const to = toStr || "";

                          return (
                            <div key={index} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white/50 shadow-sm transition-all focus-within:border-secondary/30 focus-within:shadow-md focus-within:bg-white">
                              <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-secondary/5">
                                <span className="font-bold text-slate-700">{item.company || "New Internship"}</span>
                                <button
                                  onClick={() => {
                                    const newI = [...internships];
                                    newI.splice(index, 1);
                                    setInternships(newI);
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                              <div className="p-6 md:p-8 space-y-8">
                                <div className="space-y-2">
                                  <label className="label-text !ml-2">Company name</label>
                                  <input
                                    className="input-field border-slate-200 border bg-white focus:bg-white"
                                    placeholder="Enter Company Name"
                                    value={item.company}
                                    onChange={(e) => {
                                      const newI = [...internships];
                                      newI[index].company = e.target.value;
                                      setInternships(newI);
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="label-text !ml-2">Job Title/ Designation</label>
                                  <input
                                    className="input-field border-slate-200 border bg-white focus:bg-white"
                                    placeholder="Enter Job Title/ Designation"
                                    value={item.role}
                                    onChange={(e) => {
                                      const newI = [...internships];
                                      newI[index].role = e.target.value;
                                      setInternships(newI);
                                    }}
                                  />
                                </div>

                                <div className="space-y-4">
                                  <label className="label-text !ml-2 block">Employment type:</label>
                                  <div className="flex flex-wrap gap-3">
                                    {["Full-time", "Part-time", "Intern", "Contract"].map(type => (
                                      <div key={type} className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-[12px] font-bold hover:border-secondary cursor-pointer hover:bg-secondary/5 transition-all bg-white shadow-sm">
                                        {type}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2 relative">
                                    <label className="label-text !ml-2">From</label>
                                    <Calendar className="absolute right-4 top-[38px] size-4 text-slate-400 pointer-events-none" />
                                    <input
                                      type="date"
                                      className="input-field border-slate-200 border bg-white focus:bg-white text-slate-600"
                                      style={{ colorScheme: "light" }}
                                      value={from.length === 4 ? `${from}-01-01` : from}
                                      onChange={(e) => {
                                        const newI = [...internships];
                                        newI[index].duration = `${e.target.value} - ${to}`;
                                        setInternships(newI);
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2 relative">
                                    <label className="label-text !ml-2">To</label>
                                    {to === "PRESENT" ? (
                                      <input
                                        className="input-field border-slate-200 border bg-slate-50 opacity-50 text-slate-500"
                                        value="Present"
                                        disabled
                                      />
                                    ) : (
                                      <>
                                        <Calendar className="absolute right-4 top-[38px] size-4 text-slate-400 pointer-events-none" />
                                        <input
                                          type="date"
                                          className="input-field border-slate-200 border bg-white focus:bg-white text-slate-600"
                                          style={{ colorScheme: "light" }}
                                          value={to.length === 4 ? `${to}-12-31` : to}
                                          onChange={(e) => {
                                            const newI = [...internships];
                                            newI[index].duration = `${from} - ${e.target.value}`;
                                            setInternships(newI);
                                          }}
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-2 relative pt-2">
                                  <div className="flex justify-between items-center px-2 mb-3">
                                    <label className="label-text !m-0">Edit wherever you need to customise it accordingly:</label>
                                    <button
                                      onClick={() => generateInternshipDescription(index)}
                                      disabled={generatingTarget !== null}
                                      className="flex items-center gap-1.5 text-[10px] font-black uppercase text-secondary hover:text-black bg-secondary/10 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                      <Sparkles className="size-3" /> {generatingTarget === `internship-${index}` ? "Writing..." : "Write with AI"}
                                    </button>
                                  </div>
                                  <div className="border border-slate-200 rounded-[10px] bg-white overflow-hidden focus-within:border-secondary/50 focus-within:ring-4 focus-within:ring-secondary/5 transition-all">
                                    <div className="flex items-center gap-4 p-3 border-b border-slate-100 bg-slate-50/50">
                                      {['B', 'I', 'U'].map(btn => (
                                        <button key={btn} className="w-6 h-6 flex items-center justify-center font-serif font-bold text-slate-600 hover:text-secondary hover:bg-white rounded text-sm transition-colors">{btn}</button>
                                      ))}
                                      <div className="w-px h-4 bg-slate-200 mx-1" />
                                      {/* Dummy list icons */}
                                      <div className="flex gap-2">
                                        <div className="space-y-1 w-4 opacity-70 hover:opacity-100 cursor-pointer"><div className="w-full h-0.5 bg-slate-600" /><div className="w-full h-0.5 bg-slate-600" /><div className="w-full h-0.5 bg-slate-600" /></div>
                                      </div>
                                    </div>
                                    <textarea
                                      className="w-full p-6 min-h-[140px] resize-y outline-none text-sm font-medium leading-relaxed bg-transparent"
                                      placeholder="Describe your responsibilities and achievements..."
                                      value={item.description}
                                      onChange={(e) => {
                                        const newI = [...internships];
                                        newI[index].description = e.target.value;
                                        setInternships(newI);
                                      }}
                                    />
                                  </div>
                                  {aiFeedback?.key === `internship-${index}` ? (
                                    <p
                                      className={cn(
                                        "px-2 text-sm font-medium",
                                        aiFeedback.tone === "error"
                                          ? "text-rose-600"
                                          : "text-emerald-600"
                                      )}
                                    >
                                      {aiFeedback.message}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <button
                          onClick={() => setInternships([...internships, { role: "", company: "", duration: " - ", description: "" }])}
                          className="text-secondary font-bold text-sm flex items-center gap-2 hover:underline px-2 pt-2"
                        >
                          <Plus className="size-4" /> Add new internship
                        </button>
                      </div>
                    )}


                    {section.id === "achievements" && (
                      <div className="space-y-6">
                        {achievements.map((item, index) => (
                          <div
                            key={index}
                            className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white/50 shadow-sm transition-all focus-within:border-emerald-500/30 focus-within:shadow-md focus-within:bg-white"
                          >
                            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-emerald-50/50">
                              <div>
                                <div className="font-bold text-slate-700">
                                  {item.name || "New Achievement"}
                                </div>
                                {item.duration ? (
                                  <div className="text-[10px] text-slate-400">{item.duration}</div>
                                ) : null}
                              </div>
                              <button
                                onClick={() => {
                                  const nextAchievements = [...achievements];
                                  nextAchievements.splice(index, 1);
                                  setAchievements(nextAchievements);
                                }}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                            <div className="p-6 md:p-8 space-y-8">
                              <div className="space-y-2">
                                <label className="label-text !ml-2">Achievement or Training Name</label>
                                <input
                                  className="input-field border-slate-200 border bg-white focus:bg-white"
                                  placeholder="Best Performer Award / Barista Training"
                                  value={item.name}
                                  onChange={(e) => {
                                    const nextAchievements = [...achievements];
                                    nextAchievements[index] = {
                                      ...nextAchievements[index],
                                      name: e.target.value,
                                    };
                                    setAchievements(nextAchievements);
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="label-text !ml-2">Duration or Year</label>
                                <input
                                  className="input-field border-slate-200 border bg-white focus:bg-white"
                                  placeholder="2025 / Jan 2025 - Mar 2025"
                                  value={item.duration || ""}
                                  onChange={(e) => {
                                    const nextAchievements = [...achievements];
                                    nextAchievements[index] = {
                                      ...nextAchievements[index],
                                      duration: e.target.value,
                                    };
                                    setAchievements(nextAchievements);
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="label-text !ml-2">Description</label>
                                <textarea
                                  className="input-field min-h-[140px] border-slate-200 border bg-white focus:bg-white leading-relaxed"
                                  placeholder="Describe the achievement, training, certification outcome, or recognition."
                                  value={item.description}
                                  onChange={(e) => {
                                    const nextAchievements = [...achievements];
                                    nextAchievements[index] = {
                                      ...nextAchievements[index],
                                      description: e.target.value,
                                    };
                                    setAchievements(nextAchievements);
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="label-text !ml-2">Attachment or Reference Link</label>
                                <input
                                  className="input-field border-slate-200 border bg-white focus:bg-white"
                                  placeholder="https://..."
                                  value={item.link || ""}
                                  onChange={(e) => {
                                    const nextAchievements = [...achievements];
                                    nextAchievements[index] = {
                                      ...nextAchievements[index],
                                      link: e.target.value,
                                    };
                                    setAchievements(nextAchievements);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={() =>
                            setAchievements([
                              ...achievements,
                              { name: "", duration: "", description: "", link: "" },
                            ])
                          }
                          className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:underline px-2 pt-2"
                        >
                          <Plus className="size-4" /> Add new achievement or training
                        </button>
                      </div>
                    )}

                    {section.id === "education" && (
                      <div className="space-y-6">
                        {education.map((item, index) => {
                          const [fromStr, toStr] = (item.year || "").split(" - ");
                          const from = fromStr || "";
                          const to = toStr || "";

                          return (
                            <div key={index} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white/50 shadow-sm transition-all focus-within:border-primary/30 focus-within:shadow-md focus-within:bg-white">
                              <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-slate-50/50">
                                <div>
                                  <div className="font-bold text-slate-700">{item.degree || "New Education"}</div>
                                  <div className="text-sm text-slate-500">{item.school}</div>
                                  <div className="text-[10px] text-slate-400">{item.year}</div>
                                </div>
                                <button
                                  onClick={() => {
                                    const newE = [...education];
                                    newE.splice(index, 1);
                                    setEducation(newE);
                                  }}
                                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                              <div className="p-6 md:p-8 space-y-8">
                                <div className="space-y-4">
                                  <label className="label-text !ml-2 block">Level of education:</label>
                                  <div className="flex flex-wrap gap-3">
                                    {["10th", "12th", "Diploma", "ITI", "Graduate", "Post Graduate"].map(level => (
                                      <div key={level} className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-[12px] font-bold hover:border-primary cursor-pointer hover:bg-primary/5 transition-all bg-white shadow-sm">
                                        {level}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="label-text !ml-2">College name</label>
                                  <input
                                    className="input-field border-slate-200 border bg-white focus:bg-white"
                                    placeholder="Enter College Name"
                                    value={item.school}
                                    onChange={(e) => {
                                      const newE = [...education];
                                      newE[index].school = e.target.value;
                                      setEducation(newE);
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="label-text !ml-2">Degree</label>
                                  <input
                                    className="input-field border-slate-200 border bg-white focus:bg-white"
                                    placeholder="Enter Degree"
                                    value={item.degree}
                                    onChange={(e) => {
                                      const newE = [...education];
                                      newE[index].degree = e.target.value;
                                      setEducation(newE);
                                    }}
                                  />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <label className="label-text !ml-2">Specialisation</label>
                                    <input className="input-field border-slate-200 border bg-white focus:bg-white" placeholder="Optional" />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="label-text !ml-2">Marks/ Percentage</label>
                                    <input className="input-field border-slate-200 border bg-white focus:bg-white" placeholder="Optional" />
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <label className="label-text !ml-2 block">Education type:</label>
                                  <div className="flex flex-wrap gap-3">
                                    {["Full-time", "Part-time", "Correspondence"].map(type => (
                                      <div key={type} className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-[12px] font-bold hover:border-primary cursor-pointer hover:bg-primary/5 transition-all bg-white shadow-sm">
                                        {type}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <label className="label-text !ml-2 block">Are you currently studying:</label>
                                  <div className="flex gap-4">
                                    <button
                                      onClick={() => {
                                        const newE = [...education];
                                        newE[index].year = `${from} - PRESENT`;
                                        setEducation(newE);
                                      }}
                                      className={cn("px-6 py-2 rounded-full border text-sm font-bold transition-all", to === "PRESENT" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white shadow-sm")}
                                    >
                                      Yes
                                    </button>
                                    <button
                                      onClick={() => {
                                        const newE = [...education];
                                        newE[index].year = `${from} - ${to === "PRESENT" ? "" : to}`;
                                        setEducation(newE);
                                      }}
                                      className={cn("px-6 py-2 rounded-full border text-sm font-bold transition-all", to !== "PRESENT" ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500 hover:border-slate-300 bg-white shadow-sm")}
                                    >
                                      No
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-2 relative">
                                    <label className="label-text !ml-2">From</label>
                                    <Calendar className="absolute right-4 top-[38px] size-4 text-slate-400 pointer-events-none" />
                                    <input
                                      type="date"
                                      className="input-field border-slate-200 border bg-white focus:bg-white text-slate-600"
                                      style={{ colorScheme: "light" }}
                                      value={from.length === 4 ? `${from}-01-01` : from} // Basic mapping for 'YYYY' fallback
                                      onChange={(e) => {
                                        const newE = [...education];
                                        newE[index].year = `${e.target.value} - ${to}`;
                                        setEducation(newE);
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2 relative">
                                    <label className="label-text !ml-2">To</label>
                                    {to === "PRESENT" ? (
                                      <input
                                        className="input-field border-slate-200 border bg-slate-50 opacity-50 text-slate-500"
                                        value="Present"
                                        disabled
                                      />
                                    ) : (
                                      <>
                                        <Calendar className="absolute right-4 top-[38px] size-4 text-slate-400 pointer-events-none" />
                                        <input
                                          type="date"
                                          className="input-field border-slate-200 border bg-white focus:bg-white text-slate-600"
                                          style={{ colorScheme: "light" }}
                                          value={to.length === 4 ? `${to}-12-31` : to} // Basic mapping for 'YYYY' fallback
                                          onChange={(e) => {
                                            const newE = [...education];
                                            newE[index].year = `${from} - ${e.target.value}`;
                                            setEducation(newE);
                                          }}
                                        />
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <button
                          onClick={() => setEducation([...education, { school: "", degree: "", year: " - " }])}
                          className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:underline px-2 pt-2"
                        >
                          <Plus className="size-4" /> Add new education
                        </button>
                      </div>
                    )}

                    {section.id === "credentials" && (
                      <div className="space-y-6">
                        {certifications.map((item, index) => (
                          <div key={index} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white/50 shadow-sm transition-all focus-within:border-emerald-500/30 focus-within:shadow-md focus-within:bg-white">
                            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-emerald-50/50">
                              <span className="font-bold text-slate-700">{item.title || "Your title"}</span>
                              <button
                                onClick={() => {
                                  const newC = [...certifications];
                                  newC.splice(index, 1);
                                  setCertifications(newC);
                                }}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                            <div className="p-6 md:p-8 space-y-8">
                              <div className="space-y-2">
                                <label className="label-text !ml-2">Title</label>
                                <input
                                  className="input-field border-slate-200 border bg-white focus:bg-white"
                                  placeholder="Enter title"
                                  value={item.title}
                                  onChange={(e) => {
                                    const newC = [...certifications];
                                    newC[index].title = e.target.value;
                                    setCertifications(newC);
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="label-text !ml-2">Attach link</label>
                                <input
                                  className="input-field border-slate-200 border bg-white focus:bg-white"
                                  placeholder="Enter Attach link"
                                  value={item.link || ""}
                                  onChange={(e) => {
                                    const newC = [...certifications];
                                    newC[index].link = e.target.value;
                                    setCertifications(newC);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={() => setCertifications([...certifications, { title: "", link: "" }])}
                          className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:underline px-2 pt-2"
                        >
                          <Plus className="size-4" /> Add new certification
                        </button>
                      </div>
                    )}

                     {section.id === "languages" && (
                        <div className="space-y-6">
                           {languages.map((item, index) => (
                               <div key={index} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white/50 shadow-sm transition-all focus-within:border-pink-500/30 focus-within:shadow-md focus-within:bg-white">
                                  <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-pink-50/50">
                                     <div>
                                       <span className="font-bold text-slate-700">{item.language || "New Language"}</span>
                                       {item.level && <span className="ml-2 text-xs text-pink-500 font-medium">{item.level}</span>}
                                     </div>
                                     <button
                                       onClick={() => {
                                         const newL = [...languages];
                                         newL.splice(index, 1);
                                         setLanguages(newL);
                                       }}
                                       className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center justify-center shrink-0"
                                     >
                                       <Trash2 className="size-4" />
                                     </button>
                                  </div>
                                  <div className="p-6 md:p-8 space-y-6">
                                     <div className="space-y-2">
                                       <label className="label-text !ml-2">Enter language</label>
                                       <input
                                         className="input-field border-slate-200 border bg-white focus:bg-white"
                                         placeholder="e.g. Hindi, English"
                                         value={item.language}
                                         onChange={(e) => {
                                           const newL = [...languages];
                                           newL[index] = { ...newL[index], language: e.target.value };
                                           setLanguages(newL);
                                         }}
                                       />
                                     </div>
                                     <div className="space-y-3">
                                       <label className="label-text !ml-2 block">Level:</label>
                                       <div className="flex flex-wrap gap-2">
                                          {["Native", "Fluent", "Advanced", "Intermediate", "Basic"].map(level => (
                                            <button
                                              key={level}
                                              onClick={() => {
                                                const newL = [...languages];
                                                newL[index] = { ...newL[index], level };
                                                setLanguages(newL);
                                              }}
                                              className={cn("px-4 py-2 rounded-full border text-[11px] font-bold transition-all shadow-sm", item.level === level ? "bg-pink-50 border-pink-500 text-pink-700" : "bg-white border-slate-200 text-slate-600 hover:border-pink-200")}
                                            >
                                              {level}
                                            </button>
                                          ))}
                                       </div>
                                     </div>
                                  </div>
                               </div>
                           ))}

                           <div className="bg-slate-50 border border-slate-100 p-6 rounded-[2rem] space-y-4">
                              <label className="label-text !ml-2">Most popular</label>
                              <div className="flex flex-wrap gap-3 mt-2 pl-2">
                                 {["English", "Hindi", "Urdu", "French", "Spanish", "German"].map(pop => (
                                    <button
                                      key={pop}
                                      onClick={() => {
                                        if (!languages.find(l => l.language.toLowerCase() === pop.toLowerCase())) {
                                          setLanguages([...languages, { language: pop, level: "Intermediate" }]);
                                        }
                                      }}
                                      className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-pink-500 hover:text-pink-600 transition-colors shadow-sm"
                                    >
                                      {pop}
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <button
                             onClick={() => setLanguages([...languages, { language: "", level: "Intermediate" }])}
                             className="text-pink-600 font-bold text-sm flex items-center gap-2 hover:underline px-2 pt-2"
                           >
                             <Plus className="size-4" /> Add new language
                           </button>
                        </div>
                     )}

                     {section.id === "skills" && (
                       <div className="space-y-6">
                         <div className="flex flex-wrap gap-2">
                           {skills.map((s: string) => (
                             <span key={s} className="px-4 py-2 bg-indigo-50 text-indigo-900 border border-indigo-100 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
                               {s} <X className="size-3 cursor-pointer" onClick={() => removeItem(skills, setSkills, s)} />
                             </span>
                           ))}
                         </div>
                         <div className="bg-slate-50 border border-slate-100 p-5 rounded-[1.5rem] space-y-3">
                           <label className="label-text !ml-2">Popular skills in hospitality</label>
                           <div className="flex flex-wrap gap-2 mt-1">
                             {["Customer Service", "Food Safety", "Cash Handling", "Table Setting",
                               "Barista", "Housekeeping", "Front Desk", "POS System",
                               "Guest Relations", "Massage Therapy", "Hair Styling", "Waxing",
                               "Makeup", "Salon Management", "Spa Treatments", "Menu Knowledge"].map(chip => (
                               <button
                                 key={chip}
                                 onClick={() => { if (!skills.includes(chip)) setSkills([...skills, chip]); }}
                                 className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-700 transition-colors shadow-sm"
                               >
                                 {chip}
                               </button>
                             ))}
                           </div>
                         </div>
                       </div>
                     )}

                     {section.id === "softskills" && (
                       <div className="space-y-6">
                         <div className="flex flex-wrap gap-2">
                           {softSkills.map((s: string) => (
                             <span key={s} className="px-4 py-2 bg-rose-50 text-rose-900 border border-rose-100 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
                               {s} <X className="size-3 cursor-pointer" onClick={() => removeItem(softSkills, setSoftSkills, s)} />
                             </span>
                           ))}
                         </div>
                         <div className="bg-slate-50 border border-slate-100 p-5 rounded-[1.5rem] space-y-3">
                           <label className="label-text !ml-2">Select your soft skills</label>
                           <div className="flex flex-wrap gap-2 mt-1">
                             {["Punctual", "Well-Groomed", "Friendly", "Team Player", "Hard Working",
                               "Patient", "Honest", "Quick Learner", "Good Communication", "Problem Solving",
                               "Adaptable", "Positive Attitude", "Responsible", "Organised"].map(chip => (
                               <button
                                 key={chip}
                                 onClick={() => { if (!softSkills.includes(chip)) setSoftSkills([...softSkills, chip]); }}
                                 className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-600 hover:border-rose-400 hover:text-rose-700 transition-colors shadow-sm"
                               >
                                 {chip}
                               </button>
                             ))}
                           </div>
                         </div>
                       </div>
                     )}

                     {section.id === "hobbies" && (
                       <div className="space-y-6">
                         <div className="flex flex-wrap gap-2">
                           {hobbies.map((h: string) => (
                             <span key={h} className="px-4 py-2 bg-orange-50 text-orange-900 border border-orange-100 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
                               {h} <X className="size-3 cursor-pointer" onClick={() => removeItem(hobbies, setHobbies, h)} />
                             </span>
                           ))}
                         </div>
                         <div className="bg-slate-50 border border-slate-100 p-5 rounded-[1.5rem] space-y-3">
                           <label className="label-text !ml-2">Popular interests</label>
                           <div className="flex flex-wrap gap-2 mt-1">
                             {["Cooking", "Yoga", "Travelling", "Music", "Reading", "Fitness",
                               "Dancing", "Photography", "Painting", "Gardening", "Cricket",
                               "Food Blogging", "Meditation", "Sketching"].map(chip => (
                               <button
                                 key={chip}
                                 onClick={() => { if (!hobbies.includes(chip)) setHobbies([...hobbies, chip]); }}
                                 className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-600 hover:border-orange-400 hover:text-orange-700 transition-colors shadow-sm"
                               >
                                 {chip}
                               </button>
                             ))}
                           </div>
                         </div>
                       </div>
                     )}

                     {section.id === "availability" && (
                       <div className="space-y-8">
                         <div className="space-y-3">
                           <label className="label-text !ml-2 block">Job Type Preference</label>
                           <div className="flex flex-wrap gap-3">
                             {["Full-time", "Part-time", "Open to both"].map(opt => (
                               <button
                                 key={opt}
                                 onClick={() => setAvailability(opt)}
                                 className={cn("px-5 py-2.5 rounded-full border font-bold text-sm transition-all shadow-sm", availability === opt ? "bg-teal-50 border-teal-500 text-teal-700" : "bg-white border-slate-200 text-slate-600 hover:border-teal-200")}
                               >
                                 {opt}
                               </button>
                             ))}
                           </div>
                         </div>
                         <div className="space-y-3">
                           <label className="label-text !ml-2 block">Shift Preference</label>
                           <div className="flex flex-wrap gap-3">
                             {["Day Shift", "Night Shift", "Rotational Shift", "Weekend Available", "Flexible"].map(shift => (
                               <button
                                 key={shift}
                                 onClick={() => {
                                   if (shiftPreference.includes(shift)) {
                                     setShiftPreference(shiftPreference.filter(s => s !== shift));
                                   } else {
                                     setShiftPreference([...shiftPreference, shift]);
                                   }
                                 }}
                                 className={cn("px-5 py-2.5 rounded-full border font-bold text-sm transition-all shadow-sm", shiftPreference.includes(shift) ? "bg-teal-50 border-teal-500 text-teal-700" : "bg-white border-slate-200 text-slate-600 hover:border-teal-200")}
                               >
                                 {shift}
                               </button>
                             ))}
                           </div>
                         </div>
                       </div>
                     )}

                     {section.id === "references" && (
                       <div className="space-y-6">
                         {references.map((ref, index) => (
                           <div key={index} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white/50 shadow-sm">
                             <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 bg-violet-50/50">
                               <span className="font-bold text-slate-700">{ref.name || "Reference " + (index + 1)}</span>
                               <button
                                 onClick={() => { const r = [...references]; r.splice(index, 1); setReferences(r); }}
                                 className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex items-center justify-center"
                               >
                                 <Trash2 className="size-4" />
                               </button>
                             </div>
                             <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="space-y-2">
                                 <label className="label-text !ml-2">Full Name</label>
                                 <input
                                   className="input-field border-slate-200 border bg-white"
                                   placeholder="e.g. Rajan Mehta"
                                   value={ref.name}
                                   onChange={(e) => { const r = [...references]; r[index] = {...r[index], name: e.target.value}; setReferences(r); }}
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="label-text !ml-2">Job Title</label>
                                 <input
                                   className="input-field border-slate-200 border bg-white"
                                   placeholder="e.g. Spa Manager"
                                   value={ref.role}
                                   onChange={(e) => { const r = [...references]; r[index] = {...r[index], role: e.target.value}; setReferences(r); }}
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="label-text !ml-2">Company / Hotel Name</label>
                                 <input
                                   className="input-field border-slate-200 border bg-white"
                                   placeholder="e.g. The Oberoi Mumbai"
                                   value={ref.company}
                                   onChange={(e) => { const r = [...references]; r[index] = {...r[index], company: e.target.value}; setReferences(r); }}
                                 />
                               </div>
                               <div className="space-y-2">
                                 <label className="label-text !ml-2">Phone / Email</label>
                                 <input
                                   className="input-field border-slate-200 border bg-white"
                                   placeholder="e.g. +91 98xxx xxxxx"
                                   value={ref.phone}
                                   onChange={(e) => { const r = [...references]; r[index] = {...r[index], phone: e.target.value}; setReferences(r); }}
                                 />
                               </div>
                             </div>
                           </div>
                         ))}
                         <button
                           onClick={() => setReferences([...references, { name: "", role: "", company: "", phone: "" }])}
                           className="text-violet-600 font-bold text-sm flex items-center gap-2 hover:underline px-2 pt-2"
                         >
                           <Plus className="size-4" /> Add reference
                         </button>
                       </div>
                     )}

                    {section.id === "social" && (
                      <div className="space-y-4">
                        {/* LinkedIn */}
                        <div className="flex items-center gap-4 p-5 bg-[#0A66C2]/5 border border-[#0A66C2]/15 rounded-[1.25rem] transition-all focus-within:border-[#0A66C2]/40 focus-within:shadow-sm">
                          <div className="shrink-0 w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <label className="text-[10px] font-black uppercase text-[#0A66C2] tracking-wider block mb-1">LinkedIn</label>
                            <input
                              className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                              placeholder="linkedin.com/in/yourname"
                              value={socialLinks.linkedin || ""}
                              onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Portfolio */}
                        <div className="flex items-center gap-4 p-5 bg-primary/5 border border-primary/15 rounded-[1.25rem] transition-all focus-within:border-primary/40 focus-within:shadow-sm">
                          <div className="shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-sm">
                            <Globe className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <label className="text-[10px] font-black uppercase text-primary tracking-wider block mb-1">Portfolio / Website</label>
                            <input
                              className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                              placeholder="yourportfolio.com"
                              value={socialLinks.portfolio || ""}
                              onChange={(e) => setSocialLinks({ ...socialLinks, portfolio: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* YouTube */}
                         <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-100 rounded-[1.25rem] transition-all focus-within:border-red-300 focus-within:shadow-sm">
                           <div className="shrink-0 w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center shadow-sm">
                             <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                           </div>
                           <div className="flex-1 min-w-0">
                             <label className="text-[10px] font-black uppercase text-red-600 tracking-wider block mb-1">YouTube</label>
                             <input
                               className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                               placeholder="youtube.com/@yourchannel"
                               value={socialLinks.youtube || ""}
                               onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                             />
                           </div>
                         </div>

                        {/* Instagram */}
                        <div className="flex items-center gap-4 p-5 bg-pink-50 border border-pink-100 rounded-[1.25rem] transition-all focus-within:border-pink-300 focus-within:shadow-sm">
                          <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <label className="text-[10px] font-black uppercase text-pink-600 tracking-wider block mb-1">Instagram</label>
                            <input
                              className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                              placeholder="instagram.com/yourhandle"
                              value={socialLinks.instagram || ""}
                              onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                            />
                          </div>
                        </div>

                        {/* Twitter / X */}
                        <div className="flex items-center gap-4 p-5 bg-black/5 border border-black/10 rounded-[1.25rem] transition-all focus-within:border-black/30 focus-within:shadow-sm">
                          <div className="shrink-0 w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-sm">
                            <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <label className="text-[10px] font-black uppercase text-slate-700 tracking-wider block mb-1">X / Twitter</label>
                            <input
                              className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                              placeholder="x.com/yourhandle"
                              value={socialLinks.twitter || ""}
                              onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="pt-10 flex gap-4">
        <button
          onClick={onBack}
          className="px-10 py-5 bg-surface-container text-on-surface-variant rounded-full font-bold text-lg hover:bg-slate-200 transition-all active:scale-95"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-5 bg-gradient-to-r from-primary to-primary-container text-white font-black text-xl rounded-full shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-4"
        >
          Continue to Vibe Check
          <ArrowRight className="size-6" />
        </button>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 1rem 1.25rem;
          background-color: #f8fafc;
          border-radius: 10px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          outline: none;
          font-weight: 600;
          font-size: 0.875rem;
        }
        .input-field:focus {
          background-color: white;
          border-color: #6a37d4;
          box-shadow: 0 8px 24px rgba(106, 55, 212, 0.08);
        }
        .label-text {
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #94a3b8;
          margin-left: 1.25rem;
        }
        .add-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2.5rem;
          font-weight: 900;
          font-size: 0.875rem;
          border-radius: 9999px;
          border: 2px dashed #e2e8f0;
          color: #64748b;
          transition: all 0.2s ease;
        }
        .add-btn:hover {
          border-color: #6a37d4;
          color: #6a37d4;
          background-color: rgba(106, 55, 212, 0.02);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
