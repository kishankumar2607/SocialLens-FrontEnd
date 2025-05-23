import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="card-glassmorphic h-[400px] overflow-hidden">
      <div className="flex justify-between items-start mb-4">
        <div className="w-full">
          <div className="h-6 w-1/3 bg-surface-medium rounded animate-pulse-custom mb-2"></div>
          <div className="h-8 w-2/5 bg-surface-medium rounded animate-pulse-custom"></div>
        </div>
        <div className="h-10 w-10 rounded-full bg-surface-medium animate-pulse-custom"></div>
      </div>
      <div className="h-[300px] w-full bg-surface-medium rounded animate-pulse-custom"></div>
    </div>
  );
};

export default SkeletonLoader;