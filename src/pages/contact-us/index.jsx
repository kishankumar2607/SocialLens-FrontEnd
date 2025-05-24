import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { showError, showSuccess } from "../../utils/helperFunction";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

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

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validate = () => {
    const { name, email, message } = formData;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!message) {
      newErrors.message = "Message is required.";
    } else if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError("Please fill in all required fields correctly.");
      return;
    }

    showSuccess("Your message has been sent!");

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setErrors({});
  };

  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden px-6 py-16">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
        {/* Left Info Section (no image, with icons) */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold mb-4">Let’s Connect</h2>
          <p className="text-text-secondary text-lg">
            We’re here to help you grow your social media presence.
            Reach out and let’s start a conversation!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FiMail className="text-primary-light text-3xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-text-secondary text-sm">
                  support@sociallens.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FiPhone className="text-primary-light text-3xl" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-text-secondary text-sm">
                  +1 (234) 567-8901
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FiMapPin className="text-primary-light text-3xl" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-text-secondary text-sm">Toronto, Canada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-surface-dark rounded-xl border border-border-dark p-8 shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="input-default w-full"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="input-default w-full"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="input-default w-full resize-none"
                placeholder="Your message..."
              />
              {errors.message && (
                <p className="text-error text-sm mt-1">{errors.message}</p>
              )}
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
