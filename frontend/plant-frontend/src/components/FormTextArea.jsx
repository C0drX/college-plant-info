import React from "react";

const FormTextarea = ({ label, name, value, onChange, required = false }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{label}</label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows="4"
        className="form-control modern-textarea"
      />
    </div>
  );
};

export default FormTextarea;
