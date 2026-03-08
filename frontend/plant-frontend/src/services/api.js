import axios from "axios";
import { API_URL } from "../config/server";

const API = axios.create({
  baseURL: API_URL,
});

export const getPlants = () => API.get("/plants");

export const getPlantById = (id) => API.get(`/plants/${id}`);

// export const addPlant = (data) => API.post("/plants", data);

export const updatePlant = (id, data) =>
  API.put(`/plants/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deletePlant = (id) => API.delete(`/plants/${id}`);

export const addPlant = (data) =>
  API.post("/plants", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
