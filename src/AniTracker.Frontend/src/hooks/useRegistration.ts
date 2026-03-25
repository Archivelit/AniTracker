import type { FetchResult } from "@/models/fetchResult";
import type User from "@/models/user";
import type { RegisterFormData } from "@/types/Forms/RegisterFormData";
import useAuthenticationStorage from "./useAuthenticationStore";
import { useRouter } from "next/navigation";
import type { UseFormSetError } from "react-hook-form";

type Props = {
    registrationHandler: (data: RegisterFormData) => Promise<FetchResult<User>>;
};

export default function useRegistration ({registrationHandler}: Props) {
    const { setUser } = useAuthenticationStorage();
    const router = useRouter();

    return async (data: RegisterFormData, setError: UseFormSetError<RegisterFormData>) => {
        const registerUserResult = await registrationHandler(data);
        if (!registerUserResult.success) {
            setError("root", { message: `${registerUserResult.statusCode.toString()} ${registerUserResult.message}` });
        } else {
            setUser(registerUserResult.result);
            router.push("/");
        }
    }
}
