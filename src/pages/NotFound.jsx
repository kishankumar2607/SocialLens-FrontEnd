import React from "react";
import { Link } from "react-router-dom";
import Icon from "../components/AppIcon";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark text-text-primary">
      <div className="text-center p-8 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-surface-medium flex items-center justify-center">
            <Icon name="FileQuestion" size={48} className="text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/homepage"
          className="btn-primary inline-flex items-center"
        >
          <Icon name="Home" size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;