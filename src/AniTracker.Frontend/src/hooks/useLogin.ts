import type { FetchResult } from "@/models/fetchResult";
import type User from "@/models/user";
import type { LoginFormData } from "@/types/Forms/LoginFormData";
import { useRouter } from "next/navigation";
import useAuthenticationStorage from "./useAuthenticationStore";
import type { UseFormSetError } from "react-hook-form";


type Props = {
    loginHandler: (data: LoginFormData) => Promise<FetchResult<User>>;
};

const useLogin = ({ loginHandler }: Props) => {
    const router = useRouter();
    const { setUser } = useAuthenticationStorage();
    
    return async (data: LoginFormData, setError: UseFormSetError<LoginFormData>) => {
        const loginResult = await loginHandler(data);

        if (!loginResult.success) {
            setError("root", { message: `${loginResult.statusCode.toString()} ${loginResult.message}` });
            return;
        }

        setUser(loginResult.result);
        router.push("/");
    };

}

export default useLogin;