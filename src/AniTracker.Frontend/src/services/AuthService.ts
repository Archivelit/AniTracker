import type { FetchResult } from "@/models/fetchResult";
import type LoginData from "@/types/Interfaces/LoginData";
import type LoginResponse from "@/types/Interfaces/LoginResponse";
import type RegisterData from "@/types/Interfaces/RegisterData";
import { api } from "@/utils/Api";
import FetchErrorHandlingDecorator from "@/utils/FetchErrorHandlingDecorator";
import type { AxiosResponse } from "axios";

export async function login(data: LoginData): Promise<FetchResult<LoginResponse>> {
    return FetchErrorHandlingDecorator(() => api.post("/auth/login", data));
}

export function registerUser(data: RegisterData): Promise<FetchResult<AxiosResponse>> {
    return FetchErrorHandlingDecorator(() => api.post("/users", data));
}
