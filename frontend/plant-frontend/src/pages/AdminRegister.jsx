import { useState } from "react";
import { adminRegister } from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminRegister() {
  const [inviteKey, setInviteKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await adminRegister({
        invite_key: inviteKey,
        email,
        password,
      });

      alert("Admin registered successfully");

      navigate("/admin/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: 420, margin: "auto" }}
      >
        <h5 className="mb-3">Register Admin</h5>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            placeholder="Invite Key"
            value={inviteKey}
            onChange={(e) => setInviteKey(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
