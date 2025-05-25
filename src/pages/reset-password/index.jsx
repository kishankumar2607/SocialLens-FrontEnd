import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { showError, showSuccess } from "../../utils/helperFunction";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      showError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      showError("Password must be at least 6 characters.");
      return;
    }
    showSuccess("Password reset successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-background-dark text-white px-4 py-16 flex justify-center items-center">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-primary to-neon-purple opacity-20 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-2xl rounded-full" />

      <div className="relative z-10 w-full max-w-md bg-surface-dark rounded-xl p-8 shadow-lg border border-border-dark">
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="input-default w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="input-default w-full pr-10"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button type="submit" className="btn-primary w-full">
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
