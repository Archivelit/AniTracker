import type { FetchResult } from "@/models/fetchResult";
import type LoginData from "@/types/Interfaces/LoginData";
import type LoginResponse from "@/types/Interfaces/LoginResponse";
import type RegisterData from "@/types/Interfaces/RegisterData";
import { api } from "@/utils/Api";
import { type AxiosResponse, isAxiosError } from "axios";

async function FetchErrorHandlingDecorator<TResult>(func: () => Promise<AxiosResponse<TResult>>): Promise<FetchResult<TResult>> {
    try {
        const response: AxiosResponse<TResult> = await func();
        return {
            success: true,
            result: response.data
        }
    } catch (err) {
        if (isAxiosError(err)) {
            return {
                success: false,
                message: err.response?.data,
                statusCode: err.response?.status ?? 500
            };
        }
        return {
            success: false,
            message: "Unexpected error occurred",
            statusCode: 500
        };
    }
}

export async function login(data: LoginData): Promise<FetchResult<LoginResponse>> {
    return FetchErrorHandlingDecorator(() => api.post("/auth/login", data));
}

export function registerUser(data: RegisterData): Promise<FetchResult<void>> {
    return FetchErrorHandlingDecorator(() => api.post("/users", data));
}
