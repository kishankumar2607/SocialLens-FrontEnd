import React from "react";
import {
  FiZap,
  FiBarChart2,
  FiUsers,
  FiLock,
  FiSmartphone,
  FiClock,
  FiStar,
  FiCheckCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const features = [
    {
      icon: <FiZap className="text-primary text-4xl" />,
      title: "AI-Powered Insights",
      description:
        "Leverage cutting-edge AI to analyze social trends, predict audience behavior, and optimize your campaigns in real time.",
    },
    {
      icon: <FiBarChart2 className="text-primary text-4xl" />,
      title: "Advanced Analytics",
      description:
        "Dive deep into detailed metrics, track engagement, and measure performance across all your social platforms.",
    },
    {
      icon: <FiUsers className="text-primary text-4xl" />,
      title: "Collaborative Tools",
      description:
        "Work seamlessly with your team using shared calendars, post approvals, and role-based permissions.",
    },
    {
      icon: <FiLock className="text-primary text-4xl" />,
      title: "Enterprise-Grade Security",
      description:
        "Keep your data secure with advanced encryption, 2FA, and regular compliance audits.",
    },
    {
      icon: <FiSmartphone className="text-primary text-4xl" />,
      title: "Mobile Access",
      description:
        "Manage your content, schedule posts, and monitor performance on the go with our intuitive mobile app.",
    },
    {
      icon: <FiClock className="text-primary text-4xl" />,
      title: "24/7 Support",
      description:
        "Our support team is available around the clock to assist you with any questions or technical needs.",
    },
  ];

  const differentiators = [
    "Real-time competitor analysis",
    "Dedicated success manager for teams",
    "One-click multi-platform scheduling",
    "Customizable performance dashboards",
    "Automated reporting tools",
    "Team collaboration features",
    "AI-driven content suggestions",
    "Cross-platform analytics integration",
  ];

  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 py-16 space-y-20">
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            🌟 Explore Our Features
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Discover the powerful tools and capabilities that make SocialLens
            your ultimate social media growth companion.
          </p>
        </header>

        {/* Features Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 hover:border-primary-light transition-transform shadow-lg flex flex-col items-center text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* Highlight Banner */}
        <section className="bg-gradient-to-r from-primary to-neon-purple p-8 rounded-xl shadow-xl text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Choose SocialLens?</h2>
          <p className="text-white max-w-2xl mx-auto">
            We don’t just offer features — we deliver results. Our platform is
            trusted by top brands and creators to push boundaries and drive
            growth.
          </p>
        </section>

        {/* Differentiators List */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold pb-6">What Sets Us Apart</h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 text-left">
              {differentiators.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-text-secondary"
                >
                  <FiCheckCircle className="text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Block */}
        <section className="bg-surface-dark rounded-xl p-8 shadow-lg text-center">
          <p className="text-xl italic text-primary-light mb-4">
            “SocialLens revolutionized how we manage our brand. Our engagement
            doubled in just three months!”
          </p>
          <p className="font-semibold">
            — Smith Johnson, Marketing Director at ABC Tech
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-bold">
            Ready to Experience the Difference?
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Start your journey with SocialLens today and unlock the full
            potential of your social media strategy.
          </p>
          <Link to="/register" className="btn-primary inline-block">
            Get Started Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default FeaturesPage;
