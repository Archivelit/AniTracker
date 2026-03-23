import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/forms/register";
import { login, registerUser } from "@/services/AuthService";
import type RegisterFormData from "@/types/Interfaces/RegisterData";
import type { FetchResult } from "@/models/fetchResult";
import type RegisterData from "@/types/Interfaces/RegisterData";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
};

export default async function Signup() {
    async function registerHandler(data: RegisterFormData): Promise<FetchResult<RegisterData>> {
        "use server";

        await registerUser(data);

        const response = await login(data);
        
        if (response.success) {
            const cookieStore = await cookies();
            cookieStore.set("token", response.result.token, { maxAge: 60 * 15 });
            redirect("/");
        }

        return response;
    }

    return (
        <main className="justify-center items-center flex min-h-screen">
            <RegisterForm registerHandler={registerHandler} />
        </main>
    );
}