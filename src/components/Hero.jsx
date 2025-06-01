import React, { useEffect, useState } from "react";
import { getCookie, getSessionStorage } from "../utils/utils";
import { decryptData } from "../utils/encryptDecryptData";
import heroBg from "../assets/images/hero-background1.jpg";
import { Link } from "react-router-dom";
import moment from "moment";

const Hero = () => {
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

  // console.log("User Data:", user);
  // console.log("decrypt User : ", decryptUser);
  // console.log("Hour: ", hour);

  //Function to display greeting message as per the local time
  const displayGreeting = () => {
    if (hour >= 6 && hour < 12) {
      return setGreetingMessage("Good Morning");
    } else if (hour >= 12 && hour < 18) {
      return setGreetingMessage("Good Afternoon");
    } else {
      return setGreetingMessage("Good Evening");
    }
  };

  useEffect(() => {
    displayGreeting();
  }, []);

  return (
    <section
      className="relative h-[90vh] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-center px-6"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-primary to-neon-purple opacity-30 blur-[100px] md:blur-[150px] rounded-full animate-pulse-slow z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-[100px] md:blur-[150px] rounded-full animate-pulse-slow z-0" />
      </div>

      <div className="relative z-10">
        {user && (
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            {greetingMessage}{" "}
            <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
              {decryptUser}
            </span>
          </h2>
        )}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
            SocialLens
          </span>
        </h1>
        <p className="mt-6 text-text-secondary max-w-2xl mx-auto text-2xl">
          Analyze, optimize, and grow your social media presence with futuristic
          insights.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          {user && token ? (
            <Link to="/homepage" className="btn-primary">
              Get Started
            </Link>
          ) : (
            <Link to="/login" className="btn-primary">
              Get Started
            </Link>
          )}
          <Link to="/about" className="btn-secondary">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
