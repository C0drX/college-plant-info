import { Link } from "react-router-dom";
import { BASE_URL } from "../config/server";

function PlantCard({ plant }) {
  // const BASE_URL = import.meta.env.VITE_BASE_URL;
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <img
          src={`${BASE_URL}/images/${plant.image}`}
          className="card-img-top"
          alt={plant.common_name}
        />

        <div className="card-body">
          <h5 className="card-title">{plant.common_name}</h5>

          <p className="card-text">{plant.scientific_name}</p>

          <Link to={`/plant/${plant.id}`} className="btn btn-success">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlantCard;
