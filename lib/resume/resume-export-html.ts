import type { ResumePrintDocumentProps } from "@/components/resume/ResumePrintDocument";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

function renderTag(value: string) {
  return `<span class="tag">${escapeHtml(value)}</span>`;
}

function renderSidebarSection(title: string, content: string) {
  if (!content.trim()) {
    return "";
  }

  return `
    <section class="sidebar-section">
      <div class="section-heading light">
        <span>${escapeHtml(title)}</span>
        <div class="line"></div>
      </div>
      ${content}
    </section>
  `;
}

function renderMainSection(title: string, content: string) {
  if (!content.trim()) {
    return "";
  }

  return `
    <section class="main-section">
      <div class="section-heading">
        <span>${escapeHtml(title)}</span>
        <div class="line"></div>
      </div>
      ${content}
    </section>
  `;
}

export function buildResumeExportHtml(payload: ResumePrintDocumentProps) {
  const defaultSummary =
    "Dedicated hospitality professional with a passion for delivering exceptional guest experiences. Committed to maintaining high professional standards in fast-paced hotel, restaurant, and wellness environments.";
  const contactLabel = payload.socialLinks.linkedin ? formatSocialHandle(payload.socialLinks.linkedin) : "";

  const skillsSection = renderSidebarSection(
    "Skills",
    payload.vibe.length > 0 ? `<div class="tag-list">${payload.vibe.map(renderTag).join("")}</div>` : ""
  );

  const softSkillsSection = renderSidebarSection(
    "Soft Skills",
    payload.softSkills.length > 0 ? `<div class="tag-list">${payload.softSkills.map(renderTag).join("")}</div>` : ""
  );

  const languagesSection = renderSidebarSection(
    "Languages",
    payload.languages
      .map(
        (item) => `
          <div class="language-row">
            <span class="language-name">${escapeHtml(item.language)}</span>
            <span class="language-level">${escapeHtml(item.level)}</span>
          </div>
        `
      )
      .join("")
  );

  const interestsSection = renderSidebarSection(
    "Interests",
    payload.hobbies.length > 0 ? `<div class="tag-list">${payload.hobbies.map(renderTag).join("")}</div>` : ""
  );

  const availabilitySection = renderSidebarSection(
    "Availability",
    `
      ${payload.availability ? `<p class="availability-primary">${escapeHtml(payload.availability)}</p>` : ""}
      ${
        payload.shiftPreference.length > 0
          ? `<p class="availability-secondary">${escapeHtml(payload.shiftPreference.join(" · "))}</p>`
          : ""
      }
    `
  );

  const certificationsSection = renderSidebarSection(
    "Certifications",
    payload.certifications
      .map(
        (item) => `
          <p class="sidebar-note sidebar-note-indigo">${escapeHtml(item.title)}</p>
        `
      )
      .join("")
  );

  const awardsSection = renderSidebarSection(
    "Recognition",
    payload.awards
      .map(
        (item) => `
          <p class="sidebar-note sidebar-note-amber">${escapeHtml(item)}</p>
        `
      )
      .join("")
  );

  const referencesSection = renderSidebarSection(
    "References",
    payload.references
      .map(
        (item) => `
          <div class="reference-card">
            <p class="reference-name">${escapeHtml(item.name)}</p>
            <p class="reference-role">${escapeHtml(item.role)}${item.company ? `, ${escapeHtml(item.company)}` : ""}</p>
            <p class="reference-phone">${escapeHtml(item.phone)}</p>
          </div>
        `
      )
      .join("")
  );

  const summarySection = renderMainSection(
    "Professional Summary",
    `<p class="summary-text">${escapeHtml(payload.personalSummary || defaultSummary)}</p>`
  );

  const workSection = renderMainSection(
    "Work Experience",
    payload.journey
      .map(
        (item) => `
          <div class="entry-card">
            <div class="entry-head">
              <div>
                <p class="entry-title">${escapeHtml(item.role)}</p>
                <p class="entry-subtitle">${escapeHtml(item.company)}</p>
              </div>
              <span class="entry-date">${escapeHtml(formatDateRange(item.duration))}</span>
            </div>
            ${item.description ? `<p class="entry-description">${escapeHtml(item.description)}</p>` : ""}
          </div>
        `
      )
      .join("")
  );

  const internshipSection = renderMainSection(
    "Internship Experience",
    payload.internships
      .map(
        (item) => `
          <div class="entry-card">
            <div class="entry-head">
              <div>
                <p class="entry-title">${escapeHtml(item.role)}</p>
                <p class="entry-subtitle purple">${escapeHtml(item.company)}</p>
              </div>
              <span class="entry-date">${escapeHtml(formatDateRange(item.duration))}</span>
            </div>
            ${item.description ? `<p class="entry-description">${escapeHtml(item.description)}</p>` : ""}
          </div>
        `
      )
      .join("")
  );

  const achievementsSection = renderMainSection(
    "Achievements & Training",
    payload.achievements
      .map(
        (item) => `
          <div class="entry-card">
            <div class="entry-head">
              <p class="entry-title">${escapeHtml(item.name)}</p>
              ${item.duration ? `<span class="entry-date">${escapeHtml(item.duration)}</span>` : ""}
            </div>
            ${item.description ? `<p class="entry-description">${escapeHtml(item.description)}</p>` : ""}
          </div>
        `
      )
      .join("")
  );

  const educationSection = renderMainSection(
    "Education",
    payload.education
      .map(
        (item) => `
          <div class="entry-card">
            <div class="entry-head">
              <div>
                <p class="entry-title">${escapeHtml(item.school)}</p>
                <p class="entry-description compact">${escapeHtml(item.degree)}</p>
              </div>
              <span class="entry-date">${escapeHtml(item.year)}</span>
            </div>
          </div>
        `
      )
      .join("")
  );

  const profilePhoto = payload.profileImage
    ? `<img src="${escapeHtml(payload.profileImage)}" alt="${escapeHtml(payload.name || "Profile photo")}" class="profile-image" />`
    : `
      <div class="profile-placeholder">
        <span>${escapeHtml(payload.name ? payload.name.charAt(0).toUpperCase() : "?")}</span>
      </div>
    `;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(payload.name || "candidate-resume")}</title>
    <style>
      :root {
        color-scheme: light;
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        background: white;
        font-family: Arial, Helvetica, sans-serif;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      body {
        min-height: 100vh;
      }

      @page {
        size: A4;
        margin: 0;
      }

      .resume-page {
        width: 210mm;
        min-height: 297mm;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        color: #1e293b;
      }

      .resume-header {
        background: #312e81;
        color: #ffffff;
        padding: 28px 28px 24px;
      }

      .resume-header-top {
        display: flex;
        align-items: center;
        gap: 20px;
      }

      .resume-header-copy {
        flex: 1;
      }

      .resume-name {
        margin: 0;
        font-size: 32px;
        font-weight: 900;
        line-height: 1;
        letter-spacing: -0.03em;
      }

      .resume-title {
        margin: 8px 0 0;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: #c7d2fe;
      }

      .profile-image,
      .profile-placeholder {
        width: 80px;
        height: 80px;
        border-radius: 9999px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        object-fit: cover;
        flex-shrink: 0;
      }

      .profile-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        font-size: 24px;
        font-weight: 900;
      }

      .contact-row {
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px 20px;
        font-size: 10px;
        font-weight: 500;
        color: #e0e7ff;
      }

      .resume-body {
        flex: 1;
        display: grid;
        grid-template-columns: 276px minmax(0, 1fr);
        align-items: stretch;
      }

      .resume-sidebar {
        height: 100%;
        background: #1e1b4b;
        color: #ffffff;
        padding: 24px 20px;
      }

      .resume-main {
        height: 100%;
        background: #ffffff;
        padding: 24px;
      }

      .sidebar-section,
      .main-section {
        padding-bottom: 24px;
        break-inside: avoid;
      }

      .section-heading {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .section-heading span {
        font-size: 10px;
        font-weight: 900;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: #3730a3;
      }

      .section-heading.light span {
        color: rgba(255, 255, 255, 0.75);
      }

      .section-heading .line {
        flex: 1;
        height: 1px;
        background: #dbe4ff;
      }

      .section-heading.light .line {
        background: rgba(255, 255, 255, 0.2);
      }

      .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .tag {
        display: inline-block;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.2);
        padding: 6px 12px;
        font-size: 10px;
        font-weight: 700;
        line-height: 1;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #ffffff;
      }

      .language-row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
      }

      .language-name,
      .availability-primary,
      .reference-name {
        font-size: 10px;
        font-weight: 700;
        color: #ffffff;
      }

      .language-level,
      .availability-secondary,
      .reference-role {
        font-size: 9px;
        color: #c7d2fe;
        line-height: 1.65;
      }

      .reference-phone {
        font-size: 9px;
        color: #a5b4fc;
      }

      .sidebar-note {
        margin: 0 0 12px;
        border-left: 1px solid #6366f1;
        padding-left: 12px;
        font-size: 9px;
        line-height: 1.65;
        color: #e0e7ff;
      }

      .sidebar-note-amber {
        border-left-color: #f59e0b;
      }

      .summary-text {
        margin: 0;
        font-size: 12px;
        line-height: 1.75;
        color: #64748b;
      }

      .entry-card {
        break-inside: avoid;
        margin-bottom: 16px;
      }

      .entry-head {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        align-items: flex-start;
      }

      .entry-title {
        margin: 0;
        font-size: 13px;
        font-weight: 900;
        color: #1e293b;
      }

      .entry-subtitle {
        margin: 4px 0 0;
        font-size: 11px;
        font-weight: 600;
        color: #4f46e5;
      }

      .entry-subtitle.purple {
        color: #7c3aed;
      }

      .entry-date {
        margin-top: 2px;
        white-space: nowrap;
        font-size: 9px;
        font-weight: 500;
        color: #94a3b8;
      }

      .entry-description {
        margin: 6px 0 0;
        font-size: 11px;
        line-height: 1.7;
        color: #64748b;
      }

      .entry-description.compact {
        margin-top: 4px;
      }
    </style>
  </head>
  <body>
    <div class="resume-page">
      <div class="resume-header">
        <div class="resume-header-top">
          <div class="resume-header-copy">
            <h1 class="resume-name">${escapeHtml(payload.name || "Your Name")}</h1>
            <p class="resume-title">${escapeHtml(payload.title || "Hospitality Professional")}</p>
          </div>
          ${profilePhoto}
        </div>
        <div class="contact-row">
          ${payload.email ? `<span>${escapeHtml(payload.email)}</span>` : ""}
          ${payload.phone ? `<span>${escapeHtml(payload.phone)}</span>` : ""}
          ${payload.location ? `<span>${escapeHtml(payload.location)}</span>` : ""}
          ${contactLabel ? `<span>${escapeHtml(contactLabel)}</span>` : ""}
        </div>
      </div>

      <div class="resume-body">
        <aside class="resume-sidebar">
          ${skillsSection}
          ${softSkillsSection}
          ${languagesSection}
          ${interestsSection}
          ${availabilitySection}
          ${certificationsSection}
          ${awardsSection}
          ${referencesSection}
        </aside>

        <main class="resume-main">
          ${summarySection}
          ${workSection}
          ${internshipSection}
          ${achievementsSection}
          ${educationSection}
        </main>
      </div>
    </div>
  </body>
</html>`;
}
