import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlantById } from "../services/api";
import { BASE_URL } from "../config/server";

function PlantDetails() {
  const { id } = useParams();

  const [plant, setPlant] = useState(null);

  useEffect(() => {
    loadPlant();
  }, []);

  const loadPlant = async () => {
    try {
      const res = await getPlantById(id);
      setPlant(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!plant) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`${BASE_URL}/images/${plant.image}`}
            className="img-fluid rounded shadow"
            alt={plant.common_name}
          />
        </div>

        <div className="col-md-6">
          <h2>{plant.common_name}</h2>

          <p>
            <strong>Scientific Name:</strong> {plant.scientific_name}
          </p>

          <p>
            <strong>Family:</strong> {plant.family}
          </p>

          <p>
            <strong>Description:</strong> {plant.description}
          </p>

          <p>
            <strong>Uses:</strong> {plant.uses}
          </p>

          <p>
            <strong>Location:</strong> {plant.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlantDetails;
