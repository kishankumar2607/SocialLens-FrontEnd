import React from "react";
import Icon from "../../../components/AppIcon";

const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  changeType = "positive", 
  icon,
  children 
}) => {
  return (
    <div className="card-glassmorphic group h-[400px] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-primary-light">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-black">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-black mr-2">{value}</span>
            {change && (
              <span className={`text-sm font-medium flex items-center ${
                changeType === "positive" ? "text-success" : "text-error"
              }`}>
                <Icon 
                  name={changeType === "positive" ? "TrendingUp" : "TrendingDown"} 
                  size={20} 
                  className="mr-1" 
                />
                {change}
              </span>
            )}
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center">
          <Icon name={icon} size={20} className="text-white" />
        </div>
      </div>
      <div className="h-[300px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AnalyticsCard;