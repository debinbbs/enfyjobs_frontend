import { CandidateResumeBuilder } from "@/components/resume/CandidateResumeBuilder";

export default function CandidateProfileResumeManualPage() {
  return (
    <CandidateResumeBuilder
      heading="Create a simple job profile in a few easy steps."
      description="Fill only the details employers search most: role, city, experience, skills, and one work proof. We will save it in a structured format and keep your resume ready to share."
      backHref="/dashboard/candidate/profile/resume"
      backLabel="Back To Options"
    />
  );
}
