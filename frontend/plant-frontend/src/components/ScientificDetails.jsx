import React from "react";

const ScientificDetails = ({ plant }) => {
  const details = [
    {
      label: "Scientific Name",
      value: plant.scientific_name,
    },
    {
      label: "Family",
      value: plant.family,
    },
    {
      label: "Category",
      value: plant.category,
    },
    {
      label: "Origin",
      value: plant.origin,
    },
  ];

  return (
    <div className="mb-5">
      <h3 className="mb-4 fw-bold text-success">🧬 Scientific Details</h3>

      <div className="row g-3">
        {details.map((item, index) => (
          <div className="col-md-6" key={index}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h6 className="text-muted mb-2">{item.label}</h6>

                <h5 className="fw-semibold">{item.value ?? "Not available"}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScientificDetails;
