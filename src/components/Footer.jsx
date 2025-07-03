import React from "react";
import { Link } from "react-router-dom";
import { getCookie, getSessionStorage } from "../utils/utils";
import Icon from "./AppIcon";

// Helper to fetch the stored token once
const useToken = () => {
  const raw = getCookie("token") || getSessionStorage("token");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return raw;
  }
};

const columns = {
  product: {
    title: "Product",
    links: [
      { to: "/features", label: "Features" },
      { to: "/pricing", label: "Pricing" },
      {
        to: (token) => (token ? "/homepage" : "/login"),
        label: (token) => (token ? "Dashboard" : "Login"),
      },
      { to: "/integrations", label: "Integrations" },
      { to: "/changelog", label: "Changelog" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { to: "/documentation", label: "Documentation" },
      { to: "/api-reference", label: "API Reference" },
      { to: "/guides", label: "Guides" },
      { to: "/blogs", label: "Blog" },
      { to: "/support", label: "Support" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/careers", label: "Careers" },
      { to: "/contact", label: "Contact" },
      { to: "/privacy-policy", label: "Privacy Policy" },
      { to: "/terms-of-service", label: "Terms of Service" },
    ],
  },
};

// Social media links
const socialLinks = [
  { href: "https://twitter.com", name: "Twitter" },
  { href: "https://linkedin.com", name: "Linkedin" },
  { href: "https://github.com", name: "Github" },
];

const LinkColumn = ({ title, links, token }) => (
  <div>
    <h3 className="text-lg font-display font-medium text-white mb-4">
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map(({ to, label }, i) => {
        const path = typeof to === "function" ? to(token) : to;
        const text = typeof label === "function" ? label(token) : label;
        return (
          <li key={i}>
            <Link
              to={path}
              className="text-text-secondary hover:text-primary transition-colors duration-200"
            >
              {text}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

const FullFooter = ({ token, year }) => (
  <footer className="bg-surface-dark border-t border-border-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + description + socials */}
        <div>
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
              <span className="font-sans text-white font-bold text-lg">S</span>
            </div>
            <span className="text-white font-display font-bold text-xl">
              SocialLens
            </span>
          </Link>
          <p className="mt-4 text-sm text-text-secondary font-semibold leading-6">
            Powerful analytics platform for analyzing and optimizing your social
            media, data-driven insights, visualization and real-time data.
          </p>
          <div className="mt-6 flex space-x-4">
            {socialLinks.map(({ href, name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="text-text-tertiary hover:text-primary transition-colors duration-200"
              >
                <Icon name={name} size={20} />
              </a>
            ))}
          </div>
        </div>

        {Object.values(columns).map((col) => (
          <LinkColumn key={col.title} {...col} token={token} />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-center">
        <p className="text-text-tertiary text-sm">
          &copy; {year} SocialLens Inc. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <Link
            to="/privacy-policy"
            className="text-text-tertiary hover:text-primary text-sm"
          >
            Privacy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-text-tertiary hover:text-primary text-sm"
          >
            Terms
          </Link>
          <Link
            to="/cookies"
            className="text-text-tertiary hover:text-primary text-sm"
          >
            Cookies
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

const MinimalFooter = ({ year }) => (
  <footer className="bg-surface-dark border-t border-border-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded-md bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <span className="text-white font-display font-bold text-sm">
            Analytics
          </span>
        </div>

        <p className="mt-4 md:mt-0 text-text-tertiary text-sm">
          &copy; {year} Analytics Inc. All rights reserved.
        </p>

        <div className="mt-4 md:mt-0 flex space-x-6">
          <Link
            to="/privacy"
            className="text-text-tertiary hover:text-primary text-sm"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="text-text-tertiary hover:text-primary text-sm"
          >
            Terms
          </Link>
          <a
            href="mailto:support@analytics.com"
            className="text-text-tertiary hover:text-primary text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const Footer = ({ variant = "full" }) => {
  const token = useToken();
  const year = new Date().getFullYear();

  return variant === "full" ? (
    <FullFooter token={token} year={year} />
  ) : (
    <MinimalFooter year={year} />
  );
};

export default Footer;
