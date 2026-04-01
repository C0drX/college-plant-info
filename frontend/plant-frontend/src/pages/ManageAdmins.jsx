import { useEffect, useState } from "react";
import { getAdmins } from "../services/api";
import AdminTable from "../components/AdminTable";
import { generateAdminInvite } from "../services/api";

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadAdmins();
  }, []);

  const createInvite = async () => {
    const res = await generateAdminInvite();
    console.log(res.data);
  };

  const loadAdmins = async () => {
    try {
      const res = await getAdmins();
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Manage Admins</h6>

          <button className="btn btn-primary btn-sm" onClick={createInvite}>
            Invite Admin
          </button>
        </div>

        <div className="card-body p-0">
          <AdminTable data={admins} />
        </div>
      </div>
    </div>
  );
}

export default ManageAdmins;
