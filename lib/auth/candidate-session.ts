"use client";

import { useSyncExternalStore } from "react";

type CandidateProfile = {
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
  isVerified?: boolean | null;
};

type CandidateUser = {
  id?: string;
  phoneNumber?: string;
  email?: string | null;
  role?: string;
  candidate?: CandidateProfile | null;
} | null;

export type CandidateTokenPayload = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: CandidateUser;
};

export type CandidateSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expiresAt: string;
  phoneNumber?: string;
  loginAt: string;
  lastRefreshedAt: string;
  user?: CandidateUser;
};

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001"
).replace(/\/$/, "");

export const CANDIDATE_SESSION_STORAGE_KEY = "enfyjobs:candidate-session";

const CANDIDATE_SESSION_CHANGED_EVENT = "enfyjobs:candidate-session-changed";
const CANDIDATE_AUTHENTICATED_EVENT = "enfyjobs:candidate-authenticated";
const CANDIDATE_LOGGED_OUT_EVENT = "enfyjobs:candidate-logged-out";
const SESSION_REFRESH_BUFFER_MS = 60_000;

let cachedRawSession: string | null | undefined;
let cachedParsedSession: CandidateSession | null = null;
let refreshSessionPromise: Promise<CandidateSession | null> | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getApiErrorMessage(payload: unknown, fallbackMessage: string) {
  if (!isRecord(payload)) {
    return fallbackMessage;
  }

  const message = payload.message;
  if (Array.isArray(message)) {
    return message.filter((entry): entry is string => typeof entry === "string").join(", ");
  }

  return typeof message === "string" ? message : fallbackMessage;
}

function dispatchCandidateSessionEvent(eventName: string, detail: CandidateSession | null) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(eventName, {
      detail,
    })
  );
}

function notifyCandidateSessionChanged(session: CandidateSession | null) {
  dispatchCandidateSessionEvent(CANDIDATE_SESSION_CHANGED_EVENT, session);
}

function hasTokenBundle(value: unknown): value is Required<Pick<CandidateSession, "access_token" | "refresh_token" | "expires_in">> {
  return (
    isRecord(value) &&
    typeof value.access_token === "string" &&
    typeof value.refresh_token === "string" &&
    typeof value.expires_in === "number"
  );
}

export function isCandidateSession(value: unknown): value is CandidateSession {
  if (!hasTokenBundle(value) || !isRecord(value)) {
    return false;
  }

  const sessionValue = value as Record<string, unknown>;

  return (
    typeof sessionValue.expiresAt === "string" &&
    typeof sessionValue.loginAt === "string" &&
    typeof sessionValue.lastRefreshedAt === "string"
  );
}

function buildCandidateSession(
  payload: CandidateTokenPayload,
  options: {
    phoneNumber?: string;
    loginAt?: string;
    user?: CandidateUser;
  } = {}
): CandidateSession {
  const sessionUser = payload.user ?? options.user;

  if (!hasTokenBundle(payload)) {
    throw new Error("Candidate session payload is invalid.");
  }

  const now = new Date();
  const loginAt = options.loginAt || now.toISOString();

  return {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
    expires_in: payload.expires_in,
    expiresAt: new Date(now.getTime() + payload.expires_in * 1000).toISOString(),
    phoneNumber: options.phoneNumber,
    loginAt,
    lastRefreshedAt: now.toISOString(),
    user: sessionUser,
  };
}

function writeCandidateSession(session: CandidateSession | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(CANDIDATE_SESSION_STORAGE_KEY);
    cachedRawSession = null;
    cachedParsedSession = null;
    return;
  }

  const rawSession = JSON.stringify(session);
  window.localStorage.setItem(CANDIDATE_SESSION_STORAGE_KEY, rawSession);
  cachedRawSession = rawSession;
  cachedParsedSession = session;
}

export function readCandidateSession(): CandidateSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(CANDIDATE_SESSION_STORAGE_KEY);
  if (!rawValue) {
    cachedRawSession = null;
    cachedParsedSession = null;
    return null;
  }

  if (rawValue === cachedRawSession) {
    return cachedParsedSession;
  }

  try {
    const parsedValue = JSON.parse(rawValue) as unknown;

    if (!isCandidateSession(parsedValue)) {
      writeCandidateSession(null);
      return null;
    }

    cachedRawSession = rawValue;
    cachedParsedSession = parsedValue;

    return cachedParsedSession;
  } catch {
    writeCandidateSession(null);
    return null;
  }
}

export function saveCandidateLogin(
  payload: CandidateTokenPayload,
  phoneNumber?: string
) {
  const session = buildCandidateSession(payload, {
    phoneNumber,
    user: payload.user,
  });

  writeCandidateSession(session);
  notifyCandidateSessionChanged(session);
  dispatchCandidateSessionEvent(CANDIDATE_AUTHENTICATED_EVENT, session);

  return session;
}

export function clearCandidateSession() {
  writeCandidateSession(null);
  notifyCandidateSessionChanged(null);
}

export function updateCandidateSessionProfile(details: {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  email?: string;
  phoneNumber?: string;
}) {
  const currentSession = readCandidateSession();
  if (!currentSession) {
    return null;
  }

  const nextSession: CandidateSession = {
    ...currentSession,
    phoneNumber: details.phoneNumber ?? currentSession.phoneNumber,
    user: currentSession.user
      ? {
          ...currentSession.user,
          email: details.email ?? currentSession.user.email,
          phoneNumber: details.phoneNumber ?? currentSession.user.phoneNumber,
          candidate: currentSession.user.candidate
            ? {
                ...currentSession.user.candidate,
                firstName: details.firstName ?? currentSession.user.candidate.firstName,
                lastName: details.lastName ?? currentSession.user.candidate.lastName,
                profileImage: details.profileImage ?? currentSession.user.candidate.profileImage,
              }
            : currentSession.user.candidate,
        }
      : currentSession.user,
  };

  writeCandidateSession(nextSession);
  notifyCandidateSessionChanged(nextSession);

  return nextSession;
}

export function isCandidateSessionExpiring(
  session: CandidateSession,
  bufferMs = SESSION_REFRESH_BUFFER_MS
) {
  return Date.parse(session.expiresAt) - Date.now() <= bufferMs;
}

export function getCandidateSessionRefreshDelay(session: CandidateSession) {
  return Math.max(Date.parse(session.expiresAt) - Date.now() - SESSION_REFRESH_BUFFER_MS, 0);
}

export async function refreshCandidateSession() {
  const currentSession = readCandidateSession();
  if (!currentSession?.refresh_token) {
    clearCandidateSession();
    return null;
  }

  if (!isCandidateSessionExpiring(currentSession)) {
    return currentSession;
  }

  if (refreshSessionPromise) {
    return refreshSessionPromise;
  }

  refreshSessionPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: currentSession.refresh_token,
        }),
      });

      const payload = (await response.json().catch(() => null)) as unknown;
      if (!response.ok) {
        clearCandidateSession();
        throw new Error(getApiErrorMessage(payload, "Failed to refresh session."));
      }

      const refreshedSession = buildCandidateSession(payload as CandidateTokenPayload, {
        phoneNumber: currentSession.phoneNumber,
        loginAt: currentSession.loginAt,
        user: currentSession.user,
      });

      writeCandidateSession(refreshedSession);
      notifyCandidateSessionChanged(refreshedSession);

      return refreshedSession;
    } catch (error) {
      if (error instanceof Error && error.message === "Failed to refresh session.") {
        return null;
      }

      console.error("Candidate session refresh failed.", error);
      return readCandidateSession();
    } finally {
      refreshSessionPromise = null;
    }
  })();

  return refreshSessionPromise;
}

export async function logoutCandidateSession() {
  const currentSession = readCandidateSession();

  try {
    if (currentSession?.refresh_token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: currentSession.refresh_token,
        }),
      });
    }
  } finally {
    writeCandidateSession(null);
    notifyCandidateSessionChanged(null);
    dispatchCandidateSessionEvent(CANDIDATE_LOGGED_OUT_EVENT, null);
  }
}

export async function getCandidateAuthHeaders(
  additionalHeaders: HeadersInit = {}
): Promise<Record<string, string>> {
  const session = (await refreshCandidateSession()) || readCandidateSession();

  if (!session?.access_token) {
    throw new Error("Candidate session is not available.");
  }

  const nextHeaders = new Headers(additionalHeaders);
  nextHeaders.set("Authorization", `Bearer ${session.access_token}`);

  return Object.fromEntries(nextHeaders.entries());
}

function subscribeToCandidateSession(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key && event.key !== CANDIDATE_SESSION_STORAGE_KEY) {
      return;
    }

    onStoreChange();
  };

  const handleSessionChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(CANDIDATE_SESSION_CHANGED_EVENT, handleSessionChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(CANDIDATE_SESSION_CHANGED_EVENT, handleSessionChange);
  };
}

export function useCandidateSession() {
  return useSyncExternalStore(
    subscribeToCandidateSession,
    readCandidateSession,
    () => null
  );
}
