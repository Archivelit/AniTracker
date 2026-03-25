import type { Metadata } from "next";
import SignupClient from "@/components/clients/SignupClient";

export const metadata: Metadata = {
    title: "Sign Up",
};

export default async function Signup() {
    return (
        <main className="justify-center items-center flex min-h-screen">
            <SignupClient />
        </main>
    );
}