import React from "react";
import { FiTarget, FiUsers, FiTrendingUp, FiHeart } from "react-icons/fi";
import KishanKumarImage from "../../assets/teams/kishan.png";
import DivyanshuImage from "../../assets/teams/divyanshu.png";
import HarshilImage from "../../assets/teams/harshil.png";
import { Link } from "react-router-dom";

const teamData = [
  {
    id: 1,
    image: KishanKumarImage,
    name: "Kishan Kumar",
    designation: "CEO & Co-founder",
    description:
      "Kishan drives the company vision, strategy, and leadership, ensuring our growth and innovation in the social media space.",
  },
  {
    id: 2,
    image: HarshilImage,
    name: "Harshil Dholakiya",
    designation: "Co-founder & CTO",
    description:
      "Harshil leads the technology vision, architecture, and development, building scalable solutions that power SocialLens.",
  },
  {
    id: 3,
    image: DivyanshuImage,
    name: "Divyanshu",
    designation: "Project Manager",
    description:
      "Divyanshu oversees project delivery, timelines, and team coordination, ensuring smooth execution and high-quality outcomes.",
  },
];

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-background-dark text-white overflow-hidden px-6 py-16">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-10 blur-2xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* About Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold">About SocialLens</h1>
          <p className="text-text-secondary max-w-3xl mx-auto text-lg">
            SocialLens is your go-to platform for managing, analyzing, and
            growing your social media presence. We empower individuals,
            creators, and businesses with the tools they need to gain insights,
            optimize strategies, and achieve digital success.
          </p>
        </section>

        {/* Core Values Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiTarget className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-text-secondary text-sm">
              To help creators and brands harness the power of social media
              through data-driven insights and innovative tools.
            </p>
          </div>
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiTrendingUp className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-text-secondary text-sm">
              To become the most trusted social media analytics platform,
              enabling sustainable growth and meaningful connections.
            </p>
          </div>
          <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
            <FiUsers className="text-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-text-secondary text-sm">
              Innovation, integrity, user-centricity, and continuous improvement
              guide everything we do at SocialLens.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Example team member cards */}
            {teamData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="bg-surface-dark rounded-xl border border-border-dark p-6 text-center hover:scale-105 transition"
                >
                  <img
                    src={data.image}
                    alt="team image"
                    className="w-24 h-24 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-lg font-semibold">{data.name}</h3>
                  <p className="text-primary-light text-sm mb-2">
                    {data.designation}
                  </p>
                  <p className="text-text-secondary text-sm">
                    {data.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
              <FiHeart className="text-primary text-3xl mx-auto mb-4" />
              <p className="text-text-secondary mb-4">
                “SocialLens has completely changed the way we plan our content
                strategy.”
              </p>
              <p className="font-semibold">Alex Johnson, Content Creator</p>
            </div>
            <div className="bg-surface-dark rounded-xl border border-border-dark p-6 hover:scale-105 transition">
              <FiHeart className="text-primary text-3xl mx-auto mb-4" />
              <p className="text-text-secondary mb-4">
                “Thanks to SocialLens, we’ve seen a 50% increase in engagement
                across all channels.”
              </p>
              <p className="font-semibold">Maria Rodriguez, Marketing Lead</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Want to work with us?</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            We’re always looking for talented people and exciting
            collaborations. Let’s build something amazing together!
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
