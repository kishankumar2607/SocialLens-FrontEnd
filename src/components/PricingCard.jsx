import React from "react";

const PricingCard = ({ title, price, features, popular }) => {
  return (
    <div
      className={`bg-surface-dark rounded-xl border border-border-dark p-8 shadow-lg transform transition hover:scale-105 ${
        popular ? "border-primary-light" : ""
      }`}
    >
      {popular && (
        <div className="text-primary-light text-sm font-bold mb-2 text-center">
          ★ Most Popular
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-2 text-center">{title}</h2>
      <p className="text-3xl font-bold mb-4 text-center">{price}</p>
      <ul className="space-y-2 mb-6 text-sm text-text-secondary">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-primary-light">✔</span>
            {feature}
          </li>
        ))}
      </ul>
      <button className="btn-primary w-full">Choose {title}</button>
    </div>
  );
};

export default PricingCard;
