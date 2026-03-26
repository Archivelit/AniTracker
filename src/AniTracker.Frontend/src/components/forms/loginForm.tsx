"use client";

import { useForm } from "react-hook-form";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import { Button } from "../ui/button";
import { loginValidationSchema } from "@/utils/ValidationSchemes";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../ui/formField";

import useLogin from "@/hooks/useLogin";


export default function LoginForm() {
    const handleLogin = useLogin();

    const { register, handleSubmit, formState, setError } = useForm<LoginFormData>({
        resolver: zodResolver(loginValidationSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        await handleLogin(data, setError);
    };

    return (
        <div className="flex justify-center items-center min-w-screen sm:min-w-80">
            <div className="relative w-full">
                {formState.errors.root && (
                    <div className="absolute top-0 left-0 right-0 text-base m-2 text-center">
                        <p className="text-red-500">{formState.errors.root.message}</p>
                    </div>
                )}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="sm:border sm:border-foreground w-full block items-center align p-4 h-fit rounded-xl mt-10"
                >                    
                    <FormField type="text" 
                        {...register("email")}
                        placeholder="Enter your email" 
                        error={formState.errors.email}
                    />

                    <FormField type="password"
                        {...register("password")}
                        placeholder="Enter your password"
                        error={formState.errors.password}/>

                    <div className="flex justify-center m-4">
                        <Button className="w-full py-2 transition-colors cursor-pointer p-5 px-8 text-lg rounded-sm">
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
