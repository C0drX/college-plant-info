import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import PlantDetails from "./pages/PlantDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AddPlant from "./pages/AddPlant";
import EditPlant from "./pages/EditPlant";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plant/:id" element={<PlantDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddPlant />} />
        <Route path="/admin/edit/:id" element={<EditPlant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
