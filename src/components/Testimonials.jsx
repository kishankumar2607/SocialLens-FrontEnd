import React from "react";
import user1 from "../assets/testimonial/testimonial-2.jpg";
import user2 from "../assets/testimonial/testimonial-1.jpg";
import user3 from "../assets/testimonial/testimonial-3.jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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
    comment: "The insights provided are invaluable and accurate for our strategy.",
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

const Testimonials = () => {
  return (
    <section className="py-24 px-4 bg-background-dark relative overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-1/5 right-1/4 w-96 h-96 bg-gradient-to-br from-primary to-neon-purple opacity-30 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tr from-neon-blue to-primary opacity-20 blur-[150px] rounded-full animate-pulse-slow" />
      </div>
      <h2 className="text-3xl font-semibold text-center text-white mb-12">
        What Our Users Say
      </h2>
      <div className="w-full px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="px-2 sm:px-4 w-full max-w-full overflow-hidden">
              <div className="bg-surface-dark p-4 sm:p-6 rounded-lg shadow-lg hover:scale-[1.03] transition-transform duration-300 w-full overflow-hidden">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 text-center sm:text-left">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border border-primary shrink-0"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-white font-semibold text-lg">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary italic text-center sm:text-left">
                  "{testimonial.comment}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
