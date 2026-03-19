"use client";

import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { loginValidationSchema } from "@/utils/ValidationSchemes";
import { ZodError } from "zod";
import { cn } from "@/lib/utils";

type Props = {
    loginHandler: (data: LoginFormData) => Promise<void>;
};

export default function LoginForm({ loginHandler }: Props) {
    const { register, handleSubmit, formState, setError } = useForm<LoginFormData>();

    const isPasswordError = (err: ZodError) =>
        err.issues.some((issue) => issue.path[0] === "password");

    const isEmailError = (err: ZodError) =>
        err.issues.some((issue) => issue.path[0] === "email");

    const processValidationError = (err: ZodError) => {
        if (isEmailError(err)) {
            setError("email", { message: "Invalid email address" });
        } else if (isPasswordError(err)) {
            const message = err.issues.find(i => i.path[0] === "password")?.message;
            setError("password", { message: message });
        }
    }

    const onSubmit = async (data: LoginFormData) => {
        try {
            loginValidationSchema.parse(data);
        } catch (err) {
            if (err instanceof ZodError) {
                processValidationError(err);
            }
            return;
        }

        await loginHandler(data);
        redirect("/");
    };

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-1 border-foreground block items-center align p-4 w-80 h-100 rounded-xl"
            >
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
                
                <div className="flex justify-center m-4">
                    <Button className="w-full py-2 transition-colors cursor-pointer p-5 px-8 text-lg rounded-sm">
                        Log in
                    </Button>
                </div>
            </form>
        </div>
    );
}
