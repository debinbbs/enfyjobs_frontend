import { ResumeBuilderModeSelector } from "@/components/resume/ResumeBuilderModeSelector";

export default function CandidateProfileResumePage() {
  return (
    <ResumeBuilderModeSelector
      heading="Choose how you want to build your resume."
      description="Go manual if you want full section-by-section control, or open the AI co-pilot to build with chat, voice input, and a live resume preview."
      manualHref="/dashboard/candidate/profile/resume/manual"
      aiHref="/dashboard/candidate/profile/resume/ai"
      backHref="/dashboard/candidate/profile"
      backLabel="Back To Profile"
    />
  );
}
