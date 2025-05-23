import React from 'react';
import heroBg from '../assets/images/hero-background1.jpg';

const Hero = () => (
  <section
    className="relative h-[90vh] w-full bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-center px-6"
    style={{
      backgroundImage: `url(${heroBg})`
    }}
  >
    {/* Gradient Overlay */}
    {/* <div className="absolute inset-0 bg-gradient-to-br from-background-dark/40 to-black/30 backdrop-blur-md z-0" /> */}

    {/* Overlay */}{/* Glowing Gradient Background */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-30 blur-[150px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-[150px] rounded-full animate-pulse-slow" />
    </div>

    {/* Content */}
    <div className="relative z-10">
      <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
        Welcome to{' '}
        <span className="bg-gradient-to-r from-primary to-neon-purple bg-clip-text text-transparent">
          SocialLens
        </span>
      </h1>
      <p className="mt-6 text-text-secondary max-w-2xl mx-auto text-2xl">
        Analyze, optimize, and grow your social media presence with futuristic insights.
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        <button className="btn-primary">Get Started</button>
        <button className="btn-secondary">Learn More</button>
      </div>
    </div>
  </section>
);

export default Hero;
