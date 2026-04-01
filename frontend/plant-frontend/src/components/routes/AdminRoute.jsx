import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("admin_token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function LoggedInAdminRoute({ children }) {
  const token = localStorage.getItem("admin_token");

  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export { AdminRoute, LoggedInAdminRoute };
