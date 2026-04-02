"use client";

import { useEffect } from "react";
import {
  getCandidateSessionRefreshDelay,
  refreshCandidateSession,
  useCandidateSession,
} from "@/lib/auth/candidate-session";

export function CandidateSessionSync() {
  const session = useCandidateSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    let isCancelled = false;

    const runRefresh = async () => {
      if (isCancelled) {
        return;
      }

      await refreshCandidateSession();
    };

    const refreshDelay = getCandidateSessionRefreshDelay(session);

    if (refreshDelay === 0) {
      void runRefresh();

      return () => {
        isCancelled = true;
      };
    }

    const timer = window.setTimeout(() => {
      void runRefresh();
    }, refreshDelay);

    return () => {
      isCancelled = true;
      window.clearTimeout(timer);
    };
  }, [session]);

  return null;
}
