import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white px-6 py-16 overflow-hidden">
      {/* Glowing Background Elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Terms of Service</h1>
        <p className="text-sm text-text-tertiary mb-10 text-center">Effective Date: May 22, 2025</p>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <p className="text-text-secondary">
            Welcome to <strong>SocialLens</strong>! By accessing or using our platform, you agree to the following terms and conditions.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">1. Use of Service</h2>
          <p className="text-text-secondary">
            You must be at least 13 years old to use SocialLens. You are responsible for any activity under your account.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">2. Account Responsibility</h2>
          <p className="text-text-secondary">
            Keep your login credentials secure. You’re responsible for all activity that occurs under your account.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">3. Prohibited Use</h2>
          <ul className="space-y-2 text-text-secondary mt-3">
            {[
              "Misusing the platform or interfering with its operations.",
              "Uploading harmful, illegal, or abusive content.",
              "Attempting unauthorized access to our systems or accounts."
            ].map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <FaCheckCircle className="text-error mt-1" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">4. Intellectual Property</h2>
          <p className="text-text-secondary">
            All content on SocialLens is our property or licensed for our use. You may not copy, modify, or redistribute it without permission.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">5. Termination</h2>
          <p className="text-text-secondary">
            We reserve the right to suspend or terminate your access at our discretion if you violate any of these terms.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
          <p className="text-text-secondary">
            We may update these terms from time to time. Continuing to use the platform means you accept the revised terms.
          </p>
        </section>

        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p className="text-text-secondary">
            If you have any questions about these Terms, email us at{" "}
            <span className="text-primary-light underline">legal@sociallens.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
