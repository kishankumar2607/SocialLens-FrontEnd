import React, { useState } from "react";
import {
  FiHelpCircle,
  FiMail,
  FiClock,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import TextInput from "../../components/TextInput";
import TextareaInput from "../../components/TextareaInput";
import { showError, showSuccess } from "../../utils/helperFunction";

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login page, click 'Forgot password', and follow the instructions sent to your email.",
  },
  {
    question: "Can I schedule posts in advance?",
    answer:
      "Yes! SocialLens lets you plan and schedule posts across multiple platforms with ease.",
  },
  {
    question: "Where can I see my analytics reports?",
    answer:
      "Log into your dashboard and navigate to the 'Analytics' tab to view detailed reports.",
  },
];

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
  });
  const [errors, setErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const { name, email, issue } = formData;
    const newErrors = {};
    if (!name) newErrors.name = "Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!issue) {
      newErrors.issue = "Please describe your issue.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError("Please complete all required fields.");
      return;
    }

    showSuccess("Your support request has been submitted!");
    setFormData({
      name: "",
      email: "",
      issue: "",
    });
    setErrors({});
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden px-6 py-16">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Intro Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Support Center</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Need help? We’re here for you. Browse our FAQs or submit a request
            below.
          </p>
        </section>

        {/* Info Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiHelpCircle className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">FAQs</h3>
            <p className="text-text-secondary text-sm">
              Check out our frequently asked questions for quick answers to
              common issues.
            </p>
          </div>
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiMail className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-text-secondary text-sm">
              Reach out anytime at{" "}
              <span className="text-primary-light">support@sociallens.com</span>
              .
            </p>
          </div>
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiClock className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Support Hours</h3>
            <p className="text-text-secondary text-sm">
              Monday – Friday, 9 AM – 6 PM (EST). We aim to respond within 24
              hours.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-surface-dark rounded-xl border border-border-dark p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center pb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border-dark pb-4">
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
        </section>

        {/* Support Form */}
        <section className="bg-surface-dark rounded-xl border border-border-dark p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Submit a Support Request
          </h2>
          <form className="space-y-6 max-w-lg mx-auto" onSubmit={handleSubmit}>
            <TextInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              error={errors.name}
            />
            <TextInput
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              error={errors.email}
            />
            <TextareaInput
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your issue or question..."
              error={errors.issue}
            />
            <button type="submit" className="btn-primary w-full">
              Submit Request
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
