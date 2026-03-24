import type { FetchResult } from "@/models/fetchResult";
import type User from "@/models/user";
import { login, registerUser } from "@/services/AuthService";
import { Me } from "@/services/MeEndpoints";
import type { RegisterFormData } from "@/types/Forms/RegisterFormData";
import { cookies } from "next/headers";

export default async function registerHandler(data: RegisterFormData): Promise<FetchResult<User>> {
    "use server";

    const registrationResponse = await registerUser(data);
    
    if (!registrationResponse.success) {
        return registrationResponse;
    }
    
    const loginResponse = await login(data);
    
    if (!loginResponse.success) {
        return loginResponse;
    }

    const cookieStore = await cookies();
    cookieStore.set("token", loginResponse.result.token, { maxAge: 60 * 15 });
    
    const getUserResult = await Me();

    return getUserResult;
}