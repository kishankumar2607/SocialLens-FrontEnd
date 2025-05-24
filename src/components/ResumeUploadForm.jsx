import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { showError, showSuccess } from "../utils/helperFunction";

const ResumeUploadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    portfolio: "",
    message: "",
    resume: null,
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  const validateFile = (file) => {
    if (!file) return;
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      showError("Only PDF or Word files are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showError("File size must be under 5MB.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
    }
    if (!formData.resume) {
      newErrors.resume = "Resume file is required.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showError("Please fill all required fields correctly.");
      return;
    }
    showSuccess("Your application has been submitted!");
    setFormData({
      name: "",
      email: "",
      linkedin: "",
      portfolio: "",
      message: "",
      resume: null,
    });
    setErrors({});
  };

  return (
    <section className="bg-surface-dark rounded-xl border border-border-dark p-8 shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">Apply Now</h3>
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
          {errors.name && <p className="text-error text-sm">{errors.name}</p>}
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
          {errors.email && <p className="text-error text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">
            LinkedIn Profile (optional)
          </label>
          <input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            type="url"
            className="input-default w-full"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">
            Portfolio Website (optional)
          </label>
          <input
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            type="url"
            className="input-default w-full"
            placeholder="https://yourportfolio.com"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="input-default w-full resize-none"
            placeholder="Tell us why you’d be a great fit..."
          />
          {errors.message && (
            <p className="text-error text-sm">{errors.message}</p>
          )}
        </div>
        <div
          className={`border-2 border-dashed rounded-md p-6 text-center ${
            dragActive ? "border-primary" : "border-border-dark"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FiUploadCloud className="text-primary text-3xl mx-auto mb-2" />
          <p className="text-sm mb-2">
            Drag & drop your resume here or click to upload
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            id="resumeUpload"
            onChange={handleFileChange}
          />
          <label
            htmlFor="resumeUpload"
            className="cursor-pointer inline-block px-4 py-2 bg-primary rounded text-white text-sm"
          >
            Choose File
          </label>
          {formData.resume && (
            <p className="text-xs mt-2 text-text-secondary">
              Selected: {formData.resume.name}
            </p>
          )}
          {errors.resume && (
            <p className="text-error text-sm">{errors.resume}</p>
          )}
        </div>
        <div className="text-center pt-3">
          <button type="submit" className="btn-primary w-fit mx-auto">
          Submit Application
        </button>
        </div>
      </form>
    </section>
  );
};

export default ResumeUploadForm;
