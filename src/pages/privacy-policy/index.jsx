import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white px-6 py-16 overflow-hidden">
      {/* Glowing Backgrounds */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Privacy Policy</h1>
        <p className="text-sm text-text-tertiary mb-10 text-center">Last updated: May 22, 2025</p>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <p className="text-text-secondary">
            We may collect information you provide such as your name, email address, social media handles, and usage data.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="space-y-2 text-text-secondary mt-3">
            {[
              "Provide and maintain our services",
              "Send you updates and promotional content",
              "Improve user experience and analytics"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <FaCheckCircle className="text-primary-light mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">3. Sharing Your Information</h2>
          <p className="text-text-secondary">
            We do not sell or rent your data. We may share information with third-party tools strictly for service enhancements.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">4. Security</h2>
          <p className="text-text-secondary">
            We implement appropriate security measures to protect your data. However, no method is 100% secure online.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
          <p className="text-text-secondary">
            You can access, modify, or delete your data anytime. Contact us for assistance.
          </p>
        </section>

        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
          <p className="text-text-secondary">
            If you have questions about this Privacy Policy, contact us at{" "}
            <span className="text-primary-light underline">support@sociallens.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
