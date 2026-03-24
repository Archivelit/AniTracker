"use client";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import type { FetchResult } from "@/models/fetchResult";
import { Input } from "../ui/input";
import { registrationValidationSchema } from "@/utils/ValidationSchemes";
import type { RegisterFormData } from "@/types/Forms/RegisterFormData";
import useAuthenticationStorage from "@/hooks/useAuthenticationStore";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type User from "@/models/user";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthenticatedHero from "../authenticatedHero";

type Props = {
    registerHandler: (data: RegisterFormData) => Promise<FetchResult<User>>;
};

export default function RegisterForm({ registerHandler }: Props) {
    const { user, setUser } = useAuthenticationStorage();
    const router = useRouter();
    
    const { register, handleSubmit, formState, setError } = useForm<RegisterFormData>({
        resolver: zodResolver(registrationValidationSchema)
    });

    const onSubmit = async (data: RegisterFormData) => {
        const registerUserResult = await registerHandler(data);
        if (!registerUserResult.success) {
            setError("root", { message: `${registerUserResult.statusCode.toString()} ${registerUserResult.message}` });
        } else {
            setUser(registerUserResult.result);
            router.push("/");
        }
    };

    return (
        <>
        {user === null ? 
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
                    {formState.errors.username && (
                        <div className="flex justify-left mx-4 my-2 h-fit">
                            <p className="text-red-500 text-sm">{formState.errors.username.message}</p>
                        </div>
                    )}

                    <div className="flex justify-center m-4 rounded-sm h-fit">
                        <Input
                            type="text"
                            placeholder="Enter your name"
                            {...register("username")}
                            className={cn(
                                "border-foreground px-2 py-5 w-full text-lg",
                                formState.errors.username && "border-red-500"
                            )}
                        />
                    </div>

                    {formState.errors.email && (
                        <div className="flex justify-left mx-4 my-2 h-fit">
                            <p className="text-red-500 text-sm">{formState.errors.email.message}</p>
                        </div>
                    )}

                    <div className="flex m-4 rounded-sm">
                        <Input
                            type="text"
                            {...register("email")}
                            placeholder="Enter your email"
                            className={cn(
                                "border-foreground px-2 py-5 w-full text-lg",
                                formState.errors.email && "border-red-500"
                            )}
                        />
                    </div>

                    {formState.errors.password && (
                        <div className="flex justify-left mx-4 my-2 h-fit">
                            <p className="text-red-500 text-sm">{formState.errors.password.message}</p>
                        </div>
                    )}

                    <div className="flex justify-center m-4 rounded-sm h-fit">
                        <Input
                            type="password"
                            {...register("password")}
                            placeholder="Enter your password"
                            className={cn(
                                "border-foreground px-2 py-5 w-full text-lg",
                                formState.errors.password && "border-red-500"
                            )}
                        />
                    </div>

                    {formState.errors.confirmPassword && (
                        <div className="flex justify-left mx-4 my-2 h-fit">
                            <p className="text-red-500 text-sm">{formState.errors.confirmPassword.message}</p>
                        </div>
                    )}

                    <div className="flex justify-center m-4 rounded-sm h-fit">
                        <Input
                            type="password"
                            {...register("confirmPassword")}
                            placeholder="Repeat password"
                            className={cn(
                                "border-foreground px-2 py-5 w-full text-lg",
                                formState.errors.confirmPassword && "border-red-500"
                            )}
                        />
                    </div>

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
        :
        <AuthenticatedHero />
        }
        </>
    );
}