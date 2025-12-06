import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const getCustomers = (token) =>
  API.get("/customers", {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createCustomer = (data, token) =>
  API.post("/customers", data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateCustomer = (id, data, token) =>
  API.put(`/customers/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteCustomer = (id, token) =>
  API.delete(`/customers/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
