import React from "react";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  required = false,
  placeHolder,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>

      <input
        type="text"
        className="form-control modern-input"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default FormInput;
