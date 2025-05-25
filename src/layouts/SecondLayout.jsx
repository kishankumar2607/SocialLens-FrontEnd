import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Icon from "../components/AppIcon";

const SecondLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className="flex h-screen bg-background-dark overflow-hidden">
      {/* Sidebar */}
      {!isMobile && (
        <Sidebar
          variant="expanded"
          onToggle={(variant) => console.log(`Sidebar toggled to ${variant}`)}
        />
      )}
      {isMobile && (
        <Sidebar
          variant="mobile"
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <header className="bg-surface-dark border-b border-border-dark p-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-text-secondary hover:text-text-primary p-1 rounded-md hover:bg-surface-medium transition-colors duration-200"
              aria-label="Open sidebar"
            >
              <Icon name="Menu" size={24} />
            </button>

            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-display font-bold text-xl">
                SocialLens
              </span>
            </div>

            <div className="w-8"> {/* Placeholder for balance */}</div>
          </header>
        )}

        {/* Page children */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default SecondLayout;
