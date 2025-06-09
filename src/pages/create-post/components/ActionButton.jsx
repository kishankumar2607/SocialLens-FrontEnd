import React from "react";
import Icon from "../../../components/AppIcon";

const ActionButton = ({ variant = "primary", onClick, icon, label }) => {
  const buttonClasses = {
    primary:
      "bg-gradient-to-r from-primary to-primary-hover text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-background-dark active:scale-[0.98]",
    secondary:
      "bg-transparent border border-primary text-black font-bold px-4 py-2 rounded-md transition-all duration-200 hover:bg-primary/10 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-background-dark active:scale-[0.98]",
  };

  return (
    <button onClick={onClick} className={buttonClasses[variant]}>
      <div className="flex items-center">
        {icon && <Icon name={icon} size={18} className="mr-2" />}
        {label}
      </div>
    </button>
  );
};

export default ActionButton;