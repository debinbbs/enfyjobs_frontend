import { ResumeBuilderModeSelector } from "@/components/resume/ResumeBuilderModeSelector";

export default function ResumePage() {
  return (
    <ResumeBuilderModeSelector
      heading="Choose how you want to build your resume."
      description="Open the classic manual builder or launch the AI co-pilot experience with chat, voice mode, and a live resume preview."
      manualHref="/resume/manual"
      aiHref="/resume/ai"
      backHref="/dashboard/candidate"
      backLabel="Back To Dashboard"
    />
  );
}
