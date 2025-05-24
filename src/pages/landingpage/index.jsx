import React from "react";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import CTA from "../../components/CTA";
import Testimonials from "../../components/Testimonials";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-background-dark to-surface-dark text-white min-h-screen">
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default LandingPage;
