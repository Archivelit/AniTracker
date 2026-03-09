import LoginForm from "@/components/forms/login";
import { api } from "@/utils/Api";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import type { LoginFormData } from "@/types/Forms/LoginFormData";

export default function Login(): ReactNode {
    const login = async (data: LoginFormData): Promise<void> => {
        "use server";

        const getToken = async (
            email: string,
            password: string,
        ): Promise<string> =>
            await api.post("/users/login", {
                email: email,
                password: password,
            });

        const token: string = await getToken(data.email, data.password);
        const cookieStore = await cookies();
        cookieStore.set("token", token, { maxAge: 60 * 15 });
    };

    return (
        <main>
            <LoginForm loginHandler={login} />
        </main>
    );
}
