import { api } from "./client";
import type { User, CreateUserDTO, UpdateUserDTO } from "../types/user";

export const userApi = {
  getAll: () => api.get<User[]>("/users"),
  getById: (id: number) => api.get<User>(`/users/${id}`),
  create: (data: CreateUserDTO) => api.post<User>("/users", data),
  update: (id: number, data: UpdateUserDTO) => api.put<User>(`/users/${id}`, data),
  remove: (id: number) => api.delete<void>(`/users/${id}`),
};
