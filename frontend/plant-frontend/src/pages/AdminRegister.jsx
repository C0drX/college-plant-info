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
    <div className="container py-5">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: 420, margin: "auto" }}
      >
        <h5 className="mb-3">Register Admin</h5>

        {!recoveryKey ? (
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-2"
              placeholder="Invite Key"
              value={inviteKey}
              onChange={(e) => setInviteKey(e.target.value)}
              required
            />

            <input
              className="form-control mb-2"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn btn-success w-100">Register</button>
          </form>
        ) : (
          /**
           * ---------------------------------------------------
           * Recovery Key Display
           * ---------------------------------------------------
           */
          <div className="alert alert-warning text-center">
            <h6>⚠ Save your Recovery Key</h6>

            <h4 className="my-3">{recoveryKey}</h4>

            <p className="small">This will not be shown again. Keep it safe.</p>

            <button
              className="btn btn-dark w-100 mt-2"
              onClick={() => {
                navigator.clipboard.writeText(recoveryKey);
                alert("Copied to clipboard");
              }}
            >
              Copy Recovery Key
            </button>

            <button
              className="btn btn-primary w-100 mt-2"
              onClick={() => navigate("/admin/login")}
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRegister;
