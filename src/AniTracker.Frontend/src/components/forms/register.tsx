"use client";

import { useForm } from "react-hook-form";
import type { RegisterFormData } from "@/types/Forms/RegisterFormData";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
    registerHandler: (data: RegisterFormData) => Promise<void>;
};

export default function RegisterForm({ registerHandler }: Props) {
    const { register, handleSubmit } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        await registerHandler(data);
    };

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-2 border-foreground block items-center align p-4 w-80 h-100 rounded-xl"
            >
                <div className="flex justify-center m-4 rounded-sm h-fit">
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        {...register("username")}
                        className="px-2 py-5 w-full text-lg"
                    />
                </div>
                <div className="flex m-4 rounded-sm">
                    <Input
                        type="text"
                        {...register("email")}
                        placeholder="Enter your email"
                        className="px-2 py-5 w-full text-lg"
                    />
                </div>
                <div className="flex justify-center m-4 rounded-sm h-fit">
                    <Input
                        type="password"
                        {...register("password")}
                        placeholder="Enter your password"
                        className="px-2 py-5 w-full text-lg"
                    />
                </div>
                <div className="flex justify-center m-4 rounded-sm h-fit">
                    <Input
                        type="password"
                        placeholder="Repeat password"
                        className="px-2 py-5 w-full text-lg"
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
