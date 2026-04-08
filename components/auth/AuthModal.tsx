"use client";

import { cloneElement, type MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Sparkles, Verified } from "lucide-react";
import { CountryCodeSelector } from "./CountryCodeSelector";
import { countries, Country } from "@/lib/countries";
import {
  type CandidateTokenPayload,
  saveCandidateLogin,
  useCandidateSession,
} from "@/lib/auth/candidate-session";
import {
  candidateOtpSchema,
  candidatePhoneSchema,
  getFirstZodErrorMessage,
} from "@/lib/validation/forms";

interface AuthModalProps {
  children?: React.ReactElement;
}

type CandidateStep = "phone" | "otp" | "success";
type CandidateAction = "send" | "verify" | null;

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
function getApiErrorMessage(payload: unknown, fallbackMessage: string) {
  if (!payload || typeof payload !== "object") {
    return fallbackMessage;
  }

  const message = (payload as { message?: string | string[] }).message;
  if (Array.isArray(message)) {
    return message.join(", ");
  }

  return typeof message === "string" ? message : fallbackMessage;
}

function normalizeCandidatePhone(country: Country, rawPhoneNumber: string) {
  const digits = rawPhoneNumber.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const dialDigits = country.dial_code.replace(/\D/g, "");
  const localNumber = digits.startsWith(dialDigits) ? digits.slice(dialDigits.length) : digits;

  return `+${dialDigits}${localNumber}`;
}

function formatPhoneInput(rawPhoneNumber: string) {
  const digits = rawPhoneNumber.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)} ${digits.slice(5)}`.trim();
}

// Custom Brand Icons since they are missing in this lucide-react version
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function AuthModal({ children }: AuthModalProps) {
  const router = useRouter();
  const session = useCandidateSession();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.code === "IN") || countries[0]
  );
  const [candidatePhone, setCandidatePhone] = useState("");
  const [candidateOtp, setCandidateOtp] = useState("");
  const [candidateStep, setCandidateStep] = useState<CandidateStep>("phone");
  const [candidateAction, setCandidateAction] = useState<CandidateAction>(null);
  const [candidateError, setCandidateError] = useState("");
  const [candidateMessage, setCandidateMessage] = useState("");

  const resetCandidateState = () => {
    setCandidatePhone("");
    setCandidateOtp("");
    setCandidateStep("phone");
    setCandidateAction(null);
    setCandidateError("");
    setCandidateMessage("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      resetCandidateState();
    }
  };

  const candidatePhoneNumber = normalizeCandidatePhone(selectedCountry, candidatePhone);
  const isSendingOtp = candidateAction === "send";
  const isVerifyingOtp = candidateAction === "verify";
  const defaultTrigger = (
    <Button size="lg" className="rounded-full signature-gradient text-on-primary font-black shadow-xl hover:scale-105 transition-transform px-8 h-12">
      {session ? "Open Dashboard" : "Get Started"}
    </Button>
  );

  if (session) {
    const sessionAwareTrigger = children || defaultTrigger;

    return cloneElement(sessionAwareTrigger, {
      ...sessionAwareTrigger.props,
      onClick: (event: MouseEvent) => {
        sessionAwareTrigger.props.onClick?.(event);

        if (!event.defaultPrevented) {
          router.push("/dashboard/candidate");
        }
      },
    });
  }

  const handleSendOtp = async () => {
    if (selectedCountry.code !== "IN") {
      setCandidateError("Candidate mobile login is available for Indian numbers right now.");
      return;
    }

    const phoneResult = candidatePhoneSchema.safeParse(candidatePhone.replace(/\D/g, ""));
    if (!phoneResult.success) {
      setCandidateError(getFirstZodErrorMessage(phoneResult.error));
      return;
    }

    setCandidateAction("send");
    setCandidateError("");
    setCandidateMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/verification/send-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: candidatePhoneNumber,
        }),
      });

      const payload = (await response.json().catch(() => null)) as unknown;
      if (!response.ok) {
        throw new Error(getApiErrorMessage(payload, "Failed to send OTP."));
      }

      setCandidateStep("otp");
      
      // Development mock: auto-fill OTP
      if (process.env.NODE_ENV !== "production") {
        setCandidateOtp("123456");
        setCandidateMessage(`[DEV] OTP bypassed. Click Verify to continue.`);
      } else {
        setCandidateOtp("");
        setCandidateMessage(`OTP sent to ${candidatePhoneNumber}.`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send OTP.";
      setCandidateError(message);
    } finally {
      setCandidateAction(null);
    }
  };

  const handleVerifyOtp = async () => {
    const otpResult = candidateOtpSchema.safeParse(candidateOtp);
    if (!otpResult.success) {
      setCandidateError(getFirstZodErrorMessage(otpResult.error));
      return;
    }

    setCandidateAction("verify");
    setCandidateError("");
    setCandidateMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/candidate/mobile-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: candidatePhoneNumber,
          code: candidateOtp,
        }),
      });

      const payload = (await response.json().catch(() => null)) as unknown;
      if (!response.ok) {
        throw new Error(getApiErrorMessage(payload, "Failed to verify OTP."));
      }

      saveCandidateLogin(payload as CandidateTokenPayload, candidatePhoneNumber);

      setCandidateStep("success");
      setCandidateMessage("Taking you to your candidate dashboard...");
      handleOpenChange(false);
      router.push("/dashboard/candidate");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to verify OTP.";
      setCandidateError(message);
    } finally {
      setCandidateAction(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          children || defaultTrigger
        }
      />
      <DialogContent className="sm:max-w-none md:max-w-4xl w-[calc(100%-2rem)] p-0 overflow-hidden border-none rounded-[2rem] bg-transparent shadow-2xl">
        <DialogTitle className="sr-only">Get Started</DialogTitle>
        <div className="relative w-full flex flex-col md:flex-row bg-surface-container-lowest glass-effect min-h-[500px]">
          {/* Side Visual - Asymmetric Design */}
          <div className="hidden md:flex md:w-[35%] signature-gradient p-10 flex-col justify-between text-on-primary relative overflow-hidden">
            <div className="z-10 space-y-6">
              <div className="bg-white/20 p-3 rounded-2xl w-fit backdrop-blur-md">
                <Sparkles className="size-8 fill-current" />
              </div>
              <h2 className="text-4xl font-black leading-tight tracking-tight font-display">
                Elevate Your Path.
              </h2>
              <p className="text-on-primary/80 font-medium text-sm leading-relaxed max-w-[200px]">
                Join 50,000+ wellness professionals finding their purpose in India&apos;s leading health ecosystem.
              </p>
            </div>

            <div className="mt-auto z-10">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] opacity-80 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 w-fit">
                <Verified className="size-4" />
                Curated Opportunities
              </div>
            </div>

            {/* Abstract Decorative Shape */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary-container rounded-full blur-[100px] opacity-40"></div>
          </div>

          {/* Form Content Area */}
          <div className="flex-1 p-8 md:p-12 relative flex flex-col">
            <Tabs defaultValue="candidate" className="w-full">
              <div className="flex justify-center md:justify-start mb-10">
                <TabsList className="bg-surface-container-high/60 h-11 rounded-full p-1 border border-outline-variant/10 flex w-fit mx-auto">
                  <TabsTrigger
                    value="candidate"
                    className="rounded-full !p-0 w-[150px] h-full font-black text-[10px] uppercase tracking-widest data-active:bg-white data-active:text-primary data-active:shadow-lg transition-all border-none flex items-center justify-center text-center gap-0 hover:cursor-pointer"
                  >
                    I&apos;m a Candidate
                  </TabsTrigger>
                  <TabsTrigger
                    value="employer"
                    className="rounded-full !p-0 w-[150px] h-full font-black text-[10px] uppercase tracking-widest data-active:bg-white data-active:text-primary data-active:shadow-lg transition-all text-on-surface-variant/60 hover:text-primary border-none flex items-center justify-center text-center gap-0 hover:cursor-pointer"
                  >
                    I&apos;m an Employer
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="candidate" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                <div className="space-y-2">
                  <h1 className="text-4xl font-black text-foreground tracking-tight font-display">Find Your Zen Career</h1>
                  <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest opacity-80">Mindful opportunities await you today.</p>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-14 rounded-full border-outline-variant/20 hover:bg-surface-container-low transition-all group flex items-center justify-center gap-3">
                    <LinkedInIcon className="size-5 text-[#0077b5]" />
                    <span className="font-black text-sm uppercase tracking-wider">LinkedIn</span>
                  </Button>
                  <Button className="h-14 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white hover:opacity-90 transition-all flex items-center justify-center gap-3 border-none">
                    <InstagramIcon className="size-5" />
                    <span className="font-black text-sm uppercase tracking-wider">Instagram</span>
                  </Button>
                </div>

                <div className="relative py-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant/10"></div>
                  </div>
                  <span className="relative bg-surface-container-lowest px-4 text-[10px] font-black tracking-[0.3em] text-outline uppercase">or continue with</span>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2 px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant ml-4 block">Mobile Phone</label>
                    <div className="flex h-16 bg-surface-container-highest rounded-full focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-surface-container-lowest transition-all group relative">
                      <CountryCodeSelector
                        selectedCountry={selectedCountry}
                        onSelect={setSelectedCountry}
                      />
                      <Input
                        placeholder="98765 43210"
                        type="tel"
                        inputMode="numeric"
                        value={formatPhoneInput(candidatePhone)}
                        onChange={(event) => {
                          setCandidatePhone(event.target.value.replace(/\D/g, "").slice(0, 10));
                        }}
                        className="flex-1 h-full px-6 bg-transparent border-none rounded-r-full focus-visible:ring-0 focus-visible:bg-transparent transition-none placeholder:text-outline/40 font-black text-lg"
                      />
                    </div>
                  </div>

                  {candidateStep !== "phone" && (
                    <div className="space-y-2 px-1">
                      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant ml-4 block">OTP Code</label>
                      <Input
                        placeholder="123456"
                        type="text"
                        inputMode="numeric"
                        value={candidateOtp}
                        onChange={(event) => {
                          setCandidateOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                        }}
                        className="h-16 px-8 bg-surface-container-highest border-none rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-surface-container-lowest transition-all placeholder:text-outline/40 font-black text-lg tracking-[0.4em] text-center"
                      />
                    </div>
                  )}

                  {candidateError && (
                    <p className="px-4 text-sm font-bold text-red-500">{candidateError}</p>
                  )}

                  {candidateMessage && (
                    <p className="px-4 text-sm font-bold text-emerald-600">{candidateMessage}</p>
                  )}

                  {candidateStep === "phone" ? (
                    <Button
                      onClick={handleSendOtp}
                      disabled={isSendingOtp}
                      className="w-full h-16 signature-gradient text-on-primary rounded-full font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-none disabled:hover:scale-100"
                    >
                      {isSendingOtp ? (
                        <span className="inline-flex items-center gap-2">
                          <LoaderCircle className="size-5 animate-spin" />
                          Sending OTP
                        </span>
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <Button
                        onClick={handleVerifyOtp}
                        disabled={isVerifyingOtp || candidateStep === "success"}
                        className="w-full h-16 signature-gradient text-on-primary rounded-full font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all border-none disabled:hover:scale-100"
                      >
                        {isVerifyingOtp ? (
                          <span className="inline-flex items-center gap-2">
                            <LoaderCircle className="size-5 animate-spin" />
                            Verifying
                          </span>
                        ) : candidateStep === "success" ? (
                          "Signed In"
                        ) : (
                          "Verify & Continue"
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp || isVerifyingOtp}
                        className="w-full h-12 rounded-full border-outline-variant/20"
                      >
                        Resend OTP
                      </Button>
                    </div>
                  )}
                </div>

                <p className="text-center text-[10px] text-outline font-black uppercase tracking-[0.1em] px-8 leading-relaxed opacity-60">
                  By signing up, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </TabsContent>

              <TabsContent value="employer" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                <div className="space-y-2">
                  <h1 className="text-4xl font-black text-foreground tracking-tight font-display">Hire Wellness Pros</h1>
                  <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest opacity-80">Build a team that breathes vitality.</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2 px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant ml-4 block">Business Email</label>
                    <Input
                      placeholder="name@company.com"
                      type="email"
                      className="h-16 px-8 bg-surface-container-highest border-none rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-surface-container-lowest transition-all placeholder:text-outline/40 font-black text-lg"
                    />
                  </div>
                  <div className="space-y-2 px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant ml-4 block">Password</label>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      className="h-16 px-8 bg-surface-container-highest border-none rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-surface-container-lowest transition-all placeholder:text-outline/40 font-black text-lg"
                    />
                  </div>

                  <Button className="w-full h-16 bg-foreground text-background rounded-full font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all border-none">
                    Employer Login 💼
                  </Button>
                </div>

                <div className="relative py-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant/10"></div>
                  </div>
                  <span className="relative bg-surface-container-lowest px-4 text-[10px] font-black tracking-[0.3em] text-outline uppercase">Professional Verification</span>
                </div>

                <Button variant="outline" className="w-full h-16 rounded-full border-2 border-primary/20 text-primary font-black text-lg hover:bg-primary/5 transition-all flex items-center justify-center gap-3">
                  <LinkedInIcon className="size-6 text-[#0077b5]" />
                  <span>Login with LinkedIn</span>
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
