"use client";

import { JobsHero } from "@/components/jobs/JobsHero";
import { VibeMatch } from "@/components/jobs/VibeMatch";
import { JobGrid } from "@/components/jobs/JobGrid";
import { JobsSidebar } from "@/components/jobs/JobsSidebar";

export default function JobsPage() {
  return (
    <main className="min-h-screen pt-20 pb-32 px-4 md:px-8 max-w-7xl mx-auto space-y-16">
      <JobsHero />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-20">
          <VibeMatch />
          <JobGrid />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 sticky top-32 h-fit">
          <JobsSidebar />
        </div>
      </div>
    </main>
  );
}
