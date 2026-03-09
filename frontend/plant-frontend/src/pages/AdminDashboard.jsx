import { useEffect, useState } from "react";
import { getPlants, deletePlant } from "../services/api";
import { Link } from "react-router-dom";
import PlantList from "../components/PlantList";
import QrModal from "../components/modals/QrModal";
import DeleteModal from "../components/modals/DeleteModal";

function AdminDashboard() {
  const [plants, setPlants] = useState([]);
  const [qrPlant, setQrPlant] = useState(null);
  const [search, setSearch] = useState("");
  const [deletePlantId, setDeletePlantId] = useState(null);

  const filteredPlants = plants.filter((plant) =>
    plant.common_name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    const res = await getPlants();
    setPlants(res.data);
  };

  const confirmDelete = async () => {
    if (!deletePlantId) return;

    try {
      await deletePlant(deletePlantId);

      setDeletePlantId(null);

      loadPlants();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            Total Plants : <b>{plants.length}</b>
          </h6>

          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search plant..."
              style={{ width: "200px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Link to="/admin/add" className="btn btn-success btn-sm">
              + Add Plant
            </Link>
          </div>
        </div>
        <div className="card-body">
          <PlantList
            plants={filteredPlants}
            onDelete={setDeletePlantId}
            onShowQr={setQrPlant}
          />
        </div>
      </div>
      <DeleteModal
        show={deletePlantId}
        onClose={() => setDeletePlantId(null)}
        onConfirm={confirmDelete}
      />
      <QrModal plant={qrPlant} onClose={() => setQrPlant(null)} />
    </div>
  );
}

export default AdminDashboard;
