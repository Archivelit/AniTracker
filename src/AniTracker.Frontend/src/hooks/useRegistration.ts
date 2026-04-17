import type { GenericFetchResult } from "@/models/fetchResult";
import type { RegisterFormData } from "@/types/Forms/RegisterFormData";
import { useRouter } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";
import useAuthenticationStorage from "./useAuthenticationStore";
import { Me } from "@/services/MeEndpoints";

type Props = {
    registrationHandler: (data: RegisterFormData) => Promise<GenericFetchResult<void>>;
};

export default function useRegistration ({registrationHandler}: Props) {
    const router = useRouter();
    const { setUser } = useAuthenticationStorage();

    return async (data: RegisterFormData, setError: UseFormSetError<RegisterFormData>) => {
        const registerUserResult = await registrationHandler(data);
        
        if (!registerUserResult.success) {
            setError("root", { message: `${registerUserResult.statusCode.toString()} ${registerUserResult.message}` });
            return;
        }

        const meResult = await Me();
        if (meResult === null) {
            setError("root", { message: "500 Unexpected error occured"});
            return;
        }
        
        setUser(meResult);
        
        router.push("/me");
    }
}
