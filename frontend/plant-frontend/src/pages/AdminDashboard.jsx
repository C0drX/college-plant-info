import { useEffect, useState } from "react";
import { getPlants, deletePlant, restorePlant } from "../services/api";
import { Link } from "react-router-dom";
import PlantList from "../components/PlantList";
import QrModal from "../components/modals/QrModal";
import {
  DeleteModal,
  RestoreModal,
  LoaderModal,
  MessageModal,
  ConfirmModal,
} from "../components/modals/CustomModal";
import { regenerateQRCodes, getAdmins } from "../services/api";

function AdminDashboard() {
  const [plants, setPlants] = useState([]);
  const [qrPlant, setQrPlant] = useState(null);
  const [search, setSearch] = useState("");
  const [deletePlantId, setDeletePlantId] = useState(null);
  const [restorePlantId, setRestorePlantId] = useState(null);
  const [admins, setAdmins] = useState(null);

  // 🔥 NEW STATE (loader ke liye)
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  // 🔥 UPDATED FUNCTION (loader added)
  const regenerateQR = async () => {
    try {
      setIsRegenerating(true);
      await regenerateQRCodes();
      loadPlants();
      setShowMessage(true);
    } catch (err) {
      console.error(err);
      setShowErrorMessage(true);
    } finally {
      setIsRegenerating(false);
    }
  };

  const showConfirmModal = () => {
    setShowConfirm(true);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin");
    window.location.href = "/admin/login";
  };

  const activePlants = plants.filter((p) => p.is_active).length;
  const deletedPlants = plants.filter((p) => !p.is_active).length;
  const totalAdmins = admins ? admins.length : "--";

  const filteredPlants = plants.filter((plant) =>
    plant.common_name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container py-4 position-relative">
      {/* 🔥 LOADER OVERLAY (Bootstrap based) */}
      <LoaderModal show={isRegenerating} text="Regenerating QR codes..." />
      <MessageModal
        show={showMessage}
        type="success"
        message="QR codes regenerated successfully!"
        onClose={() => setShowMessage(false)}
      />

      <MessageModal
        show={showErrorMessage}
        type="failed"
        message="Failed to regenerate QR codes."
        onClose={() => setShowErrorMessage(false)}
      />

      <ConfirmModal
        show={showConfirm}
        title="Regenerate QR Codes"
        message="This will regenerate QR codes for all plants. Are you sure?"
        onConfirm={() => {
          regenerateQR();
          setShowConfirm(false);
        }}
        onClose={() => setShowConfirm(false)}
      />

      <div
        className="card shadow-sm border-0 p-3"
        style={{ borderRadius: "16px", overflow: "hidden" }}
      >
        <h2 className="mb-3">Welcome {admin.name}</h2>

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

        <div className="d-flex flex-wrap gap-2 mb-3">
          <Link to="/admin/add" className="btn btn-success">
            + Add Plant
          </Link>

          <button className="btn btn-primary" onClick={showConfirmModal}>
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

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search plant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="card-body">
          <PlantList
            plants={filteredPlants}
            onDelete={setDeletePlantId}
            onShowQr={setQrPlant}
            showDeleted={false}
          />
        </div>

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
