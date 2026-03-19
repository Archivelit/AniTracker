import type LoginData from "@/types/Interfaces/LoginData";
import type LoginResponse from "@/types/Interfaces/LoginResponse";
import type RegisterData from "@/types/Interfaces/RegisterData";
import { api } from "@/utils/Api";

export async function login(data: LoginData): Promise<LoginResponse> {
    const response = await api.post("/auth/login", data);
    return response.data;
}

export function registerUser(data: RegisterData): Promise<void> {
    return api.post("/users", data);
}
