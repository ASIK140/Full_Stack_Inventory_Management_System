import api from "../../../api/axios";
export const fetchCategories = () => api.get("/category");
export const createCategory = (payload) => api.post("/category", payload);
export const updateCategory = (id, payload) =>
  api.put(`/category/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/category/${id}`);
