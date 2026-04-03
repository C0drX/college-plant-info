import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Toast,
  ToastContainer,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { updateAdminProfile } from "../services/api";

export default function AdminProfile() {
  const [admin, setAdmin] = useState({ name: "", email: "" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);

  // Real-time password validation
  useEffect(() => {
    if (form.confirmPassword === "") {
      setPasswordMatch(null);
    } else {
      setPasswordMatch(form.password === form.confirmPassword);
    }
  }, [form.password, form.confirmPassword]);

  // Load admin
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("admin") || "null");
    if (stored) {
      setAdmin(stored);
      setForm((prev) => ({
        ...prev,
        name: stored.name,
        email: stored.email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameChanged = form.name.trim() !== admin.name;
    const isPasswordEntered = form.password.trim() !== "";

    // ❌ No changes
    if (!isNameChanged && !isPasswordEntered) {
      setToastMsg("No changes made 😐");
      setShowToast(true);
      return;
    }

    // ❌ Password mismatch
    if (form.password && form.password !== form.confirmPassword) {
      setToastMsg("Passwords do not match ❌");
      setShowToast(true);
      return;
    }

    try {
      setLoading(true);

      // 🔥 API call
      await updateAdminProfile({
        name: isNameChanged ? form.name : undefined,
        password: isPasswordEntered ? form.password : undefined,
      });

      // ✅ Update localStorage
      const updatedAdmin = {
        ...admin,
        name: isNameChanged ? form.name : admin.name,
      };

      localStorage.setItem("admin", JSON.stringify(updatedAdmin));
      setAdmin(updatedAdmin);

      // reset password fields
      setForm((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));

      setToastMsg("Profile updated successfully ✅");
      setShowToast(true);
    } catch (err) {
      console.error(err);
      setToastMsg("Update failed ❌");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-grow-1 px-3 px-md-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "500px" }}
      >
        <Card
          className="shadow-lg border-0"
          style={{ borderRadius: "20px", overflow: "hidden" }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #198754, #157347)",
              color: "white",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h4>Hello, {admin.name}</h4>
            <small>Let’s update your profile</small>
          </div>

          <Card.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={form.email} disabled />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  minLength={6}
                  autoComplete="new-password"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={
                    passwordMatch === null
                      ? ""
                      : passwordMatch
                        ? "is-valid"
                        : "is-invalid"
                  }
                />

                {passwordMatch === false && (
                  <div className="invalid-feedback d-block">
                    Passwords do not match ❌
                  </div>
                )}

                {passwordMatch === true && (
                  <div className="valid-feedback d-block">
                    Passwords match ✅
                  </div>
                )}
              </Form.Group>

              <div className="d-grid">
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Update Profile"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </motion.div>

      {/* 🔥 Bigger Top-Center Toast */}
      <ToastContainer position="top-center" className="p-3">
        <Toast
          bg="white"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          style={{
            minWidth: "320px",
            fontSize: "1rem",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          <Toast.Body className="text-dark text-center fw-semibold">
            {toastMsg}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
