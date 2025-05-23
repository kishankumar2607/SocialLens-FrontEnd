import React from 'react';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import CTA from '../../components/CTA';
import AuthSection from '../../components/AuthSection';
import Footer from '../../components/ui/Footer';
import Header from '../../components/ui/Header';
import Testimonials from '../../components/Testimonials';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-background-dark to-surface-dark text-white min-h-screen">
      <Header isAuthenticated={false}/>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
