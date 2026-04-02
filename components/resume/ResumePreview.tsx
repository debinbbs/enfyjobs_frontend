"use client";

import React, { startTransition, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Link2, ExternalLink } from "lucide-react";

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
type ColumnKey = "sidebar" | "main";

interface ResumeBlock {
  id: string;
  column: ColumnKey;
  sectionId: string;
  sectionTitle: string;
  accent?: boolean;
  wrapperClassName: string;
  content: React.ReactNode;
}

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
    <div className="flex items-center gap-2 pb-3">
      <span className={cn("text-[10px] font-black uppercase tracking-[0.28em]", accent ? "text-white/75" : "text-[#3730a3]")}>{children}</span>
      <div className={cn("flex-1 h-px", accent ? "bg-white/20" : "bg-indigo-100")} />
    </div>
  );
}

function SideTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-md bg-white/20 px-3 py-1.5 text-[10px] font-bold uppercase leading-none tracking-wide text-white">
      {children}
    </span>
  );
}

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;
const SIDEBAR_WIDTH = 276;
const MAIN_WIDTH = PAGE_WIDTH - SIDEBAR_WIDTH;
const SIDEBAR_HORIZONTAL_PADDING = 40;
const MAIN_HORIZONTAL_PADDING = 48;
const COLUMN_VERTICAL_PADDING = 48;
const DEFAULT_HEADER_HEIGHT = 160;
const DEFAULT_SECTION_HEADING_HEIGHT = 34;
const MIN_SCALE = 0.48;

function chunkList<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function arePagesEqual(currentPages: string[][], nextPages: string[][]) {
  if (currentPages.length !== nextPages.length) {
    return false;
  }

  return currentPages.every((page, pageIndex) => {
    const nextPage = nextPages[pageIndex];
    return page.length === nextPage.length && page.every((item, itemIndex) => item === nextPage[itemIndex]);
  });
}

function paginateBlocks(
  blocks: ResumeBlock[],
  blockHeights: Map<string, number>,
  contentHeight: number,
  headingHeights: { default: number; accent: number },
) {
  if (blocks.length === 0) {
    return [[]];
  }

  const pages: string[][] = [[]];
  let currentPageIndex = 0;
  let usedHeight = 0;
  let sectionIdsOnPage = new Set<string>();

  blocks.forEach((block) => {
    const blockHeight = blockHeights.get(block.id) ?? 0;
    const headingHeight = sectionIdsOnPage.has(block.sectionId)
      ? 0
      : block.accent
        ? headingHeights.accent
        : headingHeights.default;
    const requiredHeight = headingHeight + blockHeight;

    if (pages[currentPageIndex].length > 0 && usedHeight + requiredHeight > contentHeight) {
      pages.push([]);
      currentPageIndex += 1;
      usedHeight = 0;
      sectionIdsOnPage = new Set<string>();
    }

    if (!sectionIdsOnPage.has(block.sectionId)) {
      usedHeight += headingHeight;
      sectionIdsOnPage.add(block.sectionId);
    }

    pages[currentPageIndex].push(block.id);
    usedHeight += blockHeight;
  });

  return pages;
}

function formatSocialHandle(link: string) {
  return link
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace("linkedin.com/in/", "@")
    .replace(/\/$/, "");
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
  return `${formatMonthYear(start)}${end ? ` – ${formatMonthYear(end)}` : ""}`;
}

/* ─── Main Component ─────────────────────────────────────────── */
export function ResumePreview({
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
  highEnergy = false,
  profZen = false,
}: ResumePreviewProps) {
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const headerMeasureRef = useRef<HTMLDivElement | null>(null);
  const defaultHeadingMeasureRef = useRef<HTMLDivElement | null>(null);
  const accentHeadingMeasureRef = useRef<HTMLDivElement | null>(null);
  const measureRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const defaultSummary = "Dedicated hospitality professional with a passion for delivering exceptional guest experiences. Committed to maintaining high professional standards in fast-paced hotel, restaurant, and wellness environments.";
  const [scale, setScale] = useState(1);
  const [sidebarPages, setSidebarPages] = useState<string[][]>([[]]);
  const [mainPages, setMainPages] = useState<string[][]>([[]]);

  const contactLabel = socialLinks.linkedin ? formatSocialHandle(socialLinks.linkedin) : "";

  const sidebarBlocks = useMemo(() => {
    const blocks: ResumeBlock[] = [];

    const addTagSection = (
      sectionId: string,
      sectionTitle: string,
      items: string[],
      chunkSize = 4,
    ) => {
      const chunks = chunkList(items.filter(Boolean), chunkSize);

      chunks.forEach((chunk, chunkIndex) => {
        blocks.push({
          id: `${sectionId}-${chunkIndex}`,
          column: "sidebar",
          sectionId,
          sectionTitle,
          accent: true,
          wrapperClassName: chunkIndex === chunks.length - 1 ? "pb-6" : "pb-3",
          content: (
            <div className="flex flex-wrap gap-2">
              {chunk.map((item) => (
                <SideTag key={`${sectionId}-${item}`}>{item}</SideTag>
              ))}
            </div>
          ),
        });
      });
    };

    if (vibe.length > 0) {
      addTagSection("skills", "Skills", vibe, 4);
    }

    if (softSkills.length > 0) {
      addTagSection("soft-skills", "Soft Skills", softSkills, 4);
    }

    if (languages.length > 0) {
      languages.forEach((language, index) => {
        blocks.push({
          id: `languages-${index}`,
          column: "sidebar",
          sectionId: "languages",
          sectionTitle: "Languages",
          accent: true,
          wrapperClassName: index === languages.length - 1 ? "pb-6" : "pb-3",
          content: (
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold text-white">{language.language}</span>
              <span className="text-[9px] text-indigo-300">{language.level}</span>
            </div>
          ),
        });
      });
    }

    if (hobbies.length > 0) {
      addTagSection("interests", "Interests", hobbies, 3);
    }

    if (availability || shiftPreference.length > 0) {
      blocks.push({
        id: "availability",
        column: "sidebar",
        sectionId: "availability",
        sectionTitle: "Availability",
        accent: true,
        wrapperClassName: "pb-6",
        content: (
          <div className="space-y-1.5">
            {availability ? <p className="text-[10px] font-bold text-indigo-200">{availability}</p> : null}
            {shiftPreference.length > 0 ? (
              <p className="text-[9px] leading-relaxed text-indigo-300">{shiftPreference.join(" · ")}</p>
            ) : null}
          </div>
        ),
      });
    }

    if (certifications.length > 0) {
      certifications.forEach((certification, index) => {
        blocks.push({
          id: `certifications-${index}`,
          column: "sidebar",
          sectionId: "certifications",
          sectionTitle: "Certifications",
          accent: true,
          wrapperClassName: index === certifications.length - 1 ? "pb-6" : "pb-3",
          content: (
            <div className="border-l border-indigo-500 pl-3 text-[9px] leading-[1.65] text-indigo-200">
              {certification.link ? (
                <a
                  href={certification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition hover:text-white"
                >
                  <span>{certification.title}</span>
                  <ExternalLink className="size-3 opacity-70" />
                </a>
              ) : (
                certification.title
              )}
            </div>
          ),
        });
      });
    }

    if (awards.length > 0) {
      awards.forEach((award, index) => {
        blocks.push({
          id: `awards-${index}`,
          column: "sidebar",
          sectionId: "recognition",
          sectionTitle: "Recognition",
          accent: true,
          wrapperClassName: index === awards.length - 1 ? "pb-6" : "pb-3",
          content: (
            <p className="border-l border-yellow-500/60 pl-3 text-[9px] leading-[1.65] text-indigo-200">
              {award}
            </p>
          ),
        });
      });
    }

    if (references.length > 0) {
      references.forEach((reference, index) => {
        blocks.push({
          id: `references-${index}`,
          column: "sidebar",
          sectionId: "references",
          sectionTitle: "References",
          accent: true,
          wrapperClassName: index === references.length - 1 ? "pb-6" : "pb-3",
          content: (
            <div className="space-y-1">
              <p className="text-[10px] font-black text-white">{reference.name}</p>
              <p className="text-[9px] leading-relaxed text-indigo-300">
                {reference.role}
                {reference.company ? `, ${reference.company}` : ""}
              </p>
              <p className="text-[9px] text-indigo-400">{reference.phone}</p>
            </div>
          ),
        });
      });
    }

    return blocks;
  }, [availability, awards, certifications, hobbies, languages, references, shiftPreference, softSkills, vibe]);

  const mainBlocks = useMemo(() => {
    const blocks: ResumeBlock[] = [
      {
        id: "summary",
        column: "main",
        sectionId: "summary",
        sectionTitle: "Professional Summary",
        wrapperClassName: "pb-6",
        content: (
          <p className="text-[12px] leading-[1.75] text-slate-600">
            {personalSummary || defaultSummary}
          </p>
        ),
      },
    ];

    if (journey.length > 0) {
      journey.forEach((item, index) => {
        blocks.push({
          id: `journey-${index}`,
          column: "main",
          sectionId: "journey",
          sectionTitle: "Work Experience",
          wrapperClassName: index === journey.length - 1 ? "pb-6" : "pb-4",
          content: (
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-black text-slate-800">{item.role}</p>
                  <p className="text-[11px] font-semibold text-indigo-600">{item.company}</p>
                </div>
                <span className="mt-0.5 shrink-0 whitespace-nowrap text-[9px] font-medium text-slate-400">
                  {formatDateRange(item.duration)}
                </span>
              </div>
              {item.description ? (
                <p className="text-[11px] leading-[1.7] text-slate-500">
                  {item.description}
                </p>
              ) : null}
            </div>
          ),
        });
      });
    }

    if (internships.length > 0) {
      internships.forEach((item, index) => {
        blocks.push({
          id: `internships-${index}`,
          column: "main",
          sectionId: "internships",
          sectionTitle: "Internship Experience",
          wrapperClassName: index === internships.length - 1 ? "pb-6" : "pb-4",
          content: (
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-black text-slate-800">{item.role}</p>
                  <p className="text-[11px] font-semibold text-purple-600">{item.company}</p>
                </div>
                <span className="mt-0.5 shrink-0 whitespace-nowrap text-[9px] font-medium text-slate-400">
                  {formatDateRange(item.duration)}
                </span>
              </div>
              {item.description ? (
                <p className="text-[11px] leading-[1.7] text-slate-500">
                  {item.description}
                </p>
              ) : null}
            </div>
          ),
        });
      });
    }

    if (achievements.length > 0) {
      achievements.forEach((achievement, index) => {
        blocks.push({
          id: `achievements-${index}`,
          column: "main",
          sectionId: "achievements",
          sectionTitle: "Achievements & Training",
          wrapperClassName: index === achievements.length - 1 ? "pb-6" : "pb-4",
          content: (
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-black text-slate-800">{achievement.name}</p>
                {achievement.duration ? (
                  <span className="mt-0.5 shrink-0 whitespace-nowrap text-[9px] font-medium text-slate-400">
                    {achievement.duration}
                  </span>
                ) : null}
              </div>
              {achievement.description ? (
                <p className="text-[11px] leading-[1.7] text-slate-500">{achievement.description}</p>
              ) : null}
            </div>
          ),
        });
      });
    }

    if (education.length > 0) {
      education.forEach((item, index) => {
        blocks.push({
          id: `education-${index}`,
          column: "main",
          sectionId: "education",
          sectionTitle: "Education",
          wrapperClassName: index === education.length - 1 ? "pb-6" : "pb-4",
          content: (
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[13px] font-black text-slate-800">{item.school}</p>
                <p className="text-[11px] leading-relaxed text-slate-500">{item.degree}</p>
              </div>
              <span className="mt-0.5 shrink-0 whitespace-nowrap text-[9px] font-medium text-slate-400">
                {item.year}
              </span>
            </div>
          ),
        });
      });
    }

    return blocks;
  }, [achievements, defaultSummary, education, internships, journey, personalSummary]);

  const blockMap = useMemo(() => {
    return new Map([...sidebarBlocks, ...mainBlocks].map((block) => [block.id, block]));
  }, [mainBlocks, sidebarBlocks]);

  useLayoutEffect(() => {
    if (!previewContainerRef.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const updateScale = () => {
      const containerWidth = previewContainerRef.current?.clientWidth ?? PAGE_WIDTH;
      const nextScale = Math.min(1, Math.max(MIN_SCALE, (containerWidth - 32) / PAGE_WIDTH));

      setScale((currentScale) => (Math.abs(currentScale - nextScale) < 0.01 ? currentScale : nextScale));
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(previewContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    const allBlocks = [...sidebarBlocks, ...mainBlocks];
    const blockHeights = new Map<string, number>();

    allBlocks.forEach((block) => {
      const measuredHeight = measureRefs.current[block.id]?.offsetHeight ?? 0;
      blockHeights.set(block.id, measuredHeight);
    });

    const headerHeight = headerMeasureRef.current?.offsetHeight ?? DEFAULT_HEADER_HEIGHT;
    const headingHeights = {
      default: defaultHeadingMeasureRef.current?.offsetHeight ?? DEFAULT_SECTION_HEADING_HEIGHT,
      accent: accentHeadingMeasureRef.current?.offsetHeight ?? DEFAULT_SECTION_HEADING_HEIGHT,
    };

    const sidebarContentHeight = PAGE_HEIGHT - headerHeight - COLUMN_VERTICAL_PADDING;
    const mainContentHeight = PAGE_HEIGHT - headerHeight - COLUMN_VERTICAL_PADDING;

    const nextSidebarPages = paginateBlocks(sidebarBlocks, blockHeights, sidebarContentHeight, headingHeights);
    const nextMainPages = paginateBlocks(mainBlocks, blockHeights, mainContentHeight, headingHeights);

    startTransition(() => {
      setSidebarPages((currentPages) => (arePagesEqual(currentPages, nextSidebarPages) ? currentPages : nextSidebarPages));
      setMainPages((currentPages) => (arePagesEqual(currentPages, nextMainPages) ? currentPages : nextMainPages));
    });
  }, [mainBlocks, sidebarBlocks]);

  const pageCount = Math.max(sidebarPages.length, mainPages.length, 1);

  const renderHeader = () => (
    <div
      className={cn(
        "bg-[#312e81] px-7 pb-6 pt-7",
        profZen && !highEnergy ? "bg-[linear-gradient(135deg,#312e81_0%,#334155_100%)]" : undefined,
      )}
    >
      <div className="flex items-center gap-5">
        <div className="flex-1">
          <h1 className="text-[32px] font-black leading-none tracking-tight text-white">
            {name || "Your Name"}
          </h1>
          <p className="mt-2 text-[12px] font-black uppercase tracking-[0.24em] text-indigo-200">
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

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium text-indigo-100">
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
  );

  const renderColumnBlocks = (pageBlockIds: string[]) => {
    let previousSectionId = "";

    return pageBlockIds.map((blockId) => {
      const block = blockMap.get(blockId);

      if (!block) {
        return null;
      }

      const showHeading = block.sectionId !== previousSectionId;
      previousSectionId = block.sectionId;

      return (
        <React.Fragment key={block.id}>
          {showHeading ? <SectionHeading accent={block.accent}>{block.sectionTitle}</SectionHeading> : null}
          <div className={block.wrapperClassName}>{block.content}</div>
        </React.Fragment>
      );
    });
  };

  return (
    <div
      ref={previewContainerRef}
      className={cn(
        "sticky top-[130px] overflow-hidden rounded-[2rem] border border-white/40 bg-white font-body shadow-2xl",
        "animate-in fade-in slide-in-from-right-8 duration-700",
      )}
    >
      <div className="flex items-center justify-between bg-slate-900 px-5 py-2.5 text-white">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2 rounded-full animate-pulse",
              highEnergy ? "bg-indigo-400" : profZen ? "bg-sky-400" : "bg-emerald-400",
            )}
          />
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Live Preview</span>
        </div>
        <span className="text-[8px] font-medium uppercase tracking-widest text-slate-500">
          A4 Format - {pageCount} Page{pageCount > 1 ? "s" : ""}
        </span>
      </div>

      <div className="bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.08),_transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-5">
        <div className="flex flex-col items-center gap-6" data-resume-pages-root>
          {Array.from({ length: pageCount }, (_, pageIndex) => {
            const sidebarPageIds = sidebarPages[pageIndex] ?? [];
            const mainPageIds = mainPages[pageIndex] ?? [];

            return (
              <div
                key={`resume-page-${pageIndex}`}
                className="relative"
                data-resume-page-frame
                data-page-width={PAGE_WIDTH}
                data-page-height={PAGE_HEIGHT}
                style={{ height: PAGE_HEIGHT * scale, width: PAGE_WIDTH * scale }}
              >
                <div
                  className="origin-top-left flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-[0_22px_60px_rgba(49,46,129,0.18)]"
                  data-resume-page-surface
                  data-page-width={PAGE_WIDTH}
                  data-page-height={PAGE_HEIGHT}
                  style={{ height: PAGE_HEIGHT, width: PAGE_WIDTH, transform: `scale(${scale})` }}
                >
                  {renderHeader()}

                  <div className="grid flex-1 grid-cols-[276px_minmax(0,1fr)]">
                    <aside className="overflow-hidden bg-[#1e1b4b] px-5 py-6">
                      {renderColumnBlocks(sidebarPageIds)}
                    </aside>
                    <main className="min-w-0 overflow-hidden bg-white px-6 py-6">
                      {renderColumnBlocks(mainPageIds)}
                    </main>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute left-[-10000px] top-0 opacity-0" aria-hidden>
        <div ref={headerMeasureRef} style={{ width: PAGE_WIDTH }}>
          {renderHeader()}
        </div>

        <div className="flex gap-10 pt-6" style={{ width: PAGE_WIDTH }}>
          <div style={{ width: SIDEBAR_WIDTH - SIDEBAR_HORIZONTAL_PADDING }}>
            <div ref={accentHeadingMeasureRef}>
              <SectionHeading accent>Skills</SectionHeading>
            </div>
            {sidebarBlocks.map((block) => (
              <div
                key={`measure-${block.id}`}
                ref={(node) => {
                  measureRefs.current[block.id] = node;
                }}
                className={block.wrapperClassName}
              >
                {block.content}
              </div>
            ))}
          </div>

          <div style={{ width: MAIN_WIDTH - MAIN_HORIZONTAL_PADDING }}>
            <div ref={defaultHeadingMeasureRef}>
              <SectionHeading>Professional Summary</SectionHeading>
            </div>
            {mainBlocks.map((block) => (
              <div
                key={`measure-${block.id}`}
                ref={(node) => {
                  measureRefs.current[block.id] = node;
                }}
                className={block.wrapperClassName}
              >
                {block.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
