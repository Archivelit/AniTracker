import type { Metadata } from "next";
import RegisterForm from "@/components/forms/register";
import registrationHandler from "@/handlers/registrationHandler";

export const metadata: Metadata = {
    title: "Sign Up",
};

export default async function Signup() {
    return (
        <main className="justify-center items-center flex min-h-screen">
            <RegisterForm registrationHandler={registrationHandler} />
        </main>
    );
}