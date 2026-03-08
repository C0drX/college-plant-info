import { useEffect, useState } from "react";
import { getPlants, deletePlant } from "../services/api";
import { Link } from "react-router-dom";
import QrModal from "../components/QrModal";

function AdminDashboard() {
  const [plants, setPlants] = useState([]);
  const [qrPlant, setQrPlant] = useState(null);

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const res = await getPlants();
      setPlants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this plant?");

    if (!confirmDelete) return;

    try {
      await deletePlant(id);
      loadPlants();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Admin Dashboard</h2>

        <Link to="/admin/add" className="btn btn-success">
          Add Plant
        </Link>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Scientific Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {plants.map((plant) => (
            <tr key={plant.id}>
              <td>{plant.common_name}</td>

              <td>{plant.scientific_name}</td>

              <td>
                <Link
                  to={`/admin/edit/${plant.id}`}
                  className="btn btn-warning me-2"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(plant.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>

                <button
                  className="btn btn-info me-2"
                  onClick={() => setQrPlant(plant)}
                >
                  Show QR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <QrModal plant={qrPlant} onClose={() => setQrPlant(null)} />
    </div>
  );
}

export default AdminDashboard;
