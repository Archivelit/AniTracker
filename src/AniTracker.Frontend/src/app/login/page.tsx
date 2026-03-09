import LoginForm from "@/components/forms/login";
import { LoginFormData } from "@/types/Forms/LoginFormData";
import { api } from "@/utils/Api";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default function Login() : ReactNode {
    const login = async (data: LoginFormData): Promise<void> => {
        'use server';
        
        const getToken = async (email: string, password: string) : Promise<string> =>
            await api.post(`/users/login?email=${email}&password=${password}`)

        const token : string = await getToken(data.email, data.password);
        const cookieStore : ReadonlyRequestCookies = await cookies();
        
        cookieStore.set("token", token, { maxAge: 60 * 15 });
        
    }

    return (
        <main>
            <LoginForm loginHandler={login} />
        </main>
    )
}