import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0A110F] text-zinc-300 py-32 px-6 md:px-10">
      <div className="max-w-4xl mx-auto bg-[#101815] border border-white/5 rounded-3xl p-8 md:p-14 space-y-12">
        
        {/* Header Section */}
        <div className="space-y-4 border-b border-white/5 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Terms of Service</h1>
          <p className="text-zinc-500 font-medium">Last Updated: April 2026</p>
        </div>

        {/* Notice */}
        <div className="space-y-4 bg-red-950/20 border border-red-900/30 rounded-2xl p-6">
          <p className="text-red-400 font-bold tracking-wide uppercase text-sm">Important Notice</p>
          <p className="text-lg leading-relaxed">
            Please read these Terms of Service (the "Terms" or "Agreement") carefully. By accessing or using the Wellness Jobs India website, applications, or services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to all the terms and conditions, you must not use our services.
          </p>
        </div>

        {/* 1. Description of Services */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Description of Services & Limitation</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              <strong className="text-white">Our Platform:</strong> Wellness Jobs India operates as a specialized employment and talent connection platform for the wellness sector. We collect CVs/Resumes from individuals seeking employment ("Job Seekers") and match them with organizations, centers, and individuals looking to hire wellness professionals ("Employers").
            </p>
            <p>
              <strong className="text-white">AI Services & Training Exposure:</strong> We offer advanced AI-powered tools, including AI Resume builders, Candidate Fit Score engines, and Interview Simulators. Additionally, we provide users with exposure to industry-standard training modules, certifications, and professional development resources to enhance career readiness. You are solely responsible for verifying the accuracy of any AI-generated content or training certifications before relying on them.
            </p>
            <p>
              <strong className="text-white">Limitations:</strong> While we curate and match profiles and provide training exposure, we do not directly employ the Job Seekers posted on our site (unless explicitly stated otherwise). The final decision, interviewing, background verification, and employment relationship are strictly between the Job Seeker and the Employer. We do not guarantee employment, nor do we guarantee the quality, safety, or legality of the jobs posted.
            </p>
          </div>
        </div>

        {/* 2. Eligibility */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">2. Eligibility</h2>
          <p className="text-lg leading-relaxed">By using our platform, you represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>You are at least sixteen (16) years of age.</li>
            <li>You are legally permitted to work within India (for Job Seekers) or legally operating a registered business in India (for Employers).</li>
            <li>You have not been convicted of any serious criminal offenses involving theft, fraud, violence, or abuse.</li>
            <li>You will use the platform exclusively for finding wellness-related employment or hiring wellness professionals.</li>
          </ul>
        </div>

        {/* 3. Training & Professional Exposure */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Training & Professional Exposure</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Wellness Jobs India is committed to the professional growth of our users. By using the platform, you may gain access to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Skill Development:</strong> Curated training programs and workshops designed for the wellness industry.</li>
              <li><strong className="text-white">Industry Exposure:</strong> Direct insights into wellness sector trends, employer expectations, and career pathways.</li>
              <li><strong className="text-white">Certifications:</strong> Access to third-party or platform-specific certifications to validate your expertise.</li>
            </ul>
            <p>
              Please note that "Training Exposure" refers to the provision of resources and opportunities and does not constitute a legal guarantee of skill mastery or employment success.
            </p>
          </div>
        </div>

        {/* 4. User Responsibilities & Content Rules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. User Responsibilities & Content Rules</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              When you create an account, upload a CV, post a job, or communicate on Wellness Jobs India, you agree to the following rules:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Accuracy:</strong> All information you provide (including your CV, qualifications, and identity) must be accurate, current, and complete.</li>
              <li><strong className="text-white">Prohibited Content:</strong> You will not post or transmit any discriminatory, offensive, defamatory, or unlawful material.</li>
              <li><strong className="text-white">No Scraping:</strong> You will not use automated systems, bots, or scripts to harvest data, CVs, or job postings from our site.</li>
              <li><strong className="text-white">Exclusive Use:</strong> You will not use the platform for commercial solicitation or any purpose other than finding or offering wellness care jobs.</li>
            </ul>
            <p>
              Wellness Jobs India reserves the right to review, edit, or delete any content or account that violates these rules or threatens the safety of our community.
            </p>
          </div>
        </div>

        {/* 5. Background and Verification Checks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Verification & Background Checks</h2>
          <p className="text-lg leading-relaxed">
            While we strive to ensure a safe environment, <strong className="text-white">Employers are solely responsible</strong> for performing reference checks, verifying qualifications, and conducting necessary background screenings before hiring a candidate. Similarly, Job Seekers must conduct their own due diligence before accepting an offer. We may periodically run preliminary identity or professional verification checks on our users, but we do not guarantee the completeness or accuracy of these checks.
          </p>
        </div>

        {/* 6. Payments and Refunds */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Payments, Subscriptions & Refunds</h2>
          <p className="text-lg leading-relaxed">
            Certain premium features (e.g., premium job listings, advanced AI interview prep, top-tier candidate matching) may require a fee or subscription. By selecting a paid service, you agree to our pricing and payment terms. 
            All subscriptions will automatically renew until canceled. Payments are securely processed via third-party providers. Except as explicitly stated, all payments are non-refundable.
          </p>
        </div>

        {/* 7. Disclaimers, Liability & Indemnification */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">7. Disclaimers and Limitations of Liability</h2>
          <ul className="list-disc pl-6 space-y-4 text-lg leading-relaxed">
            <li><strong className="text-white">No Warranties:</strong> The platform and AI services are provided on an "as is" and "as available" basis without any warranties of any kind. We do not guarantee that the site will be error-free or that it will meet your specific employment requirements.</li>
            <li><strong className="text-white">Limitation of Liability:</strong> In no event will Wellness Jobs India be liable for any indirect, special, incidental, or consequential damages arising out of your use of the platform, the hiring process, or workplace disputes.</li>
            <li><strong className="text-white">Indemnification:</strong> You agree to indemnify and hold harmless Wellness Jobs India, its officers, directors, and employees from any claims, losses, or damages arising out of your violation of these Terms or your interactions with other users.</li>
          </ul>
        </div>

        {/* 8. Governing Law & Dispute Resolution */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">8. Governing Law & Arbitration</h2>
          <p className="text-lg leading-relaxed">
            These Terms shall be governed by the laws of India. Any dispute, claim, or controversy arising out of or relating to these Terms or the use of the platform shall be subject to the exclusive jurisdiction of the competent courts located in India. By using this service, you agree to attempt to resolve any disputes informally through our support team before pursuing formal legal action.
          </p>
        </div>

        {/* 9. Account Termination */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">9. Account Termination</h2>
          <p className="text-lg leading-relaxed">
            We reserve the right to suspend or terminate your access to the platform at any time, without prior notice, if we believe you have violated these Terms, misrepresented your identity or qualifications, or pose a risk to other users. You may also delete your account at any time via your dashboard settings.
          </p>
        </div>

        {/* 10. Contact Us */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">10. Contact Us</h2>
          <p className="text-lg leading-relaxed">
            If you have questions regarding these Terms or need to notify us of any violations, please reach out to our legal and support team:
          </p>
          <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/5">
            <p className="font-bold text-white">Wellness Jobs India - Legal Department</p>
            <p className="text-zinc-400">Email: legal@wellnessjobsindia.com</p>
          </div>
        </div>

      </div>
    </div>
  );
}
