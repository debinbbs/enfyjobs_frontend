import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A110F] text-zinc-300 py-32 px-6 md:px-10">
      <div className="max-w-4xl mx-auto bg-[#101815] border border-white/5 rounded-3xl p-8 md:p-14 space-y-12">
        
        {/* Header Section */}
        <div className="space-y-4 border-b border-white/5 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-500 font-medium">Last Updated: April 2026</p>
        </div>

        {/* Intro */}
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Welcome to <span className="text-white font-bold">Wellness Jobs India</span> ("we," "us," or "our"). 
            We operate as a dedicated platform connecting wellness professionals with job opportunities across India. 
            Our platform allows users to submit their CVs, build professional profiles, and discover wellness roles, 
            while enabling employers to find the right talent.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, and share your information when you use our website 
            and services to help you find, coordinate, and maintain wellness employment. By using our platform, 
            you consent to the data practices described in this policy.
          </p>
        </div>

        {/* 1. Scope and Applicability */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">1. Scope and Applicability</h2>
          <p className="text-lg leading-relaxed">
            This Privacy Policy applies to all users of our platform, including wellness professionals seeking 
            employment ("Job Seekers") and organizations or individuals looking to hire wellness staff ("Employers").
          </p>
        </div>

        {/* 2. Information We Collect */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">2. Information We Collect and Their Sources</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-container">A. Information You Provide</h3>
            <p className="text-lg leading-relaxed">When you register or use our services, we collect information directly from you, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li><strong className="text-white">Account Data:</strong> Name, email address, phone number, and location.</li>
              <li><strong className="text-white">Professional Information:</strong> Your CV/Resume, cover letters, skills, education, work experience, certifications, and expected salary.</li>
              <li><strong className="text-white">Profile Details:</strong> Photos, job preferences (e.g., full-time, part-time, freelance), and areas of expertise in the wellness sector.</li>
              <li><strong className="text-white">Training & Growth Data:</strong> Progress in training modules, certifications earned, skills assessments, and professional development history on our platform.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-container">B. Automatically Collected Information</h3>
            <p className="text-lg leading-relaxed">We may automatically collect technical data when you use our platform, such as:</p>
            <ul className="list-disc pl-6 space-y-2 text-lg">
              <li>IP address, browser type, and device information.</li>
              <li>Usage data including pages visited, jobs viewed, and interactions on our platform.</li>
              <li>Cookies and tracking technologies to enhance user experience and analyze platform traffic.</li>
            </ul>
          </div>
        </div>

        {/* 3. Purposes For Which We Use Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">3. Purposes For Which We Use Information</h2>
          <p className="text-lg leading-relaxed">We use the collected information to operate our platform and provide jobs to our users. Specifically, we use it to:</p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>Connect Job Seekers with matching Employers in the wellness industry.</li>
            <li>Process and share your CV/Resume with verified Employers on our platform.</li>
            <li>Provide AI-powered features like resume building and interview preparation.</li>
            <li>Enable direct communication between Employers and Job Seekers.</li>
            <li>Customize jobs, alerts, and promotional content based on your interests.</li>
            <li>Detect and prevent fraud, ensuring a safe community for all users.</li>
          </ul>
        </div>

        {/* 4. How We Disclose Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">4. How We Disclose Information</h2>
          <p className="text-lg leading-relaxed">To facilitate the hiring process, we share information with the following parties:</p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li><strong className="text-white">With Employers:</strong> When you apply for a job or make your profile public, your CV, contact details, and professional information will be shared with prospective employers to facilitate hiring.</li>
            <li><strong className="text-white">With Service Providers:</strong> Third-party vendors who help us operate our site (e.g., hosting, payment processing, email delivery, AI tools integration).</li>
            <li><strong className="text-white">Legal Obligations:</strong> We may disclose information if required by law or to protect the safety and rights of our users and platform.</li>
          </ul>
        </div>

        {/* 5. Your Choices and Rights */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">5. Your Privacy Rights and Choices</h2>
          <p className="text-lg leading-relaxed">You have full control over your professional data:</p>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li><strong className="text-white">Profile Visibility:</strong> You can choose whether your CV and profile are searchable by all Employers or only visible when you directly apply for a role.</li>
            <li><strong className="text-white">Update/Delete:</strong> You can update your CV, edit your profile, or delete your account entirely at any time through your dashboard.</li>
            <li><strong className="text-white">Communications:</strong> You can opt in or opt out of job alerts and marketing emails via your account settings.</li>
          </ul>
        </div>

        {/* 6. Children's Privacy */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">6. Children's Privacy & Age Requirements</h2>
          <p className="text-lg leading-relaxed">
            Our platform is designed for individuals aged <strong className="text-white">sixteen (16) and above</strong>. We do not knowingly collect personal information from children under the age of 16. If you are under 16, please do not use or provide any information on this platform. If we learn we have collected personal information from a child under 16 without parental consent, we will delete that information immediately.
          </p>
        </div>

        {/* 7. Data Security and Retention */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">7. Data Security and Retention</h2>
          <p className="text-lg leading-relaxed">
            We implement administrative, technical, and physical security measures to protect your CV and personal data. 
            We retain your information as long as your account is active or as needed to provide you with employment opportunities. 
            Once you delete your account, your CV and profile data are removed from our active databases.
          </p>
        </div>

        {/* 8. Contact Us */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">8. Contact Us</h2>
          <p className="text-lg leading-relaxed">
            If you have questions regarding your data or this Privacy Policy, please contact our support team at:
          </p>
          <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/5">
            <p className="font-bold text-white">Wellness Jobs India</p>
            <p className="text-zinc-400">Email: privacy@wellnessjobsindia.com</p>
          </div>
        </div>

      </div>
    </div>
  );
}
