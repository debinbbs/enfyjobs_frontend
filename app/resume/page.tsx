"use client";

import React, { useState } from "react";
import { Phase01Foundation } from "@/components/resume/Phase01Foundation";
import { Phase02Journey } from "@/components/resume/Phase02Journey";
import { Phase03VibeCheck } from "@/components/resume/Phase03VibeCheck";
import { Phase04Manifested } from "@/components/resume/Phase04Manifested";
import { StepIndicator } from "@/components/resume/StepIndicator";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { TopSpace } from "@/components/utils/TopSpace";

const steps = [
  { id: 1, label: "Set Your Vibe" },
  { id: 2, label: "Your Journey" },
  { id: 3, label: "Vibe Check" },
  { id: 4, label: "Manifested" },
];

interface JourneyItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

interface CertificationItem {
  title: string;
  link?: string;
}

interface EducationItem {
  school: string;
  degree: string;
  year: string;
}

interface AchievementItem {
  name: string;
  duration?: string;
  description: string;
  link?: string;
}

interface LanguageItem {
  language: string;
  level: string;
}

interface SocialLinks {
  linkedin?: string;
  portfolio?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}

interface ReferenceItem {
  name: string;
  role: string;
  company: string;
  phone: string;
}

export default function ResumePage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Resume State - Personal Info
  const [fullName, setFullName] = useState("Arya Sharma");
  const [email, setEmail] = useState("arya.sharma@wellness.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [location, setLocation] = useState("Mumbai, India");
  const [experienceLevel, setExperienceLevel] = useState("Fresher");
  const [preferredRole, setPreferredRole] = useState("Front Desk Executive");
  const [personalSummary, setPersonalSummary] = useState("Friendly and well-presented hospitality professional with hands-on experience in front desk operations, guest handling, and F&B service. Passionate about creating memorable guest experiences and maintaining high professional standards in fast-paced hotel and restaurant environments.");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Resume State - Content
  const [discipline, setDiscipline] = useState("");
  const [selectedEnergies, setSelectedEnergies] = useState<string[]>([]);
  const [journey, setJourney] = useState<JourneyItem[]>([
    {
      role: "Front Desk Associate",
      company: "The Leela Palace, Mumbai",
      duration: "2023-06-01 - Present",
      description: "Managed guest check-in and check-out for a 5-star property handling over 200 guests daily. Coordinated room assignments, resolved guest complaints, and maintained front desk records. Consistently received 4.8/5 guest satisfaction scores."
    }
  ]);
  const [internships, setInternships] = useState<JourneyItem[]>([
    {
      role: "F&B Service Trainee",
      company: "Marriott International, Pune",
      duration: "2022-11-01 - 2023-05-30",
      description: "Assisted restaurant staff in table setup, order taking, and food service for banquet events with 300+ guests. Trained in fine dining etiquette and POS billing systems."
    }
  ]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([
    {
      name: "Best Intern of the Month — Marriott Pune",
      duration: "February 2023",
      description: "Recognised for exceptional guest handling skills and punctuality across all scheduled shifts during a 6-month internship programme."
    }
  ]);
  const [education, setEducation] = useState<EducationItem[]>([
    {
      school: "St. Xavier's College",
      degree: "B.A. in Hospitality Management",
      year: "2024"
    }
  ]);
  const [awards, setAwards] = useState<string[]>(["Employee of the Month — The Leela Palace (August 2023)"]);
  const [certifications, setCertifications] = useState<CertificationItem[]>([
    { title: "FSSAI Food Handler Certificate" },
    { title: "First Aid & CPR Certified" }
  ]);

  const [languages, setLanguages] = useState<LanguageItem[]>([
    { language: "English", level: "Fluent" },
    { language: "Hindi", level: "Native" }
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedin: "linkedin.com/in/arya-sharma",
    portfolio: ""
  });
  const [skills, setSkills] = useState<string[]>(["Customer Service", "Teamwork", "Guest Relations"]);
  const [softSkills, setSoftSkills] = useState<string[]>(["Punctual", "Well-Groomed", "Friendly"]);
  const [hobbies, setHobbies] = useState<string[]>(["Cooking", "Yoga", "Travelling"]);
  const [availability, setAvailability] = useState<string>("Full-time");
  const [shiftPreference, setShiftPreference] = useState<string[]>(["Day Shift"]);
  const [references, setReferences] = useState<ReferenceItem[]>([
    { name: "Rajan Mehta", role: "Front Office Manager", company: "The Leela Palace, Mumbai", phone: "+91 98200 12345" }
  ]);

  const [highEnergy, setHighEnergy] = useState(false);
  const [profZen, setProfZen] = useState(false);

  const toggleEnergy = (energy: string) => {
    setSelectedEnergies((prev) =>
      prev.includes(energy) ? prev.filter((e) => e !== energy) : [...prev, energy]
    );
  };

  const getAuraFromEnergies = () => {
    return selectedEnergies.map(e => ({
      label: e.charAt(0) + e.slice(1).toLowerCase() + " aura",
      color: e === "EMPATHETIC" ? "bg-primary" : "bg-secondary"
    }));
  };

  return (
    <main className="bg-surface dark:bg-background min-h-screen font-body selection:bg-primary-container selection:text-on-primary-container">
      <TopSpace />
      
      <div className="max-w-[1600px] mx-auto w-full px-6">
        {/* Reusable Step Indicator */}
        <header className="mb-12">
          <StepIndicator currentStep={currentStep} steps={steps} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Multi-step Forms */}
          <div className="lg:col-span-5 pb-20">
            {currentStep === 1 && (
              <Phase01Foundation 
                discipline={discipline}
                setDiscipline={setDiscipline}
                selectedEnergies={selectedEnergies}
                toggleEnergy={toggleEnergy}
                onNext={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 2 && (
              <Phase02Journey 
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                location={location}
                setLocation={setLocation}
                experienceLevel={experienceLevel}
                setExperienceLevel={setExperienceLevel}
                preferredRole={preferredRole}
                setPreferredRole={setPreferredRole}
                personalSummary={personalSummary}
                setPersonalSummary={setPersonalSummary}
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                journey={journey}
                setJourney={setJourney}
                internships={internships}
                setInternships={setInternships}
                achievements={achievements}
                setAchievements={setAchievements}
                education={education}
                setEducation={setEducation}
                awards={awards}
                setAwards={setAwards}
                certifications={certifications}
                setCertifications={setCertifications}
                languages={languages}
                setLanguages={setLanguages}
                socialLinks={socialLinks}
                setSocialLinks={setSocialLinks}
                skills={skills}
                setSkills={setSkills}
                softSkills={softSkills}
                setSoftSkills={setSoftSkills}
                hobbies={hobbies}
                setHobbies={setHobbies}
                availability={availability}
                setAvailability={setAvailability}
                shiftPreference={shiftPreference}
                setShiftPreference={setShiftPreference}
                references={references}
                setReferences={setReferences}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 3 && (
              <Phase03VibeCheck 
                highEnergy={highEnergy}
                setHighEnergy={setHighEnergy}
                profZen={profZen}
                setProfZen={setProfZen}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}
            {currentStep === 4 && (
              <Phase04Manifested 
                onBack={() => setCurrentStep(3)}
                onExploreMatches={() => window.location.href = "/dashboard"}
              />
            )}
          </div>

          {/* Right Column: Reusable Live Preview */}
          <div className="lg:col-span-7">
            <ResumePreview 
              name={fullName}
              title={preferredRole}
              location={location}
              email={email}
              phone={phone}
              personalSummary={personalSummary}
              profileImage={profileImage || undefined}
              aura={getAuraFromEnergies()}
              vibe={skills}
              journey={journey}
              internships={internships}
              achievements={achievements}
              education={education}
              awards={awards}
              certifications={certifications}
              languages={languages}
              socialLinks={socialLinks}
              modalities={skills}
              softSkills={softSkills}
              hobbies={hobbies}
              availability={availability}
              shiftPreference={shiftPreference}
              references={references}
              highEnergy={highEnergy}
              profZen={profZen}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
