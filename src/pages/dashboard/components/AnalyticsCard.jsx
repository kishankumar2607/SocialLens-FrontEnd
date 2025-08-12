import React from "react";
import Icon from "../../../components/AppIcon";

const AnalyticsCard = ({
  title,
  value,
  change,
  changeType = "positive",
  icon,
  subtitle,
  trend,
  children,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200/70 bg-white shadow-sm hover:shadow-md transition-all duration-300 h-[420px] p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">{subtitle}</p>
          )}
          <div className="mt-2 flex items-end gap-2">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {change && (
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                  changeType === "positive"
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                    : "bg-rose-50 text-rose-700 ring-1 ring-rose-100"
                }`}
              >
                <Icon
                  name={
                    changeType === "positive" ? "TrendingUp" : "TrendingDown"
                  }
                  size={16}
                  className="mr-1"
                />
                {change}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {trend /* pass a sparkline if provided */}
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-neon-purple flex items-center justify-center">
            <Icon name={icon} size={20} className="text-white" />
          </div>
        </div>
      </div>

      <div className="mt-4 h-[310px] overflow-hidden">{children}</div>
    </div>
  );
};

export default AnalyticsCard;
