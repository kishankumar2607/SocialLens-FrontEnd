import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../components/AppIcon";
import useLinkedIn from "../../hook/useLinkedIn";
import AnalyticsCard from "./components/AnalyticsCard";
import DataVisualization from "./components/DataVisualization";
import SkeletonLoader from "./components/SkeletonLoader";
import MiniTrend from "./components/MiniTrend";

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

  const followersData = data?.followersTrend ?? [];
  const engagementData = Array.isArray(data?.engagementByFormat)
    ? data.engagementByFormat.map((d) => ({ name: d.name, rate: d.rate }))
    : [];
  const sentimentData = data?.kpis?.sentiment
    ? [
        {
          name: "Positive",
          value: data.kpis.sentiment.positive,
          color: "#10B981",
        },
        {
          name: "Neutral",
          value: data.kpis.sentiment.neutral,
          color: "#6B7280",
        },
        {
          name: "Negative",
          value: data.kpis.sentiment.negative,
          color: "#F43F5E",
        },
      ]
    : [];

  const accountName =
    userData?.accountDetails?.name ?? data?.page?.name ?? "LinkedIn";
  const accountAvatar =
    userData?.accountDetails?.profileURL ||
    userData?.accountDetails?.avatar ||
    data?.page?.logo ||
    "https://i.pravatar.cc/100?img=12";
  const accountHandle =
    userData?.accountDetails?.handle ||
    (accountName
      ? accountName.trim().toLowerCase().replace(/\s+/g, "")
      : data?.page?.handle || "account");
  const accountUrl = userData?.accountDetails?.url || "#";

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Dashboard</h1>
              <p className="text-sm text-gray-600">
                {isConnected
                  ? "LinkedIn analytics overview"
                  : "Preview (connect to see live data)"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="btn-secondary text-gray-800 flex items-center">
                <Icon name="Calendar" size={18} className="mr-2" />
                Last 30 days
              </button>

              <button
                className="btn-primary flex items-center"
                onClick={() => {
                  // TODO: hook up export if needed
                  // exportToCsv(data);
                }}
              >
                <Icon name="Download" size={18} className="mr-2" />
                Export
              </button>

              {!liLoading &&
                isConnected &&
                (userData?.accountDetails || data?.page) && (
                  <a
                    href={accountUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden md:flex items-center gap-2 pl-3 ml-2 border-l hover:opacity-90"
                  >
                    <img
                      src={accountAvatar}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://i.pravatar.cc/100?img=12";
                      }}
                      alt="profile avatar"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="leading-tight">
                      <div className="text-sm font-medium">{accountName}</div>
                      <div className="text-xs text-gray-500">
                        @{accountHandle}
                      </div>
                    </div>
                  </a>
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
                  {errorMessage ||
                    "Please connect your LinkedIn account. Go to Settings → Linked Accounts and connect it."}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link to="/settings" className="btn-primary">
                  Go to Settings
                </Link>
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
                value={formatNumber(data?.kpis?.followersTotal)}
                change={`+${data?.kpis?.followersChangePct ?? 0}%`}
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
                value={`${data?.kpis?.engagementRate ?? 0}%`}
                change={`+${data?.kpis?.engagementChangePct ?? 0}%`}
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

              {/* Actionable Suggestions */}
              <AnalyticsCard
                title="Actionable Suggestions"
                subtitle="What to post & when (last 30 days)"
                value="Personalized tips"
                change="+ Insights"
                changeType="positive"
                icon="Lightbulb"
              >
                <SuggestionsList
                  posts={data?.posts}
                  engagementByFormat={engagementData}
                  sentiment={data?.kpis?.sentiment}
                  followersTrend={followersData}
                />
              </AnalyticsCard>

              {/* Sentiment */}
              <AnalyticsCard
                title="Sentiment Overview (LinkedIn)"
                subtitle="Based on comments"
                value={
                  typeof data?.kpis?.sentiment?.positive === "number"
                    ? `${data.kpis.sentiment.positive}% Positive`
                    : "—"
                }
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

const SuggestionsList = ({
  posts = [],
  engagementByFormat = [],
  sentiment,
  followersTrend = [],
}) => {
  const tips = buildSuggestions({
    posts,
    engagementByFormat,
    sentiment,
    followersTrend,
  });

  return (
    <ul className="space-y-3">
      {tips.map((t, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="mt-0.5 rounded-md p-1.5 bg-gray-100">
            <Icon name={t.icon} size={16} className="text-gray-700" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{t.title}</div>
            <div className="text-sm text-gray-600">{t.tip}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

const buildSuggestions = ({
  posts,
  engagementByFormat,
  sentiment,
  followersTrend,
}) => {
  const tips = [];

  // 1) Best time window (from your own posts)
  const bestTime = getBestPostingTime(posts); // already defined in your file
  if (bestTime && bestTime !== "N/A") {
    tips.push({
      icon: "Clock",
      title: "Best time to post",
      tip: `Post between ${bestTime} — this window showed the highest interactions on your recent posts.`,
    });
  }

  // 2) What to post (based on best-performing format)
  const format = getTopFormat(posts); // already defined
  const bestFormat = pickBestFormat(engagementByFormat) || format;
  if (bestFormat && bestFormat !== "N/A") {
    tips.push({
      icon: "Image",
      title: "Best format",
      tip: `${bestFormat} posts are performing best for you. Prioritize this format for your next 2–3 posts.`,
    });
  }

  // 3) Post ideas based on your recent activity
  const ideas = suggestContentIdeas(posts, bestFormat || format);
  if (ideas.length) {
    tips.push({
      icon: "PenTool",
      title: "What to talk about",
      tip: ideas.join(" • "),
    });
  }

  // 4) Cadence suggestion (lightweight heuristic)
  const cadence = suggestCadence(posts);
  tips.push({
    icon: "Calendar",
    title: "Posting cadence",
    tip: cadence,
  });

  // 5) Sentiment nudge
  if (sentiment && typeof sentiment.positive === "number") {
    const s = sentiment.positive;
    tips.push({
      icon: "Smile",
      title: "Tone to aim for",
      tip:
        s >= 65
          ? "Lean into your positive tone—audiences are responding well. Add a clear CTA to nudge comments."
          : "Try more positive framing and ask a question at the end to invite replies.",
    });
  }

  // 6) Follower trend nudge
  const trendNote = followersTrendNote(followersTrend);
  if (trendNote) {
    tips.push({
      icon: "TrendingUp",
      title: "Growth tweak",
      tip: trendNote,
    });
  }

  return tips;
};

const pickBestFormat = (engagementByFormat = []) => {
  if (!engagementByFormat.length) return null;
  const best = engagementByFormat.reduce((a, b) => (a.rate > b.rate ? a : b));
  return best?.name || null;
};

const suggestContentIdeas = (posts = [], bestFormat = "Image") => {
  const ideas = [];
  // Look for themes in your recent posts to tailor ideas
  const textPool = (posts || [])
    .map((p) => (p.text || "").toLowerCase())
    .join(" ");
  const mentionsNext =
    /next\.js|react|frontend|full[-\s]?stack|aws|react native/.test(textPool);
  const conestoga = /conestoga|college|certificate|mentor|learning/.test(
    textPool
  );
  const project =
    /treatmytravel|portfolio|project|app|mobile|deploy|aws|hostinger|vercel|node/.test(
      textPool
    );
  const events = /network|event|workshop|club|it club|talk/.test(textPool);

  if (project)
    ideas.push(
      `Share a short case study with before/after metrics in a ${bestFormat.toLowerCase()} post`
    );
  if (mentionsNext)
    ideas.push(
      `Break down a tricky Next.js/React bug you solved with a code snippet`
    );
  if (conestoga)
    ideas.push(
      `Reflect on a specific lesson from Conestoga and how you applied it at work`
    );
  if (events)
    ideas.push(
      `Post a 3–5 point summary from a recent event and tag organizers/speakers`
    );

  if (!ideas.length) {
    ideas.push(
      `Show a mini demo (GIF/video) of a feature, and add a one-line insight you learned`
    );
  }
  return ideas.slice(0, 3);
};

const followersTrendNote = (series = []) => {
  if (!series.length) return "";
  const first = series[0]?.followers ?? 0;
  const last = series[series.length - 1]?.followers ?? 0;
  if (last > first) {
    return "Growth is trending up—double down on what worked in your last two posts.";
  }
  if (last < first) {
    return "Growth is flat/down—experiment with a different hook in the first 2 lines and add 1 question.";
  }
  return "";
};

const suggestCadence = (posts = []) => {
  const recent = posts.filter((p) => daysSince(p.createdAt) <= 30).length;
  if (recent >= 5)
    return "You’re consistent—keep ~2 posts/week and add 1 comment on others’ posts daily.";
  if (recent >= 2)
    return "Aim for 2 posts/week for the next 3 weeks. Batch ideas on Sunday, schedule mid-week & weekend.";
  return "Start with 1 post/week for 3 weeks to build rhythm. Repurpose one old project as a fresh post.";
};

const getTopFormat = (posts) => {
  if (!Array.isArray(posts) || posts.length === 0) return "N/A";
  const map = new Map();
  posts.forEach((p) => {
    const fmt = p?.mediaType ?? "text";
    map.set(fmt, (map.get(fmt) ?? 0) + 1);
  });
  let top = "N/A";
  let max = -1;
  for (const [k, v] of map.entries()) {
    if (v > max) {
      max = v;
      top = k;
    }
  }
  return top[0]?.toUpperCase() + top.slice(1);
};

const getBestPostingTime = (posts) => {
  if (!Array.isArray(posts) || posts.length === 0) return "N/A";
  const buckets = new Map(); // hour -> interactions
  posts.forEach((p) => {
    const s = p?.stats;
    if (!s) return;
    const interactions = (s.likes ?? 0) + (s.comments ?? 0) + (s.shares ?? 0);
    const d = new Date(p.createdAt);
    const h = d.getUTCHours();
    buckets.set(h, (buckets.get(h) ?? 0) + interactions);
  });
  if (buckets.size === 0) return "N/A";
  let bestHour = 9;
  let bestVal = -1;
  for (const [h, v] of buckets.entries()) {
    if (v > bestVal) {
      bestVal = v;
      bestHour = h;
    }
  }
  const label = (h) => `${pad(h)}:00–${pad((h + 2) % 24)}:00`;
  return label(bestHour);
};

const daysSince = (iso) => {
  const then = new Date(iso).getTime();
  const now = Date.now();
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
};

const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

const formatNumber = (n) =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { maximumFractionDigits: 0 })
    : n ?? "";

export default Dashboard;
