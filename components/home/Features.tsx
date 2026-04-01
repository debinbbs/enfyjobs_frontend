"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles, Target, WandSparkles } from "lucide-react";

export function Features() {
  const features = [
    { 
      icon: <FileText className="size-8" />, 
      title: "Build a resume that gets noticed", 
      desc: "Turn your skills, certifications, and experience into a cleaner profile that is easier for employers to evaluate.",
      color: "bg-primary text-primary-foreground"
    },
    { 
      icon: <Target className="size-8" />, 
      title: "Practice before the real interview", 
      desc: "Use guided prep to sharpen your responses, improve confidence, and show up more ready when opportunities come in.",
      color: "bg-secondary text-secondary-foreground"
    },
    { 
      icon: <Sparkles className="size-8" />, 
      title: "Discover roles in a way that feels natural", 
      desc: "Swipe, save, and explore openings across wellness categories without the friction of a traditional job board.",
      color: "bg-tertiary-container text-on-tertiary"
    },
    { 
      icon: <WandSparkles className="size-8" />, 
      title: "Grow your next move", 
      desc: "Improve your profile over time with guided tools, clearer positioning, and candidate support that helps you stay job-ready.",
      color: "bg-tertiary-container text-on-tertiary"
    }
  ];

  return (
    <section className="py-24">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black font-display mb-6">Everything a wellness candidate needs in one place</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
          Wellnessjobsindia is designed around the candidate journey, from role discovery and resume building to interview preparation and long-term growth.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <Card key={i} className="group p-10 rounded-3xl bg-muted/50 hover:bg-card transition-all duration-500 shadow-xl hover:shadow-2xl flex flex-col gap-8 border-transparent hover:border-primary/10 cursor-default">
            <CardContent className="p-0 space-y-8">
              <div className={`size-16 rounded-2xl flex items-center justify-center ${f.color} shadow-lg`}>
                {f.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black font-display">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
