import type { FetchResult } from "@/models/fetchResult";
import type User from "@/models/user";
import { login } from "@/services/AuthService";
import { Me } from "@/services/MeEndpoints";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import type LoginResponse from "@/types/Interfaces/LoginResponse";
import { cookies } from "next/headers";

const loginHandler = async (data: LoginFormData): Promise<FetchResult<User>> => {
    "use server";
    const loginResponse: FetchResult<LoginResponse> = await login(data);
    
    if (!loginResponse.success) {
        return loginResponse;
    }

    const cookieStore = await cookies();
    cookieStore.set("token", loginResponse.result.token, { maxAge: 60 * 15 })
    
    const getUserResult = await Me();

    return getUserResult;
};

export default loginHandler;