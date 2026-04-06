"use client";

import { useState, useRef } from "react";
import { ArrowRight, BriefcaseBusiness, Camera, MapPin, Phone, User, X } from "lucide-react";
import { getFirstZodErrorMessage, resumeStep1Schema } from "@/lib/validation/forms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CATEGORY_OPTIONS = [
  { id: "spa", label: "Spa & Therapy" },
  { id: "yoga", label: "Yoga & Meditation" },
  { id: "fitness", label: "Fitness & Gym" },
  { id: "beauty", label: "Beauty & Salon" },
  { id: "nutrition", label: "Nutrition" },
  { id: "front_desk", label: "Front Desk" },
];

const ROLE_OPTIONS: Record<string, string[]> = {
  spa: ["Spa Therapist", "Massage Therapist", "Ayurveda Therapist", "Wellness Therapist"],
  yoga: ["Yoga Trainer", "Meditation Coach", "Wellness Coach", "Pilates Instructor"],
  fitness: ["Gym Trainer", "Personal Trainer", "Fitness Instructor", "Studio Coach"],
  beauty: ["Beautician", "Skin Therapist", "Hair Stylist", "Makeup Artist"],
  nutrition: ["Nutritionist", "Diet Coach", "Wellness Consultant"],
  front_desk: ["Front Desk Executive", "Receptionist", "Guest Relations Associate"],
};

interface Phase01Props {
  fullName: string;
  setFullName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  discipline: string;
  setDiscipline: (value: string) => void;
  preferredRole: string;
  setPreferredRole: (value: string) => void;
  profileImage: string | null;
  setProfileImage: (value: string | null) => void;
  onNext: () => void;
}

export function Phase01Foundation({
  fullName,
  setFullName,
  phone,
  setPhone,
  email,
  setEmail,
  location,
  setLocation,
  discipline,
  setDiscipline,
  preferredRole,
  setPreferredRole,
  profileImage,
  setProfileImage,
  onNext,
}: Phase01Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [validationMessage, setValidationMessage] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setValidationMessage("Image size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const [currentFirstName, ...restNameSegments] = fullName
    .split(" ")
    .map((entry) => entry.trim())
    .filter(Boolean);
  const firstName = currentFirstName ?? "";
  const lastName = restNameSegments.join(" ");
  const suggestedRoles = ROLE_OPTIONS[discipline] ?? [];
  const canContinue =
    firstName.trim().length > 1 &&
    phone.trim().length > 7 &&
    location.trim().length > 1 &&
    discipline.trim().length > 0 &&
    preferredRole.trim().length > 1;

  const updateFullName = (nextFirstName: string, nextLastName: string) => {
    setFullName([nextFirstName.trim(), nextLastName.trim()].filter(Boolean).join(" "));
  };

  const handleContinue = () => {
    const result = resumeStep1Schema.safeParse({
      fullName,
      phone,
      email,
      location,
      discipline,
      preferredRole,
      profileImage,
    });

    if (!result.success) {
      setValidationMessage(getFirstZodErrorMessage(result.error));
      return;
    }

    setValidationMessage("");
    onNext();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
      <header className="space-y-3">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-primary/70">
          Step 1
        </p>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Basic details
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-slate-500">
          Fill only the main details employers search first. Keep it simple and quick.
        </p>
      </header>

      <section className="flex flex-col items-center gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:flex-row">
        <div className="group relative">
          <Avatar className="size-32 border-4 border-slate-50 shadow-inner">
            <AvatarImage src={profileImage || ""} className="object-cover" />
            <AvatarFallback className="bg-slate-100 text-slate-400">
              <User className="size-12" />
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-110 active:scale-95"
          >
            <Camera className="size-5" />
          </button>
          {profileImage && (
            <button
              type="button"
              onClick={() => setProfileImage(null)}
              className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-slate-200 text-slate-600 shadow-md transition hover:bg-red-100 hover:text-red-600"
            >
              <X className="size-4" />
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-xl font-black text-slate-900">Profile Picture</h2>
          <p className="text-sm text-slate-500">
            Show your best self. Upload a professional, friendly photo.
          </p>
          <p className="text-xs font-bold text-primary/70">JPG or PNG, max 2MB</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <User className="size-4 text-primary" />
              First name
            </span>
            <input
              value={firstName}
              onChange={(event) => updateFullName(event.target.value, lastName)}
              placeholder="Enter your first name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <User className="size-4 text-primary" />
              Last name
              <span className="text-xs font-semibold text-slate-400">(optional)</span>
            </span>
            <input
              value={lastName}
              onChange={(event) => updateFullName(firstName, event.target.value)}
              placeholder="Enter your last name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Phone className="size-4 text-primary" />
              Mobile number
            </span>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="10-digit mobile number"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <MapPin className="size-4 text-primary" />
              Current city
            </span>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Example: Bengaluru"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
            />
          </label>

          <label className="space-y-2">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <BriefcaseBusiness className="size-4 text-primary" />
              Email
              <span className="text-xs font-semibold text-slate-400">(optional)</span>
            </span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@gmail.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
            />
          </label>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Choose your work category</h2>
            <p className="text-sm text-slate-500">
              Select the kind of job you want most.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {CATEGORY_OPTIONS.map((option) => {
              const isSelected = discipline === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setDiscipline(option.id);
                    if (!ROLE_OPTIONS[option.id]?.includes(preferredRole)) {
                      setPreferredRole(ROLE_OPTIONS[option.id]?.[0] ?? "");
                    }
                  }}
                  className={[
                    "rounded-full border px-4 py-3 text-sm font-black transition",
                    isSelected
                      ? "border-primary bg-primary text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-primary/40 hover:bg-white",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Preferred role</h2>
            <p className="text-sm text-slate-500">
              Pick the job title employers should see first.
            </p>
          </div>

          {suggestedRoles.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {suggestedRoles.map((role) => {
                const isSelected = preferredRole === role;

                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setPreferredRole(role)}
                    className={[
                      "rounded-full border px-4 py-3 text-sm font-bold transition",
                      isSelected
                        ? "border-secondary bg-secondary text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:border-secondary/40",
                    ].join(" ")}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          ) : null}

          <input
            value={preferredRole}
            onChange={(event) => setPreferredRole(event.target.value)}
            placeholder="Type your preferred role"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium outline-none transition focus:border-primary"
          />
        </div>
      </section>

      <div className="flex justify-end">
        {validationMessage ? (
          <p className="mr-auto self-center text-sm font-bold text-red-600">
            {validationMessage}
          </p>
        ) : null}
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
