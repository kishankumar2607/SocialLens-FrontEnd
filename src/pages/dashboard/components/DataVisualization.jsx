import React from "react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from "recharts";

const DataVisualization = ({ type, data, title }) => {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "#D1D5DB" }} 
                axisLine={{ stroke: "#374151" }} 
              />
              <YAxis 
                tick={{ fill: "#D1D5DB" }} 
                axisLine={{ stroke: "#374151" }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1F2937", 
                  borderColor: "#374151",
                  color: "#FFFFFF" 
                }} 
              />
              <Legend wrapperStyle={{ color: "#D1D5DB" }} />
              <Line 
                type="monotone" 
                dataKey="followers" 
                stroke="#4F46E5" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "#D1D5DB" }} 
                axisLine={{ stroke: "#374151" }} 
              />
              <YAxis 
                tick={{ fill: "#D1D5DB" }} 
                axisLine={{ stroke: "#374151" }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1F2937", 
                  borderColor: "#374151",
                  color: "#FFFFFF" 
                }} 
              />
              <Legend wrapperStyle={{ color: "#D1D5DB" }} />
              <Bar 
                dataKey="rate" 
                fill="#4F46E5" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#1F2937", 
                  borderColor: "#374151",
                  color: "#FFFFFF" 
                }} 
              />
              <Legend wrapperStyle={{ color: "#D1D5DB" }} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-text-secondary mb-2">{title}</h4>
      {renderChart()}
    </div>
  );
};

export default DataVisualization;