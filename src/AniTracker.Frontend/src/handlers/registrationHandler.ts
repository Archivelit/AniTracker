import type { FetchResult } from "@/models/fetchResult";
import type User from "@/models/user";
import { registerUser } from "@/services/AuthService";
import type { RegisterFormData } from "@/types/Forms/RegisterFormData";
import loginHandler from "./loginHandler";

export default async function registrationHandler(data: RegisterFormData): Promise<FetchResult<User>> {
    "use server";

    const registrationResponse = await registerUser(data);
    
    if (!registrationResponse.success) {
        return registrationResponse;
    }
    
    return loginHandler(data);
}