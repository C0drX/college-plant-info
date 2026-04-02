import { useState, useEffect } from "react";
import { resetAdminPassword } from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [form, setForm] = useState({
    email: "",
    recoveryKey: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);

  const navigate = useNavigate();

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

  /**
   * ---------------------------------------------------
   * 🔥 Real-time password validation
   * ---------------------------------------------------
   */
  useEffect(() => {
    if (form.confirmPassword === "") {
      setPasswordMatch(null);
    } else {
      setPasswordMatch(form.password === form.confirmPassword);
    }
  }, [form.password, form.confirmPassword]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * ---------------------------------------------------
   * 🔥 Handle Submit
   * ---------------------------------------------------
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ empty fields
    if (!form.email || !form.recoveryKey || !form.password) {
      triggerToast("All fields are required ⚠️");
      return;
    }

    // ❌ password mismatch
    if (form.password !== form.confirmPassword) {
      triggerToast("Passwords do not match ❌");
      return;
    }

    try {
      setLoading(true);

      await resetAdminPassword({
        email: form.email,
        recovery_key: form.recoveryKey,
        new_password: form.password,
      });

      triggerToast("Password reset successful ✅");

      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      triggerToast(
        err.response?.data?.message || "Invalid recovery details ❌",
      );
    } finally {
      setLoading(false);
    }
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
            <h4 className="mb-1">Reset Password 🔐</h4>
            <small style={{ opacity: 0.9 }}>
              Use your recovery key to reset password
            </small>
          </div>

          {/* Body */}
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                className="form-control mb-3 py-2"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                name="recoveryKey"
                className="form-control mb-3 py-2"
                placeholder="Recovery Key"
                value={form.recoveryKey}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                className="form-control mb-3 py-2"
                placeholder="New Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
              />

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                autoComplete="new-password"
                className={`form-control mb-2 py-2 ${
                  passwordMatch === null
                    ? ""
                    : passwordMatch
                      ? "is-valid"
                      : "is-invalid"
                }`}
                required
              />

              {/* Validation messages */}
              {passwordMatch === false && (
                <div className="invalid-feedback d-block mb-2">
                  Passwords do not match ❌
                </div>
              )}

              {passwordMatch === true && (
                <div className="valid-feedback d-block mb-2">
                  Passwords match ✅
                </div>
              )}

              <button
                type="submit"
                className="btn btn-success w-100 py-2"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-2 py-2"
                onClick={() => navigate("/admin/login")}
              >
                Back to Login
              </button>
            </form>
          </div>
        </div>
      </div>

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

export default ForgotPassword;
