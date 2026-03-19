"use client";

import { useForm } from "react-hook-form";
import type { RegisterFormData } from "@/types/Forms/RegisterFormData";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { registrationValidationSchema } from "@/utils/ValidationSchemes";
import { ZodError } from "zod";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
    registerHandler: (data: RegisterFormData) => Promise<void>;
};

export default function RegisterForm({ registerHandler }: Props) {
    const { register, handleSubmit, formState, setError } = useForm<RegisterFormData>();

    const isPasswordError = (err: ZodError) =>
        err.issues.some((issue) => issue.path[0] === "password");

    const isEmailError = (err: ZodError) =>
        err.issues.some((issue) => issue.path[0] === "email");

    const isUsernameError = (err: ZodError) =>
        err.issues.some((issue) => issue.path[0] === "username");
    
    const processValidationError = (err: ZodError) => {
        if (isEmailError(err)) {
            setError("email", { message: "Invalid email address" });
            return;
        } else if (isPasswordError(err)) {
            const message = err.issues.find(i => i.path[0] === "password")?.message;
            setError("password", { message: message });
            return;
        } else if (isUsernameError(err)) {
            const message = err.issues.find(i => i.path[0] === "username")?.message;
            setError("username", { message: message });
        } else {
            setError("confirmPassword", { message: "Passwords don't match" });
        }
    }
    
    const onSubmit = async (data: RegisterFormData) => {
        try {
            registrationValidationSchema.parse(data);
        } catch (err) {
            if (err instanceof ZodError) {
                processValidationError(err);
            }
            return;
        }

        await registerHandler(data);
        redirect("/");
    };

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-1 border-foreground block items-center align p-4 w-80 h-100 rounded-xl"
            >
                    {formState.errors.username && 
                        <div className="flex justify-left mx-4 my-2 h-fit">
                            <p className="text-red-500 text-sm">{formState.errors.username.message}</p>
                        </div>
                    }

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

                {formState.errors.email && 
                    <div className="flex justify-left mx-4 my-2 h-fit">
                        <p className="text-red-500 text-sm">{formState.errors.email.message}</p>                        
                    </div>
                }

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

                {formState.errors.password && 
                    <div className="flex justify-left mx-4 my-2 h-fit">
                        <p className="text-red-500 text-sm">{formState.errors.password.message}</p>
                    </div>
                }

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

                {formState.errors.confirmPassword && 
                    <div className="flex justify-left mx-4 my-2 h-fit">
                        <p className="text-red-500 text-sm">{formState.errors.confirmPassword.message}</p>
                    </div>
                }

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
                    <Button className="w-full py-2 transition-colors cursor-pointer p-5 px-8 text-lg rounded-sm">
                        Register account
                    </Button>
                </div>
            </form>
        </div>
    );
}
