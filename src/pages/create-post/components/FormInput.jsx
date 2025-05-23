import React from "react";

const FormInput = ({ value, onChange, maxLength, error, errorMessage }) => {
  const remainingChars = maxLength - value.length;
  const isNearLimit = remainingChars <= 20;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-secondary">
        Message
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What's on your mind?"
          className={`w-full h-32 bg-surface-medium border ${
            error ? "border-error" : "border-border-dark"
          } rounded-md px-3 py-2 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-transparent transition-all duration-200`}
        />
        <div
          className={`absolute bottom-2 right-2 text-xs font-medium ${
            isNearLimit
              ? remainingChars <= 0
                ? "text-error" :"text-warning" :"text-text-tertiary"
          }`}
        >
          {remainingChars}/{maxLength}
        </div>
      </div>
      {error && (
        <p className="text-error text-sm mt-1 flex items-center">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FormInput;