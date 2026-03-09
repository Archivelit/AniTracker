import { Link } from "lucide-react";
import { ReactNode } from "react";

export default function Login() : ReactNode {
    return(
        <div>
            <Link href="/login">Log in</Link>
            <Link href="/register">Register</Link>
        </div>
    )
}