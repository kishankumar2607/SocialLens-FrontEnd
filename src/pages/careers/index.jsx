import React from "react";
import { FiBriefcase, FiCheckCircle } from "react-icons/fi";
import ResumeUploadForm from "../../components/ResumeUploadForm";

const index = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden px-6 py-16">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Careers at SocialLens</h1>
          <p className="text-text-secondary max-w-3xl mx-auto text-lg">
            Join a passionate team building the future of social media
            analytics. We value creativity, innovation, and making a meaningful
            impact.
          </p>
        </section>

        {/* Why Join Us Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiCheckCircle className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
            <p className="text-text-secondary text-sm">
              Your work will reach thousands of creators and brands, empowering
              them to grow and connect.
            </p>
          </div>
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiBriefcase className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Flexible Work</h3>
            <p className="text-text-secondary text-sm">
              We offer flexible hours and remote options to support your best
              work and well-being.
            </p>
          </div>
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiCheckCircle className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Growth & Learning</h3>
            <p className="text-text-secondary text-sm">
              We invest in your growth with mentorship, courses, and exciting
              projects.
            </p>
          </div>
        </section>

        {/* Open Roles */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Open Positions</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-base/7">
            We're always looking for talented engineers, designers, marketers,
            and product managers. Check our job board or apply directly below.
          </p>
        </section>

        {/* Application Form */}
        <div className="px-2 lg:px-28">
          <ResumeUploadForm />
        </div>
      </div>
    </div>
  );
};

export default index;
