import React from "react";

const Testimonials = () => {
  return (
    <section className="py-20 px-4">
      <h2 className="text-3xl font-semibold text-center mb-12">
        What Our Users Say
      </h2>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-surface-dark p-6 rounded-lg">
          <p className="text-text-secondary mb-4">
            "SocialLens has transformed the way we approach social media
            marketing."
          </p>
          <p className="font-bold">- Alex Johnson, Marketing Manager</p>
        </div>
        <div className="bg-surface-dark p-6 rounded-lg">
          <p className="text-text-secondary mb-4">
            "The insights provided are invaluable for our strategy."
          </p>
          <p className="font-bold">- Maria Rodriguez, Content Creator</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
