import React from "react";

const UsesSection = ({ uses }) => {
  if (!uses) return null;

  return (
    <div className="mb-5">
      <h3 className="mb-3 fw-bold text-success">💊 Uses</h3>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <p className="mb-0">{uses}</p>
        </div>
      </div>
    </div>
  );
};

export default UsesSection;
