import { useEffect, useState } from "react";
import { getAdmins } from "../services/api";

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadAdmins();
  }, []);

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

          <button className="btn btn-primary btn-sm">Invite Admin</button>
        </div>

        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Invited By</th>
                <th>Last Login</th>
                <th>Date Joined</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.invited_by ?? "root"}</td>
                  <td>{admin.last_login || "—"}</td>
                  <td>{admin.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageAdmins;
