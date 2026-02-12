export const BACKEND_URL = "http://localhost:8080";

export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const API_PREFIX = "/api";

export const API_ROUTES = {
  users: {
    getAll: () => `${API_PREFIX}/users`,
    getById: (id: number) => `${API_PREFIX}/users/${id}`,
    create: () => `${API_PREFIX}/add`,
    update: (id: number) => `${API_PREFIX}/update/${id}`,
    delete: (id: number) => `${API_PREFIX}/delete/${id}`,
  },
};
