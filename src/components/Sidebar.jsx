import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { decryptData } from "../utils/encryptDecryptData";
import { getCookie, deleteAllCookies } from "../utils/utils";
import Icon from "./AppIcon";
import Swal from "sweetalert2";

const Sidebar = ({
  variant = "expanded",
  onToggle,
  isOpen = true,
  className = "",
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentVariant, setCurrentVariant] = useState(variant);
  const [isMobile, setIsMobile] = useState(false);

  // Read token and user from cookies
  const user = getCookie("userName") ? JSON.parse(getCookie("userName")) : null;

  const decryptUser = decryptData(user) || null;
  // console.log("Decrypted user:", decryptUser);

  // Navigation items
  const navItems = [
    {
      name: "Home",
      icon: "Home",
      path: "/homepage",
    },
    {
      name: "Dashboard",
      icon: "BarChart2",
      path: "/dashboard",
    },
    {
      name: "Create Post",
      icon: "PlusCircle",
      path: "/create-post",
    },
    {
      name: "Analytics",
      icon: "LineChart",
      path: "/analytics",
    },
    {
      name: "Settings",
      icon: "Settings",
      path: "/settings",
    },
  ];

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCurrentVariant("mobile");
      } else {
        setCurrentVariant(variant);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [variant]);

  // Toggle sidebar variant between expanded and collapsed
  const toggleSidebar = () => {
    const newVariant = currentVariant === "expanded" ? "collapsed" : "expanded";
    setCurrentVariant(newVariant);
    if (onToggle) {
      onToggle(newVariant);
    }
  };

  // Close mobile sidebar
  const closeMobileSidebar = () => {
    if (currentVariant === "mobile" && onToggle) {
      onToggle(false);
    }
  };

  // Determine if a nav item is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear cookies or perform logout logic here
        deleteAllCookies();
        navigate("/");
        Swal.fire("Logged out successfully", "", "success");
      }
    });
  };

  // Expanded sidebar
  if (currentVariant === "expanded") {
    return (
      <aside
        className={`bg-surface-dark border-r border-border-dark h-screen flex flex-col ${className}`}
      >
        <div className="p-4 border-b border-border-dark flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-white font-display font-bold text-xl">
              SocialLens
            </span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="text-text-tertiary hover:text-text-primary p-1 rounded-md hover:bg-surface-medium transition-colors duration-200"
            aria-label="Collapse sidebar"
          >
            <Icon name="ChevronsLeft" size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-primary/20 text-white"
                      : "text-text-secondary hover:bg-surface-medium hover:text-white"
                  }`}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  <Icon name={item.icon} size={20} className="mr-3" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.name === "Dashboard" && (
                    <span className="ml-auto bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border-dark">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {(decryptUser?.[0] || "U").toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {decryptUser?.length > 15
                  ? decryptUser?.split(" ")[0] || "User"
                  : decryptUser || "User"}
              </p>
              <p className="text-xs text-text-tertiary">Admin</p>
            </div>
            <button
              onClick={() => handleLogOut()}
              className="ml-auto text-text-tertiary hover:text-text-primary p-1 rounded-md hover:bg-surface-medium transition-colors duration-200"
            >
              <Icon name="LogOut" size={18} />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // Collapsed sidebar
  if (currentVariant === "collapsed") {
    return (
      <aside
        className={`bg-surface-dark border-r border-border-dark h-screen flex flex-col w-16 ${className}`}
      >
        <div className="p-3 border-b border-border-dark flex justify-center">
          <Link to="/" className="flex items-center justify-center">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-primary/20 text-white"
                      : "text-text-secondary hover:bg-surface-medium hover:text-white"
                  }`}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  title={item.name}
                >
                  <Icon name={item.icon} size={20} />
                  {item.name === "Dashboard" && (
                    <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 border-t border-border-dark flex justify-center">
          <button
            onClick={toggleSidebar}
            className="text-text-tertiary hover:text-text-primary p-1 rounded-md hover:bg-surface-medium transition-colors duration-200"
            aria-label="Expand sidebar"
          >
            <Icon name="ChevronsRight" size={20} />
          </button>
        </div>

        <div className="p-3 border-t border-border-dark flex justify-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
            <span className="text-white font-medium text-sm">JS</span>
          </div>
        </div>
      </aside>
    );
  }

  // Mobile sidebar (off-canvas)
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-background-dark bg-opacity-75 transition-opacity animate-fade-in"
            onClick={closeMobileSidebar}
            aria-hidden="true"
          ></div>

          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-surface-dark animate-slide-in">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={closeMobileSidebar}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Close sidebar"
              >
                <span className="sr-only">Close sidebar</span>
                <Icon name="X" size={24} className="text-white" />
              </button>
            </div>

            <div className="p-4 border-b border-border-dark flex items-center">
              <Link to="/homepage" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-white font-display font-bold text-xl">
                  Analytics
                </span>
              </Link>
            </div>

            <nav className="flex-1 py-4 overflow-y-auto">
              <ul className="space-y-1 px-3">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                        isActive(item.path)
                          ? "bg-primary/20 text-white"
                          : "text-text-secondary hover:bg-surface-medium hover:text-white"
                      }`}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      onClick={closeMobileSidebar}
                    >
                      <Icon name={item.icon} size={20} className="mr-3" />
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.name === "Dashboard" && (
                        <span className="ml-auto bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-border-dark">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JS</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">John Smith</p>
                  <p className="text-xs text-text-tertiary">Admin</p>
                </div>
                <button className="ml-auto text-text-tertiary hover:text-text-primary p-1 rounded-md hover:bg-surface-medium transition-colors duration-200">
                  <Icon name="LogOut" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
