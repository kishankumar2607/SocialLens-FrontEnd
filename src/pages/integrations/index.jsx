import React from "react";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiZap,
  FiPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const integrations = [
  {
    name: "Instagram",
    description:
      "Connect your Instagram account to schedule posts, view insights, and engage your audience directly.",
    icon: <FiInstagram className="text-pink-500 text-4xl" />,
  },
  {
    name: "Twitter",
    description:
      "Manage tweets, monitor hashtags, and track mentions with seamless Twitter integration.",
    icon: <FiTwitter className="text-blue-400 text-4xl" />,
  },
  {
    name: "Facebook",
    description:
      "Schedule Facebook posts, monitor engagement, and track performance metrics easily.",
    icon: <FiFacebook className="text-blue-600 text-4xl" />,
  },
  {
    name: "LinkedIn",
    description:
      "Expand your professional reach by publishing posts and tracking analytics on LinkedIn.",
    icon: <FiLinkedin className="text-blue-700 text-4xl" />,
  },
];

const upcomingIntegrations = [
  { name: "YouTube", icon: <FiZap className="text-red-500 text-4xl" /> },
  { name: "Pinterest", icon: <FiPlus className="text-pink-600 text-4xl" /> },
  { name: "TikTok", icon: <FiZap className="text-gray-700 text-4xl" /> },
];

const IntegrationsPage = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 py-16 space-y-20">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Integrations</h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Connect your favorite platforms to SocialLens and supercharge your
            social media management.
          </p>
        </header>

        {/* Featured Integrations */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Featured Integrations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((integration, idx) => (
              <div
                key={idx}
                className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition shadow-lg space-y-4 text-center"
              >
                <div className="flex justify-center">{integration.icon}</div>
                <h3 className="text-lg font-semibold">{integration.name}</h3>
                <p className="text-sm text-text-secondary">
                  {integration.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Integrations */}
        <section className="bg-surface-dark rounded-xl border border-border-dark p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Upcoming Integrations
          </h2>
          <p className="text-text-secondary text-center mb-6">
            We’re constantly adding more integrations to help you stay ahead.
            Here’s what’s coming soon!
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {upcomingIntegrations.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2">
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Need a Custom Integration?</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            We offer custom integrations tailored to your business needs. Reach
            out to our team and let’s make it happen.
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default IntegrationsPage;
