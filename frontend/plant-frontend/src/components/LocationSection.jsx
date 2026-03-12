import React from "react";
import { BASE_URL } from "../config/server";
const LocationSection = ({ plant }) => {
  const collegeImage = plant.images.find((img) => img.includes("college"));

  return (
    <div className="mb-5">
      <h3 className="mb-4 fw-bold text-success">Plant in College</h3>

      <div className="card shadow-sm border-0 location-card">
        <div className="location-wrapper">
          <div className="location-image-box">
            <img src={`${BASE_URL}${collegeImage}`} alt="Plant location" />
          </div>

          <div className="location-text-box">
            <h5 className="fw-semibold mb-2">Location at Campus</h5>

            <p className="mb-0">{plant.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
