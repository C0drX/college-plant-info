import { Link } from "react-router-dom";
import { BASE_URL } from "../config/server";
function PlantCard({ plant }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={`${BASE_URL}${plant.cover_image}` || "../assets/tree.png"}
          className="card-img-top"
          alt={plant.common_name}
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />

        <div className="card-body">
          <h5 className="card-title">{plant.common_name}</h5>

          <p className="text-muted mb-2">{plant.scientific_name}</p>

          <Link to={`/plant/${plant.id}`} className="btn btn-success btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlantCard;
