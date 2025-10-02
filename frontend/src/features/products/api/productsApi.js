import api from "../../../api/axios";
export const fetchProducts = () => api.get("/products");
export const createProduct = (payload) => api.post("/products", payload);
export const updateProduct = (id, payload) =>
  api.put(`/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
