import React from "react";

const TextInput = ({
  name,
  value,
  onChange,
  placeholder,
  error,
  type,
}) => {
  return (
    <div>
      <input
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className="input-default w-full"
        placeholder={placeholder}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
