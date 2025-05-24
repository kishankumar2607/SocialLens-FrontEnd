import React from "react";

const CookiesPolicy = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white px-6 py-16 overflow-hidden">
      {/* Glowing Background */}
      <div className="absolute top-10 left-1/3 w-72 h-72 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">
          Cookies Policy
        </h1>
        <p className="text-sm text-text-tertiary mb-10 text-center">
          Effective Date: May 22, 2025
        </p>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <p className="text-text-secondary">
            This Cookies Policy explains how <strong>SocialLens</strong> uses
            cookies and similar technologies when you visit or interact with our
            platform.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">1. What Are Cookies?</h2>
          <p className="text-text-secondary">
            Cookies are small data files stored on your device to help websites
            remember information about your visit. They enhance user experience,
            remember preferences, and gather analytics.
          </p>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Cookies</h2>
          <p className="text-text-secondary mb-2">We use cookies to:</p>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary">
            <li>Remember login details and preferences</li>
            <li>Understand how users interact with the platform</li>
            <li>Provide relevant content and ads</li>
            <li>Improve performance and security</li>
          </ul>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">3. Types of Cookies</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary">
            <li>
              <strong>Essential:</strong> Required for core functionalities like
              authentication.
            </li>
            <li>
              <strong>Analytics:</strong> Help track usage and performance.
            </li>
            <li>
              <strong>Marketing:</strong> Used to deliver personalized
              advertisements.
            </li>
          </ul>
        </section>

        <section className="mb-10 border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">4. Managing Cookies</h2>
          <p className="text-text-secondary">
            You can control or delete cookies through your browser settings.
            Disabling some cookies may impact your experience.
          </p>
        </section>

        <section className="border-l-4 border-primary pl-6">
          <h2 className="text-2xl font-semibold mb-2">5. Contact</h2>
          <p className="text-text-secondary">
            For questions about our cookies policy, email us at{" "}
            <span className="text-primary-light underline">
              privacy@sociallens.com
            </span>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiesPolicy;
