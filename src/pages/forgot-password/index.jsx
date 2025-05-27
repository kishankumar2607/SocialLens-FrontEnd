import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../utils/utils";
import { AuthAPIForgotPassword } from "../../api/api";
import { showError, showSuccess } from "../../utils/helperFunction";
import Loader from "../../components/Loader";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    showError("Please enter a valid email address.");
    return;
  }

  try {
    setLoading(true);
    const response = await apiPost(AuthAPIForgotPassword, { email });

    if (response?.status === 404) {
      showError("Email not found");
    } else if (response?.status === 200) {
      showSuccess("OTP sent to your email.");
      navigate("/enter-otp", { state: { email } });
    } else {
      showError(response?.message || "An error occurred. Please try again.");
    }
  } catch (error) {
    console.log("Error status:", error.message || error);
    showError(error.message || "An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return loading ? (
    <Loader />
  ) : (
    <div className="relative min-h-screen bg-background-dark text-white px-4 py-16 flex justify-center items-center">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-primary to-neon-purple opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-2xl rounded-full" />

      <div className="relative z-10 w-full max-w-md bg-surface-dark rounded-xl p-8 shadow-lg border border-border-dark">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="input-default w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-primary w-full">
            Send OTP
          </button>
        </form>
        <p className="text-text-secondary text-sm mt-4 text-center">
          You will receive a 6-digit OTP in your inbox.
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
