"use server";

import { cookies } from "next/headers";
import type User from "@/models/user";
import { api } from "@/utils/Api";

export async function Me(): Promise<User | null> {
    "use server";

    try {
        const cookieStore = await cookies();
        const authToken = cookieStore.get("token")?.value;

        if (authToken === null) {
            return null;
        }
        
        const response = (await api.get<User>("/me", { headers: { "Authorization": `Bearer ${authToken}` } }));

        return response.data;
    } catch {
        return null;
    }
}