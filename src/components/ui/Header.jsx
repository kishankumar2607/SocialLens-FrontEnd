import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Input from "./Input";
import Button from "./Button";

const Header = ({ variant = "default", isAuthenticated = false }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Logo component
  const Logo = () => (
    <Link to="/" className="flex items-center space-x-2">
      <div className="h-8 w-8 rounded-md bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
        <span className="text-white font-bold text-lg">S</span>
      </div>
      <span className="text-white font-display font-bold text-xl">
        SocialLens
      </span>
    </Link>
  );

  // User profile component
  const UserProfile = () => (
    <div className="flex items-center space-x-4">
      <Button
        variant="icon"
        icon="Bell"
        aria-label="Notifications"
        className="relative"
      >
        <span className="absolute top-0 right-0 h-2 w-2 bg-error rounded-full"></span>
      </Button>

      <div className="flex items-center space-x-3 cursor-pointer">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
          <span className="text-white font-medium text-sm">JS</span>
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-white">John Smith</p>
          <p className="text-xs text-text-tertiary">Admin</p>
        </div>
        <Icon
          name="ChevronDown"
          size={16}
          className="text-text-tertiary hidden md:block"
        />
      </div>
    </div>
  );

  // Mobile menu toggle
  const MobileMenuToggle = () => (
    <Button
      variant="icon"
      icon={isMobileMenuOpen ? "X" : "Menu"}
      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden"
    />
  );

  // Skip to content link for accessibility
  const SkipToContent = () => (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-white px-4 py-2 rounded-md"
    >
      Skip to content
    </a>
  );

  // Default header layout
  if (variant === "default") {
    return (
      <header className="bg-surface-dark border-b border-border-dark sticky top-0 z-30">
        <SkipToContent />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <UserProfile />
              ) : (
                <Link
                  to="/login"
                  className="btn-secondary text-sm px-4 py-1.5 rounded-md border border-primary hover:bg-surface-medium"
                >
                  Login
                </Link>
              )}
              <MobileMenuToggle />
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border-dark">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/"
                    ? "bg-primary/20 text-white"
                    : "text-text-secondary hover:bg-surface-medium hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/dashboard"
                    ? "bg-primary/20 text-white"
                    : "text-text-secondary hover:bg-surface-medium hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/create-post"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === "/create-post"
                    ? "bg-primary/20 text-white"
                    : "text-text-secondary hover:bg-surface-medium hover:text-white"
                }`}
              >
                Create Post
              </Link>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Compact header for mobile
  return (
    <header className="bg-surface-dark border-b border-border-dark sticky top-0 z-30">
      <SkipToContent />
      <div className="px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <MobileMenuToggle />
            <Logo />
          </div>

          <Button
            variant="icon"
            icon="Search"
            aria-label="Search"
            onClick={() => setIsSearchFocused(true)}
          />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="animate-slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border-dark">
            <Link
              to="/homepage"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/homepage"
                  ? "bg-primary/20 text-white"
                  : "text-text-secondary hover:bg-surface-medium hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/dashboard"
                  ? "bg-primary/20 text-white"
                  : "text-text-secondary hover:bg-surface-medium hover:text-white"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/create-post"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === "/create-post"
                  ? "bg-primary/20 text-white"
                  : "text-text-secondary hover:bg-surface-medium hover:text-white"
              }`}
            >
              Create Post
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-border-dark">
              <div className="flex items-center px-5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                  <span className="text-white font-medium">JS</span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    John Smith
                  </div>
                  <div className="text-sm text-text-tertiary">Admin</div>
                </div>
                <Button
                  variant="icon"
                  icon="Bell"
                  aria-label="Notifications"
                  className="ml-auto relative"
                >
                  <span className="absolute top-0 right-0 h-2 w-2 bg-error rounded-full"></span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="px-5 py-4 border-t border-border-dark">
              <Link
                to="/login"
                className="btn-secondary w-full text-center py-2 rounded-md border border-primary hover:bg-surface-medium"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
