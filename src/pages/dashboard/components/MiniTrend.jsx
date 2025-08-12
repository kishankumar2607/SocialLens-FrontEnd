import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const MiniTrend = ({ data, dataKey = "followers" }) => {
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="mini" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#4F46E5"
            fill="url(#mini)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniTrend;
