"use client";

import { useForm } from "react-hook-form";
import useRegistration from "@/hooks/useRegistration";
import { registrationValidationSchema } from "@/utils/ValidationSchemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import type { FetchResult } from "@/models/fetchResult";
import FormField from "../ui/formField";
import type { RegisterFormData } from "@/types/Forms/RegisterFormData";
import type User from "@/models/user";

type Props = {
    registrationHandler: (data: RegisterFormData) => Promise<FetchResult<User>>;
};

export default function RegisterForm({ registrationHandler }: Props) {
    const registerUser = useRegistration({registrationHandler});
    
    const { register, handleSubmit, formState, setError } = useForm<RegisterFormData>({
        resolver: zodResolver(registrationValidationSchema)
    });

    const onSubmit = async (data: RegisterFormData) => {
        await registerUser(data, setError);
    };

    return (
        <div className="flex justify-center items-center sm:min-w-80 min-w-screen">
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
                        placeholder="Enter your name"
                        {...register("username")}
                        error={formState.errors.username}
                    />
                    
                    <FormField type="text"
                        {...register("email")}
                        placeholder="Enter your email"
                        error={formState.errors.email}
                    />
                    
                    <FormField type="password"
                        {...register("password")}
                        placeholder="Enter your password"
                        error={formState.errors.password}
                    />
                    
                    <FormField type="password"
                        {...register("confirmPassword")}
                        placeholder="Repeat password"
                        error={formState.errors.confirmPassword}
                    />
                    
                    <div className="flex justify-center m-4">
                        <Button
                            className="w-full py-2 transition-colors cursor-pointer p-5 px-8 text-lg rounded-sm"
                            disabled={formState.isSubmitting}
                        >
                            Register account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}