"use client";

import registrationHandler from "@/handlers/registrationHandler";
import useAuthenticationStorage from "@/hooks/useAuthenticationStore";
import AuthenticatedHero from "../authenticatedHero";
import RegisterForm from "../forms/registrationForm";

export default function SignupClient() {
    const { user } = useAuthenticationStorage();

    if (user) {
        return <AuthenticatedHero />
    }
    
    return(
        <RegisterForm registrationHandler={registrationHandler} />
    );
}
