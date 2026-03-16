import { Link } from "react-router-dom";
import { BASE_URL } from "../config/server";

function PlantCardHome({ plant }) {
  return (
    <div className="col-6 col-md-4 mb-4">
      <div className="card plant-card h-100 shadow-sm">
        <img
          src={`${BASE_URL}${plant.cover_image}` || "../assets/tree.png"}
          className="card-img-top"
          alt={plant.common_name}
          style={{
            height: "clamp(180px, 30vw, 330px)",
            objectFit: "cover",
          }}
        />

        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{plant.common_name}</h5>

          <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
            {plant.scientific_name}
          </p>

          <Link to={`/plant/${plant.id}`} className="btn btn-success w-100">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlantCardHome;
