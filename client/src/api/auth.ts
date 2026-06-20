import { api } from "./client";
import type { RegisterDTO, LoginDTO } from "../types/auth";
import type { User } from "../types/user";

export const authApi = {
    register: (data: RegisterDTO) => api.post<User>("/auth/register", data),
    login: (data: LoginDTO) => api.post<User>("/auth/login", data),
    logout: () => api.post<User>("/auth/logout", {}),
};
