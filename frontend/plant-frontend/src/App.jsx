import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import PlantDetails from "./pages/PlantDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AddPlant from "./pages/AddPlant";
import EditPlant from "./pages/EditPlant";
import AdminLogin from "./pages/AdminLogin";
import { AdminRoute, LoggedInAdminRoute } from "./components/routes/AdminRoute";
import AdminRegister from "./pages/AdminRegister";
import ManageAdmins from "./pages/ManageAdmins";
import PlantNotAVailable from "./pages/PlantNotAvailable";
import AdminProfile from "./pages/AdminProfile";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* 👇 YE MOST IMPORTANT LINE 
           Redirect to NotFound page if route doesn't match any of the defined routes.
        */}
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<Home />} />
        <Route path="/plant/:id" element={<PlantDetails />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/admin/add" element={<AddPlant />} />
        <Route path="/admin/edit/:id" element={<EditPlant />} />

        <Route path="/plant-not-available" element={<PlantNotAVailable />} />

        <Route
          path="/admin/register"
          element={
            <LoggedInAdminRoute>
              <AdminRegister />
            </LoggedInAdminRoute>
          }
        />
        <Route
          path="/admin/login"
          element={
            <LoggedInAdminRoute>
              <AdminLogin />
            </LoggedInAdminRoute>
          }
        />

        <Route
          path="/admin/forgot-password"
          element={
            <LoggedInAdminRoute>
              <ForgotPassword />
            </LoggedInAdminRoute>
          }
        />

        <Route
          path="/admin/manage-admins"
          element={
            <AdminRoute>
              <ManageAdmins />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/admin-profile"
          element={
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
