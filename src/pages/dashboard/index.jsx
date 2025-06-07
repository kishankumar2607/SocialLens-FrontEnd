import React, { useState, useEffect } from "react";
import { BarChart } from "recharts";
import Icon from "../../components/AppIcon";
import AnalyticsCard from "./components/AnalyticsCard";
import DataVisualization from "./components/DataVisualization";
import SkeletonLoader from "./components/SkeletonLoader";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-white text-text-primary">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-black">Dashboard</h1>
              <p className="text-black">Analytics overview for your social media</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-secondary text-black flex items-center">
                <Icon name="Calendar" size={18} className="mr-2" />
                Last 30 days
              </button>
              <button className="btn-primary flex items-center">
                <Icon name="Download" size={18} className="mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Analytics Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Total Followers Card */}
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <AnalyticsCard
                title="Total Followers"
                value="24,892"
                change="+12.4%"
                changeType="positive"
                icon="Users"
              >
                <DataVisualization
                  type="line"
                  data={followersData}
                  title="Followers Growth"
                />
              </AnalyticsCard>
            )}

            {/* Engagement Rate Card */}
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <AnalyticsCard
                title="Engagement Rate"
                value="5.28%"
                change="+0.8%"
                changeType="positive"
                icon="BarChart"
              >
                <DataVisualization
                  type="bar"
                  data={engagementData}
                  title="Platform Engagement"
                />
              </AnalyticsCard>
            )}

            {/* Top Performing Post Card */}
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <AnalyticsCard
                title="Top Performing Post"
                value="12,482 impressions"
                change="+24.5%"
                changeType="positive"
                icon="TrendingUp"
              >
                <div className="mt-4">
                  <div className="bg-surface-dark p-4 rounded-lg mb-4">
                    <div className="flex items-start mb-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center mr-3">
                        <Icon name="Image" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-white">Your Brand</p>
                        <p className="text-text-tertiary text-xs text-black">Posted 3 days ago on Instagram</p>
                      </div>
                    </div>
                    <p className="text-text-secondary mb-3">
                      "Excited to announce our new product line! Check out our website for exclusive early access. #NewLaunch #Innovation"
                    </p>
                    <div className="h-32 bg-surface-dark rounded-md mb-3 flex items-center justify-center">
                      <Icon name="Image" size={32} className="text-text-tertiary" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <Icon name="Heart" size={16} className="mr-1 text-error" />
                        <span>1,248 likes</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="MessageCircle" size={16} className="mr-1" />
                        <span>86 comments</span>
                      </div>
                      <div className="flex items-center">
                        <Icon name="Share2" size={16} className="mr-1" />
                        <span>342 shares</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnalyticsCard>
            )}

            {/* Sentiment Overview Card */}
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <AnalyticsCard
                title="Sentiment Overview"
                value="78% Positive"
                change="+5.2%"
                changeType="positive"
                icon="Smile"
              >
                <DataVisualization
                  type="pie"
                  data={sentimentData}
                  title="Sentiment Distribution"
                />
              </AnalyticsCard>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Mock data for charts
const followersData = [
  { name: "Jan", followers: 18500 },
  { name: "Feb", followers: 19200 },
  { name: "Mar", followers: 19800 },
  { name: "Apr", followers: 20500 },
  { name: "May", followers: 21200 },
  { name: "Jun", followers: 22000 },
  { name: "Jul", followers: 22800 },
  { name: "Aug", followers: 23500 },
  { name: "Sep", followers: 24200 },
  { name: "Oct", followers: 24892 },
];

const engagementData = [
  { name: "Instagram", rate: 6.8 },
  { name: "Twitter", rate: 4.2 },
  { name: "Facebook", rate: 3.7 },
  { name: "LinkedIn", rate: 5.1 },
  { name: "TikTok", rate: 7.2 },
];

const sentimentData = [
  { name: "Positive", value: 78, color: "#10B981" },
  { name: "Neutral", value: 15, color: "#6B7280" },
  { name: "Negative", value: 7, color: "#F43F5E" },
];

export default Dashboard;
