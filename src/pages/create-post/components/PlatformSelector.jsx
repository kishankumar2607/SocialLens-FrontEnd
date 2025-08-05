import React from "react";
import Icon from "../../../components/AppIcon";

const PlatformSelector = ({ selectedPlatforms, onToggle, error, errorMessage }) => {
  const platforms = [
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "Linkedin",
      color: "#0A66C2",
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <button
              key={platform.id}
              onClick={() => onToggle(platform.id)}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                isSelected
                  ? "bg-primary bg-opacity-20 border border-primary"
                  : "bg-surface-medium border border-border-dark hover:border-primary-light"
              }`}
            >
              <Icon
                name={platform.icon}
                size={20}
                color={isSelected ? platform.color : "currentColor"}
                className="mr-2"
              />
              <span className="text-sm font-medium">{platform.name}</span>
            </button>
          );
        })}
      </div>
      {/* {error && (
        <p className="text-error text-sm mt-1 flex items-center">
          {errorMessage}
        </p>
      )} */}
    </div>
  );
};

export default PlatformSelector;
