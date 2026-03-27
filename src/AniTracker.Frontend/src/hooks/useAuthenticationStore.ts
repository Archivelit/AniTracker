import { persist } from "zustand/middleware";
import type User from "@/models/user";
import { create } from "zustand";

export type AuthenticationState = {
    user: User | null
    setUser: (user: User) => void
    logOut: () => void
}

const useAuthenticationStore = create<AuthenticationState>()((
    persist<AuthenticationState>(
        (set) => ({
            user: null,
            setUser: (user: User) => set({ user }),
            logOut: () => set({ user: null }),
        }),
        { name: "auth-storage" }
    ))
);

export default useAuthenticationStore;