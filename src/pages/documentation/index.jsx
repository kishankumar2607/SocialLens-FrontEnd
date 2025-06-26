import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiBookOpen,
  FiLayers,
  FiCpu,
  FiHelpCircle,
  FiDownload,
} from "react-icons/fi";

const DocumentationPage = () => {
  // Enable smooth scroll on mount
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background-dark text-white px-4 lg:px-40 py-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="container mx-auto flex flex-col md:flex-row gap-10 relative z-10">
        {/* Sidebar Navigation */}
        <aside className="hidden md:block md:w-1/4 border-r border-border-dark pr-6 sticky top-24 self-start">
          <nav className="space-y-4">
            <h2 className="text-lg font-bold uppercase text-text-tertiary mb-4">
              Sections
            </h2>
            <ul className="space-y-2">
              <li>
                <a href="#introduction" className="hover:text-primary">
                  1. Introduction
                </a>
              </li>
              <li>
                <a href="#setup" className="hover:text-primary">
                  2. Setup
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-primary">
                  3. API Reference
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary">
                  4. FAQs
                </a>
              </li>
              <li>
                <a href="#resources" className="hover:text-primary">
                  5. Resources
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 space-y-12">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold mb-2">📚 Documentation</h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Find all the information you need to set up, integrate, and master SocialLens.
            </p>
          </header>

          {/* Section 1 */}
          <section id="introduction" className="space-y-4 scroll-mt-20">
            <div className="flex items-center gap-3 mb-2">
              <FiBookOpen className="text-primary text-2xl" />
              <h2 className="text-2xl font-bold">1. Introduction</h2>
            </div>
            <p className="text-text-secondary">
              SocialLens offers a suite of tools for analyzing, scheduling, and growing your social media impact. Whether you're an influencer, a brand, or an agency, we provide everything you need.
            </p>
          </section>

          {/* Section 2 */}
          <section id="setup" className="space-y-4 border-t border-border-dark pt-6 scroll-mt-20">
            <div className="flex items-center gap-3 mb-2">
              <FiLayers className="text-primary text-2xl" />
              <h2 className="text-2xl font-bold">2. Setup Guide</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li>Create your account and verify your email.</li>
              <li>Connect your social media profiles (Instagram, Twitter, LinkedIn, Facebook).</li>
              <li>Configure notification and privacy settings in your dashboard.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="api" className="space-y-4 border-t border-border-dark pt-6 scroll-mt-20">
            <div className="flex items-center gap-3 mb-2">
              <FiCpu className="text-primary text-2xl" />
              <h2 className="text-2xl font-bold">3. API Reference</h2>
            </div>
            <p className="text-text-secondary">
              Access powerful APIs to automate posts, pull analytics, or integrate with your own systems.
            </p>
            <Link
              to="/api-reference"
              className="inline-block text-primary-light hover:underline"
            >
              → View full API docs
            </Link>
          </section>

          {/* Section 4 */}
          <section id="faq" className="space-y-4 border-t border-border-dark pt-6 scroll-mt-20">
            <div className="flex items-center gap-3 mb-2">
              <FiHelpCircle className="text-primary text-2xl" />
              <h2 className="text-2xl font-bold">4. FAQs</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary">
              <li><strong>How do I upgrade my plan?</strong> — Visit the billing section in your account settings.</li>
              <li><strong>Can I cancel anytime?</strong> — Yes, cancellations are immediate, and you won't be billed again.</li>
              <li><strong>Where can I access reports?</strong> — Go to the Reports tab on your dashboard for exports.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="resources" className="space-y-4 border-t border-border-dark pt-6 scroll-mt-20">
            <div className="flex items-center gap-3 mb-2">
              <FiDownload className="text-primary text-2xl" />
              <h2 className="text-2xl font-bold">5. Resources</h2>
            </div>
            <p className="text-text-secondary">
              Download our complete documentation PDF or reach out to our support team for additional help.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/downloads/sociallens-docs.pdf"
                className="btn-primary flex items-center gap-2"
              >
                <FiDownload /> Download Docs
              </a>
              <Link to="/support" className="btn-secondary">
                Contact Support
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DocumentationPage;
