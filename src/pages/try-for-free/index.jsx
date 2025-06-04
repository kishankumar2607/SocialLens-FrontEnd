import React, { useState } from "react";
import Testimonials from "../../components/Testimonials";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronUp,
  FiZap,
  FiBarChart2,
} from "react-icons/fi";
import { FaHandshake, FaRobot } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdPublish } from "react-icons/md";

const faqs = [
  {
    question: "How quickly can I start my SocialLens trial?",
    answer:
      "Immediately. As soon as you sign up, you’ll get access to all core features—no delays.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use AES-256 encryption at rest and TLS-1.3 in transit. Your data belongs to you.",
  },
  {
    question: "What happens when my trial ends?",
    answer:
      "You’ll be prompted to choose a paid plan. If you decide not to continue, your trial account will automatically convert to read-only.",
  },
  {
    question: "Do I need a credit card?",
    answer: "No. We never ask for a credit card during your 30-day free trial.",
  },
];

const achieveMore = [
  {
    icon: <FiZap className="text-primary text-4xl" />,
    title: "Advanced Listening",
    description:
      "Harness the power of global conversations to spot trends early and respond faster.",
  },
  {
    icon: <FiBarChart2 className="text-primary text-4xl" />,
    title: "Advocacy Tools",
    description:
      "Mobilize your internal teams to share brand stories at scale with one click.",
  },
  {
    icon: <FaHandshake className="text-primary text-4xl" />,
    title: "Partnerships & Integrations",
    description:
      "Connect SocialLens with Salesforce, Slack, and your favorite tools—so data flows seamlessly.",
  },
];

const features = [
  {
    icon: <IoMdTime  className="text-primary text-4xl" />,
    title: "Real-Time Analytics",
    description:
      "Get instant insights into engagement, impressions, and reach across all channels.",
  },
  {
    icon: <FaRobot  className="text-primary text-4xl" />,
    title: "AI-Powered Listening",
    description:
      "Identify trending topics and sentiment before your competitors do.",
  },
  {
    icon: <MdPublish  className="text-primary text-4xl" />,
    title: "Smart Publishing",
    description:
      "Schedule, review, and approve posts in one intuitive calendar view.",
  },
];

const TryForFree = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-gray-100">
      <section className="relative flex flex-col justify-center items-center text-center flex-1 px-6 py-20">
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
              className="w-full sm:w-80 px-4 py-3 bg-slate-800 border border-slate-700 rounded-md placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-2"
            />
            <Link to="/login" className="btn-primary px-4 py-3">
              Start Free Trial
            </Link>
          </form>
          <p className="mt-2 text-sm text-gray-500">No credit card required.</p>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto bg-slate-800 rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-3 bg-slate-950 text-gray-300">
            <div className="p-6 font-semibold">Where We Excel</div>
            <div className="py-6 px-2 font-semibold">What You’ll Gain</div>
            <div className="py-6 font-semibold">ROI</div>
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

      <section className="relative z-10 px-6 py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto space-y-14">
          <h2 className="text-4xl text-center font-bold text-white">Core Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-slate-800 rounded-xl border border-border-dark p-6 hover:scale-105 hover:border-neon-purple transition-transform shadow-lg"
                >
                  {item.icon}
                  <h3 className="text-xl font-semibold text-white mt-4 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-center">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto relative z-10 px-6 py-24 space-y-14">
        <h2 className="text-4xl text-center font-bold text-white">
          Achieve More with Add-Ons
        </h2>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achieveMore.map((item, index) => (
            <div
              key={index}
              className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 hover:border-primary-light transition-transform shadow-lg flex flex-col items-center text-center"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm">{item.description}</p>
            </div>
          ))}
        </section>
      </div>

      <Testimonials />

      <section className="py-24 px-6 bg-slate-950">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-bold text-white text-center pb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border-dark px-3 py-3 rounded-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left text-lg font-semibold focus:outline-none"
                >
                  {faq.question}
                  {openFaq === index ? (
                    <FiChevronUp className="text-primary" />
                  ) : (
                    <FiChevronDown className="text-primary" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? "max-h-40 mt-2" : "max-h-0"
                  }`}
                >
                  <p className="text-text-secondary">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TryForFree;
