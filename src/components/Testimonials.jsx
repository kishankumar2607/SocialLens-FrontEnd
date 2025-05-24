import React from "react";
import Slider from "react-slick";
import user1 from "../assets/testimonial/testimonial-2.jpg";
import user2 from "../assets/testimonial/testimonial-1.jpg";
import user3 from "../assets/testimonial/testimonial-3.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Alex Johnson",
    company: "Marketing Manager, MetaSpark",
    comment:
      "SocialLens has transformed the way we approach social media marketing.",
    image: user1,
  },
  {
    name: "Maria Rodriguez",
    company: "Content Creator, Visionary Co.",
    comment: "The insights provided are invaluable for our strategy.",
    image: user2,
  },
  {
    name: "John Doe",
    company: "CEO, Tech Innovators",
    comment:
      "I can't believe how much time we've saved using SocialLens. It's a game-changer!",
    image: user3,
  },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 600,
  slidesToShow: 2,
  slidesToScroll: 1,
  rtl: true,
};

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-background-dark relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/5 right-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-30 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-[150px] rounded-full animate-pulse-slow" />
      </div>
      <h2 className="text-3xl font-semibold text-center text-white mb-12">
        What Our Users Say
      </h2>
      <div className="max-w-4xl mx-auto">
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="bg-surface-dark p-6 rounded-lg shadow-lg hover:scale-[1.03] transition-transform duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border border-primary"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary italic">
                  "{testimonial.comment}"
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
