import React from "react";

// import FeatureImg1 from "../assets/feature1.png";
// import FeatureImg2 from "../assets/feature2.png";
// import FeatureImg3 from "../assets/feature3.png";
// import TestimonialAvatar from "../assets/avatar-testimonial.png";
import Testimonials from "../../components/Testimonials";

export default function TryForFree() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-gray-100">
      <section className="relative flex flex-col justify-center items-center text-center flex-1 px-6 py-20">
        {/* <div className="absolute inset-0 z-0">
          <div className="absolute bottom-1/5 right-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-30 blur-[150px] rounded-full animate-pulse-slow" />
          <div className="absolute top-1/4 left-1/4 bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-[150px] rounded-full animate-pulse-slow" />
        </div> */}
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight text-white">
            Drive Impact from Your Social Data.
          </h1>
          <p className="text-lg text-gray-300">
            Get real-time analytics, easy engagement tools, and AI-powered
            insights—completely free for 30 days.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your work email"
              className="w-full sm:w-80 px-4 py-3 bg-slate-800 border border-slate-700 rounded-md placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-green-400 text-slate-900 font-semibold rounded-md hover:bg-green-500 transition"
            >
              Start Free Trial
            </button>
          </form>
          <p className="mt-2 text-sm text-gray-500">No credit card required.</p>
        </div>
      </section>

      {/* “How 30k+ Brands Reach Goals” Table */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto bg-slate-800 rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-3 bg-slate-950 text-gray-300">
            <div className="p-6 font-semibold">Where We Excel</div>
            <div className="p-6 font-semibold">What You’ll Gain</div>
            <div className="p-6 font-semibold">ROI</div>
          </div>
          <div className="divide-y divide-slate-700">
            <div className="grid grid-cols-3 items-start p-6">
              <div>
                <p className="font-medium text-white">Ease of Use</p>
                <p className="mt-1 text-gray-400">
                  Lightning-fast setup with zero training
                </p>
              </div>
              <div>
                <p className="font-medium text-white">Instant Insights</p>
                <p className="mt-1 text-gray-400">
                  See your first report in under 5 minutes
                </p>
              </div>
              <div>
                <p className="font-medium text-white">95%+</p>
                <p className="mt-1 text-gray-400">
                  Of customers report clear ROI within one day
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 items-start p-6">
              <div>
                <p className="font-medium text-white">Support</p>
                <p className="mt-1 text-gray-400">
                  24/7 live chat, email, and phone
                </p>
              </div>
              <div>
                <p className="font-medium text-white">Strategic Focus</p>
                <p className="mt-1 text-gray-400">
                  Spend less time troubleshooting
                </p>
              </div>
              <div>
                <p className="font-medium text-white">80%+</p>
                <p className="mt-1 text-gray-400">
                  Of power users expand within 30 days
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 items-start p-6">
              <div>
                <p className="font-medium text-white">Innovation</p>
                <p className="mt-1 text-gray-400">
                  AI-powered social listening built-in
                </p>
              </div>
              <div>
                <p className="font-medium text-white">Streamlined Workflow</p>
                <p className="mt-1 text-gray-400">
                  Automate manual tasks with a single click
                </p>
              </div>
              <div>
                <p className="font-medium text-white">200%</p>
                <p className="mt-1 text-gray-400">
                  Average uplift in team efficiency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-bold text-white">Core Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center bg-slate-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
              {/* <img src={FeatureImg1} alt="Feature 1" className="h-16 w-16 mb-4" /> */}
              <h3 className="text-xl font-semibold text-white mb-2">
                Real-Time Analytics
              </h3>
              <p className="text-gray-400 text-center">
                Get instant insights into engagement, impressions, and reach
                across all channels.
              </p>
            </div>
            <div className="flex flex-col items-center bg-slate-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
              {/* <img src={FeatureImg2} alt="Feature 2" className="h-16 w-16 mb-4" /> */}
              <h3 className="text-xl font-semibold text-white mb-2">
                AI-Powered Listening
              </h3>
              <p className="text-gray-400 text-center">
                Identify trending topics and sentiment before your competitors
                do.
              </p>
            </div>
            <div className="flex flex-col items-center bg-slate-800 rounded-lg p-6 hover:shadow-xl transition-shadow">
              {/* <img src={FeatureImg3} alt="Feature 3" className="h-16 w-16 mb-4" /> */}
              <h3 className="text-xl font-semibold text-white mb-2">
                Smart Publishing
              </h3>
              <p className="text-gray-400 text-center">
                Schedule, review, and approve posts in one intuitive calendar
                view.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Features */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-bold text-white">
            Achieve More with Add-Ons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-xl text-green-400 mb-2">
                Advanced Listening
              </h3>
              <p className="text-gray-300">
                Harness the power of global conversations to spot trends early
                and respond faster.
              </p>
              <a
                href="/features/listening"
                className="mt-4 inline-block text-green-400 hover:underline"
              >
                Learn more →
              </a>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-xl text-green-400 mb-2">
                Advocacy Tools
              </h3>
              <p className="text-gray-300">
                Mobilize your internal teams to share brand stories at scale
                with one click.
              </p>
              <a
                href="/features/advocacy"
                className="mt-4 inline-block text-green-400 hover:underline"
              >
                Learn more →
              </a>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-xl text-green-400 mb-2">
                Partnerships & Integrations
              </h3>
              <p className="text-gray-300">
                Connect SocialLens with Salesforce, Slack, and your favorite
                tools—so data flows seamlessly.
              </p>
              <a
                href="/features/integrations"
                className="mt-4 inline-block text-green-400 hover:underline"
              >
                Learn more →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-950">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-white text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="bg-slate-800 rounded-lg p-4">
              <summary className="cursor-pointer text-lg font-medium text-gray-100 hover:text-green-400">
                How quickly can I start my SocialLens trial?
              </summary>
              <p className="mt-2 text-gray-300">
                Immediately. As soon as you sign up, you’ll get access to all
                core features—no delays.
              </p>
            </details>
            <details className="bg-slate-800 rounded-lg p-4">
              <summary className="cursor-pointer text-lg font-medium text-gray-100 hover:text-green-400">
                Is my data secure?
              </summary>
              <p className="mt-2 text-gray-300">
                Absolutely. We use AES-256 encryption at rest and TLS-1.3 in
                transit. Your data belongs to you.
              </p>
            </details>
            <details className="bg-slate-800 rounded-lg p-4">
              <summary className="cursor-pointer text-lg font-medium text-gray-100 hover:text-green-400">
                What happens when my trial ends?
              </summary>
              <p className="mt-2 text-gray-300">
                You’ll be prompted to choose a paid plan. If you decide not to
                continue, your trial account will automatically convert to
                read-only.
              </p>
            </details>
            <details className="bg-slate-800 rounded-lg p-4">
              <summary className="cursor-pointer text-lg font-medium text-gray-100 hover:text-green-400">
                Do I need a credit card?
              </summary>
              <p className="mt-2 text-gray-300">
                No. We never ask for a credit card during your 30-day free
                trial.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
