import { useState } from "react";
import { adminRegister } from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const [inviteKey, setInviteKey] = useState("");
  const [name, setName] = useState(""); // ✅ added
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [recoveryKey, setRecoveryKey] = useState(null); // ✅ important

  const navigate = useNavigate();

  /**
   * ---------------------------------------------------
   * Handle Form Submit
   * ---------------------------------------------------
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await adminRegister({
        invite_key: inviteKey,
        name, // ✅ added
        email,
        password,
      });

      /**
       * ---------------------------------------------------
       * Save Recovery Key
       * ---------------------------------------------------
       */
      setRecoveryKey(res.data.recovery_key);
    } catch (err) {
      console.error(err);

      alert(err.response?.data?.message || "Registration failed");
    }
  };

  /**
   * ---------------------------------------------------
   * UI
   * ---------------------------------------------------
   */
  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1 px-3 px-md-0">
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div
          className="shadow-lg border-0"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #198754, #157347)",
              color: "white",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h4 className="mb-1">Create Admin</h4>
            <small style={{ opacity: 0.9 }}>
              Register using your invite key
            </small>
          </div>

          {/* Body */}
          <div className="p-4">
            {!recoveryKey ? (
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3 py-2"
                  placeholder="Invite Key"
                  value={inviteKey}
                  onChange={(e) => setInviteKey(e.target.value)}
                  required
                />

                <input
                  className="form-control mb-3 py-2"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  type="email"
                  className="form-control mb-3 py-2"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  className="form-control mb-3 py-2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />

                <button className="btn btn-success w-100 py-2">Register</button>
              </form>
            ) : (
              <div
                className="text-center p-3"
                style={{
                  background: "#fff3cd",
                  borderRadius: "12px",
                }}
              >
                <h6 className="mb-2">⚠ Save your Recovery Key</h6>

                <h4 className="my-3">{recoveryKey}</h4>

                <p className="small mb-3">
                  This will not be shown again. Keep it safe.
                </p>

                <button
                  className="btn btn-dark w-100 mb-2"
                  onClick={() => {
                    navigator.clipboard.writeText(recoveryKey);
                    alert("Copied to clipboard");
                  }}
                >
                  Copy Recovery Key
                </button>

                <button
                  className="btn btn-primary w-100"
                  onClick={() => navigate("/admin/login")}
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
