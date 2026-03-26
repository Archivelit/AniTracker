import loginHandler from "@/handlers/loginHandler";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import { useRouter } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";
import useAuthenticationStorage from "./useAuthenticationStore";
import { Me } from "@/services/MeEndpoints";

export default function useLogin() {
    const router = useRouter();
    const { setUser } = useAuthenticationStorage();

    return async (data: LoginFormData, setError: UseFormSetError<LoginFormData>) => {
        const loginResult = await loginHandler(data);

        if (!loginResult.success) {
            setError("root", { message: `${loginResult.statusCode.toString()} ${loginResult.message}` });
            return;
        }

        const meResult = await Me();
        
        if (meResult === null) {
            setError("root", { message: "500 Unexpected error occurred" });
            return;
        }
        
        setUser(meResult);

        router.push("/me/medias");
    };
}