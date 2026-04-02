import { CandidateResumeBuilder } from "@/components/resume/CandidateResumeBuilder";

export default function CandidateProfileResumeManualPage() {
  return (
    <CandidateResumeBuilder
      heading="Turn your candidate profile into a polished, reusable resume."
      description="Bring your experience, certifications, skills, and references together in one builder that saves directly to your account database."
      backHref="/dashboard/candidate/profile/resume"
      backLabel="Back To Options"
    />
  );
}
