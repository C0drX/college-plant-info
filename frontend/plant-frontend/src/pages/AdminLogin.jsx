import { useState } from "react";
import { adminLogin } from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await adminLogin({
        email,
        password,
      });

      const token = res.data.token;

      localStorage.setItem("admin_token", token);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  const navigateToRegister = () => {
    navigate("/admin/register");
  };

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm p-4"
        style={{ maxWidth: 420, margin: "auto" }}
      >
        <h5 className="mb-3">Login Admin</h5>

        <form onSubmit={handleSubmit}>
          <input
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

          <button className="btn btn-success w-100">Login</button>
          <div className="mt-3">
            <button
              className="btn btn-success w-100"
              onClick={navigateToRegister}
            >
              Register as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
