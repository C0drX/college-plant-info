import axios from "axios";
import { API_URL } from "../config/server";

const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Plants

export const getPlants = () => API.get("/plants");

export const getPlantById = (id) => API.get(`/plants/${id}`);

export const addPlant = (data) =>
  API.post("/plants", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updatePlant = (id, data) =>
  API.put(`/plants/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deletePlant = (id) => API.delete(`/plants/${id}`);

export const regenerateQRCodes = () => API.post("/plants/regenerate-qrs");

// Admin

export const getAdmins = () => API.get("/admin/get-admins");

export const adminLogin = (data) => API.post("/admin/login", data);

export const adminRegister = (data) => API.post("/admin/register", data);
