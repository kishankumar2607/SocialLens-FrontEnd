import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  apiDelete,
  deleteAllCookies,
  clearAllSessionStorage,
} from "../utils/utils";
import { AuthAPILogout } from "../api/api";
import { showSuccess, showError } from "../utils/helperFunction";
import Button from "./Button";
import Swal from "sweetalert2";

const Header = ({ variant = "default", user = null, token = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // console.log("Header props:", {
  //   variant,
  //   user,
  //   token,
  //   });

  //Logout Method
  const handleLogout = () => {
    // console.log("Logout method called");
    Swal.fire({
      title: "Are you sure you want to logout?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call the logout API endpoint
          const response = await apiDelete(AuthAPILogout);
          if (response.status === 200) {
            // Delete all cookies and session
            deleteAllCookies();
            clearAllSessionStorage();
            // Redirect to login page
            navigate("/login");
            showSuccess(response.data.message);
          }
        } catch {
          showError("Failed to logout");
        }
      }
    });
  };

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
      {/* <Button
        variant="icon"
        icon="Bell"
        aria-label="Notifications"
        className="relative"
      >
        <span className="absolute top-0 right-0 h-2 w-2 bg-error rounded-full"></span>
      </Button> */}

      <div className="flex items-center space-x-3 cursor-pointer">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
          <span className="text-white font-medium text-sm">
            {(user?.[0] || "U").toUpperCase()}
          </span>
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-bold text-white">
            {user.length > 15 ? user?.split(" ")[0] || "User" : user || "User"}
          </p>
          {/* <p className="text-xs text-text-tertiary">{user?.role || "Member"}</p> */}
        </div>
        {/* <Icon
          name="ChevronDown"
          size={16}
          className="text-text-tertiary hidden md:block"
        /> */}
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
              {user && token ? (
                <>
                  <UserProfile />
                  <button
                    className="btn-primary"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn-secondary text-sm px-4 py-1.5 rounded-md border border-primary hover:bg-surface-medium"
                >
                  Login
                </Link>
              )}
              {user && token ? (
                <Link
                  to="/try-for-free"
                  className="btn-secondary text-sm px-4 py-1.5 rounded-md border border-primary hover:bg-surface-medium"
                >
                  Try for free
                </Link>
              ) : (
                <Link to="/try-for-free" className="btn-primary">
                  Try for free
                </Link>
              )}
              <MobileMenuToggle />
            </div>
          </div>
        </div>

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
              {user && token ? (
                <Link
                  to="/homepage"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/homepage"
                      ? "bg-primary/20 text-white"
                      : "text-text-secondary hover:bg-surface-medium hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/login"
                      ? "bg-primary/20 text-white"
                      : "text-text-secondary hover:bg-surface-medium hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>
              )}
              {user && token ? (
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
              ) : (
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/login"
                      ? "bg-primary/20 text-white"
                      : "text-text-secondary hover:bg-surface-medium hover:text-white"
                  }`}
                >
                  Create Post
                </Link>
              )}
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
        </div>
      </div>

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

          {user && token ? (
            <div className="pt-4 pb-3 border-t border-border-dark">
              <div className="flex items-center px-5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user?.name || "User"}
                  </div>
                  <div className="text-sm text-text-tertiary">
                    {user?.role || "Member"}
                  </div>
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
