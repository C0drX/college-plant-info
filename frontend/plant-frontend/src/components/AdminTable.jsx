import { formatTime } from "../utils/formatTime";

function AdminTable({ data }) {
  const adminMap = Object.fromEntries(data.map((a) => [a.id, a.name]));

  const sortedData = [...data].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  );

  return (
    <div className="card-body p-0">
      <table className="table mb-0">
        <thead className="table-light">
          <tr>
            <th>Sr. No.</th>
            <th>Admin Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Invited By</th>
            <th>Last Login</th>
            <th>Date Joined</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((admin, index) => {
            const invitedBy = admin.invited_by
              ? adminMap[admin.invited_by]
              : "root";

            return (
              <tr key={admin.id}>
                <td>{index + 1}</td>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>
                  {admin.invited_by != null
                    ? invitedBy + " (" + admin.invited_by + ")"
                    : invitedBy}
                </td>
                <td>{formatTime(admin.last_login) || "—"}</td>
                <td>{formatTime(admin.created_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
