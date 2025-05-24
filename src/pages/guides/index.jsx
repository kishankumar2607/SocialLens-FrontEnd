import React, { useState } from "react";
import { FiBookOpen, FiAward, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const guides = [
  {
    title: "Getting Started with SocialLens",
    summary:
      "Learn how to set up your account, connect social media platforms, and start tracking your analytics.",
    link: "#",
  },
  {
    title: "Advanced Analytics Tips",
    summary:
      "Discover how to leverage advanced features to boost engagement, improve content, and drive results.",
    link: "#",
  },
  {
    title: "Scheduling Your First Post",
    summary:
      "A step-by-step tutorial on how to schedule posts across multiple platforms using SocialLens.",
    link: "#",
  },
  {
    title: "Optimizing Hashtags and Captions",
    summary:
      "Tips and tricks for crafting effective hashtags and captions that resonate with your audience.",
    link: "#",
  },
];

const GuidesPage = () => {
  const [hoveredGuide, setHoveredGuide] = useState(null);

  return (
    <div className="relative min-h-screen bg-background-dark text-white px-6 py-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Guides & Tutorials</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our curated guides to help you make the most out of
            SocialLens. Whether you’re just starting or looking to level up,
            we’ve got something for you.
          </p>
        </section>

        {/* Guide Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredGuide(index)}
              onMouseLeave={() => setHoveredGuide(null)}
              className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition relative"
            >
              <FiBookOpen className="text-primary text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
              <p className="text-text-secondary text-sm mb-4">
                {guide.summary}
              </p>
              <a
                href={guide.link}
                className="inline-flex items-center text-primary-light hover:underline text-sm"
              >
                Read Guide <FiArrowRight className="ml-2" />
              </a>
              {hoveredGuide === index && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-neon-purple w-1 h-full rounded-l-md animate-fade-in" />
              )}
            </div>
          ))}
        </section>

        {/* Highlight Section */}
        <section className="bg-surface-dark rounded-xl border border-border-dark p-8 shadow-lg text-center space-y-4">
          <FiAward className="text-primary text-4xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Pro Tip</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Did you know? You can combine your analytics with A/B testing tools
            to refine your posting strategy and maximize engagement.
          </p>
          <Link to="/contact" className="btn-primary inline-block mt-4">
            Contact Our Team for a Demo
          </Link>
        </section>
      </div>
    </div>
  );
};

export default GuidesPage;
