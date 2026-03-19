import { z } from "zod";

export const passwordSchema = z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password must be less than 64 characters" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

export const loginValidationSchema = z.object({
    email: z.email("Invalid email address"),
    password: passwordSchema
});

export const registrationValidationSchema = z.object({
    username: z.string()
        .trim()
        .nonempty({ message: "Username is required" })
        .min(3, { message: "Username must be at least 3 characters long" }),
    email: z.email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});