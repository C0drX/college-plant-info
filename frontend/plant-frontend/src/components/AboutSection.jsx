import React from "react";

const AboutSection = ({ description }) => {
  if (!description) return null;

  return (
    <div className="mb-5">
      <h3 className="mb-3 fw-bold text-success">🌿 About the Plant</h3>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <p className="mb-0 fs-6">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
