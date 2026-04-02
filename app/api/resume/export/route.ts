import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { ResumePrintDocumentProps } from "@/components/resume/ResumePrintDocument";
import { buildResumeExportHtml } from "@/lib/resume/resume-export-html";

const execFileAsync = promisify(execFile);

export const runtime = "nodejs";

function buildFileName(name: string) {
  const slug = (name || "candidate-resume")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${slug || "candidate-resume"}.pdf`;
}

function isResumePrintDocumentProps(value: unknown): value is ResumePrintDocumentProps {
  return !!value && typeof value === "object";
}

export async function POST(request: Request) {
  let tempDir = "";

  try {
    const payload = (await request.json()) as unknown;

    if (!isResumePrintDocumentProps(payload)) {
      return Response.json({ message: "Invalid resume export payload." }, { status: 400 });
    }

    const chromePath = process.env.GOOGLE_CHROME_BIN || "/usr/bin/google-chrome";
    tempDir = await mkdtemp(join(tmpdir(), "resume-export-"));

    const htmlPath = join(tempDir, `${randomUUID()}.html`);
    const pdfPath = join(tempDir, `${randomUUID()}.pdf`);
    const html = buildResumeExportHtml(payload);

    await writeFile(htmlPath, html, "utf8");

    await execFileAsync(
      chromePath,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--allow-file-access-from-files",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=1500",
        "--print-to-pdf-no-header",
        `--print-to-pdf=${pdfPath}`,
        `file://${htmlPath}`,
      ],
      {
        timeout: 30_000,
        maxBuffer: 10 * 1024 * 1024,
      }
    );

    const pdfBuffer = await readFile(pdfPath);
    const fileName = buildFileName(payload.name);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return Response.json(
      {
        message: error instanceof Error ? error.message : "Failed to generate resume PDF.",
      },
      { status: 500 }
    );
  } finally {
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true }).catch(() => undefined);
    }
  }
}
