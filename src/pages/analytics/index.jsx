import React, { useEffect, useState, useMemo } from "react";
import {
  FiTrendingUp,
  FiUsers,
  FiClock,
  FiAward,
  FiGlobe,
  FiBriefcase,
  FiAlertCircle,
  FiSettings,
  FiLinkedin,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import useLinkedIn from "../../hook/useLinkedIn";

// =====================================================
// MAIN
// =====================================================
const AnalyticsPage = () => {
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

  // Use live when connected; otherwise Kishan mock below
  const rawData = isConnected ? data : KISHAN_MOCK_RAW;

  // Normalize whatever we get into a consistent shape for this page
  const dashboardData = useMemo(
    () => normalizeAnalytics(rawData, userData),
    [rawData, userData]
  );

  const showLoading = isLoading || liLoading;
  if (showLoading) return <SkeletonPage />;

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                <FiLinkedin className="text-blue-600" /> LinkedIn Analytics
              </h1>
              <p className="text-gray-600 mt-1">
                Connect your account to view performance insights
              </p>
            </div>
          </div>

          <ConnectionPrompt errorMessage={errorMessage} />
          <DashboardPreview data={dashboardData} />
        </div>
      </div>
    );
  }

  return <ConnectedDashboard data={dashboardData} userData={userData} />;
};

// =====================================================
// SKELETON
// =====================================================
const SkeletonPage = () => (
  <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8 sm:px-6">
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm h-32 animate-pulse"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-lg border border-gray-200 shadow-sm h-96 animate-pulse" />
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm h-64 animate-pulse" />
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm h-64 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

// =====================================================
// DISCONNECTED VIEW
// =====================================================
const ConnectionPrompt = ({ errorMessage }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
    <div className="flex items-start gap-4">
      <div className="mt-1">
        <FiAlertCircle className="text-yellow-500 text-2xl" />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">
          Connect Your LinkedIn Account
        </h3>
        <p className="text-gray-700 mb-4">
          {errorMessage ||
            "To view your LinkedIn analytics, please connect your account."}
        </p>
        <Link
          to="/settings"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiSettings /> Go to Settings
        </Link>
      </div>
    </div>
  </div>
);

const DashboardPreview = ({ data }) => {
  const engagementTrend = useMemo(() => getEngagementTrend(data), [data]);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-bold mb-4">
        What You'll See After Connecting
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Engagement Rate"
          value={`${data.kpis.engagementRate.value.toFixed(1)}%`}
          change={data.kpis.engagementRate.deltaPct}
        />
        <StatCard
          label="New Followers"
          value={formatNumber(data.kpis.newFollowers.value)}
          change={data.kpis.newFollowers.deltaPct}
        />
        <StatCard
          label="Content Interactions"
          value={formatNumber(data.kpis.totalLikes.value)}
          change={data.kpis.totalLikes.deltaPct}
        />
        <StatCard
          label="Avg. Post Reach"
          value={formatNumber(data.kpis.postReach.value)}
          change={data.kpis.postReach.deltaPct}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-4 rounded-lg">
          <MiniLineChart data={engagementTrend.series} height={240} />
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg h-32 flex items-center justify-center text-gray-400">
            Audience demographics
          </div>
          <div className="bg-gray-50 p-4 rounded-lg h-32 flex items-center justify-center text-gray-400">
            Performance insights
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/settings"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg"
        >
          <FiLinkedin /> Connect LinkedIn Account
        </Link>
      </div>
    </div>
  );
};

// =====================================================
// CONNECTED VIEW
// =====================================================
const ConnectedDashboard = ({ data, userData }) => {
  const engagementTrend = useMemo(() => getEngagementTrend(data), [data]);

  const accountName =
    userData?.accountDetails?.name ?? data?.page?.name ?? "LinkedIn";
  const accountAvatar =
    userData?.accountDetails?.profileURL ||
    userData?.accountDetails?.avatar ||
    data?.page?.logo ||
    "https://i.pravatar.cc/100?img=12";

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 py-8 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <FiLinkedin className="text-blue-600" /> LinkedIn Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Performance insights for{" "}
              <span className="font-medium">{accountName}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white px-3 py-1 rounded-full border">
              <img
                src={accountAvatar}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="font-medium">{accountName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FiClock className="text-gray-400" />
              <span>Last updated {timeAgo(data.asOf)}</span>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Engagement Rate"
            value={`${data.kpis.engagementRate.value.toFixed(1)}%`}
            change={data.kpis.engagementRate.deltaPct}
            benchmark={data.benchmarks?.industryAvg}
          />
          <StatCard
            label="New Followers"
            value={formatNumber(data.kpis.newFollowers.value)}
            change={data.kpis.newFollowers.deltaPct}
            additional={`Total: ${formatNumber(data.page?.followers || 0)}`}
          />
          <StatCard
            label="Content Interactions"
            value={formatNumber(data.kpis.totalLikes.value)}
            change={data.kpis.totalLikes.deltaPct}
            additional={`Avg/day: ${formatNumber(
              Math.round(data.kpis.totalLikes.value / 30)
            )}`}
          />
          <StatCard
            label="Avg. Post Reach"
            value={formatNumber(data.kpis.postReach.value)}
            change={data.kpis.postReach.deltaPct}
            additional={`Impressions per post`}
          />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Engagement Trend */}
            <AnalyticsCard title="Engagement Trend" timeRange="Last 14 days">
              <div className="bg-white rounded">
                <MiniLineChart data={engagementTrend.series} height={256} />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                <MetricBlock
                  label="Current"
                  value={`${engagementTrend.current.toFixed(1)}%`}
                />
                <MetricBlock
                  label="Average"
                  value={`${engagementTrend.avg.toFixed(1)}%`}
                />
                <MetricBlock
                  label="Range"
                  value={`${engagementTrend.min.toFixed(
                    1
                  )}-${engagementTrend.max.toFixed(1)}%`}
                />
              </div>
            </AnalyticsCard>

            {/* Top Performing Content */}
            <AnalyticsCard
              title="Latest Post"
              action={
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all →
                </button>
              }
            >
              <div className="space-y-4">
                {data.posts.slice(0, 3).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </AnalyticsCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Audience Demographics */}
            <AnalyticsCard title="Audience Demographics">
              <AudienceSection data={data.audience} />
            </AnalyticsCard>

            {/* Performance Insights */}
            <AnalyticsCard title="Performance Insights">
              <InsightsSection />
            </AnalyticsCard>

            {/* Actionable Suggestions */}
            <AnalyticsCard title="Actionable Suggestions">
              <Suggestions />
            </AnalyticsCard>
          </div>
        </div>
      </div>
    </div>
  );
};

// =====================================================
// UI PRIMITIVES
// =====================================================
const StatCard = ({ label, value, change, benchmark, additional }) => (
  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-gray-500 font-medium">{label}</h2>
      {benchmark ? (
        <PerformanceBadge value={parseFloat(value)} benchmark={benchmark} />
      ) : null}
    </div>
    <div className="flex items-end gap-2">
      <p className="text-2xl font-bold">{value}</p>
      <Delta pct={change} />
    </div>
    {additional ? (
      <div className="text-xs text-gray-500 mt-2">{additional}</div>
    ) : null}
  </div>
);

const AnalyticsCard = ({ title, children, timeRange, action }) => (
  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="flex gap-2">
        {timeRange ? (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {timeRange}
          </span>
        ) : null}
        {action}
      </div>
    </div>
    {children}
  </div>
);

const PostCard = ({ post }) => (
  <div className="border-b pb-4 last:border-b-0 last:pb-0">
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
      <MetricBlock
        label="Likes"
        value={formatNumber(post.likes)}
        color="text-green-600"
      />
      <MetricBlock
        label="Comments"
        value={formatNumber(post.comments)}
        color="text-blue-600"
      />
      <MetricBlock
        label="Shares"
        value={formatNumber(post.shares)}
        color="text-purple-600"
      />
      <MetricBlock label="Reach" value={formatNumber(post.reach)} />
    </div>
  </div>
);

const AudienceSection = ({ data }) => (
  <div className="space-y-4">
    <CategorySection
      icon={<FiBriefcase className="text-gray-400" />}
      title="Industries"
      items={data.industries}
      color="bg-blue-600"
    />
    <CategorySection
      icon={<FiAward className="text-gray-400" />}
      title="Seniority"
      items={data.roles}
      color="bg-green-600"
    />
    <CategorySection
      icon={<FiGlobe className="text-gray-400" />}
      title="Regions"
      items={data.regions}
      color="bg-purple-600"
    />
  </div>
);

const CategorySection = ({ icon, title, items, color }) => (
  <div>
    <h3 className="font-medium text-sm flex items-center gap-2 mb-2">
      {icon} {title}
    </h3>
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.label} className="text-sm">
          <div className="flex justify-between mb-1">
            <span>{item.label}</span>
            <span>{item.value}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className={`${color} h-1.5 rounded-full`}
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InsightsSection = () => (
  <div className="space-y-3 text-sm">
    <InsightCard
      icon={<FiTrendingUp className="text-blue-600" />}
      title="Trending Up"
      content="Reposts and project updates are performing ~30% better than average. Try one detailed post + one quick repost this week."
      color="bg-blue-50"
    />
    <InsightCard
      icon={<FiClock className="text-yellow-600" />}
      title="Best Times"
      content="Posts published Tue–Thu between 9–11 AM (local) tend to get higher engagement for your audience."
      color="bg-yellow-50"
    />
    <InsightCard
      icon={<FiUsers className="text-green-600" />}
      title="Audience Growth"
      content="Tech and Education audiences are a strong slice of your followers. Consider content tailored to those groups."
      color="bg-green-50"
    />
  </div>
);

const InsightCard = ({ icon, title, content, color }) => (
  <div className={`p-3 ${color} rounded-lg`}>
    <h3 className="font-medium flex items-center gap-2 mb-1">
      {icon} {title}
    </h3>
    <p className="text-gray-700">{content}</p>
  </div>
);

const Suggestions = () => (
  <div className="text-sm space-y-3">
    <div className="p-3 rounded-md bg-blue-50">
      <div className="font-medium flex items-center gap-2">
        <FiClock /> Best time to post
      </div>
      <div className="text-gray-700">Tue–Thu, 9–11 AM (local)</div>
      <div className="text-gray-500 text-xs mt-1">
        Historically higher engagement in this window for your audience.
      </div>
    </div>
    <div className="p-3 rounded-md bg-gray-50">
      <div className="font-medium mb-1">What to post next</div>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Short recap of your IT Club events with 3 photos</li>
        <li>Mini case study: Next.js performance win from a project</li>
        <li>Shout-out post (mentor/peer) + key lesson learned</li>
        <li>Repost event flyer with a 1-line personal takeaway</li>
      </ul>
    </div>
  </div>
);

const MetricBlock = ({ label, value, color = "text-gray-900" }) => (
  <div className="text-center">
    <div className={`font-bold ${color}`}>{value}</div>
    <div className="text-gray-500 text-xs">{label}</div>
  </div>
);

const Delta = ({ pct }) => {
  const isUp = pct >= 0;
  return (
    <span
      className={`${
        isUp ? "text-green-600" : "text-red-600"
      } text-sm font-medium flex items-center`}
    >
      {isUp ? "▲" : "▼"} {Math.abs(pct).toFixed(1)}%
    </span>
  );
};

const PerformanceBadge = ({ value, benchmark }) => {
  if (!benchmark || isNaN(value)) return null;
  const percentage = (value / benchmark) * 100;
  let className = "text-xs px-2 py-1 rounded-full";
  if (percentage >= 150) className += " bg-green-100 text-green-800";
  else if (percentage >= 100) className += " bg-blue-100 text-blue-800";
  else className += " bg-yellow-100 text-yellow-800";
  return (
    <span className={className}>
      {percentage >= 150 ? "Excellent" : percentage >= 100 ? "Good" : "Average"}
    </span>
  );
};

// =====================================================
// MINI SVG LINE CHART (no library)
// =====================================================
const MiniLineChart = ({ data = [], height = 240, strokeWidth = 2 }) => {
  let series = Array.isArray(data)
    ? data.filter((n) => !isNaN(+n)).map(Number)
    : [];
  if (series.length === 1) series = [series[0], series[0]];
  if (series.length === 0) series = [2.0, 2.1, 2.2];

  const W = 800;
  const H = height;
  const PAD = 28;

  const min = Math.min(...series);
  const max = Math.max(...series);
  const span = max - min || 1;

  const N = series.length;
  const stepX = N > 1 ? (W - PAD * 2) / (N - 1) : 0;

  const pts = series.map((v, i) => {
    const x = PAD + (N > 1 ? i * stepX : (W - PAD * 2) / 2);
    const y = H - PAD - ((v - min) / span) * (H - PAD * 2);
    return [x, y];
  });

  const path = pts.map(([x, y], i) => `${i ? "L" : "M"} ${x} ${y}`).join(" ");
  const last = pts[pts.length - 1];
  const areaPath =
    `${pts.length ? `M ${pts[0][0]} ${H - PAD} ` : ""}` +
    pts.map(([x, y]) => `L ${x} ${y}`).join(" ") +
    (pts.length ? ` L ${pts[pts.length - 1][0]} ${H - PAD} Z` : "");

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full"
        aria-label="Engagement trend"
      >
        <defs>
          <linearGradient id="er-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopOpacity="0.18" stopColor="#3b82f6" />
            <stop offset="100%" stopOpacity="0" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* grid */}
        <g opacity="0.15">
          {[0, 1, 2, 3, 4].map((i) => {
            const y = PAD + i * ((H - PAD * 2) / 4);
            return (
              <line
                key={i}
                x1={PAD}
                y1={y}
                x2={W - PAD}
                y2={y}
                stroke="#94a3b8"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* area + line */}
        <path d={areaPath} fill="url(#er-fill)" />
        <path
          d={path}
          fill="none"
          stroke="#2563eb"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* last point label */}
        {last && (
          <g>
            <circle cx={last[0]} cy={last[1]} r="4.5" fill="#2563eb" />
            <text
              x={Math.min(W - PAD, last[0] + 8)}
              y={Math.max(PAD + 10, last[1] - 8)}
              fontSize="12"
              fill="#1f2937"
            >
              {series[series.length - 1].toFixed(1)}%
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// =====================================================
// HELPERS (trend builder that NEVER returns a flat single value)
// =====================================================
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

function daysSince(iso) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

function rateFromPost(p) {
  const s = p.stats || {};
  const likes = s.likes ?? p.likes ?? 0;
  const comments = s.comments ?? p.comments ?? 0;
  const shares = s.shares ?? p.shares ?? 0;
  const impressions = s.impressions ?? p.reach ?? 0;
  const inter = likes + comments + shares;
  return impressions > 0 ? +((inter / impressions) * 100).toFixed(1) : 0;
}

function ratesFromPosts(posts) {
  // sort by createdAt/publishedAt (oldest → newest)
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(a.publishedAt || a.createdAt) -
      new Date(b.publishedAt || b.createdAt)
  );
  return sorted.map(rateFromPost);
}

function resampleLinear(arr, n) {
  if (!arr.length) return Array(n).fill(0);
  if (arr.length === 1) return Array(n).fill(arr[0]);
  if (arr.length === n) return arr.map((x) => +x.toFixed(1));
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = (i * (arr.length - 1)) / (n - 1);
    const i0 = Math.floor(t);
    const i1 = Math.ceil(t);
    const y0 = arr[i0];
    const y1 = arr[i1];
    const frac = t - i0;
    out.push(+(y0 + (y1 - y0) * frac).toFixed(1));
  }
  return out;
}

function synthesizeSeries(anchor = 2.0, n = 14) {
  const out = [];
  for (let i = 0; i < n; i++) {
    // subtle deterministic wiggle so it never looks flat after rounding to 1 dp
    const wobble = Math.sin(i / 3) * 0.18 + Math.sin(i / 7) * 0.09;
    out.push(+(anchor + wobble).toFixed(1));
  }
  return out;
}

/**
 * Build a 14-point engagement series from:
 * 1) Recent posts (up to last 12) → interpolate to 14 points
 * 2) If only one post → synthesize around its rate
 * 3) Else → synthesize around KPI value or 2.0
 */
function getEngagementTrend(data) {
  const posts = Array.isArray(data?.posts) ? data.posts : [];
  const recent = posts
    .filter((p) => daysSince(p.publishedAt || p.createdAt) <= 120)
    .slice(-12);

  let series = [];
  const rates = ratesFromPosts(recent);
  if (rates.length >= 2) {
    series = resampleLinear(rates, 14);
  } else if (rates.length === 1) {
    series = synthesizeSeries(rates[0], 14);
  } else {
    const anchor =
      typeof data?.kpis?.engagementRate?.value === "number"
        ? data.kpis.engagementRate.value
        : 2.0;
    series = synthesizeSeries(anchor, 14);
  }

  const current = series[series.length - 1];
  const min = Math.min(...series);
  const max = Math.max(...series);
  const avg = series.reduce((a, b) => a + b, 0) / series.length;

  return { current, min, max, avg, series };
}

// =====================================================
// NORMALIZER
// =====================================================
function normalizeAnalytics(raw, userData) {
  const posts = Array.isArray(raw?.posts) ? raw.posts : [];

  // Totals from the most recent window (30d if possible)
  let totalLikes = 0,
    totalComments = 0,
    totalShares = 0,
    totalImpressions = 0;

  const last30 = posts.filter((p) => daysSince(p.createdAt) <= 30);
  (last30.length ? last30 : posts).forEach((p) => {
    const s = p?.stats || {};
    totalLikes += s.likes ?? 0;
    totalComments += s.comments ?? 0;
    totalShares += s.shares ?? 0;
    totalImpressions += s.impressions ?? 0;
  });

  const interactions = totalLikes + totalComments + totalShares;
  const er = totalImpressions > 0 ? (interactions / totalImpressions) * 100 : 0;

  // New followers from trend
  const followersSeries = Array.isArray(raw?.followersTrend)
    ? raw.followersTrend
    : [];
  const followersFirst =
    followersSeries[0]?.followers ?? raw?.page?.followers ?? 0;
  const followersLast =
    followersSeries[followersSeries.length - 1]?.followers ??
    raw?.kpis?.followersTotal ??
    followersFirst;
  const newFollowers = Math.max(0, followersLast - followersFirst);

  // Normalize posts into the shape this page expects
  const normalizedPosts = posts.map((p) => {
    const s = p.stats || {};
    const impressions = s.impressions ?? 0;
    const likes = s.likes ?? 0;
    const comments = s.comments ?? 0;
    const shares = s.shares ?? 0;
    const ctr = impressions > 0 ? (likes / impressions) * 100 : 0;

    return {
      id: p.id,
      title:
        p.text?.length > 80 ? p.text.slice(0, 77) + "..." : p.text || "Post",
      publishedAt: p.createdAt,
      likes,
      comments,
      shares,
      reach: impressions,
      ctr,
      type:
        (p.mediaType
          ? p.mediaType[0].toUpperCase() + p.mediaType.slice(1)
          : "Post") || "Post",
      stats: s, // keep stats too, just in case
    };
  });

  // Reasonable defaults for audience/benchmarks
  const audience = {
    industries: [
      { label: "Technology", value: 48 },
      { label: "Education", value: 18 },
      { label: "Financial Services", value: 14 },
      { label: "Healthcare", value: 10 },
      { label: "Other", value: 10 },
    ],
    roles: [
      { label: "Individual Contributor", value: 38 },
      { label: "Manager", value: 32 },
      { label: "VP/Director", value: 20 },
      { label: "C-Level", value: 10 },
    ],
    regions: [
      { label: "North America", value: 62 },
      { label: "Europe", value: 20 },
      { label: "Asia Pacific", value: 14 },
      { label: "Other", value: 4 },
    ],
  };

  return {
    asOf: new Date().toISOString(),
    kpis: {
      engagementRate: {
        value:
          typeof raw?.kpis?.engagementRate === "number"
            ? raw.kpis.engagementRate
            : +er.toFixed(1),
        deltaPct:
          typeof raw?.kpis?.engagementChangePct === "number"
            ? raw.kpis.engagementChangePct
            : 5.2,
      },
      newFollowers: {
        value: newFollowers,
        deltaPct:
          typeof raw?.kpis?.followersChangePct === "number"
            ? raw.kpis.followersChangePct
            : 3.8,
      },
      totalLikes: { value: totalLikes, deltaPct: 4.7 },
      postReach: {
        value:
          (last30.length ? last30 : posts).length > 0
            ? Math.round(
                totalImpressions /
                  (last30.length ? last30.length : posts.length)
              )
            : 0,
        deltaPct: 6.1,
      },
    },
    posts: normalizedPosts,
    audience,
    benchmarks: { industryAvg: 2.8, topPercentile: 6.4 },
    page: {
      followers: raw?.kpis?.followersTotal ?? raw?.page?.followers ?? 914,
      name:
        userData?.accountDetails?.name || raw?.page?.name || "Kishan Kumar Das",
      logo:
        userData?.accountDetails?.profileURL ||
        raw?.page?.logo ||
        "https://i.pravatar.cc/100?img=12",
    },
  };
}

// =====================================================
// KISHAN — FALLBACK RAW (built from your LinkedIn posts list)
// =====================================================
const KISHAN_MOCK_RAW = {
  page: {
    name: "Kishan Kumar Das",
    handle: "kishankumardas",
    logo: "https://i.pravatar.cc/100?img=12",
    followers: 914,
  },
  kpis: {
    followersTotal: 914,
    followersChangePct: 3.8,
    engagementRate: 2.4,
    engagementChangePct: 12.1,
    sentiment: { positive: 72, neutral: 22, negative: 6 },
  },
  followersTrend: [
    { date: "2025-07-17", followers: 881 },
    { date: "2025-07-20", followers: 885 },
    { date: "2025-07-23", followers: 892 },
    { date: "2025-07-26", followers: 897 },
    { date: "2025-07-29", followers: 901 },
    { date: "2025-08-01", followers: 904 },
    { date: "2025-08-04", followers: 907 },
    { date: "2025-08-07", followers: 910 },
    { date: "2025-08-10", followers: 912 },
    { date: "2025-08-13", followers: 914 },
  ],
  posts: [
    {
      id: "p1",
      text: "Reposted: Connections are everything in Canada — The Networking Catalyst at Conestoga College (July 18). #Networking #ConestogaCollege #CareerSuccess",
      createdAt: "2025-07-18T20:00:00Z",
      mediaType: "image",
      stats: { likes: 24, comments: 1, shares: 10, impressions: 1800 },
    },
    {
      id: "p2",
      text: "Reposted: THE NETWORKING CATALYST – July 18, 4–9 PM (Doon). Limited spots — register now!",
      createdAt: "2025-07-12T16:00:00Z",
      mediaType: "image",
      stats: { likes: 14, comments: 1, shares: 1, impressions: 1100 },
    },
    {
      id: "p3",
      text: "Reposted: LaunchPad 2025 — pre-incubator pitch night for Conestoga students. Safe space to share ideas.",
      createdAt: "2025-07-01T15:00:00Z",
      mediaType: "text",
      stats: { likes: 9, comments: 2, shares: 3, impressions: 900 },
    },
    {
      id: "p4",
      text: "Reposted: IT Club volunteers needed for July 4 event at Waterloo Campus — get involved!",
      createdAt: "2025-06-25T15:00:00Z",
      mediaType: "image",
      stats: { likes: 16, comments: 0, shares: 3, impressions: 950 },
    },
    {
      id: "p5",
      text: "Reposted: First club gathering — Digital Marketing & Personal Branding (June 5, Doon).",
      createdAt: "2025-06-03T16:00:00Z",
      mediaType: "image",
      stats: { likes: 6, comments: 0, shares: 3, impressions: 600 },
    },
    {
      id: "p6",
      text: "Had a great time representing IT Club at CSI Club Showcase (Doon)! #ITClubConestoga #CSIShowcase",
      createdAt: "2025-06-15T14:00:00Z",
      mediaType: "image",
      stats: { likes: 37, comments: 1, shares: 0, impressions: 722 },
    },
    {
      id: "p7",
      text: "Reposted: Curious about IT Club? Showcase — May 20 (Waterloo) & May 21 (Doon). Find your community.",
      createdAt: "2025-05-15T16:00:00Z",
      mediaType: "image",
      stats: { likes: 14, comments: 5, shares: 2, impressions: 800 },
    },
    {
      id: "p8",
      text: "Reposted: IT Club Movie Night at Conestoga Brantford (Mar 30). Bring a snack and join!",
      createdAt: "2025-03-27T22:00:00Z",
      mediaType: "image",
      stats: { likes: 2, comments: 0, shares: 2, impressions: 300 },
    },
    {
      id: "p9",
      text: "Reposted: Upgrade English Club × IT Club × Redefined Conestoga — Speed Networking + Panels (Mar 16).",
      createdAt: "2025-03-10T22:00:00Z",
      mediaType: "image",
      stats: { likes: 32, comments: 5, shares: 6, impressions: 1600 },
    },
    {
      id: "p10",
      text: "Thrilled to share my Hackathon experience... #Hackathon #TechInnovation",
      createdAt: "2025-03-05T20:00:00Z",
      mediaType: "image",
      stats: { likes: 54, comments: 8, shares: 2, impressions: 1877 },
    },
    {
      id: "p11",
      text: "Why you should use Next.js: SSR, SSG, SEO, routing, API routes, perf... #Nextjs #React",
      createdAt: "2024-10-15T18:00:00Z",
      mediaType: "document",
      stats: { likes: 9, comments: 0, shares: 0, impressions: 461 },
    },
    {
      id: "p12",
      text: "Exciting day representing the IT Club at Conestoga Doon! #TechCommunity #CareerGrowth",
      createdAt: "2024-10-10T18:00:00Z",
      mediaType: "image",
      stats: { likes: 22, comments: 5, shares: 1, impressions: 870 },
    },
    {
      id: "p13",
      text: "Reposted: Mahendra Parmar is looking for a Frontend (React) role in Ahmedabad — referrals appreciated!",
      createdAt: "2024-08-10T18:00:00Z",
      mediaType: "text",
      stats: { likes: 25, comments: 6, shares: 6, impressions: 500 },
    },
    {
      id: "p14",
      text: "Reposted: Backend/NodeJS role — 2+ years experience. Please reach out if you have opportunities.",
      createdAt: "2024-08-05T18:00:00Z",
      mediaType: "document",
      stats: { likes: 27, comments: 2, shares: 3, impressions: 520 },
    },
    {
      id: "p15",
      text: "Volunteering at IT Sales Community event on Sept 16 — learned a ton about AI in sales. #AIinSales",
      createdAt: "2024-09-17T18:00:00Z",
      mediaType: "image",
      stats: { likes: 16, comments: 1, shares: 2, impressions: 752 },
    },
    {
      id: "p16",
      text: "Reposted: GDG Ahmedabad — great learning + community networking. #devfest",
      createdAt: "2023-08-20T18:00:00Z",
      mediaType: "video",
      stats: { likes: 13, comments: 3, shares: 2, impressions: 900 },
    },
  ],
};

export default AnalyticsPage;
