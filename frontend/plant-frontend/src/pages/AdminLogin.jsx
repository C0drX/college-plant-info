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
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

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
            <h4 className="mb-1">Welcome Back Admin</h4>
            <small style={{ opacity: 0.9 }}>Login to your admin account</small>
          </div>

          {/* Body */}
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3 py-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="form-control mb-2 py-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="/admin/forgot-password">Forgot Password?</a>

              <button className="btn btn-success w-100 py-2 my-2">Login</button>

              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-outline-success w-100 py-2"
                  onClick={navigateToRegister}
                >
                  Register as Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
