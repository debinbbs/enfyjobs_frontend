import { CandidateResumeBuilder } from "@/components/resume/CandidateResumeBuilder";

export default function ResumeManualPage() {
  return (
    <CandidateResumeBuilder
      heading="Build a resume that stays in sync with your candidate account."
      description="Your resume workspace now lives in your profile flow, with database-backed save and reload so you can keep refining it across sessions."
      backHref="/resume"
      backLabel="Back To Options"
    />
  );
}
