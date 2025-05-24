import React from "react";

const TextInput = ({
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}) => {
  return (
    <div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="input-default w-full"
        placeholder={placeholder}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
