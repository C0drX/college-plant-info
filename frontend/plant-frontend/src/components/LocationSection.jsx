import React from "react";
import { BASE_URL } from "../config/server";
const LocationSection = ({ plant }) => {
  const collegeImage = plant.images.find((img) => img.includes("college"));

  return (
    <div className="mb-5">
      <h3 className="mb-4 fw-bold text-success">📍 Location in College</h3>

      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={`${BASE_URL}${collegeImage}`}
              className="img-fluid w-100"
              style={{
                minHeight: "350px",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="col-md-6 d-flex align-items-center">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Campus Location</h5>

              <p className="mb-0">{plant.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LocationSection;
