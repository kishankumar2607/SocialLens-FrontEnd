import React from "react";
import { FiCheckCircle, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

const changelog = [
  {
    version: "v1.3.0",
    date: "Aujust 17, 2025",
    highlights: "🚀 Major Feature Update",
    changes: [
      "Added Instagram Stories scheduling support",
      "Introduced team collaboration with multi-user roles",
      "Improved dashboard loading speed by 40%",
      "Fixed minor UI glitches on mobile devices",
    ],
  },
  {
    version: "v1.2.0",
    date: "July 26, 2025",
    highlights: "✨ Enhancements & Fixes",
    changes: [
      "Launched dark mode theme across all views",
      "Updated analytics charts for better clarity",
      "Resolved issue with LinkedIn post scheduling",
      "Enhanced security on user login and sessions",
    ],
  },
  {
    version: "v1.1.0",
    date: "June 26, 2025",
    highlights: "🔥 Initial Public Release",
    changes: [
      "Released SocialLens core features: scheduling, analytics, reports",
      "Integrated Facebook, Twitter, LinkedIn, and Instagram",
      "Added customizable performance dashboards",
    ],
  },
];

const ChangelogPage = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white px-6 py-16">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-2xl rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">📋 Changelog</h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Stay updated on all the latest improvements, fixes, and new features
            we’re rolling out at SocialLens.
          </p>
        </header>

        {/* Changelog List */}
        <div className="space-y-10">
          {changelog.map((entry, idx) => (
            <div
              key={idx}
              className="bg-surface-dark rounded-xl border border-border-dark p-6 shadow-lg space-y-4 hover:scale-[1.02] transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{entry.version}</h2>
                <span className="text-sm text-text-tertiary">{entry.date}</span>
              </div>
              <div className="flex items-center gap-2 text-primary-light text-sm">
                <FiStar />
                <span>{entry.highlights}</span>
              </div>
              <ul className="list-disc pl-6 space-y-2 text-sm text-text-secondary">
                {entry.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheckCircle className="mt-[2px] text-green-400" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 space-y-2">
          <h2 className="text-2xl font-bold pb-4">
            Have feedback or feature requests?
          </h2>
          <Link to="/support" className="btn-primary inline-block">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;
