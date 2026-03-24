"use server";

import { cookies } from "next/headers";
import LoginForm from "@/components/forms/login";
import { login } from "@/services/AuthService";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import type { FetchResult } from "@/models/fetchResult";
import type LoginResponse from "@/types/Interfaces/LoginResponse";
import { Me } from "@/services/MeEndpoints";
import type User from "@/models/user";

export default async function Login() {   
    const loginHandler = async (data: LoginFormData): Promise<FetchResult<User>> => {
        "use server";
        const response: FetchResult<LoginResponse> = await login(data);
        
        if (!response.success) {
            return response;
        }

        const cookieStore = await cookies();
        cookieStore.set("token", response.result.token, { maxAge: 60 * 15 });

        const getUserResult = await Me();

        return getUserResult;
    };

    return (
        <main className="flex min-h-screen justify-center pb-32">
            <LoginForm loginHandler={loginHandler} />
        </main>
    );
}
