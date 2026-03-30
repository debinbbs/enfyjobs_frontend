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

export default function ResumePage() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Shared State
  const [discipline, setDiscipline] = useState("yoga");
  const [selectedEnergies, setSelectedEnergies] = useState<string[]>(["EMPATHETIC"]);
  const [modalities, setModalities] = useState<string[]>(["Hatha Yoga", "Meditation", "Ayurveda"]);
  const [highEnergy, setHighEnergy] = useState(false);
  const [profZen, setProfZen] = useState(false);
  const [journey, setJourney] = useState([
    {
      role: "Senior Wellness Director",
      company: "ZenFlow Studios",
      duration: "2021 — PRESENT",
      description: "Scaled the mindfulness program by 40% across 12 urban retreats. Engineered a hybrid sound-healing curriculum."
    },
    {
      role: "Yoga Lead & Instructor",
      company: "Himalayan Retreats",
      duration: "2018 — 2021",
      description: "Curated 500+ hours of advanced Hatha and Vinyasa workshops for international practitioners."
    }
  ]);

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
                journey={journey}
                setJourney={setJourney}
                modalities={modalities}
                setModalities={setModalities}
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
              name="Arya Sharma"
              title={discipline === "yoga" ? "Lead Yoga Strategist" : "Wellness Professional"}
              location="Rishikesh, IN"
              email="arya@vibemail.com"
              phone="+91 98765 43210"
              aura={getAuraFromEnergies()}
              vibe={["Vinyasa", "Bio-hacking", "Mindfulness"]}
              journey={journey}
              modalities={modalities}
              highEnergy={highEnergy}
              profZen={profZen}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
