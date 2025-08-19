import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ matches backend routes
});

// Forms
export const getForms = () => API.get("/forms");
export const createForm = (form: any) => API.post("/forms", form);
export const updateForm = (id: string, form: any) => API.put(`/forms/${id}`, form);
export const deleteForm = (id: string) => API.delete(`/forms/${id}`);

// Submissions
export const submitForm = (id: string, data: any) =>
  API.post(`/forms/${id}/submissions`, data);

export const getSubmissions = (id: string) =>
  API.get(`/forms/${id}/submissions`);
