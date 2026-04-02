import { useEffect, useState } from "react";
import { getPlants, deletePlant, restorePlant } from "../services/api";
import { Link } from "react-router-dom";
import PlantList from "../components/PlantList";
import QrModal from "../components/modals/QrModal";
import { DeleteModal, RestoreModal } from "../components/modals/CustomModal";
import { regenerateQRCodes, getAdmins } from "../services/api";

function AdminDashboard() {
  const [plants, setPlants] = useState([]);
  const [qrPlant, setQrPlant] = useState(null);
  const [search, setSearch] = useState("");
  const [deletePlantId, setDeletePlantId] = useState(null);
  const [restorePlantId, setRestorePlantId] = useState(null);
  const [admins, setAdmins] = useState(null);
  const admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    loadAdmins();
  }, []);

  useEffect(() => {
    loadPlants();
  }, []);

  const loadAdmins = async () => {
    try {
      const res = await getAdmins();
      setAdmins(res.data);
    } catch (error) {
      console.log("Failed to load admins:", error);
    }
  };

  const loadPlants = async () => {
    const res = await getPlants();
    setPlants(res.data);
  };

  const confirmRestore = async () => {
    if (!restorePlantId) return;
    try {
      await restorePlant(restorePlantId);
      setRestorePlantId(null);
      loadPlants();
    } catch (err) {
      console.error(err);
    }
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

  const handleRegenerateQR = async () => {
    const confirm = window.confirm(
      "This will regenerate QR codes for all plants. Continue?",
    );
    if (!confirm) return;

    try {
      await regenerateQRCodes();
      alert("QR codes regenerated successfully");
      loadPlants();
    } catch (err) {
      console.error(err);
      alert("Failed to regenerate QR codes");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  // 📊 Stats
  const activePlants = plants.filter((p) => p.is_active).length;
  const deletedPlants = plants.filter((p) => !p.is_active).length;
  const totalAdmins = admins ? admins.length : "--";

  // Filter plants based on search
  const filteredPlants = plants.filter((plant) =>
    plant.common_name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container py-4">
      <div
        className="card shadow-sm border-0 p-3"
        style={{ borderRadius: "16px", overflow: "hidden" }}
      >
        {/* 🔥 Welcome */}
        <h2 className="mb-3">Welcome {admin.name}</h2>

        {/* 📊 Stats Cards */}
        <div className="row g-3 mb-3">
          <div className="col-6 col-md-3">
            <div className="card text-white bg-primary shadow-sm">
              <div className="card-body">
                <h6>Total Plants</h6>
                <h3>{plants.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card text-white bg-success shadow-sm">
              <div className="card-body">
                <h6>Active Plants</h6>
                <h3>{activePlants}</h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card text-white bg-danger shadow-sm">
              <div className="card-body">
                <h6>Deleted Plants</h6>
                <h3>{deletedPlants}</h3>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card text-white bg-dark shadow-sm">
              <div className="card-body">
                <h6>Total Admins</h6>
                <h3>{totalAdmins}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* ⚙️ Buttons Row */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          <Link to="/admin/add" className="btn btn-success">
            + Add Plant
          </Link>

          <button className="btn btn-primary" onClick={handleRegenerateQR}>
            Regenerate QR
          </button>

          <Link to="/admin/manage-admins" className="btn btn-warning">
            Manage Admins
          </Link>

          <Link to="/admin/admin-profile" className="btn btn-info text-white">
            Manage Profile
          </Link>

          <button className="btn btn-outline-danger ms-auto" onClick={logout}>
            Logout
          </button>
        </div>

        {/* 🔍 Search */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search plant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 🌿 Active Plants */}
        <div className="card-body">
          <PlantList
            plants={filteredPlants}
            onDelete={setDeletePlantId}
            onShowQr={setQrPlant}
            showDeleted={false}
          />
        </div>

        {/* 🗑 Deleted Plants */}
        <div className="card-body">
          <PlantList
            plants={filteredPlants}
            onDelete={setRestorePlantId}
            onShowQr={setQrPlant}
            showDeleted={true}
          />
        </div>
      </div>

      <DeleteModal
        show={deletePlantId}
        onClose={() => setDeletePlantId(null)}
        onConfirm={confirmDelete}
      />
      <RestoreModal
        show={restorePlantId}
        onClose={() => setRestorePlantId(null)}
        onConfirm={confirmRestore}
      />
      <QrModal plant={qrPlant} onClose={() => setQrPlant(null)} />
    </div>
  );
}

export default AdminDashboard;
