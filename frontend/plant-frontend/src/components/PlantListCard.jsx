import { Link } from "react-router-dom";
import QrButton from "./buttons/QrButton";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import { BASE_URL } from "../config/server";

function PlantListCard({ plant, onDelete, onShowQr, isDeleted = false }) {
  const image = `${BASE_URL}${plant.cover_image}`;

  return (
    <div className="plant-row-card">
      <div className="plant-row-img">
        {image ? (
          <img
            src={image}
            alt={plant.common_name}
            style={{
              width: "85px",
              height: "85px",
            }}
          />
        ) : (
          <div className="plant-row-placeholder">🌿</div>
        )}
      </div>

      <div className="plant-row-info">
        <h6>{plant.common_name}</h6>
        <small className="text-muted">{plant.scientific_name}</small>
      </div>

      <div className="plant-row-actions">
        <QrButton onClick={() => onShowQr(plant)} />

        <EditButton id={plant.id} />

        <DeleteButton
          isDeleted={isDeleted}
          onClick={() => onDelete(plant.id)}
        />
      </div>
    </div>
  );
}

export default PlantListCard;
