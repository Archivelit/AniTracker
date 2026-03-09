"use client";

import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { Input } from "../ui/input";

type Props = {
    loginHandler: (data: LoginFormData) => Promise<void>;
};

export default function LoginForm({ loginHandler }: Props): ReactNode {
    const { register, handleSubmit } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        await loginHandler(data);
        redirect("/");
    };

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)}
            className="border-2 border-foreground block items-center align p-4 w-80 h-100 rounded-xl">
                <div className="flex m-4 rounded-sm">
                    <Input
                        type="text"
                        {...register("email")}
                        placeholder="Enter your email"
                        className="border-2 border-foreground px-2 py-5 w-full text-lg"
                    />
                </div>
                <div className="flex justify-center m-4 rounded-sm h-fit">
                    <Input
                        type="password"
                        {...register("password")}
                        placeholder="Enter your password"
                        className="border-2 border-foreground px-2 py-5 w-full text-lg"
                    />
                </div>
                <div className="flex justify-center m-4">
                    <Button className="w-full py-2 transition-colors cursor-pointer p-5 px-8 text-lg rounded-sm">
                        Log in
                    </Button>
                </div>
            </form>
        </div>
    );
}
