import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/forms/register";
import { login, registerUser } from "@/services/AuthService";
import type RegisterFormData from "@/types/Interfaces/RegisterData";

// TODO: Complete registration
export default async function Register() {
    async function registerHandler(data: RegisterFormData): Promise<void> {
        "use server";

        await registerUser(data);

        const loginResponse = await login(data);

        const cookieStore = await cookies();
        cookieStore.set("token", loginResponse.token, { maxAge: 60 * 15 });
        redirect("/");
    }

    return (
        <main>
            <RegisterForm registerHandler={registerHandler} />
        </main>
    );
}
