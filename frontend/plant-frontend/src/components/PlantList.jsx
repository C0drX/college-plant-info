import PlantListCard from "./PlantListCard";

function PlantList({ plants, onDelete, onShowQr, showDeleted = false }) {
  const filteredPlants = plants.filter((plant) =>
    showDeleted ? !plant.is_active : plant.is_active,
  );
  if (filteredPlants.length === 0) return null;
  const pTitle = showDeleted ? "Deleted Plants" : "Active Plants";

  return (
    <div className="row g-3">
      <h3>{pTitle}</h3>
      {filteredPlants.map((plant) => (
        <div key={plant.id} className="col-lg-4 col-md-6 col-12">
          <PlantListCard
            plant={plant}
            onDelete={onDelete}
            onShowQr={onShowQr}
            isDeleted={showDeleted}
          />
        </div>
      ))}
    </div>
  );
}

export default PlantList;
