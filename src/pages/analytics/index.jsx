import React, { useMemo } from "react";
import { FiTrendingUp, FiUsers, FiHeart, FiBarChart, FiClock, FiAward, FiGlobe, FiBriefcase } from "react-icons/fi";

const MOCK = {
  asOf: new Date().toISOString(),
  kpis: {
    engagementRate: { value: 4.2, deltaPct: 1.3 },      // %
    newFollowers:   { value: 1872, deltaPct: 8.5 },      // absolute count
    totalLikes:     { value: 8923, deltaPct: 4.7 },      // absolute count
    postReach:      { value: 35420, deltaPct: 6.1 },     // absolute count
  },
  trends: {
    engagement: [
      3.8, 3.6, 3.9, 4.1, 3.7, 4.0, 4.2, 4.0, 4.3, 4.1, 4.5, 4.3, 4.6, 4.4,
    ],
  },
  posts: [
    {
      id: "p1",
      title: "Announcing our Series B funding round 💰",
      publishedAt: daysAgo(2),
      likes: 587, comments: 89, shares: 42, reach: 12400, ctr: 2.8,
      type: "Announcement"
    },
    {
      id: "p2",
      title: "How we reduced churn by 30% (case study)",
      publishedAt: daysAgo(5),
      likes: 423, comments: 64, shares: 28, reach: 9800, ctr: 2.3,
      type: "Case Study"
    },
    {
      id: "p3",
      title: "Team retreat photos from Barcelona!",
      publishedAt: daysAgo(9),
      likes: 312, comments: 47, shares: 19, reach: 8700, ctr: 1.9,
      type: "Culture"
    },
  ],
  audience: {
    industries: [
      { label: "Technology", value: 42 },
      { label: "Financial Services", value: 24 },
      { label: "Healthcare", value: 14 },
      { label: "Education", value: 11 },
      { label: "Other", value: 9 },
    ],
    roles: [
      { label: "C-Level", value: 18 },
      { label: "VP/Director", value: 27 },
      { label: "Manager", value: 35 },
      { label: "Individual Contributor", value: 20 },
    ],
    regions: [
      { label: "North America", value: 58 },
      { label: "Europe", value: 24 },
      { label: "Asia Pacific", value: 13 },
      { label: "Other", value: 5 },
    ],
  },
  benchmarks: {
    industryAvg: 2.8,
    topPercentile: 6.4
  }
};

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

const Delta = ({ pct }) => {
  const isUp = pct >= 0;
  return (
    <span className={`${isUp ? "text-green-600" : "text-red-600"} text-sm font-medium flex items-center`}>
      {isUp ? "▲" : "▼"} {Math.abs(pct).toFixed(1)}%
    </span>
  );
};

const PerformanceBadge = ({ value, benchmark }) => {
  const percentage = (value / benchmark) * 100;
  let className = "text-xs px-2 py-1 rounded-full";
  
  if (percentage >= 150) {
    className += " bg-green-100 text-green-800";
  } else if (percentage >= 100) {
    className += " bg-blue-100 text-blue-800";
  } else {
    className += " bg-yellow-100 text-yellow-800";
  }

  return (
    <span className={className}>
      {percentage >= 150 ? "Excellent" : percentage >= 100 ? "Good" : "Average"}
    </span>
  );
};

const AnalyticsPage = () => {
  const engagementTrend = useMemo(() => {
    const arr = MOCK.trends.engagement;
    return {
      current: arr[arr.length - 1],
      min: Math.min(...arr),
      max: Math.max(...arr),
      avg: arr.reduce((a, b) => a + b, 0) / arr.length
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">LinkedIn Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Performance insights for <span className="font-medium">Acme Inc.</span> company page
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiClock className="text-gray-400" />
            <span>Last updated {timeAgo(MOCK.asOf)}</span>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-500 font-medium">Engagement Rate</h2>
              <PerformanceBadge 
                value={MOCK.kpis.engagementRate.value} 
                benchmark={MOCK.benchmarks.industryAvg} 
              />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">{MOCK.kpis.engagementRate.value.toFixed(1)}%</p>
              <Delta pct={MOCK.kpis.engagementRate.deltaPct} />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Industry avg: {MOCK.benchmarks.industryAvg}% • Top 1%: {MOCK.benchmarks.topPercentile}%
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-gray-500 font-medium mb-2">New Followers</h2>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">{formatNumber(MOCK.kpis.newFollowers.value)}</p>
              <Delta pct={MOCK.kpis.newFollowers.deltaPct} />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Total followers: {formatNumber(124500)}
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-gray-500 font-medium mb-2">Content Interactions</h2>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">{formatNumber(MOCK.kpis.totalLikes.value)}</p>
              <Delta pct={MOCK.kpis.totalLikes.deltaPct} />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Last 30 days • {Math.round(MOCK.kpis.totalLikes.value/30)} avg/day
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-gray-500 font-medium mb-2">Avg. Post Reach</h2>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold">{formatNumber(MOCK.kpis.postReach.value)}</p>
              <Delta pct={MOCK.kpis.postReach.deltaPct} />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Impressions per post (last 10)
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Engagement Trend */}
            <section className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold">Engagement Trend</h2>
                <div className="flex gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Last 14 days
                  </span>
                </div>
              </div>
              
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
                {/* Chart placeholder - replace with your chart library */}
                Engagement trend visualization (current: {engagementTrend.current.toFixed(1)}%)
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-500">Current</div>
                  <div className="font-bold">{engagementTrend.current.toFixed(1)}%</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-500">Average</div>
                  <div className="font-bold">{engagementTrend.avg.toFixed(1)}%</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-500">Range</div>
                  <div className="font-bold">
                    {engagementTrend.min.toFixed(1)}-{engagementTrend.max.toFixed(1)}%
                  </div>
                </div>
              </div>
            </section>

            {/* Top Performing Content */}
            <section className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Top Performing Content</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all posts →
                </button>
              </div>
              
              <div className="space-y-4">
                {MOCK.posts.map((post) => (
                  <div key={post.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span>{post.type}</span>
                          <span>•</span>
                          <span>{timeAgo(post.publishedAt)}</span>
                        </div>
                      </div>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {post.ctr.toFixed(1)}% CTR
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mt-3 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-green-600">{formatNumber(post.likes)}</div>
                        <div className="text-gray-500 text-xs">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-blue-600">{formatNumber(post.comments)}</div>
                        <div className="text-gray-500 text-xs">Comments</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-purple-600">{formatNumber(post.shares)}</div>
                        <div className="text-gray-500 text-xs">Shares</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{formatNumber(post.reach)}</div>
                        <div className="text-gray-500 text-xs">Reach</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Audience Demographics */}
            <section className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Audience Demographics</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm flex items-center gap-2 mb-2">
                    <FiBriefcase className="text-gray-400" /> Industries
                  </h3>
                  <div className="space-y-2">
                    {MOCK.audience.industries.map((item) => (
                      <div key={item.label} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm flex items-center gap-2 mb-2">
                    <FiAward className="text-gray-400" /> Seniority
                  </h3>
                  <div className="space-y-2">
                    {MOCK.audience.roles.map((item) => (
                      <div key={item.label} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-600 h-1.5 rounded-full" 
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm flex items-center gap-2 mb-2">
                    <FiGlobe className="text-gray-400" /> Regions
                  </h3>
                  <div className="space-y-2">
                    {MOCK.audience.regions.map((item) => (
                      <div key={item.label} className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-purple-600 h-1.5 rounded-full" 
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Performance Insights */}
            <section className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold mb-3">Performance Insights</h2>
              
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 mb-1">
                    <FiTrendingUp className="text-blue-600" /> Trending Up
                  </h3>
                  <p className="text-gray-700">
                    Announcement posts are performing 42% better than average. 
                    Consider increasing their frequency to 1-2 per week.
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 mb-1">
                    <FiClock className="text-yellow-600" /> Best Times
                  </h3>
                  <p className="text-gray-700">
                    Posts published Tuesday-Thursday between 9-11 AM EST receive 
                    28% more engagement than other times.
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 mb-1">
                    <FiUsers className="text-green-600" /> Audience Growth
                  </h3>
                  <p className="text-gray-700">
                    You're gaining followers in Financial Services (+15% this month). 
                    Consider content tailored to this sector.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatNumber(n) {
  if (n == null) return "";
  return n.toLocaleString();
}

function timeAgo(iso) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

export default AnalyticsPage;