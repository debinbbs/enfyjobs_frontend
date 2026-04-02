"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ResumePrintDocument,
  type ResumePrintDocumentProps,
} from "@/components/resume/ResumePrintDocument";

function ResumeExportPageContent() {
  const searchParams = useSearchParams();
  const exportKey = searchParams.get("key");
  const payloadParam = searchParams.get("payload");
  const mode = searchParams.get("mode");
  const [hasTriggeredPrint, setHasTriggeredPrint] = useState(false);

  const resolvedExport = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        payload: null,
        errorMessage: "",
        isReady: false,
      };
    }

    if (payloadParam) {
      try {
        const normalizedPayload = payloadParam.replace(/-/g, "+").replace(/_/g, "/");
        const padding = normalizedPayload.length % 4 === 0 ? "" : "=".repeat(4 - (normalizedPayload.length % 4));
        const decodedPayload = window.atob(`${normalizedPayload}${padding}`);

        return {
          payload: JSON.parse(decodedPayload) as ResumePrintDocumentProps,
          errorMessage: "",
          isReady: true,
        };
      } catch {
        return {
          payload: null,
          errorMessage: "Resume export data could not be decoded. Please try again.",
          isReady: true,
        };
      }
    }

    if (!exportKey) {
      return {
        payload: null,
        errorMessage: "Missing resume export key.",
        isReady: true,
      };
    }

    const rawPayload = window.localStorage.getItem(exportKey);

    if (!rawPayload) {
      return {
        payload: null,
        errorMessage: "Resume export data was not found. Please go back and try again.",
        isReady: true,
      };
    }

    try {
      return {
        payload: JSON.parse(rawPayload) as ResumePrintDocumentProps,
        errorMessage: "",
        isReady: true,
      };
    } catch {
      return {
        payload: null,
        errorMessage: "Resume export data could not be read. Please try again.",
        isReady: true,
      };
    }
  }, [exportKey, payloadParam]);

  useEffect(() => {
    if (!resolvedExport.payload || hasTriggeredPrint || mode === "pdf") {
      return;
    }

    const fileName = `${(resolvedExport.payload.name || "candidate-resume")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "candidate-resume"}.pdf`;
    document.title = fileName;

    const printTimeout = window.setTimeout(() => {
      window.print();
      setHasTriggeredPrint(true);
    }, 500);

    const cleanupTimeout = exportKey
      ? window.setTimeout(() => {
          window.localStorage.removeItem(exportKey);
        }, 5 * 60 * 1000)
      : null;

    return () => {
      window.clearTimeout(printTimeout);
      if (cleanupTimeout) {
        window.clearTimeout(cleanupTimeout);
      }
    };
  }, [exportKey, hasTriggeredPrint, mode, resolvedExport.payload]);

  const pageTitle = resolvedExport.payload?.name
    ? `${resolvedExport.payload.name} Resume`
    : "Resume Export";

  if (resolvedExport.errorMessage) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#eef2ff] px-6 py-10">
        <div className="max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
          <h1 className="text-2xl font-black text-[#1e293b]">Resume export failed</h1>
          <p className="mt-4 text-sm font-medium leading-relaxed text-[#64748b]">
            {resolvedExport.errorMessage}
          </p>
          <Button className="mt-6" onClick={() => window.close()}>
            Close Tab
          </Button>
        </div>
      </main>
    );
  }

  if (!resolvedExport.isReady || !resolvedExport.payload) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#eef2ff] px-6 py-10">
        <div className="max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
          <h1 className="text-2xl font-black text-[#1e293b]">Preparing your resume</h1>
          <p className="mt-4 text-sm font-medium leading-relaxed text-[#64748b]">
            The print dialog will open automatically. Choose Save as PDF to download a selectable-text resume.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef2ff] px-6 py-8 print:bg-white print:p-0">
      <style jsx global>{`
        @page {
          size: A4;
          margin: 0;
        }

        html:has([data-resume-export-page]),
        body:has([data-resume-export-page]) {
          background: #eef2ff !important;
        }

        body:has([data-resume-export-page]) > header,
        body:has([data-resume-export-page]) > footer {
          display: none !important;
        }

        body:has([data-resume-export-page]) {
          display: block !important;
        }

        [data-resume-export-page] {
          min-height: 100vh;
        }

        [data-resume-print-document] {
          width: 210mm;
          min-height: 297mm;
          max-width: 210mm;
        }

        @media print {
          html,
          body {
            background: white !important;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0 !important;
          }

          body > header,
          body > footer {
            display: none !important;
          }

          [data-resume-export-page] {
            min-height: auto !important;
            padding: 0 !important;
            background: white !important;
          }

          [data-resume-print-document] {
            width: 210mm !important;
            min-height: 297mm !important;
            max-width: 210mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            break-after: auto;
            page-break-after: auto;
          }
        }
      `}</style>

      <div data-resume-export-page>
      <div className="mx-auto mb-6 flex max-w-[794px] items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-black text-[#1e293b]">{pageTitle}</h1>
          <p className="mt-1 text-sm font-medium text-[#64748b]">
            Use your browser&apos;s Save as PDF option for a selectable-text resume.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => window.close()}>
            Close
          </Button>
          <Button onClick={() => window.print()}>Print / Save PDF</Button>
        </div>
      </div>

      <ResumePrintDocument {...resolvedExport.payload} />
      </div>
    </main>
  );
}

export default function ResumeExportPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#eef2ff] px-6 py-10">
          <div className="max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-[0_24px_64px_rgba(15,23,42,0.12)]">
            <h1 className="text-2xl font-black text-[#1e293b]">Preparing your resume</h1>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[#64748b]">
              Loading your print-ready resume document.
            </p>
          </div>
        </main>
      }
    >
      <ResumeExportPageContent />
    </Suspense>
  );
}
