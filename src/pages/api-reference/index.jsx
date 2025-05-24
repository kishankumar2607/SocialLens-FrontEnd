import React from "react";
import { FiDatabase, FiLock, FiGlobe, FiCode } from "react-icons/fi";

const ApiReferencePage = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white px-6 py-16 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">API Reference</h1>
          <p className="text-text-secondary max-w-3xl mx-auto text-lg">
            Welcome to the SocialLens API! Here you’ll find all the details you
            need to integrate your apps, automate tasks, and access your social
            media data securely.
          </p>
        </section>

        {/* Key Concepts */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiGlobe className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Base URL</h3>
            <p className="text-text-secondary text-sm break-all">
              https://api.sociallens.com/v1
            </p>
          </div>
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiLock className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Authentication</h3>
            <p className="text-text-secondary text-sm">
              Use your personal API key with the <code>Authorization</code>{" "}
              header.
            </p>
          </div>
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiDatabase className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rate Limits</h3>
            <p className="text-text-secondary text-sm">
              1000 requests per hour per user. Contact support for upgrades.
            </p>
          </div>
        </section>

        {/* Sample Endpoints */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold text-center mb-6">Endpoints</h2>

          <div className="bg-surface-dark rounded-xl border border-border-dark p-6">
            <h3 className="text-xl font-semibold mb-2">GET /posts</h3>
            <p className="text-text-secondary text-sm mb-4">
              Retrieve a list of your recent social media posts.
            </p>
            <pre className="bg-surface-medium text-sm p-4 rounded overflow-x-auto">
              {`curl -X GET "https://api.sociallens.com/v1/posts" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </div>

          <div className="bg-surface-dark rounded-xl border border-border-dark p-6">
            <h3 className="text-xl font-semibold mb-2">POST /schedule</h3>
            <p className="text-text-secondary text-sm mb-4">
              Schedule a new post to your connected accounts.
            </p>
            <pre className="bg-surface-medium text-sm p-4 rounded overflow-x-auto">
              {`curl -X POST "https://api.sociallens.com/v1/schedule" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Hello world!",
    "scheduled_at": "2025-06-01T10:00:00Z"
  }'`}
            </pre>
          </div>

          <div className="bg-surface-dark rounded-xl border border-border-dark p-6">
            <h3 className="text-xl font-semibold mb-2">GET /analytics</h3>
            <p className="text-text-secondary text-sm mb-4">
              Retrieve analytics data for your posts, including likes, comments,
              and reach.
            </p>
            <pre className="bg-surface-medium text-sm p-4 rounded overflow-x-auto">
              {`curl -X GET "https://api.sociallens.com/v1/analytics" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </div>
        </section>

        {/* Developer Help */}
        <section className="text-center space-y-4">
          <FiCode className="text-primary text-4xl mx-auto" />
          <h2 className="text-3xl font-bold">Need More Help?</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Visit our detailed developer docs, or reach out to our support team
            if you need help building with the API.
          </p>
          <a href="/support" className="btn-primary inline-block">
            Go to Support
          </a>
        </section>
      </div>
    </div>
  );
};

export default ApiReferencePage;
