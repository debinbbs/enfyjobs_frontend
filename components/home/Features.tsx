"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FileText, Cpu, MousePointerClick } from "lucide-react";

export function Features() {
  const features = [
    { 
      icon: <FileText className="size-8" />, 
      title: "Resume in Seconds ⚡", 
      desc: "Answer a few simple questions and let our AI craft a job-ready resume that highlights your wellness credentials instantly.",
      color: "bg-primary text-primary-foreground"
    },
    { 
      icon: <Cpu className="size-8" />, 
      title: "Ace Interviews 🎯", 
      desc: "Practice with our AI-powered interview coach. Get real-time feedback on your responses and boost your hireability.",
      color: "bg-secondary text-secondary-foreground"
    },
    { 
      icon: <MousePointerClick className="size-8" />, 
      title: "Swipe. Match. Get Hired 🔥", 
      desc: "Forget boring job boards. Swipe right on jobs you love and get direct matches with top wellness centers in India.",
      color: "bg-tertiary-container text-on-tertiary"
    }
  ];

  return (
    <section className="py-24">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black font-display mb-6">The Toolkit for Your Growth</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">Everything you need to navigate the wellness industry landscape with confidence.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
