import { Link } from "react-router-dom";
import { BASE_URL } from "../config/server";
import { useMemo } from "react";

const MorePlants = ({ plants, currentPlantId }) => {
  if (!plants || plants.length === 0) return null;

  const filteredPlants = plants.filter(
    (plant) => plant.id !== Number(currentPlantId),
  );

  if (filteredPlants.length === 0) return null;

  // const shufflePlants = (array) => {
  //   return [...array].sort(() => Math.random() - 0.5);
  // };

  const randomPlants = useMemo(() => {
    const shuffled = [...filteredPlants].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [filteredPlants]);

  return (
    <div className="mt-10">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-success">🌿 Explore More Plants</h3>

        <Link to="/" className="text-success fw-semibold text-decoration-none">
          View All →
        </Link>
      </div>

      <div className="more-plants-row">
        {randomPlants.map((plant) => (
          <div key={plant.id} className="plant-scroll-card">
            <div className="card more-plant-card shadow-sm border-0">
              <img
                src={`${BASE_URL}${plant.cover_image}`}
                className="card-img-top"
                alt={plant.common_name}
              />

              <div className="card-body text-center">
                <h6 className="fw-bold mb-1">{plant.common_name}</h6>

                <p className="text-muted fst-italic mb-3">
                  {plant.scientific_name}
                </p>

                <Link
                  to={`/plant/${plant.id}`}
                  className="btn btn-success btn-sm"
                >
                  View Plant
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MorePlants;
