import React from "react";

const TextareaInput = ({ name, value, onChange, placeholder, error, rows }) => {
  return (
    <div>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="input-default w-full resize-none"
        placeholder={placeholder}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextareaInput;
