"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Bot,
  Download,
  Mic,
  MicOff,
  RotateCcw,
  Save,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopSpace } from "@/components/utils/TopSpace";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { useResumeBuilderWorkspace } from "@/components/resume/useResumeBuilderWorkspace";
import type { CandidateResumeDraft } from "@/lib/resume/candidate-resume";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
).replace(/\/$/, "");

type AssistantMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

type ResumeFieldUpdates = Partial<{
  fullName: string;
  email: string;
  phone: string;
  preferredRole: string;
  location: string;
  personalSummary: string;
  availability: string;
  experienceLevel: string;
  discipline: string;
  skills: string[];
  softSkills: string[];
  hobbies: string[];
  shiftPreference: string[];
  socialLinks: Partial<{
    linkedin: string;
    portfolio: string;
    instagram: string;
    youtube: string;
    twitter: string;
  }>;
}>;

type GuidedSuggestionsResponse = {
  suggestions?: string[];
};

type LiveResumeCommand =
  | {
      field: "fullName" | "preferredRole" | "location";
      value: string;
      response: string;
    }
  | null;

type AssistantFlow =
  | "idle"
  | "basics_name"
  | "basics_role"
  | "basics_location"
  | "summary"
  | "experience_company"
  | "experience_role"
  | "experience_duration"
  | "experience_description"
  | "skills";

type SpeechRecognitionConstructor = new () => SpeechRecognition;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start(): void;
    stop(): void;
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionErrorEvent {
    error: string;
  }
}

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

type AiResumeBuilderProps = {
  heading: string;
  description: string;
  backHref: string;
  backLabel: string;
};

const INITIAL_ASSISTANT_MESSAGES: AssistantMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Choose a prompt below or tell me what you want to build. I can help capture basics, improve your summary, add work experience, and update skills while your resume preview changes live.",
  },
];

const ROLE_SUGGESTIONS_BY_TRACK: Record<string, string[]> = {
  yoga: ["Yoga Instructor", "Meditation Coach", "Wellness Coach", "Pilates Instructor"],
  fitness: ["Fitness Trainer", "Personal Trainer", "Gym Coach", "Studio Trainer"],
  nutrition: ["Nutritionist", "Clinical Nutritionist", "Dietitian", "Wellness Coach"],
  mental: ["Counselor", "Therapist", "Mental Health Coach", "Psychology Associate"],
  beauty: ["Makeup Artist", "Beautician", "Skin Therapist", "Beauty Advisor"],
  salon: ["Hair Stylist", "Colorist", "Salon Manager", "Salon Coordinator"],
  default: [
    "Wellness Coach",
    "Yoga Instructor",
    "Nutritionist",
    "Therapist",
    "Makeup Artist",
    "Hair Stylist",
  ],
};

const SKILL_SUGGESTIONS_BY_TRACK: Record<string, string[]> = {
  yoga: [
    "Yoga Sequencing",
    "Breathwork",
    "Meditation Guidance",
    "Client Coaching",
    "Posture Alignment",
    "Class Planning",
  ],
  fitness: [
    "Strength Training",
    "Client Assessment",
    "Workout Planning",
    "Mobility Coaching",
    "Group Training",
    "Progress Tracking",
  ],
  nutrition: [
    "Meal Planning",
    "Client Counseling",
    "Nutrition Assessment",
    "Lifestyle Coaching",
    "Diet Planning",
    "Progress Monitoring",
  ],
  mental: [
    "Active Listening",
    "Client Support",
    "Case Notes",
    "Empathy",
    "Counseling Support",
    "Communication",
  ],
  beauty: [
    "Makeup Application",
    "Skin Analysis",
    "Client Consultation",
    "Bridal Makeup",
    "Product Knowledge",
    "Beauty Hygiene",
  ],
  salon: [
    "Hair Cutting",
    "Hair Coloring",
    "Client Consultation",
    "Salon Operations",
    "Appointment Handling",
    "Retail Upselling",
  ],
  default: [
    "Communication",
    "Client Service",
    "Teamwork",
    "Problem Solving",
    "Attention to Detail",
    "Time Management",
  ],
};

function uniqueSuggestions(values: Array<string | undefined | null>) {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value))
    )
  );
}

function getResumeSuggestionTrack(resume: CandidateResumeDraft) {
  const explicitDiscipline = resume.discipline.trim().toLowerCase();
  if (explicitDiscipline) {
    return explicitDiscipline;
  }

  const contextText = [resume.preferredRole, ...resume.skills].join(" ").toLowerCase();

  if (/(makeup|beauty|beautician|skin|facial)/.test(contextText)) {
    return "beauty";
  }

  if (/(hair|salon|stylist|colorist|barber)/.test(contextText)) {
    return "salon";
  }

  return "default";
}

function getFallbackGuidedSuggestions(params: {
  flow: AssistantFlow;
  resume: CandidateResumeDraft;
  pendingExperience: { company: string; role: string; duration: string };
}) {
  const { flow, resume, pendingExperience } = params;
  const suggestionTrack = getResumeSuggestionTrack(resume);
  const roleSuggestions =
    ROLE_SUGGESTIONS_BY_TRACK[suggestionTrack] ?? ROLE_SUGGESTIONS_BY_TRACK.default;
  const skillSuggestions =
    SKILL_SUGGESTIONS_BY_TRACK[suggestionTrack] ?? SKILL_SUGGESTIONS_BY_TRACK.default;
  const latestJourneyItem = resume.journey[resume.journey.length - 1];
  const lowerCasedPreferredRole = resume.preferredRole.trim().toLowerCase();
  const summaryRole =
    resume.preferredRole.trim() || roleSuggestions[0] || "wellness professional";
  const summarySkills = resume.skills.slice(0, 3).join(", ");

  if (flow === "basics_name") {
    return uniqueSuggestions([resume.fullName]);
  }

  if (flow === "basics_role") {
    return uniqueSuggestions([resume.preferredRole, ...roleSuggestions]).slice(0, 6);
  }

  if (flow === "basics_location") {
    return uniqueSuggestions([resume.location]).slice(0, 3);
  }

  if (flow === "summary") {
    return uniqueSuggestions([
      `Motivated ${summaryRole.toLowerCase()} with a strong focus on client care, consistency, and growth.`,
      `Dedicated ${summaryRole.toLowerCase()} with strengths in ${summarySkills || "communication, teamwork, and service excellence"}.`,
      `Customer-focused ${summaryRole.toLowerCase()} ready to contribute in a fast-paced team environment.`,
    ]).slice(0, 3);
  }

  if (flow === "experience_role") {
    return uniqueSuggestions([
      pendingExperience.role,
      resume.preferredRole,
      latestJourneyItem?.role,
      resume.preferredRole ? `Senior ${resume.preferredRole}` : "",
      resume.preferredRole ? `Assistant ${resume.preferredRole}` : "",
      ...roleSuggestions,
    ]).slice(0, 6);
  }

  if (flow === "experience_duration") {
    return uniqueSuggestions([
      pendingExperience.duration,
      latestJourneyItem?.duration,
      "Mar 2024 - Present",
      "Jan 2023 - Feb 2024",
      "6 months",
      "1 year",
    ]).slice(0, 5);
  }

  if (flow === "experience_description") {
    return uniqueSuggestions([
      "Handled client sessions, daily operations, and service delivery with consistency and care.",
      `Supported ${pendingExperience.company || "the team"} as a ${pendingExperience.role || lowerCasedPreferredRole || "professional"} while maintaining quality service and smooth coordination.`,
      "skip",
    ]).slice(0, 3);
  }

  if (flow === "skills") {
    return uniqueSuggestions([
      resume.skills.slice(0, 3).join(", "),
      skillSuggestions.slice(0, 3).join(", "),
      skillSuggestions.slice(3, 6).join(", "),
      "Communication, Teamwork, Client Service",
    ]).slice(0, 4);
  }

  return [];
}

export function AiResumeBuilder({
  heading,
  description,
  backHref,
  backLabel,
}: AiResumeBuilderProps) {
  const LIVE_MODE_READY_MESSAGE = "Live chat is ready. Ask me anything about your resume.";
  const GUIDED_MODE_READY_MESSAGE =
    "Guided mode is ready. Pick one of the options in the chat to continue.";
  const GUIDED_MODE_FALLBACK_MESSAGE =
    "Pick one of the guided options in the chat and I will update the resume step by step.";

  const {
    session,
    resume,
    isLoadingResume,
    isSavingResume,
    isDownloadingResume,
    downloadFeedback,
    downloadFeedbackTone,
    statusMessage,
    errorMessage,
    savedAtLabel,
    aura,
    setField,
    handleSave,
    handleReset,
    handleDownloadResume,
  } = useResumeBuilderWorkspace();

  const [messages, setMessages] = useState<AssistantMessage[]>(INITIAL_ASSISTANT_MESSAGES);
  const [input, setInput] = useState("");
  const [flow, setFlow] = useState<AssistantFlow>("idle");
  const [chatMode, setChatMode] = useState<"live" | "guided">("live");
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [isGuidedChoicePending, setIsGuidedChoicePending] = useState(false);
  const [guidedSuggestions, setGuidedSuggestions] = useState<string[]>([]);
  const [assistantStatus, setAssistantStatus] = useState("");
  const [pendingExperience, setPendingExperience] = useState<{
    company: string;
    role: string;
    duration: string;
  }>({
    company: "",
    role: "",
    duration: "",
  });
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const guidedSuggestionsCacheRef = useRef(new Map<string, string[]>());

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const messageList = messageListRef.current;
      if (!messageList) {
        return;
      }

      messageList.scrollTo({
        top: messageList.scrollHeight,
        behavior: "smooth",
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [messages, assistantStatus]);

  const recognitionSupported = typeof window !== "undefined"
    ? Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
    : false;

  const speakAssistant = (text: string) => {
    if (!voiceMode || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  const addAssistantMessage = (content: string) => {
    let wasAdded = false;

    setMessages((current) => {
      const lastMessage = current[current.length - 1];
      const isDuplicateAssistantMessage =
        lastMessage?.role === "assistant" && lastMessage.content === content;

      if (isDuplicateAssistantMessage) {
        return current;
      }

      wasAdded = true;

      return [
        ...current,
        { id: `assistant-${Date.now()}-${current.length}`, role: "assistant", content },
      ];
    });

    if (wasAdded) {
      speakAssistant(content);
    }
  };

  const addUserMessage = (content: string) => {
    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}-${current.length}`, role: "user", content },
    ]);
  };

  const cleanCommandValue = (value: string) =>
    value
      .trim()
      .replace(/^[=:,\-\s]+/, "")
      .replace(/[.,;:\s]+$/, "")
      .replace(/\s{2,}/g, " ");

  const parseResumeFieldUpdates = (message: string): ResumeFieldUpdates => {
    const updates: ResumeFieldUpdates = {};

    const extractValue = (patterns: RegExp[]) => {
      for (const pattern of patterns) {
        const match = message.match(pattern);
        const nextValue = match?.[1] ? cleanCommandValue(match[1]) : "";
        if (nextValue) {
          return nextValue;
        }
      }

      return "";
    };

    const nameValue = extractValue([
      /(?:^|[,\n]|and\s+)(?:full\s+name|name)\s*(?:is|to|as|=)?\s*(.+?)(?=(?:\s*,\s*|\s+and\s+)(?:location|city|designation|role|title|headline)\b|$)/i,
    ]);

    const locationValue = extractValue([
      /(?:^|[,\n]|and\s+)(?:location|city)\s*(?:is|to|as|=)?\s*(.+?)(?=(?:\s*,\s*|\s+and\s+)(?:name|full\s+name|designation|role|title|headline)\b|$)/i,
    ]);

    const roleValue = extractValue([
      /(?:^|[,\n]|and\s+)(?:designation|role|title|headline)\s*(?:is|to|as|=)?\s*(.+?)(?=(?:\s*,\s*|\s+and\s+)(?:name|full\s+name|location|city)\b|$)/i,
    ]);

    if (nameValue) {
      updates.fullName = nameValue;
    }

    if (locationValue) {
      updates.location = locationValue;
    }

    if (roleValue) {
      updates.preferredRole = roleValue;
    }

    return updates;
  };

  const parseLiveResumeCommand = (message: string): LiveResumeCommand => {
    const trimmedMessage = message.trim();
    const normalizedMessage = trimmedMessage.toLowerCase();

    const commandPatterns: Array<{
      field: "fullName" | "preferredRole" | "location";
      patterns: RegExp[];
      response: (value: string) => string;
    }> = [
      {
        field: "fullName",
        patterns: [
          /^(?:change|update|set)\s+(?:my\s+)?(?:full\s+)?name\s+to\s+(.+)$/i,
          /^(?:my\s+name\s+is|set\s+name\s+as)\s+(.+)$/i,
        ],
        response: (value) => `Done. I updated your name to ${value}.`,
      },
      {
        field: "preferredRole",
        patterns: [
          /^(?:change|update|set)\s+(?:my\s+)?(?:role|designation|title|headline)\s+to\s+(.+)$/i,
        ],
        response: (value) => `Done. I updated your role to ${value}.`,
      },
      {
        field: "location",
        patterns: [
          /^(?:change|update|set)\s+(?:my\s+)?location\s+to\s+(.+)$/i,
          /^(?:change|update|set)\s+(?:my\s+)?city\s+to\s+(.+)$/i,
        ],
        response: (value) => `Done. I updated your location to ${value}.`,
      },
    ];

    for (const command of commandPatterns) {
      for (const pattern of command.patterns) {
        const match = trimmedMessage.match(pattern);
        const nextValue = match?.[1]?.trim();
        if (!nextValue) {
          continue;
        }

        return {
          field: command.field,
          value: nextValue,
          response: command.response(nextValue),
        };
      }
    }

    if (normalizedMessage === "clear name" || normalizedMessage === "remove name") {
      return {
        field: "fullName",
        value: "",
        response: "Done. I cleared the name from the resume.",
      };
    }

    return null;
  };

  const applyResumeFieldUpdates = (updates: ResumeFieldUpdates) => {
    const changedFields: string[] = [];

    if (typeof updates.fullName === "string") {
      setField("fullName", updates.fullName);
      changedFields.push(
        updates.fullName ? `name to ${updates.fullName}` : "cleared the name"
      );
    }

    if (typeof updates.email === "string") {
      setField("email", updates.email);
      changedFields.push(updates.email ? `email to ${updates.email}` : "cleared the email");
    }

    if (typeof updates.phone === "string") {
      setField("phone", updates.phone);
      changedFields.push(updates.phone ? `phone to ${updates.phone}` : "cleared the phone");
    }

    if (typeof updates.location === "string") {
      setField("location", updates.location);
      changedFields.push(
        updates.location ? `location to ${updates.location}` : "cleared the location"
      );
    }

    if (typeof updates.preferredRole === "string") {
      setField("preferredRole", updates.preferredRole);
      changedFields.push(
        updates.preferredRole
          ? `designation to ${updates.preferredRole}`
          : "cleared the designation"
      );
    }

    if (typeof updates.personalSummary === "string") {
      setField("personalSummary", updates.personalSummary);
      changedFields.push("the professional summary");
    }

    if (typeof updates.availability === "string") {
      setField("availability", updates.availability);
      changedFields.push(
        updates.availability
          ? `availability to ${updates.availability}`
          : "cleared the availability"
      );
    }

    if (typeof updates.experienceLevel === "string") {
      setField("experienceLevel", updates.experienceLevel);
      changedFields.push(`experience level to ${updates.experienceLevel}`);
    }

    if (typeof updates.discipline === "string") {
      setField("discipline", updates.discipline);
      changedFields.push(`discipline to ${updates.discipline}`);
    }

    if (Array.isArray(updates.skills)) {
      setField("skills", updates.skills);
      changedFields.push("skills");
    }

    if (Array.isArray(updates.softSkills)) {
      setField("softSkills", updates.softSkills);
      changedFields.push("soft skills");
    }

    if (Array.isArray(updates.hobbies)) {
      setField("hobbies", updates.hobbies);
      changedFields.push("hobbies");
    }

    if (Array.isArray(updates.shiftPreference)) {
      setField("shiftPreference", updates.shiftPreference);
      changedFields.push("shift preference");
    }

    if (updates.socialLinks && Object.values(updates.socialLinks).some(Boolean)) {
      setField("socialLinks", {
        ...resume?.socialLinks,
        ...updates.socialLinks,
      });
      changedFields.push("social links");
    }

    if (changedFields.length === 0) {
      return false;
    }

    return true;
  };

  const runAiRewrite = async ({
    bio,
    mode,
  }: {
    bio: string;
    mode: "summary" | "work_experience" | "internship";
  }) => {
    const response = await fetch(`${API_BASE_URL}/ai/generate-summary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio, mode }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(getApiErrorMessage(payload, "AI generation failed. Please try again."));
    }

    const generatedText =
      typeof (payload as { summary?: unknown })?.summary === "string"
        ? (payload as { summary: string }).summary.trim()
        : "";

    if (!generatedText) {
      throw new Error("AI returned an empty response. Please try again.");
    }

    return generatedText;
  };

  const runLiveChat = async (message: string) => {
    if (!resume) {
      return "";
    }

    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        resumeContext: {
          fullName: resume.fullName,
          preferredRole: resume.preferredRole,
          location: resume.location,
          personalSummary: resume.personalSummary,
          skills: resume.skills,
          softSkills: resume.softSkills,
          journey: resume.journey,
          internships: resume.internships,
          achievements: resume.achievements,
          education: resume.education,
          certifications: resume.certifications,
        },
      }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(getApiErrorMessage(payload, "AI chat failed. Please try again."));
    }

    const reply =
      typeof (payload as { reply?: unknown })?.reply === "string"
        ? (payload as { reply: string }).reply.trim()
        : "";

    if (!reply) {
      throw new Error("AI did not return a response. Please try again.");
    }

    return reply;
  };

  const fetchGuidedSuggestions = async ({
    flow,
    resume,
    pendingExperience,
  }: {
    flow: AssistantFlow;
    resume: CandidateResumeDraft;
    pendingExperience: { company: string; role: string; duration: string };
  }) => {
    const response = await fetch(`${API_BASE_URL}/ai/guided-suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flow,
        resumeContext: {
          discipline: resume.discipline,
          fullName: resume.fullName,
          location: resume.location,
          experienceLevel: resume.experienceLevel,
          preferredRole: resume.preferredRole,
          personalSummary: resume.personalSummary,
          skills: resume.skills,
          softSkills: resume.softSkills,
          hobbies: resume.hobbies,
          journey: resume.journey,
          education: resume.education,
          certifications: resume.certifications,
        },
        pendingExperience,
      }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        getApiErrorMessage(payload, "AI could not generate guided suggestions.")
      );
    }

    const suggestions = Array.isArray((payload as GuidedSuggestionsResponse | null)?.suggestions)
      ? ((payload as GuidedSuggestionsResponse).suggestions ?? []).filter(
          (entry): entry is string => typeof entry === "string" && entry.trim().length > 0
        )
      : [];

    return uniqueSuggestions(suggestions).slice(0, 6);
  };

  const extractLiveResumeUpdates = async (message: string) => {
    if (!resume) {
      return {
        updates: {} as ResumeFieldUpdates,
        responseMessage: "",
      };
    }

    const response = await fetch(`${API_BASE_URL}/ai/extract-resume-updates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        resumeContext: {
          fullName: resume.fullName,
          email: resume.email,
          phone: resume.phone,
          preferredRole: resume.preferredRole,
          location: resume.location,
          personalSummary: resume.personalSummary,
          availability: resume.availability,
          experienceLevel: resume.experienceLevel,
          discipline: resume.discipline,
          skills: resume.skills,
          softSkills: resume.softSkills,
          hobbies: resume.hobbies,
          shiftPreference: resume.shiftPreference,
          socialLinks: resume.socialLinks,
        },
      }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        getApiErrorMessage(payload, "AI could not extract resume updates.")
      );
    }

    const updates =
      payload &&
      typeof payload === "object" &&
      (payload as { updates?: unknown }).updates &&
      typeof (payload as { updates?: unknown }).updates === "object"
        ? ((payload as { updates: ResumeFieldUpdates }).updates ?? {})
        : ({} as ResumeFieldUpdates);

    const responseMessage =
      payload &&
      typeof payload === "object" &&
      typeof (payload as { responseMessage?: unknown }).responseMessage === "string"
        ? (payload as { responseMessage: string }).responseMessage
        : "Done. I updated your resume details.";

    return { updates, responseMessage };
  };

  const resetAssistantFlow = () => {
    setFlow("idle");
    setPendingExperience({
      company: "",
      role: "",
      duration: "",
    });
    setAssistantStatus("");
  };

  const handleWorkspaceReset = () => {
    recognitionRef.current?.stop();
    setMessages(INITIAL_ASSISTANT_MESSAGES);
    setInput("");
    setChatMode("live");
    setGuidedSuggestions([]);
    guidedSuggestionsCacheRef.current.clear();
    setIsGuidedChoicePending(false);
    setIsChatting(false);
    setIsListening(false);
    resetAssistantFlow();
    handleReset();
  };

  const handleChatModeChange = (nextMode: "live" | "guided") => {
    if (chatMode === nextMode) {
      return;
    }

    setChatMode(nextMode);
    resetAssistantFlow();

    if (nextMode === "live") {
      addAssistantMessage(LIVE_MODE_READY_MESSAGE);
      return;
    }

    addAssistantMessage(GUIDED_MODE_READY_MESSAGE);
  };

  const startFlow = (nextFlow: Exclude<AssistantFlow, "idle">) => {
    setFlow(nextFlow);

    if (nextFlow === "basics_name") {
      addAssistantMessage("Let's start with the basics. What full name should I place on your resume?");
      return;
    }

    if (nextFlow === "summary") {
      addAssistantMessage(
        "Tell me about yourself in your own words. A rough 2 to 5 lines is enough, and I will turn it into a better professional summary."
      );
      return;
    }

    if (nextFlow === "experience_company") {
      setPendingExperience({ company: "", role: "", duration: "", });
      addAssistantMessage("Let's add a work experience entry. What is the company name?");
      return;
    }

    if (nextFlow === "skills") {
      addAssistantMessage("Send me your key skills separated by commas, and I will add them to the resume.");
    }
  };

  const handleFlowResponse = async (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue || !resume) {
      return;
    }

    if (flow === "basics_name") {
      setField("fullName", trimmedValue);
      setFlow("basics_role");
      addAssistantMessage("Great. What role or designation should appear as your headline?");
      return;
    }

    if (flow === "basics_role") {
      setField("preferredRole", trimmedValue);
      setFlow("basics_location");
      addAssistantMessage("Perfect. What location should I show on the resume?");
      return;
    }

    if (flow === "basics_location") {
      setField("location", trimmedValue);
      setFlow("idle");
      addAssistantMessage("Done. I updated your name, role, and location on the live resume.");
      return;
    }

    if (flow === "summary") {
      setAssistantStatus("Improving your summary with AI...");
      try {
        const rewrittenSummary = await runAiRewrite({
          mode: "summary",
          bio: [
            resume.preferredRole && `Target role: ${resume.preferredRole}.`,
            resume.experienceLevel && `Experience level: ${resume.experienceLevel}.`,
            resume.location && `Location: ${resume.location}.`,
            `User-written summary draft: ${trimmedValue}.`,
            resume.skills.length > 0 && `Skills: ${resume.skills.join(", ")}.`,
          ]
            .filter(Boolean)
            .join(" "),
        });
        setField("personalSummary", rewrittenSummary);
        addAssistantMessage("Your professional summary is ready and has been added to the resume preview.");
      } catch (error) {
        addAssistantMessage(
          error instanceof Error
            ? error.message
            : "I could not improve that summary right now."
        );
      } finally {
        setAssistantStatus("");
        setFlow("idle");
      }
      return;
    }

    if (flow === "experience_company") {
      setPendingExperience((current) => ({ ...current, company: trimmedValue }));
      setFlow("experience_role");
      addAssistantMessage("What was your designation or job title there?");
      return;
    }

    if (flow === "experience_role") {
      setPendingExperience((current) => ({ ...current, role: trimmedValue }));
      setFlow("experience_duration");
      addAssistantMessage("What duration should I show for this role? For example: Mar 2024 - Present");
      return;
    }

    if (flow === "experience_duration") {
      setPendingExperience((current) => ({ ...current, duration: trimmedValue }));
      setFlow("experience_description");
      addAssistantMessage(
        "Now send the rough description you want me to improve. If you do not have one, just type skip and I will generate it from the company and designation."
      );
      return;
    }

    if (flow === "experience_description") {
      const shouldGenerateFromScratch = ["skip", "no", "none", "na", "n/a"].includes(
        trimmedValue.toLowerCase()
      );

      setAssistantStatus("Writing your work experience entry with AI...");

      try {
        const experienceDescription = await runAiRewrite({
          mode: "work_experience",
          bio: [
            "Work experience section.",
            resume.preferredRole && `Target role: ${resume.preferredRole}.`,
            pendingExperience.role && `Role: ${pendingExperience.role}.`,
            pendingExperience.company && `Company: ${pendingExperience.company}.`,
            pendingExperience.duration && `Duration: ${pendingExperience.duration}.`,
            shouldGenerateFromScratch
              ? "No user-written description provided. Generate from the role, company, duration, and skills."
              : `User-written description to improve and rewrite: ${trimmedValue}.`,
            resume.skills.length > 0 && `Relevant skills: ${resume.skills.join(", ")}.`,
            resume.softSkills.length > 0 && `Soft skills: ${resume.softSkills.join(", ")}.`,
          ]
            .filter(Boolean)
            .join(" "),
        });

        setField("journey", [
          ...resume.journey,
          {
            company: pendingExperience.company,
            role: pendingExperience.role,
            duration: pendingExperience.duration,
            description: experienceDescription,
          },
        ]);

        addAssistantMessage("Your work experience entry is ready and has been added to the live resume.");
      } catch (error) {
        addAssistantMessage(
          error instanceof Error
            ? error.message
            : "I could not create that work experience entry right now."
        );
      } finally {
        setAssistantStatus("");
        setFlow("idle");
        setPendingExperience({ company: "", role: "", duration: "" });
      }

      return;
    }

    if (flow === "skills") {
      const nextSkills = trimmedValue
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (nextSkills.length === 0) {
        addAssistantMessage("I could not find any skills there. Please send them separated by commas.");
        return;
      }

      const mergedSkills = Array.from(new Set([...resume.skills, ...nextSkills]));
      setField("skills", mergedSkills);
      setFlow("idle");
      addAssistantMessage("Done. I added those skills to your resume.");
      return;
    }

    addAssistantMessage(
      "Use one of the quick actions below and I will guide you step by step."
    );
  };

  const submitMessage = async () => {
    const nextInput = input.trim();
    if (!nextInput) {
      return;
    }

    addUserMessage(nextInput);
    setInput("");

    if (flow !== "idle") {
      await handleFlowResponse(nextInput);
      return;
    }

    if (chatMode === "guided") {
      addAssistantMessage(GUIDED_MODE_FALLBACK_MESSAGE);
      return;
    }

    const liveResumeCommand = parseLiveResumeCommand(nextInput);
    if (liveResumeCommand) {
      setField(liveResumeCommand.field, liveResumeCommand.value);
      addAssistantMessage(liveResumeCommand.response);
      return;
    }

    const liveResumeUpdates = parseResumeFieldUpdates(nextInput);
    if (applyResumeFieldUpdates(liveResumeUpdates)) {
      addAssistantMessage("Done. I updated your resume details.");
      return;
    }

    try {
      const extractedUpdatePayload = await extractLiveResumeUpdates(nextInput);
      if (applyResumeFieldUpdates(extractedUpdatePayload.updates)) {
        addAssistantMessage(extractedUpdatePayload.responseMessage);
        return;
      }
    } catch {
      // Fall back to normal live chat if structured extraction fails.
    }

    setIsChatting(true);
    setAssistantStatus("AI is replying...");

    try {
      const reply = await runLiveChat(nextInput);
      addAssistantMessage(reply);
    } catch (error) {
      addAssistantMessage(
        error instanceof Error
          ? error.message
          : "I could not reply right now. Please try again."
      );
    } finally {
      setIsChatting(false);
      setAssistantStatus("");
    }
  };

  const submitGuidedSuggestion = async (suggestion: string) => {
    if (!suggestion.trim() || isGuidedChoicePending) {
      return;
    }

    setIsGuidedChoicePending(true);
    addUserMessage(suggestion);
    setInput("");

    try {
      await handleFlowResponse(suggestion);
    } finally {
      setIsGuidedChoicePending(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionSupported || typeof window === "undefined") {
      addAssistantMessage("Voice mode is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
      addAssistantMessage("Voice mode is not supported in this browser.");
      return;
    }

    const recognition = new Recognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript || "")
        .join(" ")
        .trim();

      if (transcript) {
        setInput(transcript);
      }
    };
    recognition.onerror = () => {
      setAssistantStatus("Voice capture failed. Please try again.");
    };
    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    setAssistantStatus("Listening...");
    recognition.start();
  };

  useEffect(() => {
    if (!isListening && assistantStatus === "Listening...") {
      setAssistantStatus("");
    }
  }, [assistantStatus, isListening]);

  useEffect(() => {
    if (!resume || chatMode !== "guided" || flow === "idle") {
      setGuidedSuggestions([]);
      return;
    }

    let isCancelled = false;
    const fallbackSuggestions = getFallbackGuidedSuggestions({
      flow,
      resume,
      pendingExperience,
    });
    const suggestionCacheKey = JSON.stringify({
      flow,
      resumeContext: {
        discipline: resume.discipline,
        fullName: resume.fullName,
        location: resume.location,
        experienceLevel: resume.experienceLevel,
        preferredRole: resume.preferredRole,
        personalSummary: resume.personalSummary,
        skills: resume.skills,
        softSkills: resume.softSkills,
        hobbies: resume.hobbies,
        journey: resume.journey,
        education: resume.education,
        certifications: resume.certifications,
      },
      pendingExperience,
    });

    setGuidedSuggestions(fallbackSuggestions);

    const cachedSuggestions =
      guidedSuggestionsCacheRef.current.get(suggestionCacheKey) ?? null;
    if (cachedSuggestions && cachedSuggestions.length > 0) {
      setGuidedSuggestions(cachedSuggestions);
      return;
    }

    const loadGuidedSuggestions = async () => {
      try {
        const nextSuggestions = await fetchGuidedSuggestions({
          flow,
          resume,
          pendingExperience,
        });

        if (!isCancelled) {
          const resolvedSuggestions =
            nextSuggestions.length > 0 ? nextSuggestions : fallbackSuggestions;

          guidedSuggestionsCacheRef.current.set(
            suggestionCacheKey,
            resolvedSuggestions
          );
          setGuidedSuggestions(resolvedSuggestions);
        }
      } catch {
        if (!isCancelled) {
          setGuidedSuggestions(fallbackSuggestions);
        }
      }
    };

    void loadGuidedSuggestions();

    return () => {
      isCancelled = true;
    };
  }, [chatMode, flow, pendingExperience, resume]);

  if (!session) {
    return (
      <main className="flex-1 px-6 py-24 md:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-center">
          <section className="w-full rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-primary/10 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">
              AI Resume Builder
            </p>
            <h1 className="mt-4 text-3xl font-black text-foreground md:text-4xl">
              Checking your sign-in status
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              You need to be logged in to open this page. Redirecting you now.
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (!resume) {
    return (
      <main className="bg-surface min-h-screen font-body">
        <TopSpace />
        <div className="mx-auto max-w-6xl px-6 py-12">
          <section className="rounded-[2rem] bg-white p-8 shadow-xl shadow-primary/10">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-primary/70">
              AI Resume Builder
            </p>
            <h1 className="mt-4 text-3xl font-black text-foreground md:text-4xl">
              {isLoadingResume ? "Loading your AI workspace" : "Preparing your AI workspace"}
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              {isLoadingResume
                ? "We are pulling your saved resume and profile data."
                : "Your AI builder will appear here in a moment."}
            </p>
          </section>
        </div>
      </main>
    );
  }

  const actionButtonClassName =
    "inline-flex h-12 items-center gap-2 rounded-full px-6 text-sm font-black uppercase tracking-[0.18em] transition";

  const quickActions = [
    { label: "Capture Basics", onClick: () => startFlow("basics_name") },
    { label: "Improve Summary", onClick: () => startFlow("summary") },
    { label: "Add Work Experience", onClick: () => startFlow("experience_company") },
    { label: "Add Skills", onClick: () => startFlow("skills") },
  ];
  return (
    <main className="bg-surface min-h-screen font-body selection:bg-primary-container selection:text-on-primary-container">
      <TopSpace />

      <div className="mx-auto max-w-[1700px] px-6 pb-20">
        <section className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl shadow-primary/10 md:p-12">
          <div className="absolute -right-16 -top-12 h-48 w-48 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
          <div className="relative space-y-4">
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.3em] text-primary/70">
              <Bot className="size-4" />
              AI Resume Builder
            </p>
            <h1 className="max-w-4xl text-4xl font-black text-foreground md:text-5xl">
              {heading}
            </h1>
            <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
              {description}
            </p>
            {savedAtLabel ? (
              <p className="text-sm font-bold text-primary/70">Last saved {savedAtLabel}</p>
            ) : null}
            {statusMessage ? (
              <p className="text-sm font-bold text-emerald-700">{statusMessage}</p>
            ) : null}
            {errorMessage ? (
              <p className="text-sm font-bold text-red-600">{errorMessage}</p>
            ) : null}
          </div>
        </section>

        <div className="mt-10 grid items-start gap-10 xl:grid-cols-[420px_minmax(0,1fr)]">
          <section className="overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)] xl:sticky xl:top-28 xl:flex xl:h-[calc(100vh-8.5rem)] xl:flex-col">
            <div className="border-b border-slate-100 bg-[linear-gradient(135deg,rgba(109,60,225,0.08),rgba(255,255,255,1))] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-primary/70">
                    <Sparkles className="size-4" />
                    AI Co-Pilot
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="inline-flex rounded-full border border-primary/20 bg-white p-1">
                    <button
                      type="button"
                      onClick={() => handleChatModeChange("live")}
                      className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] transition ${
                        chatMode === "live"
                          ? "bg-primary text-primary-foreground"
                          : "text-slate-600 hover:text-primary"
                      }`}
                    >
                      Live Chat
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChatModeChange("guided")}
                      className={`rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] transition ${
                        chatMode === "guided"
                          ? "bg-primary text-primary-foreground"
                          : "text-slate-600 hover:text-primary"
                      }`}
                    >
                      Guided Mode
                    </button>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-primary/20 bg-white text-primary hover:bg-primary/5"
                    onClick={() => setVoiceMode((current) => !current)}
                  >
                    {voiceMode ? <Mic className="size-4" /> : <MicOff className="size-4" />}
                    {voiceMode ? "Voice On" : "Voice Off"}
                  </Button>
                </div>
              </div>
            </div>

            <div
              ref={messageListRef}
              className="space-y-4 overflow-y-auto px-5 py-5 xl:min-h-0 xl:flex-1"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "assistant"
                      ? "mr-8 rounded-[1.5rem] bg-slate-100 px-4 py-3 text-sm leading-7 text-slate-700"
                      : "ml-8 rounded-[1.5rem] bg-primary px-4 py-3 text-sm leading-7 text-primary-foreground"
                  }
                >
                  {message.content}
                </div>
              ))}
              {chatMode === "guided" && flow === "idle" ? (
                <div className="mr-8 rounded-[1.5rem] bg-slate-100 px-4 py-4 text-sm text-slate-700">
                  <p className="mb-3 font-medium text-slate-600">
                    Choose what you want to work on:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        type="button"
                        onClick={action.onClick}
                        className="rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:ring-primary/30 hover:text-primary"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              {chatMode === "guided" && flow !== "idle" && guidedSuggestions.length > 0 ? (
                <div className="mr-8 rounded-[1.5rem] bg-primary/6 px-4 py-4 text-sm text-slate-700">
                  <p className="mb-3 font-medium text-primary/80">
                    Suggestions based on your current resume:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {guidedSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          void submitGuidedSuggestion(suggestion);
                        }}
                        disabled={isGuidedChoicePending || isChatting || Boolean(assistantStatus)}
                        className="rounded-full bg-white px-4 py-2 text-left text-xs font-semibold leading-5 text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:ring-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              {assistantStatus ? (
                <div className="mr-8 rounded-[1.5rem] bg-primary/8 px-4 py-3 text-sm font-medium text-primary">
                  {assistantStatus}
                </div>
              ) : null}
            </div>

            <div className="border-t border-slate-100 p-5">
              {downloadFeedback ? (
                <p
                  className={`mb-3 text-sm font-medium ${
                    downloadFeedbackTone === "error"
                      ? "text-red-600"
                      : downloadFeedbackTone === "success"
                        ? "text-emerald-600"
                        : "text-slate-500"
                  }`}
                >
                  {downloadFeedback}
                </p>
              ) : null}
              <div className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void submitMessage();
                    }
                  }}
                  placeholder={
                    chatMode === "live"
                      ? "Ask AI anything about your resume, or use voice mode..."
                      : "Type your answer here, or use voice mode..."
                  }
                  className="min-h-[110px] flex-1 resize-none rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-700 outline-none transition focus:border-primary/30 focus:bg-white"
                />
                <div className="flex flex-col gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-slate-200 bg-white hover:bg-slate-50"
                    onClick={toggleListening}
                    disabled={!voiceMode}
                  >
                    {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                  </Button>
                  <Button
                    type="button"
                    className="rounded-full bg-primary text-primary-foreground shadow-[0_16px_34px_rgba(109,60,225,0.28)] hover:bg-primary/90"
                    onClick={() => {
                      void submitMessage();
                    }}
                    disabled={isChatting}
                  >
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
              {voiceMode && !recognitionSupported ? (
                <p className="mt-3 text-sm font-medium text-amber-700">
                  Voice mode needs browser speech recognition support. If this browser does not support it, use the live chat input instead.
                </p>
              ) : null}
            </div>
          </section>

          <section>
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              <Link
                href={backHref}
                className={`${actionButtonClassName} border border-slate-200 bg-white text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:bg-slate-50`}
              >
                <ArrowLeft className="size-4" />
                {backLabel}
              </Link>
              <Button
                type="button"
                variant="outline"
                className={`${actionButtonClassName} border border-indigo-200 bg-indigo-50/60 text-slate-900 hover:border-indigo-300 hover:bg-indigo-50`}
                onClick={handleWorkspaceReset}
                disabled={isSavingResume}
              >
                <RotateCcw className="size-4" />
                Reset
              </Button>
              <Button
                type="button"
                variant="outline"
                className={`${actionButtonClassName} border border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:border-emerald-300 hover:bg-emerald-50`}
                onClick={() => {
                  void handleDownloadResume();
                }}
                disabled={isDownloadingResume}
              >
                <Download className="size-4" />
                {isDownloadingResume ? "Downloading..." : "Download PDF"}
              </Button>
              <Button
                type="button"
                className={`${actionButtonClassName} bg-primary text-primary-foreground shadow-[0_16px_34px_rgba(109,60,225,0.28)] hover:bg-primary/90`}
                onClick={() => {
                  void handleSave();
                }}
                disabled={isSavingResume || isLoadingResume}
              >
                <Save className="size-4" />
                {isSavingResume ? "Saving..." : "Save Resume"}
              </Button>
            </div>

            <ResumePreview
              name={resume.fullName}
              title={resume.preferredRole}
              location={resume.location}
              email={resume.email}
              phone={resume.phone}
              personalSummary={resume.personalSummary}
              profileImage={resume.profileImage || undefined}
              aura={aura}
              vibe={resume.skills}
              journey={resume.journey}
              internships={resume.internships}
              achievements={resume.achievements}
              education={resume.education}
              awards={resume.awards}
              certifications={resume.certifications}
              languages={resume.languages}
              socialLinks={resume.socialLinks}
              modalities={resume.skills}
              softSkills={resume.softSkills}
              hobbies={resume.hobbies}
              availability={resume.availability}
              shiftPreference={resume.shiftPreference}
              references={resume.references}
              highEnergy={resume.highEnergy}
              profZen={resume.profZen}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
