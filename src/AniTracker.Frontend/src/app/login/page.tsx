"use server";

import { cookies } from "next/headers";
import LoginForm from "@/components/forms/login";
import { login } from "@/services/AuthService";
import type { LoginFormData } from "@/types/Forms/LoginFormData";

export default async function Login() {
    const loginHandler = async (data: LoginFormData): Promise<void> => {
        "use server";
        const token: string = (await login(data)).token;

        const cookieStore = await cookies();
        cookieStore.set("token", token, { maxAge: 60 * 15 });
    };

    return (
        <main className="flex min-h-screen justify-center pb-32">
            <LoginForm loginHandler={loginHandler} />
        </main>
    );
}
