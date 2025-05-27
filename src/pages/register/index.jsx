import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthAPIRegister } from "../../api/api";
import { apiPost } from "../../utils/utils";
import { Eye, EyeOff } from "lucide-react";
import registerIllustration from "../../assets/images/registerIllustration.png";
import { showError, showSuccess } from "../../utils/helperFunction";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/;

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must be at least 6 characters and include letters, numbers, and a special character";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const payload = {
          name: form.name,
          email: form.email,
          password: form.password,
        };

        const response = await apiPost(AuthAPIRegister, payload);

        if (response?.token && response?.user) {
          showSuccess("Registration successful!");
          navigate("/login");
        } else {
          showError(
            response?.message || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Registration failed:", error);
        showError(error?.message || "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background-dark text-white overflow-hidden px-4">
      {/* Glow Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-30 blur-3xl animate-fade-glow rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-2xl animate-fade-glow rounded-full" />
      </div>

      {/* Box Layout */}
      <div className="relative z-10 w-full max-w-5xl min-h-[520px] bg-transparent bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl border border-border-dark flex flex-col lg:flex-row-reverse overflow-hidden animate-fade-in">
        {/* Right Image */}
        <div className="hidden lg:flex lg:w-1/2 h-full">
          <img
            src={registerIllustration}
            alt="Register Visual"
            style={{ height: "620px", width: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Left Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8 z-10">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
              <p className="text-text-secondary text-base">
                Join{" "}
                <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent font-bold">
                  SocialLens
                </span>{" "}
                and start your journey
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  className="input-default w-full"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="input-default w-full"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-default w-full pr-10"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[34px] right-3 text-text-tertiary hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-error text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm mb-1">Confirm Password</label>
                <input
                  type={showConfirm ? "text" : "password"}
                  className="input-default w-full pr-10"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute top-[34px] right-3 text-text-tertiary hover:text-white"
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <button type="submit" className="btn-primary w-full">
                Register
              </button>
            </form>

            <p className="text-center text-base text-text-tertiary">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-light hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
