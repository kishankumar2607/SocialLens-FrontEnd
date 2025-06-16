import React from "react";
import { getCookie, getSessionStorage } from "../../utils/utils";
import PricingCard from "../../components/PricingCard";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const pricingPlans = [
  {
    title: "Starter",
    price: "$19/mo",
    features: [
      "Manage up to 3 social accounts",
      "Basic analytics & insights",
      "10 scheduled posts per month",
      "Email support",
    ],
    popular: false,
  },
  {
    title: "Pro",
    price: "$49/mo",
    features: [
      "Manage up to 10 social accounts",
      "Advanced analytics & trends",
      "Unlimited scheduled posts",
      "Priority email + chat support",
      "Access to AI content suggestions",
    ],
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Custom Pricing",
    features: [
      "Unlimited social accounts",
      "Custom performance dashboards",
      "Dedicated success manager",
      "Custom integrations & API access",
      "24/7 premium support",
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes! You can upgrade or downgrade anytime from your account settings.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer: "Absolutely. We offer a 15% discount if you choose yearly billing.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial with full feature access.",
  },
];

const PricingPage = () => {
  const user = getCookie("userName")
    ? JSON.parse(getCookie("userName"))
    : getSessionStorage("userName")
    ? getSessionStorage("userName")
    : null;

  const handlePlanSelection = (plan) => {
    // Handle plan selection logic here
    console.log(`Selected plan: ${plan.title}`);

    Swal.fire({
      title: "Plan Selected",
      text: `You have selected the ${plan.title} plan.`,
      icon: "info",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Working on it!",
          text: "We are working on this feature. Stay tuned!",
          icon: "info",
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 py-16 space-y-20">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Choose Your Plan</h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Whether you're just starting or scaling fast, we have a plan for
            you. Upgrade anytime!
          </p>
        </header>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <PricingCard
              key={idx}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
              onClick={() => {
                handlePlanSelection(plan);
              }}
            />
          ))}
        </div>

        {/* Feature Summary */}
        <section className="bg-surface-dark rounded-xl border border-border-dark p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Feature Comparison
          </h2>
          <p className="text-text-secondary text-center mb-6">
            See how our plans stack up across essential features.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Starter</h3>
              <ul className="list-disc pl-5 text-sm text-text-secondary space-y-1">
                <li>Basic analytics</li>
                <li>Email support</li>
                <li>Limited scheduled posts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Pro</h3>
              <ul className="list-disc pl-5 text-sm text-text-secondary space-y-1">
                <li>Advanced analytics</li>
                <li>Priority support</li>
                <li>Unlimited scheduled posts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Enterprise</h3>
              <ul className="list-disc pl-5 text-sm text-text-secondary space-y-1">
                <li>Custom dashboards</li>
                <li>Dedicated manager</li>
                <li>24/7 premium support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-bold">What Our Customers Say</h2>
          <p className="max-w-2xl mx-auto text-text-secondary">
            "SocialLens has completely transformed how we manage social media.
            The Pro plan gave us everything we needed to grow our audience and
            track performance seamlessly."
          </p>
          <p className="text-primary-light font-semibold">
            — Alex Johnson, Marketing Lead
          </p>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-border-dark pb-4">
                <h3 className="font-semibold mb-1">{faq.question}</h3>
                <p className="text-sm text-text-secondary">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final Call-to-Action */}
        <section className="text-center space-y-4 mt-12">
          <h2 className="text-3xl font-bold">
            Ready to boost your social presence?
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Join thousands of creators and brands using SocialLens. Start your
            free trial today!
          </p>
          {user ? (
            <Link to="/homepage" className="btn-primary inline-block">
              Start Free Trial
            </Link>
          ) : (
            <Link to="/register" className="btn-primary inline-block">
              Start Free Trial
            </Link>
          )}
        </section>
      </div>
    </div>
  );
};

export default PricingPage;
