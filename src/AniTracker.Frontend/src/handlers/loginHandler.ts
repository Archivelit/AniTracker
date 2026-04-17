"use server";

import type { GenericFetchResult } from "@/models/fetchResult";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import { cookies } from "next/headers";
import { api } from "@/utils/Api";
import { isAxiosError } from "axios";

async function loginHandler (data: LoginFormData): Promise<GenericFetchResult<void>> {
    "use server";

    try {
        const response = await api.post("/auth/login", data);
        const cookieStore = await cookies();
        cookieStore.set("token", response.data, { maxAge: 60 * 15, httpOnly: true});
    
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
};

export default loginHandler;