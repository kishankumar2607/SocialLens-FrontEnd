import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../../utils/utils";
import { AuthAPIVerifyOtp } from "../../api/api";
import { showError, showSuccess } from "../../utils/helperFunction";

const EnterOtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, ""); // Only digits
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear current and move to previous
        newOtp[index] = "";
        setOtp(newOtp);
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else if (index > 0) {
        // If empty, go back
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      showError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await apiPost(AuthAPIVerifyOtp, {
        email,
        code: finalOtp,
      });

      if (response?.status === 200) {
        showSuccess("OTP verified! Proceed to reset password.");
        navigate("/reset-password", { state: { email } });
      } else {
        showError(response?.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      showError(error?.message || "Something went wrong. Please try again.");
    }
  };

  const handleBack = () => navigate("/login");

  return (
    <div className="relative min-h-screen bg-background-dark text-white px-4 py-16 flex justify-center items-center">
      {/* Blobs */}
      <div className="absolute top-1/4 left-1/4 w-56 sm:w-72 md:w-80 h-56 sm:h-72 md:h-80 bg-gradient-to-br from-primary to-neon-purple opacity-20 blur-[100px] md:blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-[100px] md:blur-[150px] rounded-full" />

      <div className="relative z-10 w-full max-w-md bg-surface-dark rounded-xl p-8 shadow-lg border border-border-dark">
        <h2 className="text-3xl font-bold mb-6 text-center">Enter OTP</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-14 text-center text-black text-xl font-semibold bg-background border border-border-dark rounded focus:outline-none focus:border-primary transition-all"
              />
            ))}
          </div>
          <button type="submit" className="btn-primary w-full mt-4">
            Verify OTP
          </button>
        </form>
        <button
          onClick={handleBack}
          className="mt-4 w-full text-primary-light hover:underline text-sm"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default EnterOtpPage;
