import { useEffect, useState } from "react";
import { getAdmins, generateAdminInvite } from "../services/api";
import AdminTable from "../components/AdminTable";
import { formatTime } from "../utils/formatTime";

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [inviteKey, setInviteKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expiresAt, setExpiresAt] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  /**
   * ---------------------------------------------------
   * 🔥 Toast Helper (Auto Hide)
   * ---------------------------------------------------
   */
  const triggerToast = (message) => {
    setToastMsg(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

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

  const createInvite = async () => {
    try {
      const res = await generateAdminInvite();
      const key = res.data.invite;

      setInviteKey(key.inviteKey);
      setExpiresAt(key.expiresAt);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="container py-4"
      style={{
        minHeight: "90vh",
        background: "linear-gradient(135deg, #e6f4ea, #d1f2eb)",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{ borderRadius: "16px", overflow: "hidden" }}
      >
        {/* Header */}
        <div className="card-header bg-white d-flex justify-content-between align-items-center px-4 py-3">
          <h5 className="mb-0 fw-semibold">Manage Admins</h5>

          <button
            className="btn btn-success btn-sm px-3 py-2 fw-semibold"
            style={{ borderRadius: "10px" }}
            onClick={createInvite}
          >
            + Invite Admin
          </button>
        </div>

        {/* Table */}
        <div className="card-body p-0">
          <AdminTable data={admins} />
        </div>
      </div>

      {/* 🔥 Invite Modal */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.4)", zIndex: 1050 }}
        >
          <div
            className="bg-white p-4"
            style={{
              borderRadius: "16px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <h5 className="mb-2 fw-semibold">Invite Key Generated 🔑</h5>

            <p className="text-muted mb-3">
              Share this key with the admin. It will expire at{" "}
              {formatTime(expiresAt)}
            </p>

            <div
              className="mb-3 p-2"
              style={{
                background: "#f8f9fa",
                borderRadius: "10px",
                fontWeight: "500",
                fontSize: "1.9rem",
                wordBreak: "break-all",
              }}
            >
              {inviteKey}
            </div>

            <button
              className="btn btn-dark w-100 mb-2"
              onClick={() => {
                navigator.clipboard.writeText(inviteKey);
                triggerToast("Invite key copied to clipboard!");
                setShowModal(false);
              }}
            >
              Copy Key
            </button>

            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* 🔥 Toast */}
      <div className="position-fixed top-0 start-50 translate-middle-x p-3">
        {showToast && (
          <div
            className="bg-white text-dark text-center"
            style={{
              borderRadius: "12px",
              padding: "10px 20px",
              minWidth: "300px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              fontWeight: "500",
            }}
          >
            {toastMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageAdmins;
