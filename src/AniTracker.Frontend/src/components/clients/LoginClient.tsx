"use client";

import useAuthenticationStorage from "@/hooks/useAuthenticationStore";
import AuthenticatedHero from "../authenticatedHero";
import Login from "../forms/login";
import type { FetchResult } from "@/models/fetchResult";
import type User from "@/models/user";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import type { JSX } from "react/jsx-runtime";

export default function LoginClient(props: JSX.IntrinsicAttributes & { loginHandler: (data: LoginFormData) => Promise<FetchResult<User>>; }) {
    const { user } = useAuthenticationStorage();

    if (user) {
        return <AuthenticatedHero />;
    }

    return <Login {...props} />;
}