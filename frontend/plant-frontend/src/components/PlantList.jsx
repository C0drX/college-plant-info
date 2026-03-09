import PlantListCard from "./PlantListCard";

function PlantList({ plants, onDelete, onShowQr }) {
  return (
    <div className="row g-3">
      {plants.map((plant) => (
        <div key={plant.id} className="col-lg-4 col-md-6 col-12">
          <PlantListCard
            plant={plant}
            onDelete={onDelete}
            onShowQr={onShowQr}
          />
        </div>
      ))}
    </div>
  );
}

export default PlantList;
