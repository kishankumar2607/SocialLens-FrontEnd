import React, { useState, useEffect, useRef } from "react";
import CTAButton from "./CTAButton";
import Icon from "../../../components/AppIcon";
import moment from "moment";
import { getCookie, getSessionStorage } from "../../../utils/utils";
import { decryptData } from "../../../utils/encryptDecryptData";

const HeroSection = () => {
  const heroRef = useRef(null);
  const glowRef = useRef(null);
  const [greetingMessage, setGreetingMessage] = useState("");

  // Read token and user from cookies and session
  const token = getCookie("token") || getSessionStorage("token") || null;
  const userFromCookie = getCookie("userName");
  const userFromSession = getSessionStorage("userName");

  let user = null;

  if (userFromCookie) {
    try {
      user = JSON.parse(userFromCookie);
    } catch (e) {
      console.error("Error parsing userFromCookie:", e);
      user = userFromSession;
    }
  } else {
    user = userFromSession;
  }

  const decryptUser = user ? decryptData(user) : null;

  const hour = moment().hour();

  const displayGreeting = () => {
    if (hour >= 6 && hour < 12) {
      return setGreetingMessage("Good Morning");
    } else if (hour >= 12 && hour < 18) {
      return setGreetingMessage("Good Afternoon");
    } else {
      return setGreetingMessage("Good Evening");
    }
  };

  // Mouse movement effect for the hero section
  useEffect(() => {
    displayGreeting();

    // const handleMouseMove = (e) => {
    //   if (!heroRef.current || !glowRef.current) return;

    //   const { left, top, width, height } =
    //     heroRef.current.getBoundingClientRect();
    //   const x = (e.clientX - left) / width;
    //   const y = (e.clientY - top) / height;

    //   // Update the position of the glow effect
    //   glowRef.current.style.background = `radial-gradient(
    //     circle at ${x * 100}% ${y * 100}%,
    //     rgba(79, 70, 229, 0.15) 0%,
    //     rgba(79, 70, 229, 0.05) 25%,
    //     rgba(79, 70, 229, 0) 50%
    //   )`;
    // };

    // const heroElement = heroRef.current;
    // if (heroElement) {
    //   heroElement.addEventListener("mousemove", handleMouseMove);
    // }

    // return () => {
    //   if (heroElement) {
    //     heroElement.removeEventListener("mousemove", handleMouseMove);
    //   }
    // };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative bg-white min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden"
    >
      {/* Animated background glow effect */}
      {/* <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      ></div> */}

      {/* Decorative elements */}
      {/* <div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary bg-opacity-10 rounded-full filter blur-3xl animate-pulse-slow"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white bg-opacity-10 rounded-full filter blur-3xl animate-pulse-slow"
        aria-hidden="true"
      ></div> */}

      {/* Grid pattern overlay */}
      {/* <div
        className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      ></div> */}

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center mb-8">
          {user && (
            <h2 className="text-4xl font-bold text-black tracking-tight mb-4">
              {greetingMessage}{" "}
              <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
                {decryptUser}
              </span>
            </h2>
          )}
          <h1 className="flex align-middle justify-center text-4xl md:text-6xl font-bold text-black mb-4 tracking-tight">
            <span className="bg-clip-text text-black">
              Welcome to&nbsp;
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-neon-purple">
              SocialLens
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-black max-w-2xl mx-auto">
            Analyze, optimize, and elevate your social media presence with
            powerful analytics and insights.
          </p>
        </div>

        {/* Glassmorphic card */}
        <div className="card-glassmorphic max-w-2xl mx-auto mb-12 backdrop-blur-lg border border-border-dark border-opacity-40 shadow-glow-sm">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-neon-purple flex items-center justify-center mr-4">
                <Icon name="BarChart2" size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-black">
                Social Media Analytics Platform
              </h2>
            </div>

            <p className="text-black mb-8 text-center">
              Get comprehensive insights into your social media performance
              across all platforms. Track engagement, analyze audience
              demographics, and optimize your content strategy.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="flex items-center card-white-hover bg-opacity-70 px-4 py-2 rounded-full">
                <Icon
                  name="TrendingUp"
                  size={18}
                  className="text-success mr-2"
                />
                <span className="text-sm text-black">
                  Real-time Analytics
                </span>
              </div>

              <div className="flex items-center card-white-hover bg-opacity-70 px-4 py-2 rounded-full">
                <Icon name="Users" size={18} className="text-info mr-2" />
                <span className="text-sm text-black">
                  Audience Insights
                </span>
              </div>

              <div className="flex items-center card-white-hover bg-opacity-70 px-4 py-2 rounded-full">
                <Icon
                  name="MessageCircle"
                  size={18}
                  className="text-warning mr-2"
                />
                <span className="text-sm text-black">
                  Engagement Tracking
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton
                to="/dashboard"
                text="Go to Dashboard"
                icon="BarChart2"
                primary
              />

              <CTAButton
                to="/create-post"
                text="Create New Post"
                icon="PlusCircle"
              />
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
          <div className="card-white-hover bg-surface-light bg-opacity-70 backdrop-blur-sm">
            <div className="flex flex-col items-center p-6 text-center">
              <Icon name="Users" size={32} className="text-primary mb-4" />
              <h3 className="text-2xl font-bold text-black mb-1">10M+</h3>
              <p className="text-text-tertiary text-base font-semibold">Active Users</p>
            </div>
          </div>

          <div className="card-white-hover bg-surface-light bg-opacity-70 backdrop-blur-sm">
            <div className="flex flex-col items-center p-6 text-center">
              <Icon name="BarChart" size={32} className="text-success mb-4" />
              <h3 className="text-2xl font-bold text-black mb-1">85%</h3>
              <p className="text-text-tertiary text-base font-semibold">Engagement Increase</p>
            </div>
          </div>

          <div className="card-white-hover bg-surface-light bg-opacity-70 backdrop-blur-sm">
            <div className="flex flex-col items-center p-6 text-center">
              <Icon name="Award" size={32} className="text-warning mb-4" />
              <h3 className="text-2xl font-bold text-black mb-1">5,000+</h3>
              <p className="text-text-tertiary text-base font-semibold">Brands Trust Us</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4 bg-surface-dark text-center text-white text-sm">
        <p>© {new Date().getFullYear()} SocialLens. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HeroSection;
