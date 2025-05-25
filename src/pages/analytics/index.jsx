
import React from "react";
import { FiTrendingUp, FiUsers, FiHeart, FiBarChart } from "react-icons/fi";

const AnalyticsPage = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white px-6 py-12">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">📊 Analytics Dashboard</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Track your performance, audience insights, and growth trends in one powerful view.
          </p>
        </div>

        {/* KPI Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow flex flex-col items-center text-center">
            <FiTrendingUp className="text-primary text-3xl mb-2" />
            <h2 className="text-lg font-semibold">Engagement Rate</h2>
            <p className="text-2xl font-bold">12.4%</p>
            <span className="text-green-400 text-sm">+2.3% this week</span>
          </div>
          <div className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow flex flex-col items-center text-center">
            <FiUsers className="text-primary text-3xl mb-2" />
            <h2 className="text-lg font-semibold">New Followers</h2>
            <p className="text-2xl font-bold">1,245</p>
            <span className="text-green-400 text-sm">+8.9% this week</span>
          </div>
          <div className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow flex flex-col items-center text-center">
            <FiHeart className="text-primary text-3xl mb-2" />
            <h2 className="text-lg font-semibold">Total Likes</h2>
            <p className="text-2xl font-bold">5,890</p>
            <span className="text-green-400 text-sm">+4.1% this week</span>
          </div>
          <div className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow flex flex-col items-center text-center">
            <FiBarChart className="text-primary text-3xl mb-2" />
            <h2 className="text-lg font-semibold">Post Reach</h2>
            <p className="text-2xl font-bold">22,310</p>
            <span className="text-green-400 text-sm">+5.6% this week</span>
          </div>
        </section>

        {/* Trend Charts Section */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-6">
          <h2 className="text-xl font-semibold mb-4">Engagement Trends</h2>
          <div className="h-64 bg-gradient-to-br from-background-dark to-background-light rounded-lg flex items-center justify-center text-text-tertiary">
            📈 [Insert Trend Chart Component Here]
          </div>
        </section>

        {/* Recent Posts */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">Recent Top Posts</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Post #1: “New Feature Launch 🚀”</span>
              <span className="text-green-400">+320 Likes</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Post #2: “Behind-the-Scenes 🎥”</span>
              <span className="text-green-400">+280 Likes</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Post #3: “Community Shoutout 🌟”</span>
              <span className="text-green-400">+250 Likes</span>
            </div>
          </div>
        </section>

        {/* Audience Demographics */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-6">
          <h2 className="text-xl font-semibold mb-4">Audience Demographics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-background-medium rounded-lg">
              <h3 className="font-semibold mb-2">Age Groups</h3>
              <ul className="text-text-secondary space-y-1">
                <li>18–24: 40%</li>
                <li>25–34: 35%</li>
                <li>35–44: 15%</li>
                <li>45+: 10%</li>
              </ul>
            </div>
            <div className="p-4 bg-background-medium rounded-lg">
              <h3 className="font-semibold mb-2">Top Locations</h3>
              <ul className="text-text-secondary space-y-1">
                <li>USA: 50%</li>
                <li>Canada: 20%</li>
                <li>UK: 15%</li>
                <li>India: 15%</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Growth Insights */}
        <section className="bg-surface-dark rounded-xl p-6 border border-border-dark shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">Growth Insights</h2>
          <p className="text-text-secondary">
            Over the past month, you’ve seen a consistent increase in follower
            count and engagement rate. Keep up the momentum by posting
            consistently and engaging with your audience.
          </p>
          <button className="btn-primary mt-2">View Detailed Reports</button>
        </section>
      </div>
    </div>
  );
};

export default AnalyticsPage;
