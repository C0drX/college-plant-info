import { useEffect, useState } from "react";
import { getPlants } from "../services/api";
import PlantCard from "../components/PlantCard";

function Home() {

  const [plants, setPlants] = useState([]);

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

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        College Plants
      </h2>

      <div className="row">

        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
          />
        ))}

      </div>

    </div>
  );
}

export default Home;