import React from "react";
import { Link } from 'react-router-dom';

const CTA = () => (
  <section className="py-20 px-4 bg-surface-medium text-center">
    <h2 className="text-3xl font-semibold mb-4">
      Ready to Elevate Your Social Media?
    </h2>
    <p className="text-text-secondary mb-8">
      Join SocialLens today and start optimizing your online presence.
    </p>
    <Link to="/register" className="btn-primary">
      Get Started
    </Link>
  </section>
);

export default CTA;
