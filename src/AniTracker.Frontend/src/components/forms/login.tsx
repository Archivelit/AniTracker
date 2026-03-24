"use client";

import { useForm } from "react-hook-form";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { loginValidationSchema } from "@/utils/ValidationSchemes";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FetchResult } from "@/models/fetchResult";
import { useRouter } from "next/navigation";
import useAuthenticationStorage from "@/hooks/useAuthenticationStore";
import type User from "@/models/user";
import AuthenticatedHero from "../authenticatedHero";

type Props = {
    loginHandler: (data: LoginFormData) => Promise<FetchResult<User>>;
};

export default function LoginForm({ loginHandler }: Props) {
    const router = useRouter();
    const { user, setUser } = useAuthenticationStorage();

    const { register, handleSubmit, formState, setError } = useForm<LoginFormData>({
        resolver: zodResolver(loginValidationSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        var loginResult = await loginHandler(data);
        if (!loginResult.success) {
            setError("root", { message: `${loginResult.statusCode.toString()} ${loginResult.message}` });
        } else {
            router.push("/");
            setUser(loginResult.result);
        }
    };

    return (
        <div className="flex justify-center items-center min-w-screen sm:min-w-80">
            {user === null ?
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
            :
            <AuthenticatedHero />
            }
        </div>
    );
}
