import React from "react";
import { getCookie } from "../utils/utils";
import { Link } from "react-router-dom";

const CTA = () => {
  // Read token and user from cookies
  const token = getCookie("token") || null;
  const user = getCookie("userName") || null;
  return (
    <section className="py-20 px-4 bg-surface-medium text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Ready to Elevate Your Social Media?
      </h2>
      <p className="text-text-secondary mb-8">
        Join SocialLens today and start optimizing your online presence.
      </p>
      {user && token ? (
        <Link to="/homepage" className="btn-primary">
          Get Started
        </Link>
      ) : (
        <Link to="/login" className="btn-primary">
          Get Started
        </Link>
      )}
    </section>
  );
};

export default CTA;
