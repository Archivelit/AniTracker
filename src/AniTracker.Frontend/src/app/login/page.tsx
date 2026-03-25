"use server";

import LoginClient from "@/components/clients/LoginClient";

export default async function Login() {
    return (
        <main className="flex min-h-screen justify-center pb-32">
            <LoginClient />
        </main>
    );
}
