"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Link2, Globe, ExternalLink, Star, GraduationCap, Briefcase, Award } from "lucide-react";

/* ─── Interfaces ─────────────────────────────────────────────── */
interface JourneyItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}
interface EducationItem { school: string; degree: string; year: string; }
interface AchievementItem { name: string; duration?: string; description: string; link?: string; }
interface SocialLinks { linkedin?: string; portfolio?: string; instagram?: string; youtube?: string; twitter?: string; }
interface ReferenceItem { name: string; role: string; company: string; phone: string; }

interface ResumePreviewProps {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  personalSummary: string;
  aura: { label: string; color: string }[];
  vibe: string[];
  journey: JourneyItem[];
  internships: JourneyItem[];
  achievements: AchievementItem[];
  education: EducationItem[];
  awards: string[];
  certifications: { title: string; link?: string }[];
  languages: { language: string; level: string }[];
  socialLinks: SocialLinks;
  modalities: string[];
  softSkills: string[];
  hobbies: string[];
  availability: string;
  shiftPreference: string[];
  references: ReferenceItem[];
  profileImage?: string;
  highEnergy?: boolean;
  profZen?: boolean;
}

/* ─── Helper Components ──────────────────────────────────────── */
function SectionHeading({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className={cn("text-[9px] font-black uppercase tracking-[0.25em]", accent ? "text-white/70" : "text-[#3730a3]")}>{children}</span>
      <div className={cn("flex-1 h-px", accent ? "bg-white/20" : "bg-indigo-100")} />
    </div>
  );
}

function SideTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2.5 py-1 bg-white/20 text-white text-[8px] font-bold uppercase rounded tracking-wide leading-none">
      {children}
    </span>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export function ResumePreview({
  name,
  title,
  location,
  email,
  phone,
  personalSummary,
  aura,
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
  highEnergy = false,
  profZen = false,
}: ResumePreviewProps) {

  const defaultSummary = "Dedicated hospitality professional with a passion for delivering exceptional guest experiences. Committed to maintaining high professional standards in fast-paced hotel, restaurant, and wellness environments.";

  /* ── format a date string like 2023-06-01 → Jun 2023 ── */
  const fmtDate = (d: string) => {
    if (!d) return "";
    if (d.toLowerCase() === "present") return "Present";
    const parts = d.split("-");
    if (parts.length < 2) return d;
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[parseInt(parts[1]) - 1] ?? ""} ${parts[0]}`;
  };
  const fmtRange = (dur: string) => {
    const [s, e] = dur.split(" - ");
    return `${fmtDate(s)}${e ? ` – ${fmtDate(e)}` : ""}`;
  };

  return (
    /* Outer preview shell */
    <div className={cn(
      "sticky top-[130px] rounded-[2rem] shadow-2xl border border-white/40 overflow-hidden bg-white font-body",
      "max-h-[calc(100vh-160px)] overflow-y-auto",
      "animate-in fade-in slide-in-from-right-8 duration-700"
    )}>

      {/* Preview label */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-slate-900 text-white">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full animate-pulse", highEnergy ? "bg-indigo-400" : "bg-emerald-400")} />
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Live Preview</span>
        </div>
        <span className="text-[8px] text-slate-500 font-medium uppercase tracking-widest">A4 Format</span>
      </div>

      {/* ══════════════ RESUME DOCUMENT ══════════════ */}
      <div className="bg-white">

        {/* ── HEADER BAND ────────────────────────────────── */}
        <div className="bg-[#312e81] px-6 pt-5 pb-4">

          <div className="flex items-center gap-4">
            {/* Name + Title */}
            <div className="flex-1">
              <h1 className="text-xl font-black text-white tracking-tight leading-none">
                {name || "Your Name"}
              </h1>
              <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                {title || "Hospitality Professional"}
              </p>
            </div>

            {/* Profile Photo */}
            <div className="shrink-0">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg font-black">
                    {name ? name.charAt(0).toUpperCase() : "?"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Contact strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-[9px] text-indigo-200 font-medium">
            {email && (
              <span className="flex items-center gap-1.5">
                <Mail className="size-3 shrink-0" />{email}
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="size-3 shrink-0" />{phone}
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3 shrink-0" />{location}
              </span>
            )}
            {socialLinks.linkedin && (
              <span className="flex items-center gap-1.5">
                <Link2 className="size-3 shrink-0" />
                {socialLinks.linkedin.replace("https://", "").replace("linkedin.com/in/", "@")}
              </span>
            )}
          </div>
        </div>

        {/* ── BODY: two-column ───────────────────────────── */}
        <div className="flex min-h-0">

          {/* ┌── LEFT SIDEBAR ──────────────────────────────┐ */}
          <aside className="w-[35%] shrink-0 bg-[#1e1b4b] px-4 py-5 space-y-5">

            {/* Professional Skills */}
            {vibe.length > 0 && (
              <div>
                <SectionHeading accent>Skills</SectionHeading>
                <div className="flex flex-wrap gap-1.5">
                  {vibe.map(s => <SideTag key={s}>{s}</SideTag>)}
                </div>
              </div>
            )}

            {/* Soft Skills */}
            {softSkills.length > 0 && (
              <div>
                <SectionHeading accent>Soft Skills</SectionHeading>
                <div className="flex flex-wrap gap-1.5">
                  {softSkills.map(s => <SideTag key={s}>{s}</SideTag>)}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <SectionHeading accent>Languages</SectionHeading>
                <ul className="space-y-1.5">
                  {languages.map((l, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-white text-[9px] font-bold">{l.language}</span>
                      <span className="text-indigo-300 text-[8px]">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hobbies */}
            {hobbies.length > 0 && (
              <div>
                <SectionHeading accent>Interests</SectionHeading>
                <div className="flex flex-wrap gap-1.5">
                  {hobbies.map(h => <SideTag key={h}>{h}</SideTag>)}
                </div>
              </div>
            )}

            {/* Availability */}
            {(availability || shiftPreference.length > 0) && (
              <div>
                <SectionHeading accent>Availability</SectionHeading>
                <div className="space-y-1">
                  {availability && (
                    <p className="text-indigo-200 text-[9px] font-bold">{availability}</p>
                  )}
                  {shiftPreference.length > 0 && (
                    <p className="text-indigo-300 text-[8px]">{shiftPreference.join(" · ")}</p>
                  )}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <SectionHeading accent>Certifications</SectionHeading>
                <ul className="space-y-1.5">
                  {certifications.map((c, i) => (
                    <li key={i} className="text-indigo-200 text-[8px] leading-snug pl-2 border-l border-indigo-500">
                      {c.link ? (
                        <a href={c.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white">
                          {c.title} <ExternalLink className="size-2.5 opacity-70" />
                        </a>
                      ) : c.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Awards / Recognition */}
            {awards.length > 0 && (
              <div>
                <SectionHeading accent>Recognition</SectionHeading>
                <ul className="space-y-1.5">
                  {awards.map((a, i) => (
                    <li key={i} className="text-indigo-200 text-[8px] leading-snug pl-2 border-l border-yellow-500/60">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* References */}
            {references.length > 0 && (
              <div>
                <SectionHeading accent>References</SectionHeading>
                <div className="space-y-3">
                  {references.map((r, i) => (
                    <div key={i} className="space-y-0.5">
                      <p className="text-white text-[9px] font-black">{r.name}</p>
                      <p className="text-indigo-300 text-[8px]">{r.role}{r.company ? `, ${r.company}` : ""}</p>
                      <p className="text-indigo-400 text-[8px]">{r.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
          {/* └─────────────────────────────────────────────┘ */}

          {/* ┌── MAIN CONTENT ──────────────────────────────┐ */}
          <main className="flex-1 px-5 py-5 space-y-5 bg-white min-w-0">

            {/* Professional Summary */}
            <div>
              <SectionHeading>Professional Summary</SectionHeading>
              <p className="text-[10px] text-slate-600 leading-relaxed">
                {personalSummary || defaultSummary}
              </p>
            </div>

            {/* Work Experience */}
            {journey.length > 0 && (
              <div>
                <SectionHeading>Work Experience</SectionHeading>
                <div className="space-y-4">
                  {journey.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] font-black text-slate-800">{item.role}</p>
                          <p className="text-[9px] text-indigo-600 font-semibold">{item.company}</p>
                        </div>
                        <span className="text-[8px] text-slate-400 font-medium whitespace-nowrap shrink-0 mt-0.5">
                          {fmtRange(item.duration)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[9px] text-slate-500 leading-relaxed mt-1 line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Internships */}
            {internships.length > 0 && (
              <div>
                <SectionHeading>Internship Experience</SectionHeading>
                <div className="space-y-4">
                  {internships.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] font-black text-slate-800">{item.role}</p>
                          <p className="text-[9px] text-purple-600 font-semibold">{item.company}</p>
                        </div>
                        <span className="text-[8px] text-slate-400 font-medium whitespace-nowrap shrink-0 mt-0.5">
                          {fmtRange(item.duration)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-[9px] text-slate-500 leading-relaxed mt-1 line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements & Training */}
            {achievements.length > 0 && (
              <div>
                <SectionHeading>Achievements &amp; Training</SectionHeading>
                <div className="space-y-3">
                  {achievements.map((a, idx) => (
                    <div key={idx}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[10px] font-black text-slate-800">{a.name}</p>
                        {a.duration && (
                          <span className="text-[8px] text-slate-400 font-medium whitespace-nowrap shrink-0 mt-0.5">
                            {a.duration}
                          </span>
                        )}
                      </div>
                      {a.description && (
                        <p className="text-[9px] text-slate-500 leading-relaxed mt-0.5">{a.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <SectionHeading>Education</SectionHeading>
                <div className="space-y-3">
                  {education.map((edu, i) => (
                    <div key={i} className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-black text-slate-800">{edu.school}</p>
                        <p className="text-[9px] text-slate-500">{edu.degree}</p>
                      </div>
                      <span className="text-[8px] text-slate-400 font-medium whitespace-nowrap shrink-0 mt-0.5">
                        {edu.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
          {/* └─────────────────────────────────────────────┘ */}

        </div>{/* end body */}
      </div>{/* end resume doc */}
    </div>
  );
}
