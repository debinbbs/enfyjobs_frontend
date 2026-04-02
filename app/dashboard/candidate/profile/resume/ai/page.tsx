import { AiResumeBuilder } from "@/components/resume/AiResumeBuilder";

export default function CandidateProfileResumeAiPage() {
  return (
    <AiResumeBuilder
      heading="Build your resume with an AI co-pilot."
      description="Use chat or voice on the left, let the assistant help collect and improve your resume content, and watch the live resume preview update on the right."
      backHref="/dashboard/candidate/profile/resume"
      backLabel="Back To Options"
    />
  );
}
