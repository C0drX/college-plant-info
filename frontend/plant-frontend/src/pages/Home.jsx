import { useEffect, useState } from "react";
import { getPlants } from "../services/api";
import PlantCardHome from "../components/PlantCardHome";

function Home() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const res = await getPlants();
      const activePlants = res.data.filter((plant) => plant.is_active);
      setPlants(activePlants);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPlants = plants.filter(
    (plant) =>
      plant.common_name.toLowerCase().includes(search.toLowerCase()) ||
      plant.scientific_name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container mt-4">
      {/* Heading + Search */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0 flex-grow-1">College Plants</h2>

        <div className="input-group" style={{ maxWidth: "240px" }}>
          {/* <span className="input-group-text">🔍</span> */}
          <input
            type="text"
            className="form-control"
            placeholder="Search plants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredPlants.map((plant) => (
          <PlantCardHome key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
}

export default Home;
