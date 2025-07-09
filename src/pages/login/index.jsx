import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { AuthAPILogin } from "../../api/api";
import { setCookie, setSessionStorage } from "../../utils/utils";
import loginIllustration from "../../assets/images/loginImage.jpg";
import { showError, showSuccess } from "../../utils/helperFunction";
import { encryptData } from "../../utils/encryptDecryptData";
import Loader from "../../components/Loader";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "Kishank2607@gmail.com",
    password: "Kishan@2607",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Regex validators
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/;

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must be at least 6 characters and include letters, numbers, and a special character";
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);

        const payload = {
          email: form.email,
          password: form.password,
        };
        const response = await axios.post(AuthAPILogin, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        // console.log("Response:", response);

        const { message, token, user } = response?.data || {};

        // console.log("Token:", token);
        // console.log("User:", user);

        if (response.status === 200) {
          showSuccess(message);

          if (token && user) {
            const userToken = encryptData(token);
            const userName = encryptData(user.name);
            const userEmail = encryptData(user.email);

            if (rememberMe) {
              setCookie("token", userToken, 7);
              setCookie("userName", userName, 7);
              setCookie("userEmail", userEmail, 7);
            } else {
              setSessionStorage("token", userToken);
              setSessionStorage("userName", userName);
              setSessionStorage("userEmail", userEmail);
            }
          }
          navigate("/homepage");
          setLoading(false);
        } else {
          showError("Login failed. Please check your credentials.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Login error:", error);
        showError(error?.message || "Login failed. Please try again.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background-dark text-white overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-30 blur-3xl animate-fade-glow rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-2xl animate-fade-glow rounded-full" />
      </div>
      <div className="relative z-10 h-fit w-full max-w-5xl bg-transparent bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl border border-border-dark flex flex-col lg:flex-row overflow-hidden animate-fade-in">
        <div className="hidden lg:block lg:w-1/2 h-auto">
          <img
            src={loginIllustration}
            alt="Login Visual"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>

        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8 lg:pt-6">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-text-secondary text-base">
              Login to your{" "}
              <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent font-bold">
                SocialLens
              </span>{" "}
              account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-primary-light hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="text-sm">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="accent-primary-light mt-1"
                />
                <span>
                  I accept the{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-primary-light hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/terms-of-service"
                    className="text-primary-light hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </label>
              {!acceptTerms && errors.acceptTerms && (
                <p className="text-error text-sm mt-1">{errors.acceptTerms}</p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>

          <p className="text-center text-sm text-text-tertiary mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary-light hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default LoginPage;
