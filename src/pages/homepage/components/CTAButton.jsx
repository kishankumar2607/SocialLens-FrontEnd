import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const CTAButton = ({ to, text, icon, primary = true }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300
        ${primary 
          ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-glow-sm hover:shadow-glow-md' 
          : 'bg-surface-medium border border-border-dark text-white hover:bg-surface-medium/80'
        }
        hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-background-dark
      `}
    >
      {icon && <Icon name={icon} size={20} className={`${primary ? 'mr-2' : 'mr-2'}`} />}
      {text}
    </Link>
  );
};

export default CTAButton;