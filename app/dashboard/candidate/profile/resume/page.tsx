import { CandidateResumeBuilder } from "@/components/resume/CandidateResumeBuilder";

export default function CandidateProfileResumePage() {
  return (
    <CandidateResumeBuilder
      heading="Turn your candidate profile into a polished, reusable resume."
      description="Bring your experience, certifications, skills, and references together in one builder that saves directly to your account database."
      backHref="/dashboard/candidate/profile"
      backLabel="Back To Profile"
    />
  );
}
