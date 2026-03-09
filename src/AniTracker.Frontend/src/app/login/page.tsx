import LoginForm from "@/components/forms/login";
import { api } from "@/utils/Api";
import { cookies } from "next/headers";
import type { LoginFormData } from "@/types/Forms/LoginFormData";

export default function Login() {
    const login = async (data: LoginFormData): Promise<void> => {
        "use server";

        const getToken = async (
            email: string,
            password: string,
        ): Promise<string> =>
            (await api.post("/users/login", {
                email: email,
                password: password,
            })).data;

        const token: string = await getToken(data.email, data.password);
        const cookieStore = await cookies();
        cookieStore.set("token", token, { maxAge: 60 * 15 });
    };

    return (
        <main className="flex min-h-screen justify-center pb-32">
            <LoginForm loginHandler={login} />
        </main>
    );
}
