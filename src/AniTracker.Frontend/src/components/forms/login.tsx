'use client';

import { LoginFormData } from "@/types/Forms/LoginFormData";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";

type Props = {
    loginHandler: (data: LoginFormData) => Promise<void>
}

export default function LoginForm({ loginHandler }: Props) : ReactNode {
    const {register, handleSubmit} = useForm<LoginFormData>();
    const onSubmit = async (data: LoginFormData) => { 
        await loginHandler(data);
        redirect("/");
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)}>

            <input type="text" {... register("email")} placeholder="Enter your email"/>

            <input type="password" {... register("password")} placeholder="Enter your password"/>

            <input type="submit" value="Log in" />

        </form>
    );
}