"use client";

import useAuthenticationStorage from "@/hooks/useAuthenticationStore";
import AuthenticatedHero from "../authenticatedHero";
import Login from "../forms/loginForm";

export default function LoginClient() {
    const { user } = useAuthenticationStorage();

    if (user) {
        return <AuthenticatedHero />;
    }

    return <Login />;
}