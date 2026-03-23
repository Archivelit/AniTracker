import { create } from "zustand";
import type User from "@/models/user";

export type AuthenticationState = {
    user: User | null
    setUser: (user: User) => void
    logOut: () => void
}

const useAuthenticationStorage = create<AuthenticationState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    logOut: () => set(() => ({user: null}))
}));

export default useAuthenticationStorage;