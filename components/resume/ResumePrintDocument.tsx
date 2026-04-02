import React from "react";
import { Link2, Mail, MapPin, Phone } from "lucide-react";

export interface ResumePrintJourneyItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface ResumePrintEducationItem {
  school: string;
  degree: string;
  year: string;
}

export interface ResumePrintAchievementItem {
  name: string;
  duration?: string;
  description: string;
  link?: string;
}

export interface ResumePrintSocialLinks {
  linkedin?: string;
  portfolio?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}

export interface ResumePrintReferenceItem {
  name: string;
  role: string;
  company: string;
  phone: string;
}

export interface ResumePrintDocumentProps {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  personalSummary: string;
  aura: { label: string; color: string }[];
  vibe: string[];
  journey: ResumePrintJourneyItem[];
  internships: ResumePrintJourneyItem[];
  achievements: ResumePrintAchievementItem[];
  education: ResumePrintEducationItem[];
  awards: string[];
  certifications: { title: string; link?: string }[];
  languages: { language: string; level: string }[];
  socialLinks: ResumePrintSocialLinks;
  modalities: string[];
  softSkills: string[];
  hobbies: string[];
  availability: string;
  shiftPreference: string[];
  references: ResumePrintReferenceItem[];
  profileImage?: string;
}

function formatMonthYear(value: string) {
  if (!value) {
    return "";
  }

  if (value.toLowerCase() === "present") {
    return "Present";
  }

  const parts = value.split("-");

  if (parts.length < 2) {
    return value;
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(parts[1], 10) - 1] ?? ""} ${parts[0]}`;
}

function formatDateRange(duration: string) {
  const [start, end] = duration.split(" - ");
  return `${formatMonthYear(start)}${end ? ` - ${formatMonthYear(end)}` : ""}`;
}

function formatSocialHandle(link: string) {
  return link
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace("linkedin.com/in/", "@")
    .replace(/\/$/, "");
}

function PrintSectionHeading({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span
        className={`text-[10px] font-black uppercase tracking-[0.28em] ${
          light ? "text-white/75" : "text-[#3730a3]"
        }`}
      >
        {children}
      </span>
      <div className={`h-px flex-1 ${light ? "bg-white/20" : "bg-[#dbe4ff]"}`} />
    </div>
  );
}

function PrintTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-white/20 px-3 py-1.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white">
      {children}
    </span>
  );
}

export function ResumePrintDocument({
  name,
  title,
  location,
  email,
  phone,
  personalSummary,
  vibe,
  journey,
  internships,
  achievements,
  education,
  awards,
  certifications,
  languages,
  socialLinks,
  softSkills,
  hobbies,
  availability,
  shiftPreference,
  references,
  profileImage,
}: ResumePrintDocumentProps) {
  const defaultSummary =
    "Dedicated hospitality professional with a passion for delivering exceptional guest experiences. Committed to maintaining high professional standards in fast-paced hotel, restaurant, and wellness environments.";
  const contactLabel = socialLinks.linkedin ? formatSocialHandle(socialLinks.linkedin) : "";

  return (
    <div
      data-resume-print-document
      className="mx-auto flex min-h-[297mm] w-full max-w-[794px] flex-col bg-white text-[#1e293b] shadow-[0_24px_64px_rgba(15,23,42,0.12)] print:max-w-none print:shadow-none [print-color-adjust:exact] [-webkit-print-color-adjust:exact]"
    >
      <div className="bg-[#312e81] px-7 pb-6 pt-7 text-white">
        <div className="flex items-center gap-5">
          <div className="flex-1">
            <h1 className="text-[32px] font-black leading-none tracking-tight">{name || "Your Name"}</h1>
            <p className="mt-2 text-[12px] font-black uppercase tracking-[0.24em] text-[#c7d2fe]">
              {title || "Hospitality Professional"}
            </p>
          </div>

          <div className="shrink-0">
            {profileImage ? (
              <img
                src={profileImage}
                alt={name}
                className="size-20 rounded-full border-[3px] border-white/30 object-cover shadow-lg"
              />
            ) : (
              <div className="flex size-20 items-center justify-center rounded-full border-[3px] border-white/20 bg-white/10 shadow-lg">
                <span className="text-2xl font-black text-white">
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium text-[#e0e7ff]">
          {email ? (
            <span className="flex items-center gap-2">
              <Mail className="size-3.5 shrink-0" />
              {email}
            </span>
          ) : null}
          {phone ? (
            <span className="flex items-center gap-2">
              <Phone className="size-3.5 shrink-0" />
              {phone}
            </span>
          ) : null}
          {location ? (
            <span className="flex items-center gap-2">
              <MapPin className="size-3.5 shrink-0" />
              {location}
            </span>
          ) : null}
          {contactLabel ? (
            <span className="flex items-center gap-2">
              <Link2 className="size-3.5 shrink-0" />
              {contactLabel}
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-[276px_minmax(0,1fr)] items-stretch">
        <aside className="h-full bg-[#1e1b4b] px-5 py-6 text-white">
          {vibe.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading light>Skills</PrintSectionHeading>
              <div className="flex flex-wrap gap-2">
                {vibe.map((item) => (
                  <PrintTag key={item}>{item}</PrintTag>
                ))}
              </div>
            </section>
          ) : null}

          {softSkills.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading light>Soft Skills</PrintSectionHeading>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((item) => (
                  <PrintTag key={item}>{item}</PrintTag>
                ))}
              </div>
            </section>
          ) : null}

          {languages.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading light>Languages</PrintSectionHeading>
              <div className="space-y-3">
                {languages.map((item, index) => (
                  <div key={`${item.language}-${index}`} className="flex items-center justify-between gap-3 break-inside-avoid">
                    <span className="text-[10px] font-bold text-white">{item.language}</span>
                    <span className="text-[9px] text-[#c7d2fe]">{item.level}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {hobbies.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading light>Interests</PrintSectionHeading>
              <div className="flex flex-wrap gap-2">
                {hobbies.map((item) => (
                  <PrintTag key={item}>{item}</PrintTag>
                ))}
              </div>
            </section>
          ) : null}

          {availability || shiftPreference.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading light>Availability</PrintSectionHeading>
              <div className="space-y-1.5">
                {availability ? <p className="text-[10px] font-bold text-[#e0e7ff]">{availability}</p> : null}
                {shiftPreference.length > 0 ? (
                  <p className="text-[9px] leading-relaxed text-[#c7d2fe]">{shiftPreference.join(" · ")}</p>
                ) : null}
              </div>
            </section>
          ) : null}

          {certifications.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading light>Certifications</PrintSectionHeading>
              <div className="space-y-3">
                {certifications.map((item, index) => (
                  <p key={`${item.title}-${index}`} className="break-inside-avoid border-l border-[#6366f1] pl-3 text-[9px] leading-[1.65] text-[#e0e7ff]">
                    {item.title}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {awards.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading light>Recognition</PrintSectionHeading>
              <div className="space-y-3">
                {awards.map((item, index) => (
                  <p key={`${item}-${index}`} className="break-inside-avoid border-l border-[#f59e0b] pl-3 text-[9px] leading-[1.65] text-[#e0e7ff]">
                    {item}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {references.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading light>References</PrintSectionHeading>
              <div className="space-y-4">
                {references.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="break-inside-avoid space-y-1">
                    <p className="text-[10px] font-black text-white">{item.name}</p>
                    <p className="text-[9px] leading-relaxed text-[#c7d2fe]">
                      {item.role}
                      {item.company ? `, ${item.company}` : ""}
                    </p>
                    <p className="text-[9px] text-[#a5b4fc]">{item.phone}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </aside>

        <main className="h-full bg-white px-6 py-6">
          <section className="pb-6">
            <PrintSectionHeading>Professional Summary</PrintSectionHeading>
            <p className="text-[12px] leading-[1.75] text-[#475569]">{personalSummary || defaultSummary}</p>
          </section>

          {journey.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading>Work Experience</PrintSectionHeading>
              <div className="space-y-4">
                {journey.map((item, index) => (
                  <div key={`${item.role}-${index}`} className="break-inside-avoid space-y-1.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[13px] font-black text-[#1e293b]">{item.role}</p>
                        <p className="text-[11px] font-semibold text-[#4f46e5]">{item.company}</p>
                      </div>
                      <span className="mt-0.5 shrink-0 whitespace-nowrap text-[9px] font-medium text-[#94a3b8]">
                        {formatDateRange(item.duration)}
                      </span>
                    </div>
                    {item.description ? (
                      <p className="text-[11px] leading-[1.7] text-[#64748b]">{item.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {internships.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading>Internship Experience</PrintSectionHeading>
              <div className="space-y-4">
                {internships.map((item, index) => (
                  <div key={`${item.role}-${index}`} className="break-inside-avoid space-y-1.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[13px] font-black text-[#1e293b]">{item.role}</p>
                        <p className="text-[11px] font-semibold text-[#7c3aed]">{item.company}</p>
                      </div>
                      <span className="mt-0.5 shrink-0 whitespace-nowrap text-[9px] font-medium text-[#94a3b8]">
                        {formatDateRange(item.duration)}
                      </span>
                    </div>
                    {item.description ? (
                      <p className="text-[11px] leading-[1.7] text-[#64748b]">{item.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {achievements.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading>Achievements &amp; Training</PrintSectionHeading>
              <div className="space-y-4">
                {achievements.map((item, index) => (
                  <div key={`${item.name}-${index}`} className="break-inside-avoid space-y-1.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[13px] font-black text-[#1e293b]">{item.name}</p>
                      {item.duration ? (
                        <span className="mt-0.5 shrink-0 whitespace-nowrap text-[9px] font-medium text-[#94a3b8]">
                          {item.duration}
                        </span>
                      ) : null}
                    </div>
                    {item.description ? (
                      <p className="text-[11px] leading-[1.7] text-[#64748b]">{item.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {education.length > 0 ? (
            <section className="pb-6">
              <PrintSectionHeading>Education</PrintSectionHeading>
              <div className="space-y-4">
                {education.map((item, index) => (
                  <div key={`${item.school}-${index}`} className="break-inside-avoid flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[13px] font-black text-[#1e293b]">{item.school}</p>
                      <p className="text-[11px] leading-relaxed text-[#64748b]">{item.degree}</p>
                    </div>
                    <span className="mt-0.5 shrink-0 whitespace-nowrap text-[9px] font-medium text-[#94a3b8]">
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
