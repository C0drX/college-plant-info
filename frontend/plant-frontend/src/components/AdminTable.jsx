import { useState, useMemo } from "react";
import { formatTime } from "../utils/formatTime";

function AdminTable({ data }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const adminMap = Object.fromEntries(data.map((a) => [a.id, a.name]));

  // 🔥 sorted data (same as before)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  );

  // 🔥 filter (search)
  const filteredData = useMemo(() => {
    return sortedData.filter(
      (admin) =>
        admin.name.toLowerCase().includes(search.toLowerCase()) ||
        admin.email.toLowerCase().includes(search.toLowerCase()) ||
        admin.id.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, sortedData]);

  // 🔥 pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // 🔥 current logged in admin
  const currentAdmin = JSON.parse(localStorage.getItem("admin") || "null");

  return (
    <div
      className="card border-0 shadow-sm"
      style={{ borderRadius: "16px", overflow: "hidden" }}
    >
      <div className="card-body p-3">
        {/* 🔍 Search */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by name, email or ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* 📋 Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ background: "#f8f9fa" }}>
              <tr>
                <th className="fw-semibold text-muted small">#</th>
                <th className="fw-semibold text-muted small">Admin Id</th>
                <th className="fw-semibold text-muted small">Name</th>
                <th className="fw-semibold text-muted small">Email</th>
                <th className="fw-semibold text-muted small">Invited By</th>
                <th className="fw-semibold text-muted small">Last Login</th>
                <th className="fw-semibold text-muted small">Joined</th>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((admin, index) => {
                const invitedBy = admin.invited_by
                  ? adminMap[admin.invited_by]
                  : "root";

                const isCurrent = currentAdmin?.id === admin.id;

                return (
                  <tr
                    key={admin.id}
                    style={{
                      background: isCurrent ? "#e6f4ea" : "transparent",
                    }}
                  >
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

                    <td>
                      <span
                        className="badge bg-light text-dark"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {admin.id}
                      </span>
                    </td>

                    <td className="fw-semibold">
                      {admin.name}
                      {isCurrent && (
                        <span className="ms-2 badge bg-success">You</span>
                      )}
                    </td>

                    <td className="text-muted">{admin.email}</td>

                    <td className="text-muted" style={{ fontSize: "0.9rem" }}>
                      {admin.invited_by != null
                        ? `${invitedBy} (${admin.invited_by})`
                        : invitedBy}
                    </td>

                    <td className="text-muted" style={{ fontSize: "0.9rem" }}>
                      {formatTime(admin.last_login) || "—"}
                    </td>

                    <td className="text-muted" style={{ fontSize: "0.9rem" }}>
                      {formatTime(admin.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 📄 Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
              Page {currentPage} of {totalPages}
            </small>

            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>

              <button
                className="btn btn-sm btn-outline-secondary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminTable;
