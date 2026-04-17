"use server";

import type { GenericFetchResult } from "@/models/fetchResult";
import type { RegisterFormData } from "@/types/Forms/RegisterFormData";
import { api } from "@/utils/Api";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";

export default async function registrationHandler(data: RegisterFormData): Promise<GenericFetchResult<void>> {
    "use server";

    try {
        await api.post("/users", data);
        
        const loginResponse = await api.post("/auth/login", data);

        const cookieStore = await cookies();
        cookieStore.set("token", loginResponse.data, { maxAge: 60 * 15, httpOnly: true })

        return {
            success: true,
            result: undefined
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