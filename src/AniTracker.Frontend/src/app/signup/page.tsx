import type { Metadata } from "next";
import RegisterForm from "@/components/forms/register";
import registerHandler from "@/handlers/registerHandler";

export const metadata: Metadata = {
    title: "Sign Up",
};

export default async function Signup() {
    return (
        <main className="justify-center items-center flex min-h-screen">
            <RegisterForm registerHandler={registerHandler} />
        </main>
    );
}