"use server";

import LoginForm from "@/components/forms/login";
import loginHandler from "@/handlers/loginHandler";

export default async function Login() {
    return (
        <main className="flex min-h-screen justify-center pb-32">
            <LoginForm loginHandler={loginHandler} />
        </main>
    );
}
