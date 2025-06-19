import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  apiDelete,
  deleteAllCookies,
  clearAllSessionStorage,
} from "../utils/utils";
import { AuthAPILogout } from "../api/api";
import { showSuccess, showError } from "../utils/helperFunction";
import Button from "./Button";

const useLogout = () => {
  const navigate = useNavigate();
  return async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Log out?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    });
    if (!isConfirmed) return;

    try {
      const res = await apiDelete(AuthAPILogout);
      if (res.status === 200) {
        deleteAllCookies();
        clearAllSessionStorage();
        showSuccess(res.data.message);
        navigate("/login");
      }
    } catch {
      showError("Failed to logout");
    }
  };
};

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

const UserProfile = ({ user }) => {
  const initials = user?.[0] || "U";
  return (
    <Link to="/settings" className="flex items-center space-x-3">
      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
        <span className="text-white font-medium text-sm">{initials}</span>
      </div>
      <span className="hidden lg:block text-sm font-bold text-white">
        {user.length > 15 ? user.split(" ")[0] : user}
      </span>
    </Link>
  );
};

const mainLinks = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const resourceLinks = [
  { to: "/documentation", label: "Documentation" },
  { to: "/api-reference", label: "API Reference" },
  { to: "/guides", label: "Guides" },
  { to: "/blogs", label: "Blog" },
  { to: "/support", label: "Support" },
];

const authLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/create-post", label: "Create Post" },
  { to: "/analytics", label: "Analytics" },
];

const NavList = ({ links, currentPath, onClickItem }) =>
  links.map(({ to, label }) => {
    const active = currentPath === to;
    return (
      <Link
        key={to}
        to={to}
        onClick={onClickItem}
        className={`block px-3 py-2 rounded-md font-medium ${
          active
            ? "bg-primary/20 text-white"
            : "text-text-secondary hover:bg-surface-medium hover:text-white"
        }`}
      >
        {label}
      </Link>
    );
  });

export default function Header({ token, user }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);

  const logout = useLogout();
  const { pathname } = useLocation();
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="bg-surface-dark border-b border-border-dark sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Logo />

        <div className="flex items-center space-x-4">
          <nav className="hidden lg:flex items-center space-x-4">
            {mainLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMobile}
                className={`px-3 py-2 rounded-md font-medium ${
                  pathname === to
                    ? "bg-primary/20 text-white"
                    : "text-text-secondary hover:bg-surface-medium hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* Resources dropdown */}
            <div className="relative group">
              <button className="px-3 py-2 rounded-md font-medium text-text-secondary hover:bg-surface-medium hover:text-white flex items-center">
                Resources
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute right-0 mt-1 hidden group-hover:block bg-surface-dark border border-border-dark rounded-md shadow-lg z-20">
                <NavList
                  links={resourceLinks}
                  currentPath={pathname}
                  onClickItem={closeMobile}
                />
              </div>
            </div>

            {/* App dropdown if logged in */}
            {token && (
              <div className="relative group">
                <button className="px-3 py-2 rounded-md font-medium text-text-secondary hover:bg-surface-medium hover:text-white flex items-center">
                  App
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-1 hidden group-hover:block bg-surface-dark border border-border-dark rounded-md shadow-lg z-20">
                  <NavList
                    links={authLinks}
                    currentPath={pathname}
                    onClickItem={closeMobile}
                  />
                </div>
              </div>
            )}
          </nav>

          {/* Auth buttons (always visible) */}
          {token ? (
            <>
              <UserProfile user={user} />
              <Button
                className="hidden xs:block btn-secondary text-sm px-4 py-1.5 rounded-md border border-primary hover:bg-surface-medium"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-secondary text-sm px-4 py-1.5 rounded-md border border-primary hover:bg-surface-medium"
              >
                Login
              </Link>
              <Link
                to="/try-for-free"
                className="hidden xs:block btn-primary text-sm px-4 py-1.5"
              >
                Try for free
              </Link>
            </>
          )}

          {/* Mobile toggle */}
          <Button
            variant="icon"
            icon={mobileOpen ? "X" : "Menu"}
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden"
          />
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface-dark border-t border-border-dark animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {mainLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMobile}
                className={`block px-3 py-2 rounded-md font-medium ${
                  pathname === to
                    ? "bg-primary/20 text-white"
                    : "text-text-secondary hover:bg-surface-medium hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* COLLAPSIBLE Resources */}
            <button
              onClick={() => setResourcesOpen((o) => !o)}
              className="w-full text-left px-3 py-2 rounded-md font-medium text-text-secondary hover:bg-surface-medium hover:text-white flex items-center justify-between"
            >
              Resources
              <svg
                className={`h-4 w-4 transform ${
                  resourcesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {resourcesOpen && (
              <div className="pl-4 mt-1 space-y-1">
                {resourceLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={closeMobile}
                    className={`block px-3 py-2 rounded-md font-medium ${
                      pathname === to
                        ? "bg-primary/20 text-white"
                        : "text-text-secondary hover:bg-surface-medium hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile Auth Buttons */}
            {!token && (
              <div className="mt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="block w-full text-center btn-secondary text-sm px-4 py-2 rounded-md border border-primary hover:bg-surface-medium"
                >
                  Login
                </Link>
                <Link
                  to="/try-for-free"
                  onClick={closeMobile}
                  className="block w-full text-center btn-primary text-sm px-4 py-2"
                >
                  Try for free
                </Link>
              </div>
            )}

            {/* COLLAPSIBLE App */}
            {token && (
              <>
                <button
                  onClick={() => setAppOpen((o) => !o)}
                  className="w-full text-left px-3 py-2 rounded-md font-medium text-text-secondary hover:bg-surface-medium hover:text-white flex items-center justify-between"
                >
                  App
                  <svg
                    className={`h-4 w-4 transform ${
                      appOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {appOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    {authLinks.map(({ to, label }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={closeMobile}
                        className={`block px-3 py-2 rounded-md font-medium ${
                          pathname === to
                            ? "bg-primary/20 text-white"
                            : "text-text-secondary hover:bg-surface-medium hover:text-white"
                        }`}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
                <div className="p-1" />
                <div>
                  <Button
                    className="xs:hidden btn-secondary text-sm px-4 py-1.5 rounded-md border border-primary hover:bg-surface-medium"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
