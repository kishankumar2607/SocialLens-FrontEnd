import React, { useEffect, useState } from "react";
import Icon from "../../components/AppIcon";
import useLinkedIn from "../../hook/useLinkedIn";
import AnalyticsCard from "./components/AnalyticsCard";
import DataVisualization from "./components/DataVisualization";
import SkeletonLoader from "./components/SkeletonLoader";
import MiniTrend from "./components/MiniTrend";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    loading: liLoading,
    isConnected,
    data,
    userData,
    errorMessage,
  } = useLinkedIn();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const showLoading = isLoading || liLoading;

  // Derive chart data
  const followersData = data?.followersTrend ?? [];
  const engagementData = data
    ? data.engagementByFormat.map((d) => ({ name: d.name, rate: d.rate }))
    : [];
  const sentimentData = data
    ? [
        { name: "Positive", value: data.kpis.sentiment.positive, color: "#10B981" },
        { name: "Neutral", value: data.kpis.sentiment.neutral, color: "#6B7280" },
        { name: "Negative", value: data.kpis.sentiment.negative, color: "#F43F5E" },
      ]
    : [];

  // Calculate content performance metrics
  const postCount = data?.posts?.length || 0;
  const bestPost = getBestPost(data?.posts);
  const avgEngagement = calculateAvgEngagement(data?.posts);
  const topFormat = getTopFormat(data?.posts);
  const bestPostingTime = getBestPostingTime(data?.posts);

  const accountName = userData?.accountDetails?.name ?? data?.page?.name ?? "LinkedIn";
  const accountAvatar = userData?.accountDetails?.profileURL || 
                      userData?.accountDetails?.avatar || 
                      data?.page?.logo || 
                      "https://i.pravatar.cc/100?img=12";
  const accountHandle = userData?.accountDetails?.handle || 
                      (accountName ? accountName.trim().toLowerCase().replace(/\s+/g, "") : 
                      data?.page?.handle || "account");

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-sm text-gray-600">
                {isConnected ? "LinkedIn analytics overview" : "Preview (connect to see live data)"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-secondary text-gray-800 flex items-center">
                <Icon name="Calendar" size={18} className="mr-2" />
                Last 30 days
              </button>
              <button className="btn-primary flex items-center">
                <Icon name="Download" size={18} className="mr-2" />
                Export
              </button>
              {!liLoading && isConnected && (userData?.accountDetails || data?.page) && (
                <div className="hidden md:flex items-center gap-2 pl-3 ml-2 border-l">
                  <img src={accountAvatar} alt="profile avatar" className="h-8 w-8 rounded-full" />
                  <div className="leading-tight">
                    <div className="text-sm font-medium">{accountName}</div>
                    <div className="text-xs text-gray-500">@{accountHandle}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Connection banner */}
          {!showLoading && !isConnected && (
            <div className="mb-6 rounded-xl border border-dashed border-gray-300 bg-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Icon name="Info" size={18} className="mr-2 text-gray-700" />
                <span className="text-gray-800">
                  {errorMessage || "Please connect your LinkedIn account. Go to Settings → Linked Accounts and connect it."}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/settings" className="btn-primary">Go to Settings</Link>
              </div>
            </div>
          )}

          {/* Cards grid */}
          {showLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : isConnected ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Followers */}
              <AnalyticsCard
                title="Total Followers (LinkedIn)"
                subtitle="All-time followers"
                value={formatNumber(data?.kpis.followersTotal)}
                change={`+${data?.kpis.followersChangePct}%`}
                changeType="positive"
                icon="Users"
                trend={<MiniTrend data={followersData} dataKey="followers" />}
              >
                <DataVisualization
                  type="line"
                  data={followersData}
                  title="Followers Growth"
                />
              </AnalyticsCard>

              {/* Engagement */}
              <AnalyticsCard
                title="Engagement Rate (LinkedIn)"
                subtitle="Avg engagement on posts"
                value={`${data?.kpis.engagementRate}%`}
                change={`+${data?.kpis.engagementChangePct}%`}
                changeType="positive"
                icon="BarChart"
                trend={
                  <MiniTrend
                    data={engagementData.map((d) => ({ followers: d.rate }))}
                    dataKey="followers"
                  />
                }
              >
                <DataVisualization
                  type="bar"
                  data={engagementData}
                  title="Engagement by Format"
                />
              </AnalyticsCard>

              {/* Content Performance Summary */}
              <AnalyticsCard
                title="Content Performance (LinkedIn)"
                subtitle="Last 30 days overview"
                value={`${postCount} posts`}
                change={`+${calculatePostChange(data?.posts)}%`}
                changeType="positive"
                icon="FileText"
              >
                <div className="grid grid-cols-2 gap-4">
                  <MetricBlock
                    icon="Zap"
                    title="Best Post"
                    value={`${formatNumber(bestPost?.stats?.likes || 0)} likes`}
                    description={bestPost?.text?.substring(0, 40) + '...' || 'N/A'}
                  />
                  <MetricBlock
                    icon="BarChart2"
                    title="Avg Engagement"
                    value={`${avgEngagement}%`}
                    description="Across all posts"
                  />
                  <MetricBlock
                    icon="TrendingUp"
                    title="Top Format"
                    value={topFormat}
                    description="By engagement rate"
                  />
                  <MetricBlock
                    icon="Clock"
                    title="Best Time"
                    value={bestPostingTime}
                    description="For engagement"
                  />
                </div>
              </AnalyticsCard>

              {/* Sentiment */}
              <AnalyticsCard
                title="Sentiment Overview (LinkedIn)"
                subtitle="Based on comments"
                value={`${data?.kpis.sentiment.positive}% Positive`}
                change="+5.2%"
                changeType="positive"
                icon="Smile"
                trend={
                  <MiniTrend
                    data={sentimentData.map((d) => ({ followers: d.value }))}
                    dataKey="followers"
                  />
                }
              >
                <DataVisualization
                  type="pie"
                  data={sentimentData}
                  title="Sentiment Distribution"
                />
              </AnalyticsCard>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
};

// MetricBlock component
const MetricBlock = ({ icon, title, value, description }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <div className="flex items-center mb-1">
      <Icon name={icon} size={16} className="mr-2 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </div>
    <div className="text-lg font-semibold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500 truncate">{description}</div>
  </div>
);

// Helper functions
const calculatePostChange = (posts) => {
  if (!posts?.length) return 0;
  return 12.5; // Mock value - replace with real calculation
};

const getBestPost = (posts) => {
  if (!posts?.length) return null;
  return posts.reduce((best, post) => 
    post.stats.likes > (best?.stats?.likes || 0) ? post : best
  );
};

const calculateAvgEngagement = (posts) => {
  if (!posts?.length) return 0;
  const total = posts.reduce((sum, post) => sum + (
    post.stats.likes + post.stats.comments + post.stats.shares
  ), 0);
  const avg = total / posts.length;
  return (avg / 1000 * 100).toFixed(1);
};

const getTopFormat = (posts) => {
  if (!posts?.length) return 'N/A';
  const formatCounts = {};
  posts.forEach(post => {
    formatCounts[post.mediaType] = (formatCounts[post.mediaType] || 0) + 1;
  });
  return Object.keys(formatCounts).reduce((a, b) => 
    formatCounts[a] > formatCounts[b] ? a : b
  );
};

const getBestPostingTime = (posts) => {
  if (!posts?.length) return 'N/A';
  return '9-11 AM'; // Mock value - replace with real calculation
};

const formatNumber = (n) =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { maximumFractionDigits: 0 })
    : n ?? "";

export default Dashboard;